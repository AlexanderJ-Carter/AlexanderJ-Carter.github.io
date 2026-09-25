import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { siteUpdates } from '@/data/updates'

export const metadata: Metadata = {
  title: '更新',
  description: '站点公开变更与近况。',
}

export default function UpdatesPage() {
  return (
    <PageChrome
      mark="Updates"
      title="更新"
      description={
        <>
          公开变更记录。想收到邮件通知可先{' '}
          <Link className="underline underline-offset-4" href="/subscribe">
            订阅
          </Link>
          。
        </>
      }
    >
      <div className="container max-w-3xl">
        <ol className="list-none m-0 border-t border-border p-0">
          {siteUpdates.map((item) => (
            <li key={`${item.date}-${item.title}`} className="border-b border-border py-6 md:py-7">
              <p className="meta-mono mb-2 text-muted-foreground">{item.date}</p>
              <h2 className="mb-2 text-xl font-semibold tracking-tight md:text-2xl">{item.title}</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.body}
              </p>
              {item.href ? (
                <p className="mt-3">
                  <Link className="text-sm underline underline-offset-4" href={item.href}>
                    {item.hrefLabel || '了解更多 →'}
                  </Link>
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-muted-foreground">
          临时通知仍可能出现在页角公告；完整履历在{' '}
          <Link className="underline underline-offset-4" href="/about">
            关于
          </Link>
          （需访客验证）。
        </p>
      </div>
    </PageChrome>
  )
}
