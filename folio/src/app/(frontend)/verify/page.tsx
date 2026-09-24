import type { Metadata } from 'next'
import { Suspense } from 'react'

import { VerifyGate } from '@/components/VerifyGate'
import { skipVerify } from '@/lib/site'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '访客验证',
  description: '完成人机验证后继续访问。',
  robots: { index: false, follow: false },
}

export default function VerifyPage() {
  if (skipVerify) {
    return (
      <div className="container py-20 max-w-lg">
        <p className="folio-mark mb-3">Gate</p>
        <h1 className="text-3xl font-semibold mb-3">开发环境已跳过验证</h1>
        <p className="text-muted-foreground mb-6">
          正式环境仍会要求 Turnstile。需要强制测试时可设 NEXT_PUBLIC_FORCE_VERIFY=true。
        </p>
        <a href="/about" className="underline underline-offset-4">
          继续前往关于页 →
        </a>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="container py-20 text-muted-foreground text-sm">加载验证…</div>
      }
    >
      <VerifyGate />
    </Suspense>
  )
}
