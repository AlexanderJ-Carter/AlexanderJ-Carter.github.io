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
  const summary = [data.title, data.body].filter(Boolean).join(' · ')

  return (
    <div className="site-notice" role="region" aria-label="站点公告">
      <div className="site-notice__rail container">
        <p className="site-notice__text">
          <span className="site-notice__mark" aria-hidden>
            告示
          </span>
          <span className="site-notice__copy">{summary}</span>
        </p>
        <div className="site-notice__actions">
          {href ? (
            isInternal ? (
              <Link href={href} className="site-notice__cta">
                {cta}
              </Link>
            ) : (
              <a
                href={href}
                className="site-notice__cta"
                rel="noopener noreferrer"
                target="_blank"
              >
                {cta}
              </a>
            )
          ) : null}
          {dismissible ? (
            <button type="button" className="site-notice__dismiss" onClick={dismiss} aria-label="关闭公告">
              关闭
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
