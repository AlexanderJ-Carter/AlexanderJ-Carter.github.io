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
    <article className={`pt-24 pb-20 md:pt-28 md:pb-24 ${className}`.trim()}>
      <section
        className={`container page-chrome__header ${narrow ? 'max-w-3xl' : 'max-w-4xl'}`.trim()}
      >
        <div className={narrow ? undefined : 'max-w-2xl'}>
          <p className="folio-mark mb-3">{mark}</p>
          {kicker ? (
            <p className="mb-3 text-sm tracking-[0.14em] text-muted-foreground">{kicker}</p>
          ) : null}
          <h1 className="page-chrome__title mb-5 text-[2.35rem] sm:text-5xl md:text-[3.25rem]">
            {title}
          </h1>
          {description ? (
            <div className="max-w-xl text-base leading-[1.7] text-muted-foreground md:text-lg">
              {description}
            </div>
          ) : null}
          {related && related.length > 0 ? (
            <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5 text-sm">
              {related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground/75 underline decoration-primary/35 underline-offset-[0.22em] transition-colors hover:text-primary"
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
