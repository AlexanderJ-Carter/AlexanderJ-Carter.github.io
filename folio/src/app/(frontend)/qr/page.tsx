import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { QrTool } from '@/components/tools/QrTool'
import { getFeatures } from '@/instance'

export const metadata: Metadata = {
  title: 'QR 码生成',
  description: '输入链接或文字，即时生成二维码。',
}

export default function QrPage() {
  const features = getFeatures()

  return (
    <PageChrome
      mark="Folio QR"
      kicker="链接 · 文本转二维码"
      title="QR 码生成"
      related={[
        { href: '/tools', label: '全部工具 →' },
        { href: '/time', label: '世界时间 →' },
        ...(features.fun ? [{ href: '/fun', label: '玩乐 →' }] : []),
      ]}
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
