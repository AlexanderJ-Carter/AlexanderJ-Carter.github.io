'use client'

import Link from 'next/link'
import React, { useMemo, useState } from 'react'

import {
  KIND_LABEL,
  commitDensity,
  siteEras,
  siteMilestones,
  siteStats,
  type SiteEraId,
} from '@/data/site-history'

type Filter = 'all' | SiteEraId

export function SiteChronicle() {
  const [filter, setFilter] = useState<Filter>('all')

  const milestones = useMemo(() => {
    if (filter === 'all') return siteMilestones
    return siteMilestones.filter((m) => m.era === filter)
  }, [filter])

  const maxDensity = Math.max(...commitDensity.map((d) => d.count), 1)

  return (
    <section className="site-evo" aria-labelledby="chronicle-heading">
      <header className="site-evo__intro">
        <p className="folio-mark mb-3">Evolution</p>
        <h2
          id="chronicle-heading"
          className="mb-3 text-2xl font-semibold tracking-tight md:mb-4 md:text-3xl"
        >
          发展史
        </h2>
        <p className="site-evo__lede">
          从 2024 年一张静态页，到 Astro 暗房，再到 Folio（Next + Payload）。下面按三代技术栈讲述——策展自{' '}
          {siteStats.tags} 个 tag 与关键提交，不是完整 git 日志。
        </p>
      </header>

      <dl className="site-evo__stats" aria-label="仓库概况">
        <div>
          <dt>提交</dt>
          <dd className="tabular-nums">{siteStats.commits}</dd>
        </div>
        <div>
          <dt>标签</dt>
          <dd className="tabular-nums">{siteStats.tags}</dd>
        </div>
        <div>
          <dt>换栈</dt>
          <dd className="tabular-nums">{siteStats.stacks}</dd>
        </div>
        <div>
          <dt>起于</dt>
          <dd className="tabular-nums">{siteStats.since}</dd>
        </div>
      </dl>

      <div className="site-evo__density" aria-hidden>
        <p className="site-evo__density-label">提交密度（月）</p>
        <div className="site-evo__bars">
          {commitDensity.map((d) => (
            <div key={d.month} className="site-evo__bar-col" title={`${d.month}: ${d.count}`}>
              <span
                className="site-evo__bar"
                style={{ height: `${Math.max(8, (d.count / maxDensity) * 100)}%` }}
              />
              <span className="site-evo__bar-month">{d.month.slice(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="site-evo__film" role="tablist" aria-label="按技术世代筛选">
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'all'}
          className={`site-evo__frame${filter === 'all' ? ' is-active' : ''}`}
          onClick={() => setFilter('all')}
        >
          <span className="site-evo__frame-mark">全部</span>
          <span className="site-evo__frame-title">三栈通览</span>
          <span className="site-evo__frame-meta">{siteMilestones.length} 个节点</span>
        </button>
        {siteEras.map((era) => {
          const n = siteMilestones.filter((m) => m.era === era.id).length
          return (
            <button
              key={era.id}
              type="button"
              role="tab"
              aria-selected={filter === era.id}
              className={`site-evo__frame site-evo__frame--${era.id}${filter === era.id ? ' is-active' : ''}`}
              onClick={() => setFilter(era.id)}
            >
              <span className="site-evo__frame-mark">{era.span}</span>
              <span className="site-evo__frame-title">{era.label}</span>
              <span className="site-evo__frame-stack">{era.stack}</span>
              <span className="site-evo__frame-meta">{n} 个节点</span>
            </button>
          )
        })}
      </div>

      {filter !== 'all' ? (
        <p className="site-evo__era-summary">
          {siteEras.find((e) => e.id === filter)?.summary}
        </p>
      ) : (
        <ul className="site-evo__era-cards">
          {siteEras.map((era) => (
            <li key={era.id}>
              <button
                type="button"
                className={`site-evo__era-card site-evo__era-card--${era.id}`}
                onClick={() => setFilter(era.id)}
              >
                <span className="site-evo__era-card-label">{era.label}</span>
                <span className="site-evo__era-card-stack">{era.stack}</span>
                <span className="site-evo__era-card-span">{era.span}</span>
                <span className="site-evo__era-card-sum">{era.summary}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <ol className="site-evo__list list-none m-0 p-0">
        {milestones.map((item) => (
          <li key={`${item.date}-${item.title}`} className={`site-evo__item site-evo__item--${item.era}`}>
            <div className="site-evo__rail" aria-hidden />
            <div className="site-evo__body">
              <p className="site-evo__meta">
                <span className="meta-mono tabular-nums">{item.date}</span>
                <span className="site-evo__kind">{KIND_LABEL[item.kind]}</span>
                <span className={`site-evo__era-pill site-evo__era-pill--${item.era}`}>
                  {siteEras.find((e) => e.id === item.era)?.label}
                </span>
                {item.ref ? <span className="site-evo__ref">{item.ref}</span> : null}
              </p>
              <h3 className="site-evo__title">{item.title}</h3>
              <p className="site-evo__detail">{item.body}</p>
              {item.href ? (
                <p className="mt-3">
                  <Link className="text-sm underline underline-offset-4" href={item.href}>
                    {item.hrefLabel || '了解更多 →'}
                  </Link>
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <p className="site-evo__note">
        想对照原始记录可看仓库{' '}
        <a
          className="underline underline-offset-4"
          href="https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
        的 tag 与 CHANGELOG；此处只保留公开可读的叙事节点。
      </p>
    </section>
  )
}
