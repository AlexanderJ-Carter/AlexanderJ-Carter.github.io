import React from 'react'

const OIDC_ERRORS: Record<string, string> = {
  state: '登录状态已过期或校验失败，请再点一次登录（不要回退浏览器历史）。',
  token: '无法换取登录令牌。若刚登录成功过，可能是授权码已用过，请重新登录。',
  userinfo: '无法读取 Pocket ID 身份信息，请重试。',
  email: 'Pocket ID 未返回有效邮箱。请在 IdP 中为账号绑定邮箱后再试。',
  nouser: '该账号尚未开通后台权限，请联系管理员。',
  forbidden: '该邮箱不在后台白名单中。',
  denied: '已在 Pocket ID 取消授权或 IdP 拒绝登录。',
  error: '登录失败，请重试。若反复出现，请查看服务器 folio 日志中的 [oidc/callback]。',
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
      <p className="folio-login__lead">
        用 Pocket ID 进入后台。改页面、文章与图片，都从这里开始。
      </p>

      {message ? (
        <p className="folio-login__error" role="alert">
          {message}
        </p>
      ) : null}

      <a className="folio-login__cta" href={loginUrl}>
        <span className="folio-login__cta-label">使用 Pocket ID 登录</span>
        <span className="folio-login__cta-arrow" aria-hidden>
          →
        </span>
      </a>

      <div className="folio-login__meta">
        <span className="folio-login__meta-key">跳转</span>
        <span className="folio-login__meta-val">id.alexander.xin</span>
        <span className="folio-login__meta-sep" aria-hidden>
          ·
        </span>
        <span className="folio-login__meta-val">完成后回到本站</span>
      </div>

      <a className="folio-login__home" href="/">
        返回网站
      </a>
    </div>
  )
}

export default BeforeLogin
