import React from 'react'

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Folio'
const siteMark = process.env.NEXT_PUBLIC_SITE_MARK || 'FO'

/** Payload 登录页大 Logo —— 品牌作为首屏主信号 */
export default function AdminLogo() {
  return (
    <div className="folio-admin-logo" aria-label={`${siteName} Folio`}>
      <span className="folio-admin-logo__mark" aria-hidden>
        <span className="folio-admin-logo__aperture" />
        <span className="folio-admin-logo__letters">{siteMark}</span>
      </span>
      <span className="folio-admin-logo__name">{siteName}</span>
      <span className="folio-admin-logo__sub">Folio · 工作台</span>
    </div>
  )
}
