/** 访客 Cookie / 本地偏好同意（前台） */

export const CONSENT_STORAGE_KEY = 'folio_consent'
export const CONSENT_VERSION = 1 as const

export type FolioConsent = {
  version: typeof CONSENT_VERSION
  /** 必要：主题偏好、门禁 Cookie 等站点运行所需 */
  necessary: true
  /** 可选：本站浏览量、隐私友好统计信标 */
  analytics: boolean
  updatedAt: string
}

export function readConsent(): FolioConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<FolioConsent>
    if (parsed.version !== CONSENT_VERSION || typeof parsed.analytics !== 'boolean') return null
    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: parsed.analytics,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function writeConsent(analytics: boolean): FolioConsent {
  const next: FolioConsent = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  }
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent('folio:consent', { detail: next }))
  return next
}

export function analyticsAllowed(): boolean {
  return readConsent()?.analytics === true
}
