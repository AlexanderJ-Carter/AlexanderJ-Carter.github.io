'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'

import { cn } from '@/utilities/ui'
import { useSelectedLayoutSegments, useRouter } from 'next/navigation'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import React, { useCallback, useEffect, useState } from 'react'

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

  useEffect(() => {
    const root = document.documentElement
    if (show) {
      root.dataset.adminBar = 'true'
      root.style.setProperty('--admin-bar-h', '2.5rem')
    } else {
      delete root.dataset.adminBar
      root.style.removeProperty('--admin-bar-h')
    }
    return () => {
      delete root.dataset.adminBar
      root.style.removeProperty('--admin-bar-h')
    }
  }, [show])

  return (
    <div
      className={cn('admin-bar', {
        'admin-bar--visible': show,
        'admin-bar--hidden': !show,
      })}
      aria-hidden={!show}
    >
      <div className="admin-bar__inner">
        <PayloadAdminBar
          {...adminBarProps}
          unstyled
          className="admin-bar__payload"
          classNames={{
            controls: 'admin-bar__controls',
            create: 'admin-bar__link admin-bar__create',
            edit: 'admin-bar__link admin-bar__edit',
            logo: 'admin-bar__logo',
            logout: 'admin-bar__link admin-bar__logout',
            preview: 'admin-bar__link admin-bar__preview',
            user: 'admin-bar__user',
          }}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || '页面',
            singular: collectionLabels[collection]?.singular || '页面',
          }}
          logo={<span className="admin-bar__brand">Folio</span>}
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
