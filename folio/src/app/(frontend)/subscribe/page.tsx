import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { SubscribeForm } from '@/components/SubscribeForm'

export const metadata: Metadata = {
  title: '订阅',
  description: 'RSS 与邮件订阅。',
}

export default function SubscribePage() {
  return (
    <PageChrome
      mark="Subscribe"
      title="订阅"
      description="写作暂缓时，RSS 仍会随发布更新；邮件用于以后偶发通讯，不是营销轰炸。"
    >
      <div className="container grid max-w-4xl gap-14 lg:grid-cols-2">
        <section>
          <p className="folio-mark mb-3">RSS</p>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">阅读器订阅</h2>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            把 feed 加进任意 RSS 阅读器。文章区恢复后会从这里推送。
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
          <p className="folio-mark mb-3">Email</p>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">邮件订阅</h2>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            加入通讯名单。可随时退订；地址只用于本站相关通知。
          </p>
          <SubscribeForm />
        </section>
      </div>
    </PageChrome>
  )
}
