import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { CurrencyTool } from '@/components/tools/CurrencyTool'

export const metadata: Metadata = {
  title: '汇率',
  description: '主要货币参考汇率与本地换算。',
}

export default function CurrencyPage() {
  return (
    <PageChrome mark="Folio FX" title="汇率" description="实时参考汇率 · 本地换算">
      <div className="container">
        <CurrencyTool />
        <p className="mt-8">
          <Link href="/tools" className="text-sm underline underline-offset-4">
            ← 返回工具
          </Link>
        </p>
      </div>
    </PageChrome>
  )
}
