import React from 'react'

/** Payload 登录页大 Logo —— 品牌作为首屏主信号 */
export default function AdminLogo() {
  return (
    <div className="folio-admin-logo" aria-label="Alexander Carter Folio">
      <span className="folio-admin-logo__mark" aria-hidden>
        <span className="folio-admin-logo__aperture" />
        <span className="folio-admin-logo__letters">AC</span>
      </span>
      <span className="folio-admin-logo__name">Alexander Carter</span>
      <span className="folio-admin-logo__sub">Folio · 工作台</span>
    </div>
  )
}
