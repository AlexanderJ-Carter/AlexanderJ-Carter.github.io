import type { Metadata } from 'next'
import Link from 'next/link'

import { NetworkAtlas, type AtlasZone } from '@/components/NetworkAtlas'
import { PageChrome } from '@/components/PageChrome'
import { getAtlasZones } from '@/data/site-atlas'
import { getFeatures, getInstance } from '@/instance'

export const metadata: Metadata = {
  title: '站群地图',
  description: '本站栏目与站外入口一览。',
}

export default function NetworkPage() {
  const instance = getInstance()
  const features = getFeatures()
  const elsewhere = instance.elsewhere
  const hub =
    instance.siteUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'alexander.xin'

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

  return (
    <PageChrome
      mark="Network"
      title="站群地图"
      description="分区总图：本站看 / 用 / 识，以及站外入口。有问题直接右下角问站——天气、汇率也可以问。"
      related={[
        { href: '/updates#chronicle', label: '发展史 →' },
        { href: '/tools', label: '工具 →' },
        ...(features.fun ? [{ href: '/fun', label: '玩乐 →' }] : []),
        { href: '/posts', label: '写作 →' },
      ]}
    >
      <div className="container max-w-5xl">
        <NetworkAtlas hubLabel={hub} zones={getAtlasZones()} away={away} />

        <p className="network-atlas__foot">
          站点怎么长到现在的：见{' '}
          <Link className="underline underline-offset-4" href="/updates#chronicle">
            更新 · 发展史
          </Link>
          。想动手玩点本地工具，去{' '}
          <Link className="underline underline-offset-4" href="/tools">
            /tools
          </Link>
          {features.fun ? (
            <>
              {' '}
              或{' '}
              <Link className="underline underline-offset-4" href="/fun">
                /fun
              </Link>
            </>
          ) : null}
          。
        </p>
      </div>
    </PageChrome>
  )
}
