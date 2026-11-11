import Link from 'next/link'
import React from 'react'

import { getPublications } from '@/data/publications'
import { getInstance } from '@/instance'

export function ResearchStrip() {
  const { research } = getInstance()
  const featured = getPublications({ limit: 2 })

  return (
    <section className="container py-2" aria-labelledby="research-heading">
      <div className="region-head region-head--row">
        <div>
          <p className="folio-mark mb-2">研究</p>
          <h2 id="research-heading" className="region-title">
            论文与研究
          </h2>
          <p className="region-lead mt-2">{research.intro}</p>
        </div>
        <Link href="/research" className="region-link shrink-0">
          查看全部
        </Link>
      </div>

      {featured.length > 0 ? (
        <ul className="research-strip-list list-none m-0 border-t border-border p-0">
          {featured.map((item) => (
            <li
              key={item.title}
              className="grid gap-1 border-b border-border py-4 md:grid-cols-[6.5rem_1fr] md:gap-6 md:items-baseline"
            >
              <span className="meta-mono text-muted-foreground tabular-nums">
                {item.year}
                <span className="mx-1.5 opacity-40">·</span>
                {item.venue}
              </span>
              <Link
                href="/research"
                className="text-base md:text-lg font-semibold leading-snug tracking-tight hover:text-primary transition-colors [font-family:var(--font-display),Outfit,system-ui,sans-serif]"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
