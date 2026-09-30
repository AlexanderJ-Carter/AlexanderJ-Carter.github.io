import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { getFeatures, getInstance } from '@/instance'

export const metadata: Metadata = {
  title: '实用工具',
  description: '轻量、本地优先、无需登录。把常用能力收在这里。',
}

export default function ToolsPage() {
  const instance = getInstance()
  const features = getFeatures()
  const onSite = [
    { href: '/time', title: '世界时间', desc: '多时区对照与复制', mark: 'Time' },
    { href: '/units', title: '单位换算', desc: '温度、长度、重量', mark: 'Units' },
    { href: '/currency', title: '汇率', desc: '主要货币换算参考', mark: 'FX' },
    { href: '/qr', title: 'QR 生成', desc: '链接转二维码', mark: 'QR' },
    ...(features.fun
      ? [
          {
            href: '/fun',
            title: '玩乐',
            desc: '暗房玩具柜：一帧、曝光、电台与计时',
            mark: 'Play',
          },
        ]
      : []),
    { href: '/gallery', title: '画廊', desc: '联系单观片', mark: 'Film' },
  ]
  const external = instance.elsewhere.filter(
    (e) => /tools|github|git\./i.test(`${e.name} ${e.host} ${e.href}`),
  )

  return (
    <PageChrome
      mark="Tools"
      title="实用工具"
      description="轻量、本地优先、无需登录。把常用能力收在这里。"
      related={[
        ...(features.fun ? [{ href: '/fun', label: '玩乐柜 →' }] : []),
        ...(features.network ? [{ href: '/network', label: '站群地图 →' }] : []),
        { href: '/projects', label: '项目 →' },
      ]}
    >
      <section className="container mb-16">
        <h2 className="folio-mark mb-5">站内</h2>
        <ul className="tools-mosaic">
          {onSite.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="tools-tile">
                <span className="tools-tile__mark">{item.mark}</span>
                <span className="tools-tile__title">{item.title}</span>
                <span className="tools-tile__desc">{item.desc}</span>
                <span className="tools-tile__path" aria-hidden>
                  {item.href}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {external.length > 0 ? (
        <section className="container">
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
          <p className="mt-6 text-xs text-muted-foreground">
            站内工具尽量在浏览器本地完成计算；外部站点来自实例 elsewhere，打开新标签访问。
          </p>
        </section>
      ) : null}
    </PageChrome>
  )
}
