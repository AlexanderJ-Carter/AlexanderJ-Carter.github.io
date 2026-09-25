'use client'

import Link from 'next/link'
import React, { useEffect, useId, useRef, useState } from 'react'

const HIDDEN_KEY = 'folio-assistant-hidden'

/** Seed prompts — shown before the first reply and as follow-ups. */
const PROMPTS = [
  { label: '画廊在哪？', question: '画廊在哪个页面？怎么看图？' },
  { label: '如何订阅？', question: '怎么订阅本站更新？会不会经常发信？' },
  { label: '研究入口', question: '公开研究论文在哪里看？' },
  { label: '有什么好玩的？', question: '站内有哪些好玩的小工具？' },
  { label: '写作在哪？', question: '站内文章在哪里读？' },
  { label: '怎么联系？', question: '想留言联系的话走哪一页？有没有门禁？' },
  { label: '这个站是干什么的？', question: '用两三句话介绍这个站适合逛什么。' },
  { label: 'Cookie / 统计', question: 'Cookie 和统计偏好怎么选、怎么再改？' },
] as const

type Msg = { role: 'user' | 'assistant'; text: string }

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

function pickPrompts(seed: number, count: number, exclude: string[] = []) {
  const pool = PROMPTS.filter((p) => !exclude.includes(p.question))
  if (pool.length === 0) return []
  // Fisher–Yates：LCG 再 `% pool.length` 在长度为 2^k 时会卡在子循环，SSR 会拖死事件循环。
  let n = seed >>> 0
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    n = (Math.imul(n, 1103515245) + 12345) >>> 0
    const j = n % (i + 1)
    const tmp = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = tmp
  }
  return shuffled.slice(0, Math.min(count, shuffled.length))
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
  const listRef = useRef<HTMLUListElement>(null)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [asked, setAsked] = useState<string[]>([])
  const [promptSeed, setPromptSeed] = useState(1)
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      text: '有事直接问，或点下面的预测问题。我按本站公开栏目来答。',
    },
  ])

  const chips = pickPrompts(promptSeed, 4, asked)

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
    const el = listRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, busy, open])

  const hide = () => {
    setOpen(false)
    setHidden(true)
    try {
      window.localStorage.setItem(HIDDEN_KEY, '1')
    } catch {
      // ignore
    }
  }

  const ask = async (question: string) => {
    const q = question.trim()
    if (!q || busy) return
    setBusy(true)
    setInput('')
    setAsked((prev) => [...prev, q])
    setMessages((prev) => [...prev, { role: 'user', text: q }])

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, llm: true }),
      })
      const data = (await res.json()) as { answer?: string; error?: string }
      const text =
        data.answer ||
        data.error ||
        (res.status === 429
          ? '问得有点勤，稍后再试，或直接逛 /gallery 与 /research。'
          : '暂时没法回答，可以到 /contact 留言。')
      setMessages((prev) => [...prev, { role: 'assistant', text }])
      setPromptSeed((s) => s + 7)
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: '网络不顺。可以先看 /tools 或到 /contact。' },
      ])
    } finally {
      setBusy(false)
    }
  }

  if (hidden) return null

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
                {m.role === 'assistant' ? linkify(m.text) : m.text}
              </li>
            ))}
            {busy ? <ThinkingRow /> : null}
          </ul>

          {chips.length > 0 ? (
            <div className="site-assist__suggestions" aria-label="预测问题">
              <p className="site-assist__suggestions-label">也许想问</p>
              <div className="site-assist__suggestions-row">
                {chips.map((s) => (
                  <button
                    key={s.label}
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
