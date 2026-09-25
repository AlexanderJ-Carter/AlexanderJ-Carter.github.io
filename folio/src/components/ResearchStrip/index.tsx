import Link from 'next/link'
import React from 'react'

import { getPublications } from '@/data/publications'
import { getInstance } from '@/instance'

export function ResearchStrip() {
  const { research } = getInstance()
  const featured = getPublications({ limit: 2 })

  return (
    <section className="container py-2" aria-labelledby="research-heading">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="folio-mark mb-2">研究</p>
          <h2 id="research-heading" className="text-2xl md:text-3xl tracking-tight font-semibold">
            论文与研究
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base leading-relaxed">
            {research.intro}
          </p>
        </div>
        <Link
          href="/research"
          className="text-sm shrink-0 text-foreground/85 hover:text-primary transition-colors"
        >
          查看全部 →
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
                className="text-base md:text-lg font-semibold leading-snug tracking-tight hover:text-primary transition-colors [font-family:var(--font-display),Syne,system-ui,sans-serif]"
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
