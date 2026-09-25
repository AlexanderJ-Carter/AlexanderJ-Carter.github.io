'use client'

import Link from 'next/link'
import React, { useEffect, useId, useRef, useState } from 'react'

const HIDDEN_KEY = 'folio-assistant-hidden'

type Suggestion = { label: string; question: string }

type AskAction =
  | { type: 'navigate'; path: string; label: string }
  | { type: 'subscribe'; label: string }
  | { type: 'unsubscribe'; label: string }
  | { type: 'subscribe_status'; label: string }

type Msg = {
  role: 'user' | 'assistant'
  text: string
  actions?: AskAction[]
}

type EmailIntent = 'subscribe' | 'unsubscribe' | 'subscribe_status'

const SEED_SUGGESTIONS: Suggestion[] = [
  { label: '画廊', question: '画廊在哪个页面？怎么看图？' },
  { label: '天气', question: '北京现在天气怎么样？' },
  { label: '订阅', question: '怎么订阅本站更新？会不会经常发信？' },
  { label: '工具', question: '站内有哪些实用工具？' },
]

function linkify(text: string): React.ReactNode[] {
  const parts = text.split(/(\/[a-z0-9][\w/-]*)/gi)
  return parts.map((part, i) => {
    if (/^\/[a-z0-9][\w/-]*$/i.test(part)) {
      return (
        <Link key={i} href={part} className="site-assist__link">
          {part}
        </Link>
      )
    }
    return <React.Fragment key={i}>{part}</React.Fragment>
  })
}

function ThinkingRow() {
  return (
    <li className="site-assist__msg site-assist__thinking" aria-live="polite" aria-busy="true">
      <span className="site-assist__thinking-label">在想</span>
      <span className="site-assist__thinking-dots" aria-hidden>
        <i />
        <i />
        <i />
      </span>
    </li>
  )
}

export function SiteAssistant() {
  const titleId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [emailBusy, setEmailBusy] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>(SEED_SUGGESTIONS)
  const [emailIntent, setEmailIntent] = useState<EmailIntent | null>(null)
  const [email, setEmail] = useState('')
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      text: '有事直接问，或点下面的预测问题。站点栏目、订阅、天气/汇率/诗词我都能简答；订阅相关会让你在面板里确认邮箱。',
    },
  ])

  useEffect(() => {
    try {
      if (window.localStorage.getItem(HIDDEN_KEY) === '1') setHidden(true)
    } catch {
      // ignore
    }

    const onOpen = () => {
      try {
        window.localStorage.removeItem(HIDDEN_KEY)
      } catch {
        // ignore
      }
      setHidden(false)
      setOpen(true)
    }
    window.addEventListener('folio:open-assistant', onOpen)
    return () => window.removeEventListener('folio:open-assistant', onOpen)
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (emailIntent) emailRef.current?.focus()
  }, [emailIntent])

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, busy, open, emailIntent])

  const hide = () => {
    setOpen(false)
    setHidden(true)
    try {
      window.localStorage.setItem(HIDDEN_KEY, '1')
    } catch {
      // ignore
    }
  }

  const pushAssistant = (text: string, actions?: AskAction[]) => {
    setMessages((prev) => [...prev, { role: 'assistant', text, actions }])
  }

  const runAction = (action: AskAction) => {
    if (action.type === 'navigate') return
    setEmailIntent(action.type)
    setEmail('')
  }

  const submitEmail = async () => {
    if (!emailIntent || emailBusy) return
    const value = email.trim().toLowerCase()
    if (!value) return

    setEmailBusy(true)
    const endpoints: Record<EmailIntent, string> = {
      subscribe: '/api/subscribe',
      unsubscribe: '/api/unsubscribe',
      subscribe_status: '/api/subscribe/status',
    }

    try {
      const res = await fetch(endpoints[emailIntent], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      })
      const data = (await res.json()) as { ok?: boolean; message?: string; subscribed?: boolean }
      const text =
        data.message ||
        (res.ok
          ? emailIntent === 'subscribe_status'
            ? data.subscribed
              ? '该邮箱在订阅名单中。'
              : '名单里还没有这个邮箱。'
            : '已处理。'
          : '暂时没法完成，稍后再试，或打开 /subscribe。')
      pushAssistant(text)
      setEmailIntent(null)
      setEmail('')
    } catch {
      pushAssistant('网络不顺，邮箱操作没完成。可直接打开 /subscribe。')
    } finally {
      setEmailBusy(false)
    }
  }

  const ask = async (question: string) => {
    const q = question.trim()
    if (!q || busy) return
    setBusy(true)
    setInput('')
    setEmailIntent(null)
    setMessages((prev) => [...prev, { role: 'user', text: q }])

    const history = [...messages, { role: 'user' as const, text: q }]
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .slice(-6)
      .map((m) => ({ role: m.role, text: m.text }))

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, llm: true, messages: history }),
      })
      const data = (await res.json()) as {
        answer?: string
        error?: string
        suggestions?: Suggestion[]
        actions?: AskAction[]
      }
      const text =
        data.answer ||
        data.error ||
        (res.status === 429
          ? '问得有点勤，稍后再试，或直接逛 /gallery 与 /research。'
          : '暂时没法回答，可以到 /contact 留言。')
      const actions = Array.isArray(data.actions) ? data.actions : []
      pushAssistant(text, actions.length > 0 ? actions : undefined)
      if (Array.isArray(data.suggestions) && data.suggestions.length > 0) {
        setSuggestions(data.suggestions.slice(0, 4))
      }
    } catch {
      pushAssistant('网络不顺。可以先看 /tools 或到 /contact。')
    } finally {
      setBusy(false)
    }
  }

  if (hidden) return null

  const emailLabel =
    emailIntent === 'subscribe'
      ? '订阅'
      : emailIntent === 'unsubscribe'
        ? '退订'
        : emailIntent === 'subscribe_status'
          ? '查询'
          : ''

  return (
    <div className={`site-assist${open ? ' is-open' : ''}${busy ? ' is-busy' : ''}`}>
      {open ? (
        <div
          className="site-assist__panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
        >
          <div className="site-assist__head">
            <p id={titleId} className="site-assist__title">
              问站
            </p>
            <div className="site-assist__head-actions">
              <button type="button" className="site-assist__quiet" onClick={() => setOpen(false)}>
                收起
              </button>
              <button type="button" className="site-assist__quiet" onClick={hide}>
                隐藏
              </button>
            </div>
          </div>

          <ul className="site-assist__msgs" ref={listRef}>
            {messages.map((m, i) => (
              <li
                key={i}
                className={
                  m.role === 'user' ? 'site-assist__msg site-assist__msg--user' : 'site-assist__msg'
                }
              >
                {m.role === 'assistant' ? (
                  <>
                    <div>{linkify(m.text)}</div>
                    {m.actions && m.actions.length > 0 ? (
                      <div className="site-assist__actions" aria-label="可用动作">
                        {m.actions.map((action, j) =>
                          action.type === 'navigate' ? (
                            <Link
                              key={`${action.type}-${j}`}
                              href={action.path}
                              className="site-assist__action"
                            >
                              {action.label}
                            </Link>
                          ) : (
                            <button
                              key={`${action.type}-${j}`}
                              type="button"
                              className="site-assist__action"
                              disabled={busy || emailBusy}
                              onClick={() => runAction(action)}
                            >
                              {action.label}
                            </button>
                          ),
                        )}
                      </div>
                    ) : null}
                  </>
                ) : (
                  m.text
                )}
              </li>
            ))}
            {busy ? <ThinkingRow /> : null}
          </ul>

          {emailIntent ? (
            <form
              className="site-assist__email"
              onSubmit={(e) => {
                e.preventDefault()
                void submitEmail()
              }}
            >
              <p className="site-assist__suggestions-label">{emailLabel}确认</p>
              <div className="site-assist__email-row">
                <input
                  ref={emailRef}
                  className="site-assist__input"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="你的邮箱"
                  disabled={emailBusy}
                  aria-label="邮箱"
                />
                <button
                  type="submit"
                  className="site-assist__send"
                  disabled={emailBusy || !email.trim()}
                >
                  确认
                </button>
                <button
                  type="button"
                  className="site-assist__quiet"
                  disabled={emailBusy}
                  onClick={() => setEmailIntent(null)}
                >
                  取消
                </button>
              </div>
            </form>
          ) : null}

          {suggestions.length > 0 ? (
            <div className="site-assist__suggestions" aria-label="预测问题">
              <p className="site-assist__suggestions-label">也许想问</p>
              <div className="site-assist__suggestions-row">
                {suggestions.map((s) => (
                  <button
                    key={`${s.label}-${s.question}`}
                    type="button"
                    className="site-assist__chip"
                    disabled={busy}
                    onClick={() => void ask(s.question)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <form
            className="site-assist__form"
            onSubmit={(e) => {
              e.preventDefault()
              void ask(input)
            }}
          >
            <input
              ref={inputRef}
              className="site-assist__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={busy ? '思考中…' : '问一句…'}
              maxLength={400}
              disabled={busy}
              aria-label="问题"
            />
            <button type="submit" className="site-assist__send" disabled={busy || !input.trim()}>
              问
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        className="site-assist__fab"
        aria-expanded={open}
        aria-busy={busy || undefined}
        aria-label={busy ? '问站思考中' : open ? '收起站点助手' : '打开站点助手'}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="site-assist__fab-dot" aria-hidden />
        <span className="site-assist__fab-label">{busy ? '思考' : '问站'}</span>
      </button>
    </div>
  )
}
