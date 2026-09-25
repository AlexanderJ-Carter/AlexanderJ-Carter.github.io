import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'

export const metadata: Metadata = {
  title: '实用工具',
  description: '轻量、本地优先、无需登录。把常用能力收在这里。',
}

const ON_SITE = [
  { href: '/time', title: '世界时间', desc: '多时区对照与复制', mark: 'Time' },
  { href: '/units', title: '单位换算', desc: '温度、长度、重量', mark: 'Units' },
  { href: '/currency', title: '汇率', desc: '主要货币换算参考', mark: 'FX' },
  { href: '/qr', title: 'QR 生成', desc: '链接转二维码', mark: 'QR' },
  { href: '/fun', title: '玩乐', desc: '番茄钟、曝光三角、电台与今日一帧', mark: 'Play' },
  { href: '/gallery', title: '画廊', desc: '联系单观片', mark: 'Film' },
]

const EXTERNAL = [
  {
    href: 'https://tools.alexander.xin',
    title: 'IT-Tools',
    desc: '开发者常用小工具合集（需登录访问）',
  },
  {
    href: 'https://github.com/AlexanderJ-Carter',
    title: 'GitHub',
    desc: '开源与实验仓库',
  },
]

export default function ToolsPage() {
  return (
    <PageChrome
      mark="Tools"
      title="实用工具"
      description="轻量、本地优先、无需登录。把常用能力收在这里。"
    >
      <section className="container mb-16">
        <h2 className="folio-mark mb-5">站内</h2>
        <ul className="tools-mosaic">
          {ON_SITE.map((item) => (
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

      <section className="container">
        <h2 className="folio-mark mb-5">站外</h2>
        <ul className="tools-external">
          {EXTERNAL.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tools-external__row"
              >
                <span>
                  <span className="tools-external__title">{item.title}</span>
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
          站内工具尽量在浏览器本地完成计算；外部站点为独立项目，打开新标签访问。
        </p>
      </section>
    </PageChrome>
  )
}
