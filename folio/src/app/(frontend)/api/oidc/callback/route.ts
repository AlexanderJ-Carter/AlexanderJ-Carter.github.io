import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  createLocalReq,
  generatePayloadCookie,
  getFieldsToSign,
  getPayload,
  jwtSign,
} from 'payload'
import { addSessionToUser } from 'payload/shared'
import config from '@payload-config'
import { publicOriginFromInstance } from '@/instance'

type TokenSet = {
  access_token?: string
  id_token?: string
  error?: string
  error_description?: string
}

type UserInfo = {
  sub: string
  email?: string
  email_verified?: boolean | string
  name?: string
  preferred_username?: string
}

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`缺少环境变量 ${name}`)
  return value
}

/** 公网站点根，禁止用 request.url（容器里会变成 http://0.0.0.0:3000） */
function publicOrigin(): string {
  return publicOriginFromInstance()
}

function siteRedirect(path: string) {
  return NextResponse.redirect(new URL(path, `${publicOrigin()}/`))
}

function logOidc(phase: string, detail?: unknown) {
  const msg = detail instanceof Error ? detail.message : detail
  console.error(`[oidc/callback] ${phase}`, msg ?? '')
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

function emailFromIdToken(idToken: string | undefined): string | null {
  if (!idToken) return null
  const parts = idToken.split('.')
  if (parts.length < 2) return null
  try {
    const json = Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString(
      'utf8',
    )
    const payload = JSON.parse(json) as { email?: string }
    const email = payload.email?.trim().toLowerCase()
    return email?.includes('@') ? email : null
  } catch {
    return null
  }
}

function resolveEmail(info: UserInfo, idToken?: string): string | null {
  const fromToken = emailFromIdToken(idToken)
  const candidates = [info.email, fromToken, info.preferred_username]
    .filter((v): v is string => Boolean(v && v.trim()))
    .map((v) => v.trim().toLowerCase())
  return candidates.find((c) => c.includes('@')) || null
}

function allowedEmails(): Set<string> | null {
  const raw = process.env.OIDC_ALLOWED_EMAILS?.trim()
  if (!raw) return null
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  )
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const oauthError = url.searchParams.get('error')
    if (oauthError) {
      logOidc('provider_denied', `${oauthError} ${url.searchParams.get('error_description') || ''}`)
      return siteRedirect('/admin/login?oidc=denied')
    }

    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const jar = await cookies()
    const expectedState = jar.get('folio_oidc_state')?.value
    const codeVerifier = jar.get('folio_oidc_verifier')?.value

    if (!code || !state || !expectedState || state !== expectedState || !codeVerifier) {
      logOidc('state', {
        hasCode: Boolean(code),
        hasState: Boolean(state),
        hasCookieState: Boolean(expectedState),
        hasVerifier: Boolean(codeVerifier),
        stateMatch: Boolean(state && expectedState && state === expectedState),
      })
      return siteRedirect('/admin/login?oidc=state')
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
    const tokens = (await tokenRes.json().catch(() => null)) as TokenSet | null
    if (!tokenRes.ok || !tokens?.access_token) {
      logOidc('token', tokens?.error_description || tokens?.error || tokenRes.status)
      return siteRedirect('/admin/login?oidc=token')
    }

    const infoRes = await fetch(meta.userinfo_endpoint, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })
    if (!infoRes.ok) {
      logOidc('userinfo', infoRes.status)
      return siteRedirect('/admin/login?oidc=userinfo')
    }
    const info = (await infoRes.json()) as UserInfo
    const email = resolveEmail(info, tokens.id_token)
    if (!email) {
      logOidc('email', { sub: info.sub, preferred_username: info.preferred_username })
      return siteRedirect('/admin/login?oidc=email')
    }

    const allow = allowedEmails()
    if (allow && !allow.has(email)) {
      logOidc('forbidden', email)
      return siteRedirect('/admin/login?oidc=forbidden')
    }

    const payload = await getPayload({ config })
    const req = await createLocalReq({}, payload)
    const found = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
      req,
    })

    let user = found.docs[0]
    if (!user) {
      if (process.env.OIDC_CREATE_USER !== 'true') {
        return siteRedirect('/admin/login?oidc=nouser')
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
        req,
      })
    }

    const collectionConfig = payload.collections.users.config
    const { sid } = await addSessionToUser({
      collectionConfig,
      payload,
      req,
      user: user as never,
    })

    const fieldsToSign = getFieldsToSign({
      collectionConfig,
      email: user.email,
      sid,
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

    const response = siteRedirect('/admin')
    const secure = publicOrigin().startsWith('https://')
    if (cookie?.name && cookie.value) {
      response.cookies.set(cookie.name, cookie.value, {
        httpOnly: cookie.httpOnly ?? true,
        path: cookie.path || '/',
        sameSite: (cookie.sameSite?.toLowerCase() as 'lax' | 'strict' | 'none') || 'lax',
        secure: secure || Boolean(cookie.secure),
        maxAge: tokenExpiration,
        expires: cookie.expires
          ? new Date(cookie.expires)
          : new Date(Date.now() + tokenExpiration * 1000),
      })
    }
    response.cookies.set('folio_oidc_state', '', { path: '/', maxAge: 0, secure })
    response.cookies.set('folio_oidc_verifier', '', { path: '/', maxAge: 0, secure })
    return response
  } catch (err) {
    logOidc('exception', err)
    return siteRedirect('/admin/login?oidc=error')
  }
}
