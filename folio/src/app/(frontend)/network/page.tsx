import type { Metadata } from 'next'
import Link from 'next/link'

import { ElsewhereList } from '@/components/ElsewhereList'
import { PageChrome } from '@/components/PageChrome'
import { getInstance } from '@/instance'

export const metadata: Metadata = {
  title: '站群地图',
  description: '本站栏目与站外入口一览。',
}

const HERE = [
  { href: '/gallery', label: '画廊', note: '影像联系单' },
  { href: '/posts', label: '写作', note: '精选短文' },
  { href: '/research', label: '研究', note: '公开论文' },
  { href: '/projects', label: '项目', note: '生活向构建' },
  { href: '/tools', label: '工具', note: '时间 · 换算 · QR' },
  { href: '/fun', label: '玩乐', note: '暗房小玩具' },
  { href: '/about', label: '关于', note: '门禁履历' },
  { href: '/contact', label: '联系', note: '门禁留言' },
  { href: '/subscribe', label: '订阅', note: '低频通讯' },
  { href: '/updates', label: '更新', note: '站务日志' },
] as const

export default function NetworkPage() {
  const instance = getInstance()
  const elsewhere = instance.elsewhere

  return (
    <PageChrome
      mark="Network"
      title="站群地图"
      description="一张图看清本站栏目，以及站外还开着的入口。有问题直接右下角问站。"
    >
      <div className="container max-w-3xl">
        <section className="network-map" aria-labelledby="network-here">
          <h2 id="network-here" className="network-map__heading">
            本站
          </h2>
          <ul className="network-map__list">
            {HERE.map((item) => (
              <li key={item.href}>
                <Link className="network-map__row" href={item.href}>
                  <span className="network-map__row-main">
                    <span className="network-map__label">{item.label}</span>
                    <span className="network-map__note">{item.note}</span>
                  </span>
                  <span className="network-map__path">{item.href}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {elsewhere.length > 0 ? (
          <section className="network-map network-map--away" aria-labelledby="network-away">
            <h2 id="network-away" className="network-map__heading">
              站外
            </h2>
            <ElsewhereList items={elsewhere} />
          </section>
        ) : null}
      </div>
    </PageChrome>
  )
}
