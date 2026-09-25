'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { readConsent, writeConsent } from '@/utilities/consent'

export function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setOpen(!readConsent())
    setReady(true)

    const onOpen = () => setOpen(true)
    const onConsent = () => setOpen(false)
    window.addEventListener('folio:open-consent', onOpen)
    window.addEventListener('folio:consent', onConsent)
    return () => {
      window.removeEventListener('folio:open-consent', onOpen)
      window.removeEventListener('folio:consent', onConsent)
    }
  }, [])

  if (!ready || !open) return null

  return (
    <div className="cookie-consent" role="dialog" aria-labelledby="cookie-consent-title">
      <div className="cookie-consent__panel">
        <p id="cookie-consent-title" className="cookie-consent__title">
          Cookie 与统计
        </p>
        <p className="cookie-consent__body">
          必要项用于主题偏好与访客门禁（关于 / 联系）。可选统计含本站浏览量，以及 Cloudflare
          Web Analytics（若已配置），不做广告画像。详情与再次修改见{' '}
          <Link className="underline underline-offset-4" href="/privacy#cookies">
            隐私政策
          </Link>
          。
        </p>
        <div className="cookie-consent__actions">
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--ghost"
            onClick={() => writeConsent(false)}
          >
            仅必要
          </button>
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--solid"
            onClick={() => writeConsent(true)}
          >
            接受统计
          </button>
        </div>
      </div>
    </div>
  )
}

/** 隐私页等处：重新打开同意条 */
export function CookiePrefsButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event('folio:open-consent'))}
    >
      管理 Cookie 偏好
    </button>
  )
}
