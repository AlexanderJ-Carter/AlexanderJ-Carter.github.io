'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export type AnnouncementData = {
  enabled?: boolean | null
  noticeId?: string | null
  title?: string | null
  body?: string | null
  href?: string | null
  ctaLabel?: string | null
  dismissible?: boolean | null
}

function storageKey(id: string) {
  return `site-notice-dismissed:${id}`
}

export function SiteAnnouncement({ data }: { data: AnnouncementData | null | undefined }) {
  const [visible, setVisible] = useState(false)

  const enabled = Boolean(data?.enabled && data?.noticeId && data?.title && data?.body)
  const id = data?.noticeId || ''
  const dismissible = data?.dismissible !== false
  const href = data?.href?.trim() || ''
  const cta = data?.ctaLabel?.trim() || '了解更多'

  useEffect(() => {
    if (!enabled || !id) {
      setVisible(false)
      return
    }
    try {
      if (dismissible && window.localStorage.getItem(storageKey(id)) === '1') {
        setVisible(false)
        return
      }
    } catch {
      // ignore
    }
    setVisible(true)
  }, [enabled, id, dismissible])

  if (!enabled || !visible || !data) return null

  const dismiss = () => {
    if (dismissible && id) {
      try {
        window.localStorage.setItem(storageKey(id), '1')
      } catch {
        // ignore
      }
    }
    setVisible(false)
  }

  const isInternal = href.startsWith('/') && !href.startsWith('//')

  return (
    <div
      className="site-announcement border-b border-border bg-muted/40 text-foreground"
      role="region"
      aria-label="站点公告"
    >
      <div className="container flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="folio-mark mb-1">公告</p>
          <p className="text-sm font-medium tracking-tight">{data.title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{data.body}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {href ? (
            isInternal ? (
              <Link
                href={href}
                className="text-xs uppercase tracking-[0.14em] underline underline-offset-4"
              >
                {cta}
              </Link>
            ) : (
              <a
                href={href}
                className="text-xs uppercase tracking-[0.14em] underline underline-offset-4"
                rel="noopener noreferrer"
                target="_blank"
              >
                {cta}
              </a>
            )
          ) : null}
          {dismissible ? (
            <button
              type="button"
              className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
              onClick={dismiss}
            >
              关闭
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
