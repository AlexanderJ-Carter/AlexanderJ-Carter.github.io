import React from 'react'

type PageChromeProps = {
  mark: string
  kicker?: string
  title: string
  description?: React.ReactNode
  children: React.ReactNode
  className?: string
  /** Narrow the title block (legal pages) */
  narrow?: boolean
}

export function PageChrome({
  mark,
  kicker,
  title,
  description,
  children,
  className = '',
  narrow = false,
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
        </div>
      </section>
      {children}
    </article>
  )
}
