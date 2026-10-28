import { NextResponse } from 'next/server'

import { isOmniConfigured, omniChat } from '@/utilities/omniChat'
import { getRequestUser } from '@/utilities/requestUser'

export const runtime = 'nodejs'

const RATE_ANON = 10
const RATE_AUTH = 60
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const rateBuckets = new Map<string, number[]>()

type Lang = 'zh' | 'en' | 'both'

function clientIp(request: Request): string {
  const cf = request.headers.get('cf-connecting-ip')?.trim()
  if (cf) return cf
  const xff = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (xff) return xff
  return 'unknown'
}

function takeRateSlot(key: string, max: number): boolean {
  const now = Date.now()
  const prev = rateBuckets.get(key) || []
  const recent = prev.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= max) {
    rateBuckets.set(key, recent)
    return false
  }
  recent.push(now)
  rateBuckets.set(key, recent)
  return true
}

function sanitizeScene(raw: unknown): string {
  if (typeof raw !== 'string') return ''
  return raw.replace(/\s+/g, ' ').trim().slice(0, 600)
}

function sanitizeLang(raw: unknown): Lang {
  if (raw === 'en' || raw === 'both') return raw
  return 'zh'
}

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim()
  if (!secret) return true
  if (!token?.trim()) return false
  const form = new FormData()
  form.set('secret', secret)
  form.set('response', token.trim())
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  })
  const data = (await res.json()) as { success?: boolean }
  return Boolean(data.success)
}

const FALLBACK_ANSWER = [
  '（助手暂时离线，以下为通用暗房备忘）',
  '1. 先定意图：剪影压曝光、层次留高光、人像优先脸部测光。',
  '2. 参数互易：光圈换景深，快门换动静，ISO 换噪点预算。',
  '3. 写出说明时只写可见事实（光向、焦距、氛围），避免堆砌形容词。',
].join('\n')

export async function POST(request: Request) {
  let body: { scene?: unknown; lang?: unknown; turnstileToken?: unknown }
  try {
    body = (await request.json()) as typeof body
  } catch {
    return NextResponse.json({ ok: false, error: '无效请求' }, { status: 400 })
  }

  const scene = sanitizeScene(body.scene)
  if (!scene) {
    return NextResponse.json({ ok: false, error: '请填写场景或参数' }, { status: 400 })
  }

  const user = await getRequestUser(request)
  const rateKey = user ? `user:${user.email}` : `ip:${clientIp(request)}`
  const rateMax = user ? RATE_AUTH : RATE_ANON
  if (!takeRateSlot(rateKey, rateMax)) {
    return NextResponse.json(
      { ok: false, error: '本小时次数已用完，稍后再试。' },
      { status: 429 },
    )
  }

  if (!user) {
    const tokenOk = await verifyTurnstile(
      typeof body.turnstileToken === 'string' ? body.turnstileToken : undefined,
    )
    if (!tokenOk) {
      return NextResponse.json({ ok: false, error: '人机验证失败，请重试。' }, { status: 403 })
    }
  }

  if (!isOmniConfigured()) {
    return NextResponse.json({
      ok: true,
      answer: FALLBACK_ANSWER,
      mode: 'fallback',
      auth: Boolean(user),
    })
  }

  const lang = sanitizeLang(body.lang)
  const langHint =
    lang === 'en'
      ? 'Write the entire answer in English.'
      : lang === 'both'
        ? 'Write bilingual: Chinese first, then a short English paragraph.'
        : '用简体中文回答。'

  const system = [
    '你是 alexander.xin 暗房助手。只谈摄影曝光、用光与短作品说明。',
    '禁止：通用闲聊、编程、政治、密钥、后台、编造具体机身/镜头型号除非用户已写。',
    '输出纯文本，不要 JSON、不要 markdown 围栏。',
    '结构固定：',
    '【曝光建议】2～4 条短句（可含相对 EV、光圈/快门/ISO 取舍）。',
    '【作品说明】一段可复制的说明，≤120 中文字或 ≤80 English words。',
    langHint,
  ].join('\n')

  const out = await omniChat({
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: scene },
    ],
    temperature: 0.4,
    maxTokens: 700,
    timeoutMs: 20000,
  })

  if (!out) {
    return NextResponse.json({
      ok: true,
      answer: FALLBACK_ANSWER,
      mode: 'fallback',
      auth: Boolean(user),
    })
  }

  return NextResponse.json({
    ok: true,
    answer: out.content.slice(0, 2000),
    mode: 'omni',
    auth: Boolean(user),
  })
}
