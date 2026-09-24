import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { QrTool } from '@/components/tools/QrTool'

export const metadata: Metadata = {
  title: 'QR 码生成',
  description: '输入链接或文字，即时生成二维码。',
}

export default function QrPage() {
  return (
    <PageChrome
      mark="Folio QR"
      kicker="链接 · 文本转二维码"
      title="QR 码生成"
      description="输入链接或文字，即时生成二维码，可右键保存图片。"
    >
      <div className="container">
        <QrTool />
        <p className="mt-8">
          <Link href="/tools" className="text-sm underline underline-offset-4">
            ← 返回工具
          </Link>
        </p>
      </div>
    </PageChrome>
  )
}
