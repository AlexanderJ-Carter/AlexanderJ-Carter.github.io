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
