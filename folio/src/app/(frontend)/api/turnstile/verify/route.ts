import { NextResponse } from 'next/server'

import { VERIFY_COOKIE, VERIFY_COOKIE_MAX_AGE } from '@/lib/site'

function cookieSecure(request: Request) {
  const proto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim()
  if (proto) return proto === 'https'
  return new URL(request.url).protocol === 'https:'
}

function verifiedResponse(request: Request, extra: Record<string, unknown> = {}) {
  const res = NextResponse.json({ ok: true, ...extra })
  res.cookies.set(VERIFY_COOKIE, '1', {
    path: '/',
    maxAge: VERIFY_COOKIE_MAX_AGE,
    sameSite: 'lax',
    secure: cookieSecure(request),
    httpOnly: true,
  })
  res.headers.set('Cache-Control', 'private, no-store')
  return res
}

/**
 * Optional server-side Turnstile token check.
 * Always sets folio_verify on success (incl. soft-accept) so middleware can gate.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { token?: string } | null
  const token = body?.token?.trim()
  if (!token) {
    return NextResponse.json({ ok: false, error: 'missing_token' }, { status: 400 })
  }

  const secret = process.env.TURNSTILE_SECRET_KEY?.trim()
  const isProd = process.env.NODE_ENV === 'production'

  if (!secret) {
    return verifiedResponse(request, {
      soft: true,
      reason: isProd ? 'no_secret_prod' : 'no_secret',
    })
  }

  const form = new FormData()
  form.set('secret', secret)
  form.set('response', token)

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  })
  const data = (await res.json()) as { success?: boolean }
  if (!data.success) {
    return NextResponse.json({ ok: false, error: 'turnstile_failed' }, { status: 403 })
  }
  return verifiedResponse(request)
}
