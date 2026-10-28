import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

import { PageChrome } from '@/components/PageChrome'
import { ToolsHub } from '@/components/tools/ToolsHub'
import { getFeatures, getVisibleElsewhere } from '@/instance'

export const metadata: Metadata = {
  title: '实用工具',
  description: '时间、换算、汇率、QR、抽屉小工具与暗房助手——轻量、本地优先。',
}

export default function ToolsPage() {
  const features = getFeatures()
  const external = getVisibleElsewhere().filter(
    (e) => e.kind === 'tool' || (e.kind === 'infra' && /tools/i.test(e.name)),
  )

  return (
    <PageChrome
      mark="Tools"
      title="实用工具"
      description="时间、换算、汇率、QR、抽屉小工具，以及暗房助手。"
      related={[
        ...(features.fun ? [{ href: '/fun', label: '玩乐柜 →' }] : []),
        { href: '/agents', label: 'Agent 入口 →' },
        ...(features.network ? [{ href: '/network', label: '站群地图 →' }] : []),
      ]}
    >
      <section className="container mb-16">
        <Suspense fallback={<p className="text-sm text-muted-foreground">加载工具…</p>}>
          <ToolsHub />
        </Suspense>
      </section>

      <section className="container mb-16">
        <h2 className="folio-mark mb-5">给 AI / Agent</h2>
        <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
          问站与暗房助手经本站代理 OmniRoute；菜谱站另有 MCP / Skills。说明见{' '}
          <Link href="/agents" className="underline underline-offset-4">
            /agents
          </Link>
          。
        </p>
      </section>

      {external.length > 0 ? (
        <section className="container" id="away">
          <h2 className="folio-mark mb-5">站外</h2>
          <ul className="tools-external">
            {external.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tools-external__row"
                >
                  <span>
                    <span className="tools-external__title">{item.name}</span>
                    <span className="tools-external__desc">{item.desc}</span>
                  </span>
                  <span className="tools-external__arrow" aria-hidden>
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </PageChrome>
  )
}
