import { NextResponse } from 'next/server'

import { EMAIL_RE, getSubscriberStatus, normalizeEmail } from '@/utilities/subscribe'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const body = (await req.json()) as { email?: string }
  const email = normalizeEmail(body.email)
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, message: '请填写有效邮箱' }, { status: 400 })
  }

  const result = await getSubscriberStatus(email)
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.message },
      { status: result.status },
    )
  }

  return NextResponse.json({
    ok: true,
    subscribed: result.subscribed,
    message: result.message,
  })
}
