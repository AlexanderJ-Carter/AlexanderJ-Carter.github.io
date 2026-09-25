/**
 * 打印群发邮件 HTML/文本，便于粘贴到 Resend Broadcast。
 * 用法：node --import tsx scripts/print-broadcast-email.mjs
 */
import { getInstance } from '../src/instance/index.ts'
import { exampleMoveBroadcast } from '../src/emails/templates.ts'

const instance = getInstance()
const siteUrl = instance.siteUrl.replace(/\/$/, '')
const unsubUrl = `${siteUrl}/unsubscribe`

const mail = exampleMoveBroadcast({
  siteName: instance.siteName,
  siteUrl,
  unsubUrl,
})

process.stdout.write(`SUBJECT:\n${mail.subject}\n\n`)
process.stdout.write(`TEXT:\n${mail.text}\n\n`)
process.stdout.write(`HTML:\n${mail.html}\n`)
