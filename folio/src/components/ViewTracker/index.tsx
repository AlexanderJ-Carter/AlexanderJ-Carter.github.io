'use client'

import { useEffect, useState } from 'react'

import { analyticsAllowed, type FolioConsent } from '@/utilities/consent'

type Props = {
  collection: 'pages' | 'posts'
  id: number | string
  /** 服务端已读到的初始值 */
  initial?: number | null
  enabled?: boolean
  className?: string
}

const SID_KEY = 'folio_sid'
const SEEN_PREFIX = 'folio_seen:'

function sessionId(): string {
  try {
    let sid = window.sessionStorage.getItem(SID_KEY)
    if (!sid) {
      sid = crypto.randomUUID()
      window.sessionStorage.setItem(SID_KEY, sid)
    }
    return sid
  } catch {
    return 'anon'
  }
}

function alreadySeen(collection: string, id: string | number): boolean {
  try {
    return window.sessionStorage.getItem(`${SEEN_PREFIX}${collection}:${id}`) === '1'
  } catch {
    return false
  }
}

function markSeen(collection: string, id: string | number) {
  try {
    window.sessionStorage.setItem(`${SEEN_PREFIX}${collection}:${id}`, '1')
  } catch {
    // ignore
  }
}

function formatViews(n: number): string {
  if (n < 1000) return String(n)
  if (n < 10_000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return `${Math.round(n / 1000)}k`
}

/**
 * 浏览上报 + 展示。需访客同意「统计」才打点；展示可用服务端初始值。
 */
export function ViewTracker({
  collection,
  id,
  initial = 0,
  enabled = true,
  className,
}: Props) {
  const [count, setCount] = useState(typeof initial === 'number' ? initial : 0)

  useEffect(() => {
    if (!enabled || !id) return

    const send = () => {
      if (!analyticsAllowed()) return
      if (alreadySeen(collection, id)) return

      const sid = sessionId()
      void fetch('/api/views', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-folio-sid': sid,
        },
        body: JSON.stringify({ collection, id }),
        keepalive: true,
      })
        .then((r) => r.json())
        .then((data: { ok?: boolean; viewCount?: number; skipped?: boolean }) => {
          if (typeof data.viewCount === 'number') setCount(data.viewCount)
          if (data.ok && !data.skipped) markSeen(collection, id)
          if (data.ok && data.skipped) markSeen(collection, id)
        })
        .catch(() => {})
    }

    let t = window.setTimeout(send, 1400)

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<FolioConsent>).detail
      if (detail.analytics) {
        window.clearTimeout(t)
        t = window.setTimeout(send, 400)
      }
    }
    window.addEventListener('folio:consent', onConsent)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('folio:consent', onConsent)
    }
  }, [collection, id, enabled])

  if (count <= 0 && !enabled) return null

  return (
    <p className={className ?? 'meta-mono text-xs text-muted-foreground'} aria-live="polite">
      {count > 0 ? `${formatViews(count)} 次浏览` : '浏览'}
    </p>
  )
}
