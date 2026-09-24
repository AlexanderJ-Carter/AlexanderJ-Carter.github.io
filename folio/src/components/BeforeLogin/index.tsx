import React from 'react'

const BeforeLogin: React.FC = () => {
  const oidcEnabled = Boolean(process.env.NEXT_PUBLIC_OIDC_LOGIN_URL)

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <p style={{ margin: '0 0 0.75rem', lineHeight: 1.5 }}>
        <b>Alexander Carter · Folio</b>
        <br />
        登录后改页面、文章和图片。
      </p>
      {oidcEnabled ? (
        <p style={{ margin: 0 }}>
          <a
            href={process.env.NEXT_PUBLIC_OIDC_LOGIN_URL}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '0.7rem 1rem',
              borderRadius: '3px',
              background: 'var(--theme-elevation-800)',
              color: 'var(--theme-elevation-0)',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            使用 Pocket ID 登录
          </a>
          <span
            style={{
              display: 'block',
              marginTop: '0.85rem',
              fontSize: '0.8rem',
              color: 'var(--theme-elevation-500)',
              textAlign: 'center',
            }}
          >
            或使用下方邮箱密码（本地备用）
          </span>
        </p>
      ) : (
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--theme-elevation-500)' }}>
          Pocket ID 尚未配置时，请用邮箱密码登录。
        </p>
      )}
    </div>
  )
}

export default BeforeLogin
