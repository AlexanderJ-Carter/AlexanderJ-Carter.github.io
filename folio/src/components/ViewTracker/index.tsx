'use client'

import { useEffect } from 'react'

type Props = {
  collection: 'pages' | 'posts'
  id: number | string
  enabled?: boolean
}

/** 前台浏览上报（预览模式不打点） */
export function ViewTracker({ collection, id, enabled = true }: Props) {
  useEffect(() => {
    if (!enabled || !id) return
    const ac = new AbortController()
    const t = window.setTimeout(() => {
      void fetch('/api/views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection, id }),
        signal: ac.signal,
        keepalive: true,
      }).catch(() => {})
    }, 1200)
    return () => {
      window.clearTimeout(t)
      ac.abort()
    }
  }, [collection, id, enabled])

  return null
}
