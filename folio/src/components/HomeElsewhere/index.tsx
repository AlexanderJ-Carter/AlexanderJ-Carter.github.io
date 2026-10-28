import Link from 'next/link'
import React from 'react'

import { getFeatures } from '@/instance'
import {
  elsewhereKindMeta,
  getVisibleElsewhere,
  groupElsewhereByKind,
} from '@/instance/elsewhere'

/** 首页站群摘要：每种最多 2 条，完整列表去 /network */
export function HomeElsewhere() {
  const features = getFeatures()
  const groups = groupElsewhereByKind(getVisibleElsewhere())
  const total = groups.reduce((n, g) => n + g.items.length, 0)

  if (groups.length === 0) return null

  return (
    <section className="container home-elsewhere" aria-labelledby="home-elsewhere-heading">
      <div className="home-elsewhere__frame">
        <p className="folio-mark mb-3">Elsewhere</p>
        <h2
          id="home-elsewhere-heading"
          className="home-invite__title text-[1.75rem] md:text-[2.1rem]"
        >
          站群入口
        </h2>
        <p className="home-invite__lead">
          共 {total} 个站外入口。完整分区（看 / 用 / 识）见
          {features.network ? (
            <>
              {' '}
              <Link href="/network" className="underline underline-offset-4 hover:text-foreground">
                站群地图
              </Link>
            </>
          ) : (
            ' 站群地图'
          )}
          ；公开探活见{' '}
          <Link href="/status" className="underline underline-offset-4 hover:text-foreground">
            /status
          </Link>
          。
        </p>

        <div className="home-elsewhere__groups">
          {groups.map(({ kind, items }) => {
            const meta = elsewhereKindMeta[kind]
            const preview = items.slice(0, 2)
            return (
              <div key={kind} className="home-elsewhere__group">
                <header className="home-elsewhere__group-head">
                  <span className="home-elsewhere__group-mark">{meta.mark}</span>
                  <div>
                    <h3 className="home-elsewhere__group-title">{meta.title}</h3>
                    <p className="home-elsewhere__group-blurb">{meta.blurb}</p>
                  </div>
                </header>
                <ul className="home-invite__stops">
                  {preview.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="home-invite__stop home-invite__stop--ext"
                      >
                        <span className="home-invite__stop-label">{item.name}</span>
                        <span className="home-invite__stop-note">{item.desc}</span>
                        <span className="home-invite__stop-path" aria-hidden>
                          {item.host}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                {items.length > 2 && features.network ? (
                  <p className="mt-3 text-xs text-muted-foreground">
                    另有 {items.length - 2} 个 →{' '}
                    <Link href="/network" className="underline underline-offset-4">
                      /network
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
