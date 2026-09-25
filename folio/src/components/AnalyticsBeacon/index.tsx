'use client'

import { useEffect, useState } from 'react'

import { analyticsAllowed, type FolioConsent } from '@/utilities/consent'

/**
 * Cloudflare Web Analytics。
 * 仅在访客接受「统计」且配置了 NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN 时加载。
 */
export function AnalyticsBeacon() {
  const token = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN?.trim()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const sync = () => setAllowed(analyticsAllowed())
    sync()
    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<FolioConsent>).detail
      setAllowed(detail.analytics === true)
    }
    window.addEventListener('folio:consent', onConsent)
    return () => window.removeEventListener('folio:consent', onConsent)
  }, [])

  useEffect(() => {
    if (!token || !allowed) return

    const attr = 'data-cf-folio-beacon'
    if (document.querySelector(`script[${attr}]`)) return

    const script = document.createElement('script')
    script.defer = true
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
    script.setAttribute('data-cf-beacon', JSON.stringify({ token, spa: true }))
    script.setAttribute(attr, '1')
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [token, allowed])

  return null
}
