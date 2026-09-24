import React from 'react'

/** Payload 侧栏小图标 —— 替换默认 Payload 六边形 */
export default function AdminIcon() {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1.25rem',
        height: '1.25rem',
        borderRadius: '0.15rem',
        border: '1.5px solid currentColor',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: '0.55rem',
        fontWeight: 700,
        letterSpacing: '0.04em',
      }}
    >
      AC
    </span>
  )
}
