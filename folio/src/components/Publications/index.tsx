import Link from 'next/link'
import React from 'react'

import { getPublications, getResearchProfiles, type Publication } from '@/data/publications'
import { getInstance } from '@/instance'

type Props = {
  compact?: boolean
  showProfiles?: boolean
}

function PubRow({ item, index }: { item: Publication; index: number }) {
  return (
    <article className="publication-row grid gap-3 border-b border-border py-5 md:grid-cols-[2.5rem_1fr_auto] md:items-start md:gap-6">
      <span className="meta-mono text-muted-foreground tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <p className="meta-mono text-muted-foreground mb-2">
          {item.year} · {item.venue}
        </p>
        <h3 className="text-lg md:text-xl font-semibold leading-snug tracking-tight [font-family:var(--font-display),Syne,system-ui,sans-serif]">
          {item.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2 md:justify-end">
        {item.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pub-chip"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </article>
  )
}

export function Publications({ compact = false, showProfiles = true }: Props) {
  const publications = getPublications()
  const profiles = getResearchProfiles()

  if (publications.length === 0 && !compact) {
    return (
      <section className="container max-w-4xl" aria-labelledby="publications-heading">
        <p className="folio-mark mb-3">Publications</p>
        <h2 id="publications-heading" className="text-2xl font-semibold tracking-tight mb-3">
          论文
        </h2>
        <p className="text-muted-foreground text-sm">
          尚未配置公开论文。复制 <code>instance/config.example.json</code> 为{' '}
          <code>instance/config.json</code> 并填写 <code>research.publications</code>。
        </p>
      </section>
    )
  }

  if (publications.length === 0) return null

  return (
    <section className={compact ? 'mt-12 md:mt-16' : ''} aria-labelledby="publications-heading">
      <div className={compact ? '' : 'container max-w-4xl'}>
        <div className="max-w-2xl mb-6 md:mb-8">
          <p className="folio-mark mb-3">Publications</p>
          <h2
            id="publications-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight"
          >
            论文
          </h2>
          {!compact && (
            <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
              {getInstance().research.intro}
            </p>
          )}
        </div>

        <div className="border-t border-border">
          {publications.map((item, i) => (
            <PubRow key={item.title} item={item} index={i} />
          ))}
        </div>

        {showProfiles && profiles.length > 0 && (
          <nav
            className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground"
            aria-label="学术档案外链"
          >
            {profiles.map((p) => (
              <a
                key={p.href}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-foreground hover:underline"
              >
                {p.label}
              </a>
            ))}
            {compact && (
              <Link
                href="/research"
                className="underline-offset-4 hover:text-foreground hover:underline"
              >
                公开研究页 →
              </Link>
            )}
          </nav>
        )}
      </div>
    </section>
  )
}
