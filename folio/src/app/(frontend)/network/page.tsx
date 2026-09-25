import type { Metadata } from 'next'
import Link from 'next/link'

import { NetworkAtlas, type AtlasZone } from '@/components/NetworkAtlas'
import { PageChrome } from '@/components/PageChrome'
import { getInstance } from '@/instance'

export const metadata: Metadata = {
  title: '站群地图',
  description: '本站栏目与站外入口一览。',
}

const ZONES: AtlasZone[] = [
  {
    id: 'see',
    title: '看',
    mark: 'N·01',
    blurb: '影像与文字',
    nodes: [
      { href: '/gallery', label: '画廊', note: '影像联系单' },
      { href: '/posts', label: '写作', note: '精选短文' },
      { href: '/research', label: '研究', note: '公开论文' },
    ],
  },
  {
    id: 'use',
    title: '用',
    mark: 'N·02',
    blurb: '工具与玩乐',
    nodes: [
      { href: '/tools', label: '工具', note: '时间 · 换算 · QR' },
      { href: '/fun', label: '玩乐', note: '天气 · 诗词 · 暗房玩具' },
      { href: '/projects', label: '项目', note: '生活向构建' },
    ],
  },
  {
    id: 'know',
    title: '识',
    mark: 'N·03',
    blurb: '身份与往来',
    nodes: [
      { href: '/about', label: '关于', note: '门禁履历' },
      { href: '/contact', label: '联系', note: '门禁留言' },
      { href: '/subscribe', label: '订阅', note: '低频通讯' },
      { href: '/updates', label: '更新', note: '近况与沿革' },
    ],
  },
]

export default function NetworkPage() {
  const instance = getInstance()
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
    >
      <div className="container max-w-5xl">
        <NetworkAtlas hubLabel={hub} zones={ZONES} away={away} />

        <p className="network-atlas__foot">
          站点怎么长到现在的：见{' '}
          <Link className="underline underline-offset-4" href="/updates#chronicle">
            更新 · 发展史
          </Link>
          。
        </p>
      </div>
    </PageChrome>
  )
}
