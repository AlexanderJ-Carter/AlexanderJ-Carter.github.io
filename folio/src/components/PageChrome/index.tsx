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
    <article className={`pt-28 pb-24 ${className}`.trim()}>
      <section className={`container mb-10 ${narrow ? 'max-w-3xl' : ''}`.trim()}>
        <div className={narrow ? undefined : 'max-w-2xl'}>
          <p className="folio-mark mb-3">{mark}</p>
          {kicker ? (
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">{kicker}</p>
          ) : null}
          <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description ? (
            <div className="text-lg leading-relaxed text-muted-foreground">{description}</div>
          ) : null}
          {related && related.length > 0 ? (
            <p className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </p>
          ) : null}
        </div>
      </section>
      {children}
    </article>
  )
}
