import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

import { NextResponse } from 'next/server'

import { runAskTool, type AskToolResult } from '@/utilities/askTools'

export const runtime = 'nodejs'

type KbPage = { path: string; title: string; note?: string }
type Kb = {
  overview?: string
  pages?: KbPage[]
  notes?: string[]
  faq?: { q: string[]; a: string }[]
}

type ChatMsg = { role: 'user' | 'assistant'; text: string }

type Suggestion = { label: string; question: string }

type AskAction =
  | { type: 'navigate'; path: string; label: string }
  | { type: 'subscribe'; label: string }
  | { type: 'unsubscribe'; label: string }
  | { type: 'subscribe_status'; label: string }

type OmniPayload = {
  answer: string
  suggestions: Suggestion[]
  actions: AskAction[]
}

const ALLOWED_ORIGINS = new Set([
  'https://alexander.xin',
  'https://www.alexander.xin',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
])

const EXTRA_ALLOWED_PATHS = new Set([
  '/unsubscribe',
  '/security/policy',
  '/terms',
  '/privacy',
  '/currency',
  '/time',
  '/units',
  '/qr',
  '/fun',
  '/tools',
  '/awareness',
])

const RATE_LIMIT_MAX = 20
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const rateBuckets = new Map<string, number[]>()

let kbCache: { mtimeMs: number; data: Kb } | null = null

function corsHeaders(origin: string | null): HeadersInit {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : 'https://alexander.xin'
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
  }
}

function sanitizeQuestion(raw: unknown): string {
  if (typeof raw !== 'string') return ''
  return raw.replace(/\s+/g, ' ').trim().slice(0, 400)
}

function sanitizeMessages(raw: unknown): ChatMsg[] {
  if (!Array.isArray(raw)) return []
  const out: ChatMsg[] = []
  let total = 0
  for (const item of raw.slice(-12)) {
    if (!item || typeof item !== 'object') continue
    const role = (item as { role?: unknown }).role
    const text = sanitizeQuestion((item as { text?: unknown }).text)
    if ((role !== 'user' && role !== 'assistant') || !text) continue
    if (total + text.length > 2400) break
    total += text.length
    out.push({ role, text })
  }
  return out
}

function clientIp(request: Request): string {
  const cf = request.headers.get('cf-connecting-ip')?.trim()
  if (cf) return cf
  const xff = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (xff) return xff
  return 'unknown'
}

function takeRateSlot(ip: string): boolean {
  const now = Date.now()
  const prev = rateBuckets.get(ip) || []
  const recent = prev.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX) {
    rateBuckets.set(ip, recent)
    return false
  }
  recent.push(now)
  rateBuckets.set(ip, recent)
  return true
}

async function loadKb(): Promise<Kb> {
  const file = path.join(process.cwd(), 'public', 'assistant', 'kb.json')
  const { mtimeMs } = await stat(file)
  if (kbCache && kbCache.mtimeMs === mtimeMs) return kbCache.data
  const raw = await readFile(file, 'utf8')
  const data = JSON.parse(raw) as Kb
  kbCache = { mtimeMs, data }
  return data
}

function allowedPaths(kb: Kb): Set<string> {
  const set = new Set<string>(EXTRA_ALLOWED_PATHS)
  for (const p of kb.pages || []) {
    if (typeof p.path === 'string' && p.path.startsWith('/')) set.add(p.path)
  }
  return set
}

function isSafePath(raw: unknown, allow: Set<string>): raw is string {
  if (typeof raw !== 'string') return false
  const p = raw.trim()
  if (!p.startsWith('/') || p.startsWith('//')) return false
  if (p.includes('://') || p.includes('\\')) return false
  if (/[?#]/.test(p)) return false
  if (p === '/admin' || p.startsWith('/admin/') || p.startsWith('/api/')) return false
  return allow.has(p)
}

function buildContext(kb: Kb): string {
  const parts: string[] = []
  if (kb.overview) parts.push(`Overview:\n${kb.overview}`)
  if (kb.pages?.length) {
    parts.push(
      'Pages:\n' +
        kb.pages
          .map((p) => `- ${p.path} · ${p.title}${p.note ? ` — ${p.note}` : ''}`)
          .join('\n'),
    )
  }
  if (kb.notes?.length) {
    parts.push('Notes:\n' + kb.notes.map((n) => `- ${n}`).join('\n'))
  }
  if (kb.faq?.length) {
    parts.push('Extra facts:\n' + kb.faq.map((e) => `- ${e.a}`).join('\n'))
  }
  return parts.join('\n\n').slice(0, 4500)
}

type SubscribeIntent = 'subscribe' | 'unsubscribe' | 'subscribe_status'

/** 订阅意图：即使用户把邮箱打进对话，也不代查，只给面板动作。 */
function inferSubscribeIntent(text: string): SubscribeIntent | null {
  if (/退订|unsubscribe|取消订阅/i.test(text)) return 'unsubscribe'
  if (/查(一下|询)?(订阅|名单)|有没有订|是否(已)?订阅|还在名单|subscribe[_ -]?status/i.test(text)) {
    return 'subscribe_status'
  }
  if (
    /帮我订|给我订|订阅一下|怎么订|如何订|想订阅|要订阅|newsletter|subscribe|加入(通讯|名单)|\/subscribe/i.test(
      text,
    )
  ) {
    return 'subscribe'
  }
  return null
}

function inferNavigate(text: string, allow: Set<string>): AskAction | null {
  const pairs: [RegExp, string, string][] = [
    [/画廊|看图|照片|gallery/i, '/gallery', '去画廊'],
    [/写作|文章|posts|blog/i, '/posts', '去写作'],
    [/研究|论文|research/i, '/research', '去研究'],
    [/玩乐|番茄|电台|好玩/i, '/fun', '去玩乐'],
    [/awareness|phishdrill/i, '/awareness', '打开该页'],
    [/工具(?!箱)|tools/i, '/tools', '去工具'],
    [/订阅页|\/subscribe/i, '/subscribe', '打开订阅页'],
    [/联系|留言|contact/i, '/contact', '去联系'],
    [/隐私|cookie/i, '/privacy', '看隐私'],
  ]
  for (const [re, path, label] of pairs) {
    if (re.test(text) && isSafePath(path, allow)) {
      return { type: 'navigate', path, label }
    }
  }
  return null
}

function mergeActions(primary: AskAction[], extra: AskAction[]): AskAction[] {
  const out: AskAction[] = []
  const seen = new Set<string>()
  for (const a of [...primary, ...extra]) {
    const key = a.type === 'navigate' ? `navigate:${a.path}` : a.type
    if (seen.has(key)) continue
    seen.add(key)
    out.push(a)
    if (out.length >= 3) break
  }
  return out
}

function fallbackSuggestions(kb: Kb, question: string, answer = ''): Suggestion[] {
  const hay = `${question}\n${answer}`
  const out: Suggestion[] = []

  if (/订阅|邮件|名单|newsletter|subscribe/i.test(hay)) {
    out.push(
      { label: '打开订阅页', question: '订阅页在哪？频率高吗？' },
      { label: '查询订阅', question: '我想查一下某个邮箱是否还在订阅名单里。' },
      { label: '退订怎么做', question: '如果已经订阅了，怎么退订？' },
    )
  }
  if (/画廊|照片|摄影/i.test(hay)) {
    out.push(
      { label: '今日一帧', question: '玩乐页的今日一帧是怎么选的？' },
      { label: '去画廊', question: '画廊怎么浏览和放大？' },
    )
  }
  if (/研究|论文/i.test(hay)) {
    out.push({ label: '研究入口', question: '公开论文在 /research 怎么看？' })
  }
  if (/玩|番茄|电台|工具/i.test(hay)) {
    out.push(
      { label: '玩乐有啥', question: '玩乐页现在有哪些玩具？' },
      { label: '实用工具', question: '实用工具页和玩乐有什么区别？' },
    )
  }
  if (/门禁|验证|关于|联系/i.test(hay)) {
    out.push({ label: '为何要验证', question: '为什么关于和联系要访客验证？' })
  }
  if (/天气|气温|下雨|温度|weather/i.test(hay)) {
    out.push(
      { label: '上海天气', question: '上海现在天气怎么样？' },
      { label: '玩乐天气', question: '玩乐页的天气卡片在哪？' },
    )
  }
  if (/汇率|美元|欧元|兑|CNY|USD/i.test(hay)) {
    out.push(
      { label: '欧元兑人民币', question: '1 欧元大约兑多少人民币？' },
      { label: '汇率工具', question: '汇率换算工具在哪？' },
    )
  }
  if (/诗词|一句诗|poem/i.test(hay)) {
    out.push({ label: '再来一句', question: '再给我一句诗词。' })
  }
  if (/几点|时间|clock/i.test(hay)) {
    out.push({ label: '时间工具', question: '世界时钟工具在哪？' })
  }

  if (out.length >= 4) return out.slice(0, 4)

  const pages = kb.pages || []
  const q = question.toLowerCase()
  const scored = pages
    .filter((p) => p.path !== '/')
    .map((p) => {
      const blob = `${p.path} ${p.title} ${p.note || ''}`.toLowerCase()
      let score = 0
      for (const token of q.split(/[^\p{L}\p{N}]+/u).filter((t) => t.length > 1)) {
        if (blob.includes(token)) score += 2
      }
      return { p, score }
    })
    .sort((a, b) => b.score - a.score)

  for (const { p } of scored) {
    if (out.length >= 4) break
    if (out.some((s) => s.question.includes(p.path) || s.label.includes(p.title))) continue
    out.push({
      label: `关于 ${p.title}`,
      question: `${p.title}是做什么的？入口是 ${p.path} 吗？`,
    })
  }

  return out.slice(0, 4)
}

function sanitizeSuggestions(raw: unknown): Suggestion[] {
  if (!Array.isArray(raw)) return []
  const out: Suggestion[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const label = String((item as { label?: unknown }).label || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 20)
    const question = sanitizeQuestion((item as { question?: unknown }).question)
    if (!label || !question) continue
    out.push({ label, question })
    if (out.length >= 4) break
  }
  return out
}

function sanitizeActions(raw: unknown, allow: Set<string>): AskAction[] {
  if (!Array.isArray(raw)) return []
  const out: AskAction[] = []
  const seen = new Set<string>()

  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const type = (item as { type?: unknown }).type
    const labelRaw = String((item as { label?: unknown }).label || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 28)

    if (type === 'navigate') {
      const p = (item as { path?: unknown }).path
      if (!isSafePath(p, allow)) continue
      const key = `navigate:${p}`
      if (seen.has(key)) continue
      seen.add(key)
      out.push({ type: 'navigate', path: p, label: labelRaw || `去 ${p}` })
    } else if (type === 'subscribe' || type === 'unsubscribe' || type === 'subscribe_status') {
      if (seen.has(type)) continue
      seen.add(type)
      const defaults = {
        subscribe: '订阅更新',
        unsubscribe: '退订',
        subscribe_status: '查询订阅',
      } as const
      out.push({ type, label: labelRaw || defaults[type] })
    }

    if (out.length >= 3) break
  }

  return out
}

function unescapeJsonString(s: string): string {
  return s
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
}

/** JSON 被 max_tokens 截断时，尽量捞出完整或半截 answer。 */
function recoverAnswerFromTruncated(raw: string): string {
  const m = raw.match(/"answer"\s*:\s*"((?:\\.|[^"\\])*)"?/s)
  if (!m?.[1]) return ''
  let text = unescapeJsonString(m[1]).replace(/\s+/g, ' ').trim()
  if (text && !/[。！？.!?\u300d\u300f」』）)\]]$/.test(text)) {
    // 去掉末尾半截词，尽量在标点处收束
    const cut = text.search(/[,，、：:；;]\s*[^,，、：:；;\s]{0,12}$/)
    if (cut > 20) text = text.slice(0, cut).trim()
    else text = text.replace(/[\u4e00-\u9fffA-Za-z0-9]{1,6}$/u, '').trim()
    if (text && !/[。！？.!?]$/.test(text)) text = `${text}。`
  }
  return text.slice(0, 1800)
}

function extractJsonObject(text: string): unknown | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = fenced?.[1]?.trim() || text.trim()
  const start = candidate.indexOf('{')
  const end = candidate.lastIndexOf('}')
  if (start < 0 || end <= start) return null
  try {
    return JSON.parse(candidate.slice(start, end + 1)) as unknown
  } catch {
    return null
  }
}

function parseOmniContent(
  raw: string,
  kb: Kb,
  question: string,
  tool: AskToolResult | null = null,
): OmniPayload {
  const allow = allowedPaths(kb)
  const parsed = extractJsonObject(raw)
  const intent = inferSubscribeIntent(question)
  const nav = inferNavigate(question, allow)
  const heuristic: AskAction[] = []
  if (intent) {
    const defaults = {
      subscribe: '订阅更新',
      unsubscribe: '退订',
      subscribe_status: '查询订阅',
    } as const
    heuristic.push({ type: intent, label: defaults[intent] })
  }
  if (tool?.navigate && isSafePath(tool.navigate.path, allow)) {
    heuristic.push(tool.navigate)
  }
  if (nav) heuristic.push(nav)

  if (parsed && typeof parsed === 'object') {
    const obj = parsed as {
      answer?: unknown
      suggestions?: unknown
      actions?: unknown
    }
    const answer =
      typeof obj.answer === 'string' ? obj.answer.replace(/\s+/g, ' ').trim().slice(0, 1800) : ''
    if (answer) {
      const suggestions = sanitizeSuggestions(obj.suggestions)
      return {
        answer,
        suggestions:
          suggestions.length > 0 ? suggestions : fallbackSuggestions(kb, question, answer),
        actions: mergeActions(sanitizeActions(obj.actions, allow), heuristic),
      }
    }
  }

  const recovered = recoverAnswerFromTruncated(raw)
  if (recovered) {
    return {
      answer: recovered,
      suggestions: fallbackSuggestions(kb, question, recovered),
      actions: heuristic,
    }
  }

  // 纯散文：若像 JSON 残骸则丢掉，改用兜底句
  const looksBrokenJson = /^\s*\{/.test(raw) || /"answer"\s*:/.test(raw)
  const prose = looksBrokenJson
    ? ''
    : raw.replace(/\s+/g, ' ').trim().slice(0, 1800)

  const answer =
    prose ||
    (intent
      ? '订阅相关需要你在面板里输入邮箱并确认，我不会代填或静默执行。点下面的动作即可。'
      : '这会儿没整理出完整答句。可以先看 /gallery、/research 或 /posts，或再问一句。')

  return {
    answer,
    suggestions: fallbackSuggestions(kb, question, answer),
    actions: heuristic,
  }
}

async function callOmni(
  kb: Kb,
  question: string,
  history: ChatMsg[],
  tool: AskToolResult | null,
): Promise<OmniPayload | null> {
  const base = process.env.OMNI_URL?.replace(/\/$/, '')
  const key = process.env.OMNI_KEY
  const model = process.env.OMNI_MODEL
  if (!base || !key || !model) return null

  const context = buildContext(kb)
  const pathList = [...allowedPaths(kb)].sort().join(', ')

  const system = [
    '你是 alexander.xin 前台导览「问站」。只用站点先验与下方「工具实况」回答，不编造数字。',
    '输出要求（很重要）：',
    '1) 只输出一个 JSON 对象，不要 markdown 围栏或其它文字。',
    '2) 字段顺序固定：先 answer，再 suggestions，再 actions——answer 必须完整写完。',
    '3) answer：与用户同语言，2～4 句，完整收尾；可含站内路径如 /subscribe、/fun。',
    '4) 若有工具实况：必须据此作答（天气/汇率/诗词/时间），并提示可去对应玩具页细看；不可发明气温或汇率。',
    '5) suggestions：最多 2 条，必须贴合本轮话题（禁止随机栏目）；label≤8字；question 一句短问。',
    '6) actions：订阅类用 subscribe|unsubscribe|subscribe_status；跳转用 navigate 且 path 在允许列表。工具问答请给对应 navigate（/fun /currency /time 等）。',
    '7) 不谈后台、密钥、/admin、未公开漏洞。answer 写完再用短 suggestions，宁缺勿截。',
    '',
    'JSON 形状：',
    '{"answer":"…","suggestions":[{"label":"…","question":"…"}],"actions":[{"type":"…","path":"/仅navigate","label":"…"}]}',
    `- navigate 允许：${pathList}`,
    '',
    '站点先验：',
    context,
    tool?.facts ? `\n工具实况：\n${tool.facts}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: system },
  ]

  for (const m of history.slice(-6)) {
    messages.push({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.text,
    })
  }
  messages.push({ role: 'user', content: question })

  try {
    const res = await fetch(`${base}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: 1600,
        messages,
      }),
      signal: AbortSignal.timeout(25000),
    })

    if (!res.ok) return null
    const data = (await res.json()) as {
      choices?: { message?: { content?: string }; finish_reason?: string }[]
    }
    const content = data.choices?.[0]?.message?.content?.trim()
    if (!content) return null
    return parseOmniContent(content, kb, question, tool)
  } catch {
    return null
  }
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('Origin')
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) })
}

export async function POST(request: Request) {
  const origin = request.headers.get('Origin')
  const headers = corsHeaders(origin)

  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403, headers })
  }

  let body: { question?: string; llm?: boolean; messages?: unknown }
  try {
    body = (await request.json()) as {
      question?: string
      llm?: boolean
      messages?: unknown
    }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400, headers })
  }

  const question = sanitizeQuestion(body.question)
  if (!question) {
    return NextResponse.json({ error: 'Question is required' }, { status: 400, headers })
  }

  if (!takeRateSlot(clientIp(request))) {
    return NextResponse.json(
      { error: 'Too many questions. Try again later.', answer: undefined },
      { status: 429, headers },
    )
  }

  const kb = await loadKb()
  const history = sanitizeMessages(body.messages)
  const hasCjk = /[\u4e00-\u9fff]/.test(question)
  const allow = allowedPaths(kb)
  const tool = await runAskTool(question)

  // 工具有实况时直接答，避免模型改写数字或套官话
  if (tool?.facts) {
    return NextResponse.json(
      {
        answer: tool.answer,
        suggestions: tool.suggestions,
        actions: isSafePath(tool.navigate.path, allow) ? [tool.navigate] : [],
        mode: 'tool',
        tool: tool.id,
      },
      { headers },
    )
  }

  const payload = await callOmni(kb, question, history, tool)
  if (payload) {
    const actions = mergeActions(
      payload.actions,
      tool?.navigate && isSafePath(tool.navigate.path, allow) ? [tool.navigate] : [],
    )
    return NextResponse.json(
      {
        answer: payload.answer,
        suggestions:
          tool?.suggestions && tool.suggestions.length > 0
            ? tool.suggestions
            : payload.suggestions.length > 0
              ? payload.suggestions
              : fallbackSuggestions(kb, question, payload.answer),
        actions,
        mode: 'llm',
        tool: tool?.id,
      },
      { headers },
    )
  }

  if (tool) {
    return NextResponse.json(
      {
        answer: tool.answer,
        suggestions: tool.suggestions,
        actions: isSafePath(tool.navigate.path, allow) ? [tool.navigate] : [],
        mode: 'tool',
        tool: tool.id,
      },
      { headers },
    )
  }

  const intent = inferSubscribeIntent(question)
  const nav = inferNavigate(question, allow)
  const actions: AskAction[] = []
  if (intent) {
    const defaults = {
      subscribe: '订阅更新',
      unsubscribe: '退订',
      subscribe_status: '查询订阅',
    } as const
    actions.push({ type: intent, label: defaults[intent] })
  }
  if (nav) actions.push(nav)

  const noneMsg = intent
    ? hasCjk
      ? '模型这会儿没跟上，但订阅相关可以点下面动作，在面板里输入邮箱确认。'
      : 'The model did not respond, but you can use the action below and confirm your email in the panel.'
    : hasCjk
      ? '这会儿模型没应答上。可以先逛 /gallery、/research 或 /posts，或稍后再问。'
      : 'The model did not respond just now. Try /gallery, /research, or /posts, or ask again shortly.'

  return NextResponse.json(
    {
      answer: noneMsg,
      suggestions: fallbackSuggestions(kb, question, noneMsg),
      actions,
      mode: 'none',
    },
    { headers },
  )
}
