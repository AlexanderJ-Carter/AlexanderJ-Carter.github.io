import type { Metadata } from 'next'

import { PhishDrill } from '@/components/PhishDrill'

export const metadata: Metadata = {
  title: '账户风险提示 - 安全核验中心',
  description: '请完成账户安全核验',
  robots: { index: false, follow: false },
}

export default function AwarenessPage() {
  return (
    <div className="pt-16 pb-0 md:pt-16">
      <PhishDrill />
    </div>
  )
}
