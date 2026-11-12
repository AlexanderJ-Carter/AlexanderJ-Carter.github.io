import type { Metadata } from 'next'
import Link from 'next/link'

import { NetworkAtlas, type AtlasZone } from '@/components/NetworkAtlas'
import { PageChrome } from '@/components/PageChrome'
import { getAtlasZones } from '@/data/site-atlas'
import { getFeatures, getInstance, getVisibleElsewhere } from '@/instance'
import { elsewhereKindMeta, groupElsewhereByKind } from '@/instance/elsewhere'
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

  const awayZones: AtlasZone[] = groupElsewhereByKind(elsewhere).map((group, index) => {
    const meta = elsewhereKindMeta[group.kind]
    return {
      id: `away-${group.kind}`,
      title: meta.title,
      mark: `E·${String(index + 1).padStart(2, '0')}`,
      blurb: meta.blurb,
      nodes: group.items.map((item) => ({
        href: item.href,
        label: item.name,
        note: item.desc || item.host,
        external: true,
      })),
    }
  })

  const probes = await getCachedProbes()
  const up = probes.results.filter((r) => r.ok && !r.skipped).length
  const down = probes.results.filter((r) => !r.ok && !r.skipped).length

  return (
    <PageChrome
      mark="Network"
      title="站群地图"
      description="分区总图：本站看 / 用 / 识，站外按生活、产品、工具与基建展开。点任一地点即可跳转；探活摘要见下方。"
      related={[
        { href: '/status', label: '服务状态' },
        { href: '/projects', label: '项目' },
        { href: '/agents', label: 'Agent' },
        { href: '/tools', label: '工具' },
        { href: '/research', label: '研究' },
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

        <NetworkAtlas hubLabel={hub} zones={getAtlasZones()} away={awayZones} />

        <p className="network-atlas__foot">
          站点怎么长到现在的，见{' '}
          <Link className="region-link" href="/updates#chronicle">
            更新 · 发展史
          </Link>
          。公开项目与源码入口在{' '}
          <Link className="region-link" href="/projects">
            项目
          </Link>
          ；本地工具见{' '}
          <Link className="region-link" href="/tools">
            实用工具
          </Link>
          {features.fun ? (
            <>
              {' '}
              与{' '}
              <Link className="region-link" href="/fun">
                玩乐
              </Link>
            </>
          ) : null}
          ；联邦登录与 MCP 见{' '}
          <Link className="region-link" href="/agents">
            Agent
          </Link>
          。
        </p>
      </div>
    </PageChrome>
  )
}
