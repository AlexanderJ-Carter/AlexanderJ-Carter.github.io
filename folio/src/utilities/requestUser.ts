import { getPayload } from 'payload'

import config from '@payload-config'

/** 当前请求是否已有 Payload 会话（Pocket ID OIDC 登录后）。 */
export async function getRequestUser(request: Request) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user || typeof user !== 'object') return null
  if (!('email' in user) || typeof user.email !== 'string') return null
  return { id: String(user.id), email: user.email }
}
