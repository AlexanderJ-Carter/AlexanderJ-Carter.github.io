import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type KbPage = { path: string; title: string; note?: string }
type Kb = {
  overview?: string
  pages?: KbPage[]
  notes?: string[]
  /** legacy shape — still accepted if present */
  faq?: { q: string[]; a: string }[]
}

const ALLOWED_ORIGINS = new Set([
  'https://alexander.xin',
  'https://www.alexander.xin',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
])

/** Per-IP sliding window for Omni calls (process-local). */
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
  const file = path.join(process.cwd(), 'public', 'help', 'kb.json')
  const { mtimeMs } = await stat(file)
  if (kbCache && kbCache.mtimeMs === mtimeMs) return kbCache.data
  const raw = await readFile(file, 'utf8')
  const data = JSON.parse(raw) as Kb
  kbCache = { mtimeMs, data }
  return data
}

/** Turn site priors into RAG context for the model — never short-circuit replies. */
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

  return parts.join('\n\n').slice(0, 6000)
}

async function callOmni(kb: Kb, question: string): Promise<string | null> {
  const base = process.env.OMNI_URL?.replace(/\/$/, '')
  const key = process.env.OMNI_KEY
  const model = process.env.OMNI_MODEL
  if (!base || !key || !model) return null

  const context = buildContext(kb)

  const system = [
    '你是 alexander.xin（Alexander Carter 个人站）的前台导览助手「问站」。',
    '下面「站点先验」是检索到的公开资料，当作 RAG 上下文使用：用自然语言回答，可概括、串联栏目，语气克制友好。',
    '规则：',
    '- 以先验为准；先验没有的就直说不知道，并建议 /gallery、/research、/posts 或 /contact，不要编造履历、私信或未公开细节。',
    '- 不谈后台运维、密钥、Cloudflare Access、未披露漏洞。',
    '- 用与访客相同的语言；2～5 句为宜；可穿插站内路径如 /gallery，不要 markdown 标题。',
    '',
    '站点先验：',
    context,
  ].join('\n')

  try {
    const res = await fetch(`${base}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.45,
        max_tokens: 420,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: question },
        ],
      }),
      signal: AbortSignal.timeout(20000),
    })

    if (!res.ok) return null
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[]
    }
    return data.choices?.[0]?.message?.content?.trim() || null
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

  let body: { question?: string; llm?: boolean }
  try {
    body = (await request.json()) as { question?: string; llm?: boolean }
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
  const hasCjk = /[\u4e00-\u9fff]/.test(question)

  const answer = await callOmni(kb, question)
  if (answer) {
    return NextResponse.json({ answer, mode: 'llm' }, { headers })
  }

  const noneMsg = hasCjk
    ? '这会儿模型没应答上。可以先逛 /gallery、/research 或 /posts，或稍后再问。'
    : 'The model did not respond just now. Try /gallery, /research, or /posts, or ask again shortly.'

  return NextResponse.json({ answer: noneMsg, mode: 'none' }, { headers })
}
