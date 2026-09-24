'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { onThisDayEvents, pickOnThisDay } from '@/data/on-this-day'

type Poem = {
  content: string
  author: string
  title: string
  dynasty: string
}

async function fetchPoem(): Promise<Poem | null> {
  const res = await fetch('/api/poem', { cache: 'no-store' })
  if (!res.ok) return null
  const json = await res.json()
  const data = json?.data
  if (!data?.content) return null
  const origin = data.origin || {}
  return {
    content: String(data.content).trim(),
    author: String(origin.author || '').trim(),
    title: String(origin.title || '').trim(),
    dynasty: String(origin.dynasty || '').trim(),
  }
}

export function PoemHistory() {
  const now = useMemo(() => new Date(), [])
  const month = now.getMonth() + 1
  const day = now.getDate()

  const dayPool = useMemo(() => {
    const exact = onThisDayEvents.filter((e) => e.month === month && e.day === day)
    if (exact.length > 0) return exact
    const fallback = pickOnThisDay(month, day)
    return fallback ? [fallback] : []
  }, [month, day])

  const [historyIdx, setHistoryIdx] = useState(0)
  const [poem, setPoem] = useState<Poem | null>(null)
  const [poemLoading, setPoemLoading] = useState(true)
  const [poemError, setPoemError] = useState(false)

  const loadPoem = useCallback(async () => {
    setPoemLoading(true)
    setPoemError(false)
    try {
      const next = await fetchPoem()
      if (!next) {
        setPoemError(true)
        setPoem(null)
        return
      }
      setPoem(next)
    } catch {
      setPoemError(true)
      setPoem(null)
    } finally {
      setPoemLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadPoem()
  }, [loadPoem])

  const history = dayPool[historyIdx % Math.max(dayPool.length, 1)]
  const dateLabel = history?.year
    ? `${history.year}年 · ${month}月${day}日`
    : `${month}月${day}日`

  const poemCite = poem
    ? [poem.dynasty && `【${poem.dynasty}】`, poem.author, poem.title && `《${poem.title}》`]
        .filter(Boolean)
        .join('')
    : ''

  return (
    <section className="container py-2" aria-labelledby="daily-inspire-heading">
      <div className="mb-6 max-w-2xl">
        <p className="folio-mark mb-2">Daily</p>
        <h2 id="daily-inspire-heading" className="text-2xl md:text-3xl tracking-tight font-semibold">
          每日灵感
        </h2>
        <p className="mt-2 text-muted-foreground text-sm md:text-base">
          诗词与历史的交织，为生活注入文化气息
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="glass-card p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-3">今日诗词</p>
          {poemLoading ? (
            <p className="text-muted-foreground leading-relaxed mb-4">载入诗词中…</p>
          ) : poemError || !poem ? (
            <p className="text-muted-foreground leading-relaxed mb-4">暂时读不到诗词，请稍后再试。</p>
          ) : (
            <>
              <blockquote className="text-lg leading-relaxed mb-4">「{poem.content}」</blockquote>
              <p className="text-sm text-muted-foreground mb-4">{poemCite}</p>
            </>
          )}
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="text-xs uppercase tracking-wider underline underline-offset-4"
              onClick={() => void loadPoem()}
            >
              换一句
            </button>
          </div>
        </article>
        <article className="glass-card p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-3">
            历史上的今天
          </p>
          <p className="font-mono text-xs text-muted-foreground mb-2">{dateLabel}</p>
          <p className="leading-relaxed mb-4">{history?.zh ?? '今天暂无收录事件'}</p>
          {dayPool.length > 1 && (
            <button
              type="button"
              className="text-xs uppercase tracking-wider underline underline-offset-4"
              onClick={() => setHistoryIdx((i) => i + 1)}
            >
              换一条
            </button>
          )}
        </article>
      </div>
    </section>
  )
}
