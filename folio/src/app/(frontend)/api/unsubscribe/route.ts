import { NextResponse } from 'next/server'

import { isValidEmail, normalizeEmail, removeSubscriber } from '@/utilities/subscribe'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const body = (await req.json()) as { email?: string }
  const email = normalizeEmail(body.email)
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, message: '请填写有效邮箱' }, { status: 400 })
  }

  const result = await removeSubscriber(email)
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.message },
      { status: result.status },
    )
  }

  return NextResponse.json({ ok: true, message: result.message })
}
