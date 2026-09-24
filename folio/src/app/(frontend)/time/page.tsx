import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { TimeTool } from '@/components/tools/TimeTool'

export const metadata: Metadata = {
  title: '世界时间',
  description: '多时区对照与一键复制。',
}

export default function TimePage() {
  return (
    <PageChrome
      mark="Folio Time"
      kicker="世界时区 · 标准时间"
      title="世界时间"
      description="一目了然的本地时间与常用时区，支持一键复制。"
    >
      <div className="container">
        <TimeTool />
        <p className="mt-8">
          <Link href="/tools" className="text-sm underline underline-offset-4">
            ← 返回工具
          </Link>
        </p>
      </div>
    </PageChrome>
  )
}
