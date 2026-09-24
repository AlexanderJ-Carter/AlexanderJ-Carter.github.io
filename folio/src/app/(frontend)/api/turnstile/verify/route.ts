import { NextResponse } from 'next/server'

/**
 * Optional server-side Turnstile token check.
 * If TURNSTILE_SECRET_KEY is missing: accept Cloudflare test tokens in non-prod;
 * in production soft-fail (allow) so the gate widget still works with site key only.
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
    // Non-prod: accept without Cloudflare call. Prod: soft-fail so site-key widget still works.
    return NextResponse.json({
      ok: true,
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
  return NextResponse.json({ ok: true })
}
