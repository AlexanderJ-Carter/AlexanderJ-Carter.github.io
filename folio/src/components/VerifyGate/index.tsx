'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { turnstileSiteKey, VERIFY_COOKIE, VERIFY_COOKIE_MAX_AGE } from '@/lib/site'

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string
          theme?: string
          callback?: (token: string) => void
          'error-callback'?: () => boolean | void
          'expired-callback'?: () => void
        },
      ) => string
      remove: (id: string) => void
    }
    onTurnstileLoad?: () => void
  }
}

function setVerifyCookie() {
  document.cookie = `${VERIFY_COOKIE}=1; path=/; max-age=${VERIFY_COOKIE_MAX_AGE}; SameSite=Lax`
}

export function VerifyGate() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const hostRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const [status, setStatus] = useState('加载验证组件…')
  const [error, setError] = useState<string | null>(null)

  const nextPath = searchParams.get('next') || searchParams.get('redirect') || '/about'

  const finish = useCallback(
    async (token?: string) => {
      if (token) {
        try {
          await fetch('/api/turnstile/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          })
        } catch {
          // Soft-fail: cookie still set so gate UX matches Astro client-only path.
        }
      }
      setVerifyCookie()
      setStatus('验证通过，正在跳转…')
      router.replace(nextPath.startsWith('/') ? nextPath : '/about')
    },
    [nextPath, router],
  )

  const renderWidget = useCallback(() => {
    const host = hostRef.current
    if (!host || !window.turnstile) {
      setError('Turnstile 不可用，请刷新重试。')
      return
    }
    if (widgetId.current) {
      window.turnstile.remove(widgetId.current)
      widgetId.current = null
      host.innerHTML = ''
    }
    setError(null)
    setStatus('请完成人机验证')
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    widgetId.current = window.turnstile.render(host, {
      sitekey: turnstileSiteKey,
      theme,
      callback: (token) => {
        void finish(token)
      },
      'error-callback': () => {
        setError('验证失败，请重试。')
        return true
      },
      'expired-callback': () => {
        setError('验证已过期，请重新完成。')
      },
    })
  }, [finish])

  useEffect(() => {
    let cancelled = false

    function onReady() {
      if (!cancelled) renderWidget()
    }

    if (window.turnstile) {
      onReady()
    } else {
      window.onTurnstileLoad = onReady
      const existing = document.querySelector('script[data-turnstile]')
      if (!existing) {
        const script = document.createElement('script')
        script.src =
          'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad'
        script.async = true
        script.defer = true
        script.dataset.turnstile = '1'
        document.head.appendChild(script)
      }
    }

    return () => {
      cancelled = true
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [renderWidget])

  return (
    <div className="verify-gate relative mx-auto max-w-lg px-4 py-16 md:py-24">
      <p className="folio-mark mb-3">Gate</p>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">确认你是真人访客</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        通常几秒内完成，通过后会自动继续。验证状态保存在 Cookie（7 天）。
      </p>
      <p className="meta-mono text-xs text-muted-foreground mb-4" aria-live="polite">
        {status}
      </p>
      <div ref={hostRef} className="min-h-[65px] flex justify-center" />
      {error && (
        <div className="mt-4 rounded-sm border border-border bg-card p-4 text-sm">
          <p className="font-medium mb-2">{error}</p>
          <button type="button" className="underline underline-offset-4" onClick={renderWidget}>
            重试
          </button>
        </div>
      )}
    </div>
  )
}
