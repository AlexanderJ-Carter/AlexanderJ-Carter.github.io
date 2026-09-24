import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getPayload, generatePayloadCookie, getFieldsToSign, jwtSign } from 'payload'
import config from '@payload-config'

type TokenSet = {
  access_token: string
}

type UserInfo = {
  sub: string
  email?: string
  name?: string
  preferred_username?: string
}

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`缺少环境变量 ${name}`)
  return value
}

async function discovery() {
  const issuer = requireEnv('OIDC_ISSUER').replace(/\/$/, '')
  const res = await fetch(`${issuer}/.well-known/openid-configuration`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`OIDC discovery 失败: ${res.status}`)
  return res.json() as Promise<{
    authorization_endpoint: string
    token_endpoint: string
    userinfo_endpoint: string
  }>
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const jar = await cookies()
    const expectedState = jar.get('folio_oidc_state')?.value
    const codeVerifier = jar.get('folio_oidc_verifier')?.value

    if (!code || !state || !expectedState || state !== expectedState || !codeVerifier) {
      return NextResponse.redirect(new URL('/admin/login?oidc=state', request.url))
    }

    const clientId = requireEnv('OIDC_CLIENT_ID')
    const clientSecret = requireEnv('OIDC_CLIENT_SECRET')
    const redirectUri = requireEnv('OIDC_REDIRECT_URI')
    const meta = await discovery()

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
      code_verifier: codeVerifier,
    })

    const tokenRes = await fetch(meta.token_endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    if (!tokenRes.ok) {
      return NextResponse.redirect(new URL('/admin/login?oidc=token', request.url))
    }
    const tokens = (await tokenRes.json()) as TokenSet

    const infoRes = await fetch(meta.userinfo_endpoint, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })
    if (!infoRes.ok) {
      return NextResponse.redirect(new URL('/admin/login?oidc=userinfo', request.url))
    }
    const info = (await infoRes.json()) as UserInfo
    const email = (info.email || info.preferred_username || '').trim().toLowerCase()
    if (!email) {
      return NextResponse.redirect(new URL('/admin/login?oidc=email', request.url))
    }

    const payload = await getPayload({ config })
    const found = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    })

    let user = found.docs[0]
    if (!user) {
      if (process.env.OIDC_CREATE_USER !== 'true') {
        return NextResponse.redirect(new URL('/admin/login?oidc=nouser', request.url))
      }
      const password = `oidc-${crypto.randomUUID()}-${crypto.randomUUID()}`
      user = await payload.create({
        collection: 'users',
        data: {
          email,
          name: info.name || info.preferred_username || email.split('@')[0],
          password,
        },
        overrideAccess: true,
      })
    }

    const collectionConfig = payload.collections.users.config
    const fieldsToSign = getFieldsToSign({
      collectionConfig,
      email: user.email,
      user: user as never,
    })

    const tokenExpiration = collectionConfig.auth?.tokenExpiration || 7200
    const { token } = await jwtSign({
      fieldsToSign,
      secret: payload.secret,
      tokenExpiration,
    })

    const cookie = generatePayloadCookie({
      collectionAuthConfig: collectionConfig.auth,
      cookiePrefix: payload.config.cookiePrefix || 'payload',
      token,
      returnCookieAsObject: true,
    })

    const response = NextResponse.redirect(new URL('/admin', request.url))
    if (cookie?.name && cookie.value) {
      response.cookies.set(cookie.name, cookie.value, {
        httpOnly: cookie.httpOnly ?? true,
        path: cookie.path || '/',
        sameSite: (cookie.sameSite?.toLowerCase() as 'lax' | 'strict' | 'none') || 'lax',
        secure: Boolean(cookie.secure),
        expires: cookie.expires ? new Date(cookie.expires) : undefined,
      })
    }
    response.cookies.set('folio_oidc_state', '', { path: '/', maxAge: 0 })
    response.cookies.set('folio_oidc_verifier', '', { path: '/', maxAge: 0 })
    return response
  } catch {
    return NextResponse.redirect(new URL('/admin/login?oidc=error', request.url))
  }
}
