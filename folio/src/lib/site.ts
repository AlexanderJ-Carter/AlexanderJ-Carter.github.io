/**
 * Site runtime flags for Folio.
 *
 * Verify cookie: Astro used sessionStorage `is_verified` (tab-scoped, no cookie).
 * Folio uses HTTP-only-friendly cookie `folio_verify=1` (max-age 7d) so middleware
 * can gate `/about` and `/contact` without client JS.
 */

const truthy = (v: string | undefined) => v === '1' || v === 'true' || v === 'yes'

export const VERIFY_COOKIE = 'folio_verify'
export const VERIFY_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export const isDev = process.env.NODE_ENV === 'development'

/** Skip Turnstile gate. Dev skips unless NEXT_PUBLIC_FORCE_VERIFY=true. */
export const skipVerify =
  truthy(process.env.NEXT_PUBLIC_SKIP_VERIFY) ||
  (isDev && !truthy(process.env.NEXT_PUBLIC_FORCE_VERIFY))

/** Cloudflare Turnstile site key (public). */
export const turnstileSiteKey: string =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
  (isDev
    ? '1x00000000000000000000AA' // Cloudflare always-pass test key
    : '0x4AAAAAABdh_m4Oroh5Egsy')

export const PROTECTED_PATHS = ['/about', '/contact'] as const

export function isProtectedPath(pathname: string): boolean {
  const bare = pathname.replace(/\/$/, '') || '/'
  return PROTECTED_PATHS.some((p) => bare === p || bare.startsWith(`${p}/`))
}

/** 校验验证后回跳地址，拒绝开放重定向与 /verify 自环。 */
export function safeVerifyNextPath(raw: string | null | undefined): string {
  const fallback = '/about'
  if (!raw) return fallback
  const path = raw.trim()
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('\\')) return fallback
  const bare = (path.split('?')[0] || '/').replace(/\/$/, '') || '/'
  if (bare === '/verify') return fallback
  return path
}

const OIDC_NEXT_ALLOW = [
  '/admin',
  '/tools',
  '/agents',
  '/status',
  '/network',
  '/gallery',
  '/posts',
  '/research',
  '/projects',
  '/updates',
  '/fun',
] as const

/** Pocket ID 登录后回跳；仅站内公开面与后台。 */
export function safeOidcNextPath(raw: string | null | undefined): string {
  const fallback = '/admin'
  if (!raw) return fallback
  const path = raw.trim()
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('\\')) return fallback
  if (path.includes('://')) return fallback
  const bare = (path.split('?')[0] || '/').replace(/\/$/, '') || '/'
  if (bare === '/api' || bare.startsWith('/api/')) return fallback
  if (bare === '/verify' || bare.startsWith('/admin/login')) return fallback
  if (OIDC_NEXT_ALLOW.some((p) => bare === p || bare.startsWith(`${p}/`))) return path
  return fallback
}
