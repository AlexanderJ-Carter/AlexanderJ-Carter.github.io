import React from 'react'

/** Payload 登录页大 Logo —— 替换默认 Payload 字标 */
export default function AdminLogo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display), Syne, system-ui, sans-serif',
          fontSize: '1.65rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--theme-text)',
        }}
      >
        Alexander Carter
      </span>
      <span
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--theme-elevation-500)',
        }}
      >
        Folio · 工作台
      </span>
    </div>
  )
}
