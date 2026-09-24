import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json({ ok: false, message: '邮件服务未配置' }, { status: 503 })
  }

  const body = (await req.json()) as { email?: string }
  const email = body.email?.trim().toLowerCase()
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, message: '请填写有效邮箱' }, { status: 400 })
  }

  const segmentId = process.env.RESEND_SEGMENT_ID?.trim()
  const resend = new Resend(apiKey)
  const { data, error } = await resend.contacts.create({
    email,
    unsubscribed: false,
    ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
  })

  if (error) {
    const msg = error.message || '订阅失败'
    if (/already|exists|duplicate/i.test(msg)) {
      return NextResponse.json({ ok: true, message: '你已在名单中' })
    }
    return NextResponse.json({ ok: false, message: msg }, { status: 502 })
  }

  return NextResponse.json({
    ok: true,
    message: '已加入名单，谢谢',
    id: data?.id,
  })
}
