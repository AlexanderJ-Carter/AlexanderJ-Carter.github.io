import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { getInstance } from '@/instance'

export const metadata: Metadata = {
  title: '项目',
  description: '生活向小项目与站点工具。',
}

export default function ProjectsPage() {
  const instance = getInstance()
  const intro =
    instance.projects?.intro ||
    '生活向小项目与站点工具。研究协作见研究页。'
  const items = instance.projects?.items || []
  const research = instance.research.project

  return (
    <PageChrome mark="Projects" title="项目" description={intro}>
      <div className="container max-w-3xl">
        {research ? (
          <div className="film-edge folio-section-tint mb-12 rounded-sm px-5 py-6 md:px-7">
            <p className="folio-mark mb-2">Research</p>
            <h2 className="mb-2 text-xl font-semibold tracking-tight">{research.title}</h2>
            <p className="mb-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {research.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a
                className="underline underline-offset-4"
                href={research.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {research.hrefLabel}
              </a>
              <Link className="underline underline-offset-4" href="/research">
                全部研究 →
              </Link>
            </div>
          </div>
        ) : null}

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            暂无条目。在 <code>instance/config.json</code> 填写 <code>projects.items</code>。
          </p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <li key={item.title} className="py-8">
                <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-lg font-semibold tracking-tight">{item.title}</h2>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {item.status}
                  </span>
                </div>
                <p className="mb-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                {item.tags && item.tags.length > 0 ? (
                  <p className="mb-4 font-mono text-[0.7rem] tracking-wide text-muted-foreground/80">
                    {item.tags.join(' · ')}
                  </p>
                ) : null}
                <div className="flex flex-wrap gap-4 text-sm">
                  {item.href ? (
                    <a
                      className="underline underline-offset-4"
                      href={item.href}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                    >
                      {item.hrefLabel || '源码 →'}
                    </a>
                  ) : null}
                  {item.demoHref ? (
                    <Link className="underline underline-offset-4" href={item.demoHref}>
                      {item.demoLabel || '打开 →'}
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageChrome>
  )
}
