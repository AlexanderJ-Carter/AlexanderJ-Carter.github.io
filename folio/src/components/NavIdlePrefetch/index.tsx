'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/** 首屏空闲后再预取高频栏目，减少抢 LCP 带宽。 */
const ROUTES = ['/gallery', '/posts', '/research', '/about', '/tools', '/fun'] as const

export function NavIdlePrefetch() {
  const router = useRouter()

  useEffect(() => {
    let cancelled = false
    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const run = () => {
      if (cancelled) return
      for (const href of ROUTES) {
        router.prefetch(href)
      }
    }

    const ric = window.requestIdleCallback
    if (typeof ric === 'function') {
      idleId = ric(run, { timeout: 2500 })
    } else {
      timeoutId = setTimeout(run, 1200)
    }

    return () => {
      cancelled = true
      if (idleId != null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId != null) clearTimeout(timeoutId)
    }
  }, [router])

  return null
}
