import type { Metadata } from 'next'
import Link from 'next/link'

import { NetworkAtlas, type AtlasZone } from '@/components/NetworkAtlas'
import { PageChrome } from '@/components/PageChrome'
import { getAtlasZones } from '@/data/site-atlas'
import { getFeatures, getInstance, getVisibleElsewhere } from '@/instance'
import { getCachedProbes } from '@/utilities/probeStatus'

export const metadata: Metadata = {
  title: '站群地图',
  description: '本站栏目与站外入口一览。',
}

export const revalidate = 60

export default async function NetworkPage() {
  const instance = getInstance()
  const features = getFeatures()
  const elsewhere = getVisibleElsewhere()
  const rawHub =
    instance.siteUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '') || ''
  const hub =
    !rawHub || /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(rawHub)
      ? instance.siteName || 'alexander.xin'
      : rawHub

  const away: AtlasZone | null =
    elsewhere.length > 0
      ? {
        id: 'away',
        title: '站外',
        mark: 'E·01',
        blurb: '仍在开着的别的门口',
        nodes: elsewhere.map((item) => ({
          href: item.href,
          label: item.name,
          note: item.desc || item.host,
          external: true,
        })),
      }
      : null

  const probes = await getCachedProbes()
  const up = probes.results.filter((r) => r.ok && !r.skipped).length
  const down = probes.results.filter((r) => !r.ok && !r.skipped).length

  return (
    <PageChrome
      mark="Network"
      title="站群地图"
      description="分区总图：本站看 / 用 / 识，以及站外入口。有问题直接右下角问站——天气、汇率也可以问。"
      related={[
        { href: '/status', label: '服务状态' },
        { href: '/agents', label: 'Agent' },
        { href: '/tools', label: '工具' },
        { href: '/updates#chronicle', label: '发展史' },
      ]}
    >
      <div className="container max-w-5xl">
        <p className="mb-8 text-sm text-muted-foreground">
          公开探活摘要：正常 {up} · 异常 {down} ·{' '}
          <Link href="/status" className="region-link">
            查看详情
          </Link>
        </p>

        <NetworkAtlas hubLabel={hub} zones={getAtlasZones()} away={away} />

        <p className="network-atlas__foot">
          站点怎么长到现在的，见{' '}
          <Link className="region-link" href="/updates#chronicle">
            更新 · 发展史
          </Link>
          。想动手玩本地工具，去{' '}
          <Link className="region-link" href="/tools">
            实用工具
          </Link>
          {features.fun ? (
            <>
              {' '}
              或{' '}
              <Link className="region-link" href="/fun">
                玩乐
              </Link>
            </>
          ) : null}
          。Agent 入口见{' '}
          <Link className="region-link" href="/agents">
            Agent
          </Link>
          。
        </p>
      </div>
    </PageChrome>
  )
}
