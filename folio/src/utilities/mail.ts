import { getInstance } from '@/instance'

/** Resend 发信：须与已验证域名一致。 */
export function emailFromAddress(): string {
  const fromEnv = process.env.EMAIL_FROM_ADDRESS?.trim()
  if (fromEnv) return fromEnv

  const raw = getInstance().siteUrl.replace(/\/$/, '')
  if (!raw || /example\.com|localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(raw)) {
    return 'noreply@example.com'
  }
  const host = raw.replace(/^https?:\/\//, '').split('/')[0]?.replace(/^www\./, '')
  return host ? `noreply@${host}` : 'noreply@example.com'
}

export function emailFromName(): string {
  return process.env.EMAIL_FROM_NAME?.trim() || getInstance().siteName || 'Folio'
}

/** 联系表单通知收件人。 */
export function contactNotifyAddress(): string {
  const fromEnv = process.env.CONTACT_NOTIFY_EMAIL?.trim()
  if (fromEnv) return fromEnv
  const instance = getInstance()
  return instance.contact?.email || instance.security.contactEmail
}

export function emailFromHeader(): string {
  return `"${emailFromName()}" <${emailFromAddress()}>`
}
