import React from 'react'
import { redirect } from 'next/navigation'

const OIDC_ERRORS: Record<string, string> = {
  state: '登录状态校验失败，请重试。',
  token: '无法换取登录令牌，请重试。',
  userinfo: '无法读取身份信息，请重试。',
  email: 'Pocket ID 未返回邮箱，无法登录。',
  nouser: '该账号尚未开通后台权限，请联系管理员。',
  error: '登录失败，请重试。',
}

type BeforeLoginProps = {
  searchParams?: Record<string, string | string[] | undefined>
}

function firstParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0]
  return value
}

const BeforeLogin: React.FC<BeforeLoginProps> = ({ searchParams }) => {
  const loginUrl = process.env.NEXT_PUBLIC_OIDC_LOGIN_URL || '/api/oidc/login'
  const oidcError = firstParam(searchParams?.oidc)

  if (!oidcError) {
    redirect(loginUrl)
  }

  const message = OIDC_ERRORS[oidcError] || OIDC_ERRORS.error

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <p style={{ margin: '0 0 0.75rem', lineHeight: 1.5 }}>
        <b>Alexander Carter · Folio</b>
        <br />
        后台仅支持 Pocket ID 登录。
      </p>
      <p
        style={{
          margin: '0 0 1rem',
          padding: '0.75rem 1rem',
          borderRadius: '3px',
          background: 'var(--theme-error-100)',
          color: 'var(--theme-error-750)',
          lineHeight: 1.5,
        }}
      >
        {message}
      </p>
      <a
        href={loginUrl}
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
        使用 Pocket ID 重试
      </a>
    </div>
  )
}

export default BeforeLogin
