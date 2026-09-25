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

type FestivalTone = 'mid-autumn' | 'national' | 'new-year' | null

function festivalTone(noticeId: string): FestivalTone {
  if (/mid-autumn|zhongqiu|中秋/i.test(noticeId)) return 'mid-autumn'
  if (/national|guoqing|国庆/i.test(noticeId)) return 'national'
  if (/(^|-)ny(-|$)|new-year|yuan|元旦/i.test(noticeId)) return 'new-year'
  return null
}

function festivalMark(tone: FestivalTone): string {
  if (tone === 'mid-autumn') return '中秋'
  if (tone === 'national') return '国庆'
  if (tone === 'new-year') return '元旦'
  return '告示'
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
  const tone = festivalTone(id)
  const mark = festivalMark(tone)
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
    }, 11000)

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
  const rootClass = [
    'site-toast',
    expanded ? 'site-toast--open' : '',
    tone ? `site-toast--festive site-toast--${tone}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (!expanded) {
    return (
      <div className={rootClass} role="region" aria-label="站点公告">
        <button type="button" className="site-toast__chip" onClick={expand}>
          <span className="site-toast__dot" aria-hidden />
          {mark}
        </button>
      </div>
    )
  }

  return (
    <div className={rootClass} role="region" aria-label="站点公告">
      <div className="site-toast__card">
        <span className="site-toast__ornament" aria-hidden />
        <p className="site-toast__mark">{mark}</p>
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
