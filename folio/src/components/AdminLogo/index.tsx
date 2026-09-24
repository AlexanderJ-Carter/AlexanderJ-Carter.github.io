import React from 'react'

/** Payload 登录页大 Logo —— 替换默认 Payload 字标 */
export default function AdminLogo() {
  return (
    <div className="folio-admin-logo" aria-label="Alexander Carter Folio">
      <span className="folio-admin-logo__mark" aria-hidden>
        AC
      </span>
      <span className="folio-admin-logo__name">Alexander Carter</span>
      <span className="folio-admin-logo__sub">Folio · 工作台</span>
    </div>
  )
}
