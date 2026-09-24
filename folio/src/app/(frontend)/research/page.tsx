import type { Metadata } from 'next'
import Link from 'next/link'

import { Publications } from '@/components/Publications'

export const metadata: Metadata = {
  title: '研究与论文',
  description: 'LLM Agent、多智能体与可执行社会科学相关论文与档案外链。',
}

export default function ResearchPage() {
  return (
    <article className="pt-28 pb-24">
      <div className="container max-w-4xl mb-10 md:mb-14">
        <p className="folio-mark mb-3">Research</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">研究与论文</h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          关注大语言模型智能体、多智能体系统与计算社会科学。公开条目与
          <a
            className="underline underline-offset-4 mx-1"
            href="https://github.com/AlexanderJ-Carter"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub 主页
          </a>
          对齐；详细个人简介需经访客验证后查看
          <Link className="underline underline-offset-4 mx-1" href="/about">
            关于
          </Link>
          。
        </p>
      </div>

      <Publications />

      <div className="container max-w-4xl mt-14">
        <div className="film-edge folio-section-tint rounded-sm px-5 py-6 md:px-7">
          <p className="folio-mark mb-2">Project</p>
          <h2 className="text-xl font-semibold tracking-tight mb-2">AgentSociety</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
            清华 FIB Lab 协作仓库：可执行社会模拟与多智能体研究环境。
          </p>
          <a
            className="text-sm underline underline-offset-4"
            href="https://github.com/tsinghua-fib-lab/AgentSociety"
            rel="noopener noreferrer"
            target="_blank"
          >
            tsinghua-fib-lab/AgentSociety ↗
          </a>
        </div>
      </div>
    </article>
  )
}
