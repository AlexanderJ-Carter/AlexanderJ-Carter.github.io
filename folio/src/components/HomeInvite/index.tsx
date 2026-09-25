import Link from 'next/link'
import React from 'react'

const stops = [
  { href: '/gallery', label: '画廊', note: '联系单观片' },
  { href: '/posts', label: '写作', note: '精选短文' },
  { href: '/research', label: '研究', note: '论文入口' },
  { href: '/fun', label: '玩乐', note: '暗房玩具' },
] as const

/**
 * 首页收束条：取代 CMS 双栏「工作室 / 正在打磨」空话块。
 */
export function HomeInvite() {
  return (
    <section className="container home-invite" aria-labelledby="home-invite-heading">
      <div className="home-invite__frame">
        <p className="folio-mark mb-3">Next plate</p>
        <h2 id="home-invite-heading" className="home-invite__title">
          下一格胶片
        </h2>
        <p className="home-invite__lead">
          影像、短文、研究与玩具柜都在站内。关于与联系需访客验证后打开。
        </p>
        <ul className="home-invite__stops">
          {stops.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="home-invite__stop">
                <span className="home-invite__stop-label">{s.label}</span>
                <span className="home-invite__stop-note">{s.note}</span>
                <span className="home-invite__stop-path" aria-hidden>
                  {s.href}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="home-invite__foot">
          <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
            关于（需验证）
          </Link>
          <span aria-hidden className="mx-2 opacity-40">
            ·
          </span>
          <Link href="/network" className="underline underline-offset-4 hover:text-foreground">
            站群地图
          </Link>
        </p>
      </div>
    </section>
  )
}
