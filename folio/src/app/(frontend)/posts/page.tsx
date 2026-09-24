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
        <p className="folio-mark mb-3">写作</p>
        <h1 className="mb-4 text-4xl font-semibold tracking-tight">写作暂未开放</h1>
        <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
          站内文章区先收起来了。长文仍在博客；也可以先逛画廊、研究与小工具。
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href="https://blog.alexander.xin/writing/"
            className="underline underline-offset-4"
            rel="noopener noreferrer"
            target="_blank"
          >
            前往博客 →
          </a>
          <Link href="/gallery" className="underline underline-offset-4">
            画廊 →
          </Link>
          <Link href="/research" className="underline underline-offset-4">
            研究 →
          </Link>
          <Link href="/subscribe" className="underline underline-offset-4">
            订阅 →
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
