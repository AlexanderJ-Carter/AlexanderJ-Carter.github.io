import React from 'react'

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
  const message = oidcError ? OIDC_ERRORS[oidcError] || OIDC_ERRORS.error : null

  return (
    <div className="folio-login">
      <p className="folio-login__eyebrow">Folio Admin</p>
      <h1 className="folio-login__title">进入工作台</h1>
      <p className="folio-login__lead">
        用 Pocket ID 继续。这是后台唯一登录方式，不再使用邮箱密码。
      </p>

      {message ? (
        <p className="folio-login__error" role="alert">
          {message}
        </p>
      ) : null}

      <a className="folio-login__cta" href={loginUrl}>
        使用 Pocket ID 登录
      </a>

      <p className="folio-login__hint">
        将跳转到 <span>id.alexander.xin</span>，完成后回到本站后台。
      </p>

      <a className="folio-login__home" href="/">
        ← 返回网站
      </a>
    </div>
  )
}

export default BeforeLogin
