import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { Publications } from '@/components/Publications'
import { getInstance } from '@/instance'

export const metadata: Metadata = {
  title: '研究与论文',
  description: '公开论文与研究档案外链。',
}

export default function ResearchPage() {
  const instance = getInstance()
  const project = instance.research.project

  return (
    <PageChrome
      mark="Research"
      title="研究与论文"
      description={
        <>
          {instance.research.intro}{' '}
          <Link className="underline underline-offset-4" href="/about">
            关于
          </Link>
          （需访客验证）。
        </>
      }
    >
      <Publications />

      {project ? (
        <div className="container mt-14 max-w-4xl">
          <div className="film-edge folio-section-tint rounded-sm px-5 py-6 md:px-7">
            <p className="folio-mark mb-2">Project</p>
            <h2 className="mb-2 text-xl font-semibold tracking-tight">{project.title}</h2>
            <p className="mb-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <a
              className="text-sm underline underline-offset-4"
              href={project.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {project.hrefLabel}
            </a>
          </div>
        </div>
      ) : null}
    </PageChrome>
  )
}
