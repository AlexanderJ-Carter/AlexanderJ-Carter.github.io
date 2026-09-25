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
  startsAt?: string | null
  endsAt?: string | null
}

function storageKey(id: string) {
  return `site-notice-dismissed:${id}`
}

function collapsedKey(id: string) {
  return `site-notice-collapsed:${id}`
}

function inDateWindow(startsAt?: string | null, endsAt?: string | null): boolean {
  const now = Date.now()
  if (startsAt) {
    const t = Date.parse(startsAt)
    if (!Number.isNaN(t) && now < t) return false
  }
  if (endsAt) {
    const t = Date.parse(endsAt)
    if (!Number.isNaN(t) && now > t) return false
  }
  return true
}

export function SiteAnnouncement({ data }: { data: AnnouncementData | null | undefined }) {
  const windowOk = inDateWindow(data?.startsAt, data?.endsAt)
  const enabled = Boolean(
    data?.enabled && data?.noticeId && data?.title && data?.body && windowOk,
  )
  const id = data?.noticeId || ''
  const dismissible = data?.dismissible !== false
  const href = data?.href?.trim() || ''
  const cta = data?.ctaLabel?.trim() || '了解更多'

  const [visible, setVisible] = useState(enabled)
  const [expanded, setExpanded] = useState(true)

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
      if (window.localStorage.getItem(collapsedKey(id)) === '1') {
        setExpanded(false)
      }
    } catch {
      // ignore
    }
    setVisible(true)
  }, [enabled, id, dismissible])

  useEffect(() => {
    if (!visible || !expanded || !id) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) return

    const timer = window.setTimeout(() => {
      setExpanded(false)
      try {
        window.localStorage.setItem(collapsedKey(id), '1')
      } catch {
        // ignore
      }
    }, 9000)

    return () => window.clearTimeout(timer)
  }, [visible, expanded, id])

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

  const collapse = () => {
    setExpanded(false)
    if (id) {
      try {
        window.localStorage.setItem(collapsedKey(id), '1')
      } catch {
        // ignore
      }
    }
  }

  const expand = () => {
    setExpanded(true)
    if (id) {
      try {
        window.localStorage.removeItem(collapsedKey(id))
      } catch {
        // ignore
      }
    }
  }

  const isInternal = href.startsWith('/') && !href.startsWith('//')

  if (!expanded) {
    return (
      <div className="site-toast" role="region" aria-label="站点公告">
        <button type="button" className="site-toast__chip" onClick={expand}>
          <span className="site-toast__dot" aria-hidden />
          告示
        </button>
      </div>
    )
  }

  return (
    <div className="site-toast site-toast--open" role="region" aria-label="站点公告">
      <div className="site-toast__card">
        <p className="site-toast__mark">告示</p>
        <p className="site-toast__title">{data.title}</p>
        <p className="site-toast__body">{data.body}</p>
        <div className="site-toast__actions">
          {href ? (
            isInternal ? (
              <Link href={href} className="site-toast__cta">
                {cta}
              </Link>
            ) : (
              <a
                href={href}
                className="site-toast__cta"
                rel="noopener noreferrer"
                target="_blank"
              >
                {cta}
              </a>
            )
          ) : null}
          <button type="button" className="site-toast__quiet" onClick={collapse}>
            收起
          </button>
          {dismissible ? (
            <button type="button" className="site-toast__quiet" onClick={dismiss}>
              不再显示
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
