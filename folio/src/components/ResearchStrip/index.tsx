import Link from 'next/link'
import React from 'react'

export function ResearchStrip() {
  return (
    <section className="container py-2" aria-labelledby="research-heading">
      <div className="film-edge folio-section-tint rounded-sm px-5 py-7 md:px-8 md:py-8">
        <p className="folio-mark mb-3">Research</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="research-heading" className="text-2xl md:text-3xl tracking-tight font-semibold">
              论文与研究
            </h2>
            <p className="mt-2 text-muted-foreground text-sm md:text-base leading-relaxed">
              公开列出 arXiv / 会议论文与项目入口；个人履历不在首页展开。
            </p>
          </div>
          <Link
            href="/research"
            className="text-sm shrink-0 text-foreground/85 hover:text-primary transition-colors"
          >
            查看论文 →
          </Link>
        </div>
      </div>
    </section>
  )
}
