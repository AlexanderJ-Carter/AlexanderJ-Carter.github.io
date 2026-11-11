import Link from 'next/link'
import React from 'react'

import { getFeatures } from '@/instance'

const displayFont = { fontFamily: 'var(--font-display), Outfit, system-ui, sans-serif' } as const

/**
 * 首页收束条：站内下一站，不把路径当文案。
 */
export function HomeInvite() {
  const features = getFeatures()
  const stops = [
    { href: '/gallery', label: '画廊', note: '联系单观片' },
    { href: '/posts', label: '写作', note: '精选短文' },
    { href: '/research', label: '研究', note: '论文入口' },
    { href: '/tools', label: '工具', note: '换算 · 助手' },
    ...(features.fun ? [{ href: '/fun', label: '玩乐', note: '暗房玩具' }] : []),
    { href: '/agents', label: 'Agent', note: '给 AI 用' },
  ]

  return (
    <section className="container py-2" aria-labelledby="home-invite-heading">
      <div
        className="max-w-xl border-t py-6"
        style={{ borderColor: 'color-mix(in oklch, var(--border) 85%, transparent)' }}
      >
        <p className="folio-mark mb-3">Next plate</p>
        <h2
          id="home-invite-heading"
          className="m-0 text-[clamp(1.85rem,2.8vw,2.45rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-foreground"
          style={displayFont}
        >
          下一格胶片
        </h2>
        <p className="mt-2.5 text-[1.05rem] leading-relaxed text-muted-foreground">
          影像、短文、研究与工具都在站内；子域产品见上方站群入口。关于与联系需访客验证。
        </p>
        <ul
          className="mt-6 list-none gap-x-5 p-0"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(11rem, 1fr))',
          }}
        >
          {stops.map((s) => (
            <li
              key={s.href}
              className="border-t"
              style={{ borderColor: 'color-mix(in oklch, var(--border) 85%, transparent)' }}
            >
              <Link
                href={s.href}
                className="group block py-3.5 no-underline transition-colors hover:bg-muted/50"
              >
                <span
                  className="block text-[0.98rem] font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary"
                  style={displayFont}
                >
                  {s.label}
                </span>
                <span className="mt-0.5 block text-[0.8rem] text-muted-foreground">{s.note}</span>
              </Link>
            </li>
          ))}
        </ul>
        <nav className="mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="延伸阅读">
          <Link
            href="/about"
            className="text-[0.9rem] font-medium text-foreground/80 no-underline transition-colors hover:text-primary"
            style={displayFont}
          >
            关于
          </Link>
          {features.network ? (
            <Link
              href="/network"
              className="text-[0.9rem] font-medium text-foreground/80 no-underline transition-colors hover:text-primary"
              style={displayFont}
            >
              站群地图
            </Link>
          ) : null}
          <Link
            href="/status"
            className="text-[0.9rem] font-medium text-foreground/80 no-underline transition-colors hover:text-primary"
            style={displayFont}
          >
            服务状态
          </Link>
        </nav>
      </div>
    </section>
  )
}
