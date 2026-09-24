import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'

export const metadata: Metadata = {
  title: '实用工具',
  description: '轻量、本地优先、无需登录。把常用能力收在这里。',
}

const ON_SITE = [
  { href: '/time', title: '世界时间', desc: '多时区对照与复制' },
  { href: '/units', title: '单位换算', desc: '温度、长度、重量' },
  { href: '/currency', title: '汇率', desc: '主要货币换算参考' },
  { href: '/qr', title: 'QR 生成', desc: '链接转二维码' },
  { href: '/fun', title: '玩乐', desc: '番茄钟、曝光三角、电台与今日一帧' },
  { href: '/gallery', title: '画廊', desc: '联系单观片' },
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
      <section className="container mb-14">
        <h2 className="mb-4 text-sm uppercase tracking-[0.16em] text-muted-foreground">站内工具</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ON_SITE.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block border border-border p-5 no-underline transition-colors hover:border-foreground"
              >
                <span className="block text-base font-medium text-foreground">{item.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{item.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container">
        <h2 className="mb-4 text-sm uppercase tracking-[0.16em] text-muted-foreground">外部站点</h2>
        <ul className="divide-y divide-border border-y border-border">
          {EXTERNAL.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 py-4 no-underline sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span>
                  <span className="block font-medium text-foreground">{item.title}</span>
                  <span className="block text-sm text-muted-foreground">{item.desc}</span>
                </span>
                <span className="font-mono text-xs text-muted-foreground">↗</span>
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
