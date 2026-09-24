import type { Metadata } from 'next'
import Link from 'next/link'

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
    <article className="pt-28 pb-24">
      <div className="container max-w-4xl mb-10 md:mb-14">
        <p className="folio-mark mb-3">Research</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">研究与论文</h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          {instance.research.intro}{' '}
          <Link className="underline underline-offset-4" href="/about">
            关于
          </Link>
          （需访客验证）。
        </p>
      </div>

      <Publications />

      {project && (
        <div className="container max-w-4xl mt-14">
          <div className="film-edge folio-section-tint rounded-sm px-5 py-6 md:px-7">
            <p className="folio-mark mb-2">Project</p>
            <h2 className="text-xl font-semibold tracking-tight mb-2">{project.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
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
      )}
    </article>
  )
}
