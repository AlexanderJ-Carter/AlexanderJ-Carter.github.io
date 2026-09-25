import { Resend } from 'resend'

import { subscribeAckMail } from '@/emails/templates'
import { getInstance } from '@/instance'
import { getServerSideURL } from '@/utilities/getURL'
import { emailFromHeader } from '@/utilities/mail'

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) return null
  return new Resend(apiKey)
}

export function getAudienceSegmentId() {
  return process.env.RESEND_SEGMENT_ID?.trim() || ''
}

export function normalizeEmail(raw: string | undefined | null) {
  return raw?.trim().toLowerCase() || ''
}

/** 加入通讯名单；已存在则重新打开订阅。 */
export async function addSubscriber(email: string) {
  const resend = getResendClient()
  if (!resend) {
    return { ok: false as const, status: 503, message: '邮件服务未配置' }
  }

  const segmentId = getAudienceSegmentId()
  const { data, error } = await resend.contacts.create({
    email,
    unsubscribed: false,
    ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
  })

  if (!error) {
    return { ok: true as const, id: data?.id, created: true as const }
  }

  const msg = error.message || '订阅失败'
  if (!/already|exists|duplicate/i.test(msg)) {
    return { ok: false as const, status: 502, message: msg }
  }

  const { error: updateError } = await resend.contacts.update({
    email,
    unsubscribed: false,
  })

  if (updateError) {
    return {
      ok: false as const,
      status: 502,
      message: updateError.message || '无法恢复订阅',
    }
  }

  return { ok: true as const, created: false as const }
}

export async function getSubscriberStatus(email: string) {
  const resend = getResendClient()
  if (!resend) {
    return { ok: false as const, status: 503, message: '邮件服务未配置' }
  }

  const { data, error } = await resend.contacts.get({ email })
  if (error) {
    const msg = error.message || '查询失败'
    if (/not found|does not exist/i.test(msg)) {
      return { ok: true as const, subscribed: false as const, message: '名单里还没有这个邮箱' }
    }
    return { ok: false as const, status: 502, message: msg }
  }

  const unsubscribed = Boolean(data?.unsubscribed)
  return {
    ok: true as const,
    subscribed: !unsubscribed,
    message: unsubscribed ? '该邮箱已退订，不会再收到通讯' : '该邮箱在订阅名单中',
  }
}

/** 标记退订；不从名单删除。 */
export async function removeSubscriber(email: string) {
  const resend = getResendClient()
  if (!resend) {
    return { ok: false as const, status: 503, message: '邮件服务未配置' }
  }

  const { error } = await resend.contacts.update({
    email,
    unsubscribed: true,
  })

  if (error) {
    const msg = error.message || '退订失败'
    if (/not found|does not exist/i.test(msg)) {
      return { ok: true as const, message: '名单里本来就没有这个邮箱' }
    }
    return { ok: false as const, status: 502, message: msg }
  }

  return { ok: true as const, message: '已退订，不会再收到通讯' }
}

/** 订阅成功后发一封短确认（含退订链接）。失败不阻断订阅。 */
export async function sendSubscribeAck(email: string) {
  const resend = getResendClient()
  if (!resend) return

  const site = getServerSideURL().replace(/\/$/, '')
  const unsub = `${site}/unsubscribe?email=${encodeURIComponent(email)}`
  const mail = subscribeAckMail({
    siteName: getInstance().siteName,
    siteUrl: site,
    unsubUrl: unsub,
  })

  await resend.emails
    .send({
      from: emailFromHeader(),
      to: email,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      headers: {
        'List-Unsubscribe': `<${unsub}>`,
      },
    })
    .catch(() => null)
}
