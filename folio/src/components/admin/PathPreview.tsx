'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'

type Props = {
  path?: string
  /** pages → /{slug}；posts → /posts/{slug}；home → / */
  kind?: 'pages' | 'posts'
}

export const PathPreview: React.FC<Props> = ({ kind = 'pages' }) => {
  const slug = useFormFields(([fields]) => fields.slug?.value as string | undefined)
  const site = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')

  let path = '/'
  if (kind === 'posts') {
    path = slug ? `/posts/${slug}` : '/posts/…'
  } else if (slug && slug !== 'home') {
    path = `/${slug}`
  }

  const href = `${site}${path}`

  return (
    <div className="folio-path-preview">
      <p className="folio-path-preview__label">前台地址</p>
      <a className="folio-path-preview__link" href={href} target="_blank" rel="noreferrer">
        {href}
      </a>
      <p className="folio-path-preview__hint">
        改「自定义地址」即改 URL。旧路径可在「运营 → 重定向」里做跳转。
      </p>
    </div>
  )
}

export default PathPreview
