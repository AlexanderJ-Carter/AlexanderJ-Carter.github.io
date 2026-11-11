import Link from 'next/link'
import React from 'react'

import { getFeatures } from '@/instance'
import {
  elsewhereKindMeta,
  getVisibleElsewhere,
  groupElsewhereByKind,
} from '@/instance/elsewhere'

const displayFont = { fontFamily: 'var(--font-display), Outfit, system-ui, sans-serif' } as const

/** 首页站群摘要：每种最多 2 条，完整列表去站群地图 */
export function HomeElsewhere() {
  const features = getFeatures()
  const groups = groupElsewhereByKind(getVisibleElsewhere())
  const total = groups.reduce((n, g) => n + g.items.length, 0)

  if (groups.length === 0) return null

  return (
    <section className="container py-2" aria-labelledby="home-elsewhere-heading">
      <div
        className="max-w-3xl border-t border-border/80 py-6"
        style={{ borderColor: 'color-mix(in oklch, var(--border) 85%, transparent)' }}
      >
        <p className="folio-mark mb-3">Elsewhere</p>
        <h2
          id="home-elsewhere-heading"
          className="m-0 text-[clamp(1.85rem,2.8vw,2.45rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-foreground"
          style={displayFont}
        >
          站群入口
        </h2>
        <p className="mt-2.5 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
          共 {total} 个站外入口，按生活、产品、工具与基建分区。
        </p>
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {features.network ? (
            <Link
              href="/network"
              className="text-[0.9rem] font-medium text-foreground/80 no-underline transition-colors hover:text-primary"
              style={displayFont}
            >
              站群地图
            </Link>
          ) : null}
          <Link
            href="/status"
            className="text-[0.9rem] font-medium text-foreground/80 no-underline transition-colors hover:text-primary"
            style={displayFont}
          >
            服务状态
          </Link>
        </p>

        <div
          className="mt-8 grid gap-8"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))' }}
        >
          {groups.map(({ kind, items }) => {
            const meta = elsewhereKindMeta[kind]
            const preview = items.slice(0, 2)
            const rest = items.length - preview.length
            return (
              <div key={kind}>
                <h3
                  className="m-0 text-[1.05rem] font-semibold tracking-[-0.02em] text-foreground"
                  style={displayFont}
                >
                  {meta.title}
                </h3>
                <p className="mt-1 text-[0.8rem] leading-snug text-muted-foreground">{meta.blurb}</p>
                <ul
                  className="mt-3 list-none border-t p-0"
                  style={{ borderColor: 'color-mix(in oklch, var(--border) 88%, transparent)' }}
                >
                  {preview.map((item) => (
                    <li
                      key={item.href}
                      className="border-b"
                      style={{ borderColor: 'color-mix(in oklch, var(--border) 88%, transparent)' }}
                    >
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-baseline justify-between gap-3 py-3.5 no-underline"
                      >
                        <span className="min-w-0">
                          <span
                            className="block text-[0.95rem] font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary"
                            style={displayFont}
                          >
                            {item.name}
                          </span>
                          {item.desc ? (
                            <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted-foreground">
                              {item.desc}
                            </span>
                          ) : null}
                        </span>
                        <span className="shrink-0 font-mono text-[0.62rem] tracking-wide text-muted-foreground transition-colors group-hover:text-foreground">
                          {item.host}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                {rest > 0 && features.network ? (
                  <p className="mt-3 text-[0.8rem] text-muted-foreground">
                    另有 {rest} 个 ·{' '}
                    <Link
                      href="/network"
                      className="font-medium text-foreground/80 no-underline transition-colors hover:text-primary"
                      style={displayFont}
                    >
                      查看全部
                    </Link>
                  </p>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
