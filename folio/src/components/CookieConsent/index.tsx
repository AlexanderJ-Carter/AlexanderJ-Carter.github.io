'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { readConsent, writeConsent } from '@/utilities/consent'

export function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(!readConsent())

    const onOpen = () => setOpen(true)
    const onConsent = () => setOpen(false)
    window.addEventListener('folio:open-consent', onOpen)
    window.addEventListener('folio:consent', onConsent)
    return () => {
      window.removeEventListener('folio:open-consent', onOpen)
      window.removeEventListener('folio:consent', onConsent)
    }
  }, [])

  if (!open) {
    return (
      <button
        type="button"
        className="cookie-prefs-chip"
        onClick={() => setOpen(true)}
        aria-label="打开 Cookie 与统计偏好"
      >
        Cookie
      </button>
    )
  }

  return (
    <div className="cookie-consent" role="dialog" aria-labelledby="cookie-consent-title">
      <div className="cookie-consent__panel">
        <p id="cookie-consent-title" className="cookie-consent__title">
          Cookie 与统计
        </p>
        <p className="cookie-consent__body">
          必要项用于主题偏好与访客门禁（关于 / 联系）。可选统计含本站浏览量，以及 Cloudflare
          Web Analytics（若已配置），不做广告画像。详情见{' '}
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
