'use client'

import React, { useEffect, useMemo, useState } from 'react'

import { onThisDayEvents, pickOnThisDay } from '@/data/on-this-day'

const quotes = [
  { text: '用镜头记录世界，用代码创造未来。', author: 'Folio' },
  { text: '曝光、对焦、冲印——页面也一样。', author: '暗房三法则' },
  { text: '光是摄影的原料，也是阅读的节奏。', author: 'Folio' },
  { text: '少即是多：一页一件事。', author: 'Focus' },
]

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
  const [quoteIdx, setQuoteIdx] = useState(0)

  useEffect(() => {
    setQuoteIdx(Math.floor(Math.random() * quotes.length))
  }, [])

  const history = dayPool[historyIdx % Math.max(dayPool.length, 1)]
  const quote = quotes[quoteIdx % quotes.length]!

  const dateLabel = history?.year
    ? `${history.year}年 · ${month}月${day}日`
    : `${month}月${day}日`

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
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-3">今日语录</p>
          <blockquote className="text-lg leading-relaxed mb-4">「{quote.text}」</blockquote>
          <div className="flex items-center justify-between gap-3">
            <cite className="not-italic text-sm text-muted-foreground">— {quote.author}</cite>
            <button
              type="button"
              className="text-xs uppercase tracking-wider underline underline-offset-4"
              onClick={() => setQuoteIdx((i) => i + 1)}
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
          <p className="leading-relaxed mb-4">
            {history?.zh ?? '今天暂无收录事件'}
          </p>
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
