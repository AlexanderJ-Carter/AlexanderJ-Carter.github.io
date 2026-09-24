import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`缺少环境变量 ${name}`)
  return value
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

export async function GET() {
  const issuer = requireEnv('OIDC_ISSUER').replace(/\/$/, '')
  const clientId = requireEnv('OIDC_CLIENT_ID')
  const redirectUri = requireEnv('OIDC_REDIRECT_URI')

  const discoveryRes = await fetch(`${issuer}/.well-known/openid-configuration`, {
    next: { revalidate: 3600 },
  })
  if (!discoveryRes.ok) {
    return NextResponse.json({ error: 'oidc_discovery_failed' }, { status: 502 })
  }
  const meta = (await discoveryRes.json()) as { authorization_endpoint: string }

  const state = b64url(crypto.getRandomValues(new Uint8Array(16)))
  const { verifier, challenge } = await pkce()

  const jar = await cookies()
  jar.set('folio_oidc_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 600,
  })
  jar.set('folio_oidc_verifier', verifier, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 600,
  })

  const auth = new URL(meta.authorization_endpoint)
  auth.searchParams.set('client_id', clientId)
  auth.searchParams.set('redirect_uri', redirectUri)
  auth.searchParams.set('response_type', 'code')
  auth.searchParams.set('scope', 'openid profile email')
  auth.searchParams.set('state', state)
  auth.searchParams.set('code_challenge', challenge)
  auth.searchParams.set('code_challenge_method', 'S256')

  return NextResponse.redirect(auth.toString())
}
