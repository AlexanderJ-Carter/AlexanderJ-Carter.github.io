import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { getFeatures, getInstance } from '@/instance'

export const metadata: Metadata = {
  title: '项目',
  description: '生活向小项目与站点工具。',
}

export default function ProjectsPage() {
  const instance = getInstance()
  const features = getFeatures()
  const intro =
    instance.projects?.intro ||
    '生活向小项目与站点工具。研究协作见研究页。'
  const items = instance.projects?.items || []

  return (
    <PageChrome
      mark="Projects"
      title="项目"
      description={intro}
      related={[
        { href: '/research', label: '研究论文 →' },
        { href: '/agents', label: 'Agent 入口 →' },
        { href: '/tools', label: '实用工具 →' },
        ...(features.network ? [{ href: '/network', label: '站群地图 →' }] : []),
      ]}
    >
      <div className="container max-w-3xl">
        <p className="mb-10 text-sm text-muted-foreground">
          公开论文与研究协作见{' '}
          <Link href="/research" className="underline underline-offset-4">
            /research
          </Link>
          。
        </p>

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            暂无条目。在 <code>instance/config.json</code> 填写 <code>projects.items</code>。
          </p>
        ) : (
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.title} className="project-card">
                <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-lg font-semibold tracking-tight">{item.title}</h2>
                  <span className="rounded-full bg-accent/80 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                    {item.status}
                  </span>
                </div>
                <p className="mb-3 text-[0.925rem] leading-[1.65] text-muted-foreground">
                  {item.description}
                </p>
                {item.tags && item.tags.length > 0 ? (
                  <p className="mb-4 font-mono text-[0.68rem] tracking-wide text-muted-foreground/85">
                    {item.tags.join(' · ')}
                  </p>
                ) : null}
                <div className="flex flex-wrap gap-4 text-sm">
                  {item.href ? (
                    <a
                      className="font-medium text-primary underline decoration-primary/30 underline-offset-[0.2em] hover:decoration-primary"
                      href={item.href}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                    >
                      {item.hrefLabel || '源码 →'}
                    </a>
                  ) : null}
                  {item.demoHref ? (
                    <Link
                      className="font-medium text-primary underline decoration-primary/30 underline-offset-[0.2em] hover:decoration-primary"
                      href={item.demoHref}
                    >
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
