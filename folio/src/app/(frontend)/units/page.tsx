import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { UnitsTool } from '@/components/tools/UnitsTool'

export const metadata: Metadata = {
  title: '单位换算',
  description: '温度、长度、重量本地换算。',
}

export default function UnitsPage() {
  return (
    <PageChrome
      mark="Folio Units"
      kicker="温度 · 长度 · 重量"
      title="单位换算"
      related={[
        { href: '/tools', label: '全部工具 →' },
        { href: '/time', label: '世界时间 →' },
        { href: '/currency', label: '汇率 →' },
      ]}
      description="常用单位互转，实时换算。"
    >
      <div className="container">
        <UnitsTool />
        <p className="mt-8">
          <Link href="/tools" className="text-sm underline underline-offset-4">
            ← 返回工具
          </Link>
        </p>
      </div>
    </PageChrome>
  )
}
