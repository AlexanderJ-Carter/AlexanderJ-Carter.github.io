import React from 'react'

import { getInstance } from '@/instance'
import type { InstanceTimelineItem } from '@/instance/types'

const KIND_LABEL: Record<NonNullable<InstanceTimelineItem['kind']>, string> = {
  education: '教育',
  research: '研究',
  work: '工作',
  other: '经历',
}

type Parsed = {
  item: InstanceTimelineItem
  start: number
  end: number
  ongoing: boolean
}

/** 把「2026.06 — 今」之类解析成可比较的月份序号。 */
function parsePeriod(period: string): { start: number; end: number; ongoing: boolean } {
  const norm = period.replace(/\s+/g, ' ').replace(/[–—―]/g, '-')
  const [rawStart = '', rawEnd = ''] = norm.split('-').map((s) => s.trim())
  const start = tokenToMonth(rawStart)
  const ongoing = !rawEnd || /^(今|至今|现在|present|now|current)$/i.test(rawEnd)
  const end = ongoing ? monthNow() : tokenToMonth(rawEnd)
  return { start: start || 0, end: end || start || 0, ongoing }
}

function tokenToMonth(token: string): number {
  const m = token.match(/(\d{4})(?:[./年-](\d{1,2}))?/)
  if (!m) return 0
  const year = Number(m[1])
  const month = m[2] ? Math.min(12, Math.max(1, Number(m[2]))) : 1
  return year * 12 + (month - 1)
}

function monthNow() {
  const d = new Date()
  return d.getFullYear() * 12 + d.getMonth()
}

function rangesOverlap(a: Parsed, b: Parsed) {
  return a.start <= b.end && b.start <= a.end
}

function enrich(items: InstanceTimelineItem[]): (Parsed & { parallel: boolean })[] {
  const parsed: Parsed[] = items.map((item) => {
    const p = parsePeriod(item.period)
    return { item, ...p }
  })

  // 新→旧；同起点时工作/研究优先于教育，便于并行簇阅读
  const kindRank = { work: 0, research: 1, other: 2, education: 3 } as const
  parsed.sort((a, b) => {
    if (b.start !== a.start) return b.start - a.start
    const ar = a.item.kind ? kindRank[a.item.kind] : 9
    const br = b.item.kind ? kindRank[b.item.kind] : 9
    return ar - br
  })

  return parsed.map((row, i) => {
    const parallel = parsed.some((other, j) => i !== j && rangesOverlap(row, other))
    return { ...row, parallel }
  })
}

export function AboutTimeline() {
  const items = getInstance().about?.timeline ?? []
  if (items.length === 0) return null

  const rows = enrich(items)
  const hasParallel = rows.some((r) => r.parallel)

  return (
    <section className="mt-12 md:mt-16" aria-labelledby="about-timeline-heading">
      <p className="folio-mark mb-3">履历</p>
      <h2
        id="about-timeline-heading"
        className="mb-3 text-2xl font-semibold tracking-tight md:mb-4 md:text-3xl"
      >
        经历
      </h2>
      {hasParallel ? (
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:mb-8">
          标了「并行」的条目时间互相重叠——例如在读与实习、研究可同时进行，不是先后替换。
        </p>
      ) : (
        <div className="mb-6 md:mb-8" />
      )}
      <ol className="about-timeline list-none p-0 m-0">
        {rows.map(({ item, parallel, ongoing }) => (
          <li
            key={`${item.period}-${item.title}`}
            className={`about-timeline__item${parallel ? ' is-parallel' : ''}`}
          >
            <div className="about-timeline__rail" aria-hidden />
            <div className="about-timeline__body">
              <p className="about-timeline__meta">
                <span className="meta-mono tabular-nums">{item.period}</span>
                {item.kind ? (
                  <span className="about-timeline__kind">{KIND_LABEL[item.kind]}</span>
                ) : null}
                {parallel ? (
                  <span className="about-timeline__parallel" title="与其它条目时间重叠">
                    并行{ongoing ? ' · 进行中' : ''}
                  </span>
                ) : null}
              </p>
              <h3 className="about-timeline__title">{item.title}</h3>
              {item.detail ? <p className="about-timeline__detail">{item.detail}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
