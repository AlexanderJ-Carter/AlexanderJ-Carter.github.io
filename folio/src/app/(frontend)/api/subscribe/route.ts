import { NextResponse } from 'next/server'

import {
  addSubscriber,
  isValidEmail,
  normalizeEmail,
  sendSubscribeAck,
} from '@/utilities/subscribe'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const body = (await req.json()) as { email?: string }
  const email = normalizeEmail(body.email)
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, message: '请填写有效邮箱' }, { status: 400 })
  }

  const result = await addSubscriber(email)
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.message },
      { status: result.status },
    )
  }

  void sendSubscribeAck(email)

  return NextResponse.json({
    ok: true,
    message: result.created
      ? '已记下。邮箱里会有一封短确认，可随时退订。'
      : '你已在名单中，订阅已重新打开。',
    id: 'id' in result ? result.id : undefined,
  })
}
