import Link from 'next/link'
import React from 'react'

import { getFeatures } from '@/instance'
import {
  elsewhereKindMeta,
  getVisibleElsewhere,
  groupElsewhereByKind,
} from '@/instance/elsewhere'

export function HomeElsewhere() {
  const features = getFeatures()
  const groups = groupElsewhereByKind(getVisibleElsewhere())

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
          Folio 是主站；菜谱、飞行记录、网络排查与实验台在子域。完整分区见
          {features.network ? (
            <Link href="/network" className="underline underline-offset-4 hover:text-foreground">
              站群地图
            </Link>
          ) : (
            '站群地图'
          )}
          。
        </p>

        <div className="home-elsewhere__groups">
          {groups.map(({ kind, items }) => {
            const meta = elsewhereKindMeta[kind]
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
                  {items.map((item) => (
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
