import React from 'react'
import Link from 'next/link'

type RelatedLink = {
  href: string
  label: string
}

type PageChromeProps = {
  mark: string
  kicker?: string
  title: string
  description?: React.ReactNode
  children: React.ReactNode
  className?: string
  /** Narrow the title block (legal pages) */
  narrow?: boolean
  /** 页脚附近的互链，增强栏目有机结合 */
  related?: RelatedLink[]
}

const displayFont = { fontFamily: 'var(--font-display), Outfit, system-ui, sans-serif' } as const

function cleanLabel(label: string): string {
  const trimmed = label.replace(/\s*→\s*$/u, '').trim()
  if (trimmed.startsWith('/') && !trimmed.includes(' ')) return trimmed.slice(1) || trimmed
  return trimmed
}

export function PageChrome({
  mark,
  kicker,
  title,
  description,
  children,
  className = '',
  narrow = false,
  related,
}: PageChromeProps) {
  return (
    <article className={`pt-28 pb-24 md:pt-32 md:pb-28 ${className}`.trim()}>
      <section className={`container ${narrow ? 'max-w-3xl' : 'max-w-5xl'}`.trim()}>
        <div className={narrow ? undefined : 'max-w-3xl'}>
          <p className="folio-mark mb-3">{mark}</p>
          {kicker ? (
            <p className="mb-4 text-sm tracking-[0.16em] text-muted-foreground uppercase">
              {kicker}
            </p>
          ) : null}
          <h1
            className="mb-6 text-[clamp(2.2rem,4.2vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-foreground"
            style={displayFont}
          >
            {title}
          </h1>
          {description ? (
            <div className="max-w-2xl text-[1.1rem] leading-[1.7] text-muted-foreground md:text-[1.2rem]">
              {description}
            </div>
          ) : null}
          {related && related.length > 0 ? (
            <nav className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5" aria-label="相关栏目">
              {related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[0.92rem] font-medium tracking-[-0.01em] text-foreground/75 no-underline transition-colors hover:text-primary"
                  style={displayFont}
                >
                  {cleanLabel(item.label)}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </section>
      {children}
    </article>
  )
}
