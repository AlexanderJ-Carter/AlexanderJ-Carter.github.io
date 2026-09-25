import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { SiteChronicle } from '@/components/SiteChronicle'
import { siteUpdates } from '@/data/updates'

export const metadata: Metadata = {
  title: '更新',
  description: '站点近况与从静态页到 Folio 的发展史。',
}

export default function UpdatesPage() {
  return (
    <PageChrome
      mark="Updates"
      title="更新"
      description={
        <>
          近况变更，以及从纯静态到 Astro、再到 Folio 的完整发展史。邮件通知见{' '}
          <Link className="underline underline-offset-4" href="/subscribe">
            订阅
          </Link>
          ；站群总览见{' '}
          <Link className="underline underline-offset-4" href="/network">
            地图
          </Link>
          。
        </>
      }
    >
      <div className="container max-w-4xl">
        <div id="chronicle" className="scroll-mt-24">
          <SiteChronicle />
        </div>

        <section className="mt-16 md:mt-20" aria-labelledby="updates-recent">
          <p className="folio-mark mb-3">Recent</p>
          <h2
            id="updates-recent"
            className="mb-6 text-2xl font-semibold tracking-tight md:mb-8 md:text-3xl"
          >
            近况
          </h2>
          <ol className="updates-rail list-none m-0 border-t border-border p-0">
            {siteUpdates.map((item) => (
              <li key={`${item.date}-${item.title}`} className="updates-rail__item">
                <p className="meta-mono mb-2 text-muted-foreground">{item.date}</p>
                <h3 className="mb-2 text-xl font-semibold tracking-tight md:text-2xl">
                  {item.title}
                </h3>
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
        </section>

        <p className="mt-10 text-sm text-muted-foreground">
          临时通知仍可能出现在页角公告；个人履历在{' '}
          <Link className="underline underline-offset-4" href="/about">
            关于
          </Link>
          （需访客验证）。
        </p>
      </div>
    </PageChrome>
  )
}
