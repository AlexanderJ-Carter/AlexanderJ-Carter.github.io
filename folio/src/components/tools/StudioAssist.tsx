'use client'

import Link from 'next/link'
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react'

import { skipVerify, turnstileSiteKey } from '@/lib/site'
import { cn } from '@/utilities/ui'

type Lang = 'zh' | 'en' | 'both'

const PROMPTS = [
  '黄昏海边，f/2.8 · 1/125 · ISO 400，想要剪影感',
  '室内窗光人像，50mm，手头只有一盏柔光',
  '夜景街头，想压噪又留路灯光斑',
] as const

const OIDC_NEXT = `/api/oidc/login?next=${encodeURIComponent('/tools?t=ai')}`

export function StudioAssist() {
  const hostId = useId()
  const widgetId = useRef<string | null>(null)
  const [scene, setScene] = useState('')
  const [lang, setLang] = useState<Lang>('zh')
  const [token, setToken] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    setSignedIn(/(?:^|; )payload-token=/.test(document.cookie))
  }, [])

  const needsTurnstile = !skipVerify && !signedIn

  const mountTurnstile = useCallback(() => {
    if (!needsTurnstile) return
    const host = document.getElementById(hostId)
    if (!host || !window.turnstile) return
    if (widgetId.current) {
      window.turnstile.remove(widgetId.current)
      widgetId.current = null
    }
    host.innerHTML = ''
    widgetId.current = window.turnstile.render(host, {
      sitekey: turnstileSiteKey,
      callback: (t) => setToken(t),
      'expired-callback': () => setToken(null),
      'error-callback': () => setToken(null),
    })
  }, [hostId, needsTurnstile])

  useEffect(() => {
    if (!needsTurnstile) return
    const onReady = () => mountTurnstile()
    if (window.turnstile) {
      onReady()
    } else {
      window.onTurnstileLoad = onReady
      if (!document.querySelector('script[data-turnstile]')) {
        const script = document.createElement('script')
        script.src =
          'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad'
        script.async = true
        script.dataset.turnstile = '1'
        document.head.appendChild(script)
      }
    }
    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [mountTurnstile, needsTurnstile])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const text = scene.trim()
    if (!text) {
      setError('先写一点场景或参数。')
      return
    }
    if (needsTurnstile && !token) {
      setError('请先完成人机验证。')
      return
    }

    setBusy(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/studio-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          scene: text,
          lang,
          turnstileToken: needsTurnstile ? token : undefined,
        }),
      })
      const data = (await res.json()) as {
        ok?: boolean
        answer?: string
        error?: string
        auth?: boolean
      }
      if (!res.ok || !data.ok || !data.answer) {
        setError(data.error || '暂时不可用，请稍后再试。')
        if (widgetId.current && window.turnstile?.reset) {
          window.turnstile.reset(widgetId.current)
        }
        setToken(null)
        return
      }
      if (data.auth) setSignedIn(true)
      setResult(data.answer)
      if (widgetId.current && window.turnstile?.reset) {
        window.turnstile.reset(widgetId.current)
      }
      setToken(null)
    } catch {
      setError('网络异常，请稍后再试。')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="studio-assist" onSubmit={onSubmit}>
      <p className="text-xs text-muted-foreground">
        {signedIn ? (
          <>已通过 Pocket ID 会话识别：跳过人机验证，限额更高。</>
        ) : (
          <>
            访客需完成人机验证。站主可用{' '}
            <Link href={OIDC_NEXT} className="underline underline-offset-4">
              Pocket ID 登录
            </Link>{' '}
            后跳过。
          </>
        )}
      </p>

      <label className="studio-assist__label" htmlFor="studio-scene">
        场景或参数
      </label>
      <textarea
        id="studio-scene"
        className="studio-assist__input"
        rows={4}
        maxLength={600}
        value={scene}
        onChange={(e) => setScene(e.target.value)}
        placeholder="例如：阴天林缘，35mm，想要柔和层次…"
      />
      <div className="studio-assist__prompts">
        {PROMPTS.map((p) => (
          <button
            key={p}
            type="button"
            className="studio-assist__chip"
            onClick={() => setScene(p)}
          >
            {p.slice(0, 18)}…
          </button>
        ))}
      </div>

      <fieldset className="studio-assist__lang">
        <legend className="studio-assist__label">说明语言</legend>
        {(
          [
            ['zh', '中文'],
            ['en', 'English'],
            ['both', '双语'],
          ] as const
        ).map(([value, label]) => (
          <label key={value} className="studio-assist__radio">
            <input
              type="radio"
              name="studio-lang"
              value={value}
              checked={lang === value}
              onChange={() => setLang(value)}
            />
            {label}
          </label>
        ))}
      </fieldset>

      {needsTurnstile ? <div id={hostId} className="studio-assist__turnstile" /> : null}

      {error ? (
        <p className="studio-assist__error" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className={cn('studio-assist__submit', busy && 'is-busy')}
        disabled={busy}
      >
        {busy ? '冲洗中…' : '生成建议'}
      </button>

      {result ? (
        <div className="studio-assist__out" aria-live="polite">
          <p className="folio-mark mb-2">Result</p>
          <pre className="studio-assist__answer">{result}</pre>
          <button
            type="button"
            className="studio-assist__copy"
            onClick={() => void navigator.clipboard.writeText(result)}
          >
            复制全文
          </button>
        </div>
      ) : null}
    </form>
  )
}
