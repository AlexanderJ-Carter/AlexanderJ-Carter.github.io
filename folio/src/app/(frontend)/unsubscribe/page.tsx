import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { UnsubscribeForm } from '@/components/UnsubscribeForm'

export const metadata: Metadata = {
  title: '退订',
  description: '退出本站邮件通讯名单。',
  robots: { index: false, follow: false },
}

export default function UnsubscribePage() {
  return (
    <PageChrome
      mark="退订"
      title="退订邮件"
      description="填入当时订阅的邮箱即可。不会再收到本站通讯。"
    >
      <div className="container max-w-md">
        <UnsubscribeForm />
        <p className="mt-8 text-sm text-muted-foreground">
          想再订回来？去{' '}
          <Link className="underline underline-offset-4" href="/subscribe">
            订阅页
          </Link>
          。
        </p>
      </div>
    </PageChrome>
  )
}
