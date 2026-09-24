'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'

import { cn } from '@/utilities/ui'
import { useSelectedLayoutSegments, useRouter } from 'next/navigation'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import React, { useCallback, useState } from 'react'

import './index.scss'
import { getClientSideURL } from '@/utilities/getURL'

const collectionLabels = {
  pages: { plural: '页面', singular: '页面' },
  posts: { plural: '文章', singular: '文章' },
  projects: { plural: '项目', singular: '项目' },
} as const

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels] ? segments[1] : 'pages'
  ) as keyof typeof collectionLabels
  const router = useRouter()

  const onAuthChange = useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id))
  }, [])

  return (
    <div
      className={cn('admin-dock', {
        'admin-dock--visible': show,
        'admin-dock--hidden': !show,
      })}
      aria-hidden={!show}
    >
      <div className="admin-dock__inner">
        <PayloadAdminBar
          {...adminBarProps}
          unstyled
          className="admin-dock__payload"
          classNames={{
            controls: 'admin-dock__controls',
            create: 'admin-dock__link admin-dock__create',
            edit: 'admin-dock__link admin-dock__edit',
            logo: 'admin-dock__logo',
            logout: 'admin-dock__link admin-dock__logout',
            preview: 'admin-dock__link admin-dock__preview',
            user: 'admin-dock__user',
          }}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || '页面',
            singular: collectionLabels[collection]?.singular || '页面',
          }}
          logo={<span className="admin-dock__brand">管理</span>}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
        />
      </div>
    </div>
  )
}
