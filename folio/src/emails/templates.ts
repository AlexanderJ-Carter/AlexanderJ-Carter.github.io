/** 轻量邮件文案（无 React Email 依赖）。可粘贴到 Resend Broadcast。 */

export type MailParts = {
  subject: string
  text: string
  html: string
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function wrapHtml(title: string, bodyHtml: string, siteName: string, siteUrl: string) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:#f4f2ec;color:#1a1a1a;font-family:Georgia,'Noto Serif SC',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f2ec;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#fbfaf7;border:1px solid #e5e1d8;border-radius:8px;padding:28px 28px 24px;">
        <tr><td style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#6b6560;font-family:ui-monospace,monospace;">${escapeHtml(siteName)}</td></tr>
        <tr><td style="padding-top:16px;font-size:22px;font-weight:600;letter-spacing:-0.02em;">${escapeHtml(title)}</td></tr>
        <tr><td style="padding-top:14px;font-size:15px;line-height:1.65;color:#3d3a36;">${bodyHtml}</td></tr>
        <tr><td style="padding-top:28px;font-size:12px;line-height:1.5;color:#8a847c;">
          <a href="${escapeHtml(siteUrl)}" style="color:#8a847c;">${escapeHtml(siteUrl.replace(/^https?:\/\//, ''))}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function subscribeAckMail(opts: {
  siteName: string
  siteUrl: string
  unsubUrl: string
}): MailParts {
  const { siteName, siteUrl, unsubUrl } = opts
  const subject = `已记下你的邮箱 · ${siteName}`
  const text = [
    '你好，',
    '',
    '已把你的邮箱加入本站通讯名单。有站务或写作更新时会写信，频率很低。',
    '',
    `更新日志：${siteUrl}/updates`,
    `若不想再收到：${unsubUrl}`,
    '',
    `— ${siteName}`,
    siteUrl,
  ].join('\n')

  const bodyHtml = `
    <p style="margin:0 0 12px;">你好，</p>
    <p style="margin:0 0 12px;">已把你的邮箱加入本站通讯名单。有站务或写作更新时会写信，频率很低。</p>
    <p style="margin:0 0 12px;"><a href="${escapeHtml(`${siteUrl}/updates`)}" style="color:#2a5f6a;">查看更新日志 →</a></p>
    <p style="margin:0;font-size:13px;color:#8a847c;">不想再收到？<a href="${escapeHtml(unsubUrl)}" style="color:#8a847c;">退订</a></p>
  `

  return { subject, text, html: wrapHtml('订阅确认', bodyHtml, siteName, siteUrl) }
}

/** 群发「站点更新」模板——在 Resend Broadcast 粘贴 html/text。 */
export function siteUpdateMail(opts: {
  siteName: string
  siteUrl: string
  unsubUrl: string
  headline: string
  paragraphs: string[]
  ctaLabel?: string
  ctaUrl?: string
}): MailParts {
  const {
    siteName,
    siteUrl,
    unsubUrl,
    headline,
    paragraphs,
    ctaLabel = '打开站点 →',
    ctaUrl = siteUrl,
  } = opts

  const subject = `${headline} · ${siteName}`
  const text = [
    headline,
    '',
    ...paragraphs,
    '',
    ctaUrl,
    '',
    `更新日志：${siteUrl}/updates`,
    `退订：${unsubUrl}`,
    '',
    `— ${siteName}`,
  ].join('\n')

  const paras = paragraphs
    .map((p) => `<p style="margin:0 0 12px;">${escapeHtml(p)}</p>`)
    .join('')
  const bodyHtml = `
    ${paras}
    <p style="margin:16px 0 12px;"><a href="${escapeHtml(ctaUrl)}" style="display:inline-block;padding:10px 16px;background:#2a5f6a;color:#fbfaf7;text-decoration:none;border-radius:4px;font-size:14px;">${escapeHtml(ctaLabel)}</a></p>
    <p style="margin:0;font-size:13px;color:#8a847c;"><a href="${escapeHtml(`${siteUrl}/updates`)}" style="color:#8a847c;">更新日志</a> · <a href="${escapeHtml(unsubUrl)}" style="color:#8a847c;">退订</a></p>
  `

  return { subject, text, html: wrapHtml(headline, bodyHtml, siteName, siteUrl) }
}

/** 示例：迁站通知文案（可直接用于第一次群发） */
export function exampleMoveBroadcast(opts: {
  siteName: string
  siteUrl: string
  unsubUrl: string
}): MailParts {
  return siteUpdateMail({
    ...opts,
    headline: '站搬过来了',
    paragraphs: [
      `新址在 ${opts.siteUrl.replace(/^https?:\/\//, '')}。`,
      '站内有影像、研究、精选写作与小工具；通讯很少发，不是促销名单。',
    ],
    ctaLabel: '打开主站 →',
    ctaUrl: opts.siteUrl,
  })
}
