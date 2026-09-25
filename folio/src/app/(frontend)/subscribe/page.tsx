import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { SubscribeForm } from '@/components/SubscribeForm'

export const metadata: Metadata = {
  title: '订阅',
  description: 'RSS 与不定期邮件通讯。',
}

export default function SubscribePage() {
  return (
    <PageChrome
      mark="订阅"
      title="订阅"
      description="不常发。有像样更新时才写一封——不是促销名单。"
    >
      <div className="container grid max-w-4xl gap-14 lg:grid-cols-2">
        <section>
          <p className="folio-mark mb-3">RSS</p>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">阅读器</h2>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            适合自己拉文章。站内写作恢复后会从这里更新。
          </p>
          <p>
            <a className="underline underline-offset-4" href="/feed.xml">
              /feed.xml →
            </a>
          </p>
          <p className="mt-8 text-sm text-muted-foreground">
            也可先逛{' '}
            <Link className="underline underline-offset-4" href="/gallery">
              画廊
            </Link>
            。
          </p>
        </section>

        <section>
          <p className="folio-mark mb-3">邮件</p>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">通讯名单</h2>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            提交后会收到一封短确认。名单在 Resend；你可随时在{' '}
            <Link className="underline underline-offset-4" href="/unsubscribe">
              退订页
            </Link>{' '}
            退出。
          </p>
          <SubscribeForm />
        </section>
      </div>
    </PageChrome>
  )
}
