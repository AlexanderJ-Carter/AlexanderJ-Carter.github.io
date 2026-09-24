import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
    group: '系统',
  },
  labels: {
    singular: '用户',
    plural: '用户',
  },
  auth: {
    /** OIDC 自签 JWT 也走 session；cookies 按 HTTPS 公网站配置 */
    cookies: {
      sameSite: 'Lax',
      secure: true,
    },
    tokenExpiration: 60 * 60 * 24 * 7,
  },
  hooks: {
    beforeOperation: [
      ({ operation }) => {
        if (operation === 'login') {
          throw new APIError('请使用 Pocket ID 登录', 403)
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: true,
}
