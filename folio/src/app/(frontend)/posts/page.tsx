import type { Metadata } from 'next/types'
import Link from 'next/link'
import React from 'react'

import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default function Page() {
  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container max-w-2xl">
        <p className="folio-mark mb-3">Writing</p>
        <h1 className="mb-4 text-4xl font-semibold tracking-tight">写作暂未开放</h1>
        <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
          文章区先收起来了。眼下请先逛画廊、玩乐和小工具。
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/gallery" className="underline underline-offset-4">
            画廊 →
          </Link>
          <Link href="/fun" className="underline underline-offset-4">
            玩乐 →
          </Link>
          <Link href="/tools" className="underline underline-offset-4">
            工具 →
          </Link>
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: '写作暂未开放',
  }
}
