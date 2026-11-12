'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { analyticsAllowed, type FolioConsent } from '@/utilities/consent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function setAnalyticsConsent(granted: boolean) {
  if (typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

function sendPageView(path: string) {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

/**
 * GA4（gtag）。衡量 ID 来自 NEXT_PUBLIC_GA_MEASUREMENT_ID。
 * 脚本可加载以便安装检测；默认 Consent Mode 拒绝存储，仅在访客接受「统计」后授权并发送 page_view。
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()
  const pathname = usePathname()
  const [allowed, setAllowed] = useState(false)
  const [ready, setReady] = useState(false)

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
    if (!gaId || !ready) return
    setAnalyticsConsent(allowed)
    if (allowed) {
      sendPageView(`${pathname}${window.location.search}`)
    }
  }, [allowed, gaId, pathname, ready])

  if (!gaId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <Script
        id="folio-ga4"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
gtag('config', '${gaId}', { anonymize_ip: true, send_page_view: false });
`,
        }}
      />
    </>
  )
}
