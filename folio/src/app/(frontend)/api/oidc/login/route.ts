import { NextResponse } from 'next/server'
import { getServerSideURL } from '@/utilities/getURL'

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`缺少环境变量 ${name}`)
  return value
}

function publicOrigin(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_SERVER_URL || getServerSideURL() || '').replace(
    /\/$/,
    '',
  )
  if (fromEnv && !/0\.0\.0\.0|127\.0\.0\.1|localhost/i.test(fromEnv)) {
    return fromEnv
  }
  return 'https://www.alexander.xin'
}

function b64url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf)
  let str = ''
  for (const b of bytes) str += String.fromCharCode(b)
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function pkce() {
  const verifier = b64url(crypto.getRandomValues(new Uint8Array(32)))
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))
  return { verifier, challenge: b64url(digest) }
}

function cookieSecure(request: Request) {
  const proto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim()
  if (proto) return proto === 'https'
  if (publicOrigin().startsWith('https://')) return true
  return process.env.NODE_ENV === 'production'
}

export async function GET(request: Request) {
  try {
    const issuer = requireEnv('OIDC_ISSUER').replace(/\/$/, '')
    const clientId = requireEnv('OIDC_CLIENT_ID')
    const redirectUri = requireEnv('OIDC_REDIRECT_URI')

    const discoveryRes = await fetch(`${issuer}/.well-known/openid-configuration`, {
      next: { revalidate: 3600 },
    })
    if (!discoveryRes.ok) {
      console.error('[oidc/login] discovery', discoveryRes.status)
      return NextResponse.redirect(`${publicOrigin()}/admin/login?oidc=error`)
    }
    const meta = (await discoveryRes.json()) as { authorization_endpoint: string }

    const state = b64url(crypto.getRandomValues(new Uint8Array(16)))
    const { verifier, challenge } = await pkce()
    const secure = cookieSecure(request)

    const auth = new URL(meta.authorization_endpoint)
    auth.searchParams.set('client_id', clientId)
    auth.searchParams.set('redirect_uri', redirectUri)
    auth.searchParams.set('response_type', 'code')
    auth.searchParams.set('scope', 'openid profile email')
    auth.searchParams.set('state', state)
    auth.searchParams.set('code_challenge', challenge)
    auth.searchParams.set('code_challenge_method', 'S256')

    const response = NextResponse.redirect(auth.toString())
    response.cookies.set('folio_oidc_state', state, {
      httpOnly: true,
      sameSite: 'lax',
      secure,
      path: '/',
      maxAge: 600,
    })
    response.cookies.set('folio_oidc_verifier', verifier, {
      httpOnly: true,
      sameSite: 'lax',
      secure,
      path: '/',
      maxAge: 600,
    })
    response.headers.set('Cache-Control', 'private, no-store')
    return response
  } catch (err) {
    console.error('[oidc/login]', err instanceof Error ? err.message : err)
    return NextResponse.redirect(`${publicOrigin()}/admin/login?oidc=error`)
  }
}
