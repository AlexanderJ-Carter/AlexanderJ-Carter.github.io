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
              AgentSociety
            </h2>
            <p className="mt-2 text-muted-foreground text-sm md:text-base leading-relaxed">
              清华 FIB Lab 协作：LLM 社会智能体与可执行社会科学。扩展、文档与社会人仿真技能。
            </p>
          </div>
          <Link
            href="/about"
            className="text-sm shrink-0 text-foreground/85 hover:text-primary transition-colors"
          >
            研究档案 →
          </Link>
        </div>
      </div>
    </section>
  )
}
