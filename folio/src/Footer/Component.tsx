import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'

const elsewhere = [
  {
    name: 'MyCook',
    host: 'cook.alexander.xin',
    href: 'https://cook.alexander.xin',
    desc: '菜谱与厨房笔记',
  },
  {
    name: 'Gitea',
    host: 'git.alexander.xin',
    href: 'https://git.alexander.xin',
    desc: '自建代码仓库',
  },
  {
    name: 'IT-Tools',
    host: 'tools.alexander.xin',
    href: 'https://tools.alexander.xin',
    desc: '常用小工具箱',
  },
  {
    name: 'GitHub',
    host: 'github.com/AlexanderJ-Carter',
    href: 'https://github.com/AlexanderJ-Carter',
    desc: '公开仓库与实验',
  },
]

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="site-footer mt-auto">
      <div className="container py-14 md:py-20">
        <div className="mb-12 md:mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="folio-mark site-footer__mark">Folio · Alexander Carter</p>
            <Link href="/" className="inline-block no-underline text-inherit hover:opacity-80">
              <span className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] [font-family:var(--font-display),Syne,system-ui,sans-serif]">
                Alexander Carter
              </span>
            </Link>
            <p className="text-sm md:text-base leading-relaxed text-white/65 max-w-md">
              摄影与写作之外，也在做 LLM Agent 研究。改完就能读。
            </p>
          </div>
          <div className="shrink-0 [&_button]:text-white/70 [&_span]:text-white/70">
            <ThemeSelector />
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:gap-8 border-t border-white/12 pt-10">
          <div className="md:col-span-3">
            <p className="site-footer__label">本站</p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  className="site-footer__link"
                  key={i}
                  {...link}
                />
              ))}
              <Link className="site-footer__link" href="/posts">
                写作
              </Link>
              <Link className="site-footer__link" href="/contact">
                联系
              </Link>
            </nav>
          </div>

          <div className="md:col-span-9">
            <p className="site-footer__label">Elsewhere</p>
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {elsewhere.map((item) => (
                <li key={item.href}>
                  <a
                    className="group flex flex-col gap-1 py-3.5 no-underline sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>
                      <span className="block text-[0.95rem] font-medium text-white group-hover:text-[color:var(--footer-accent)] transition-colors">
                        {item.name}
                      </span>
                      <span className="block text-sm text-white/50 mt-0.5">{item.desc}</span>
                    </span>
                    <span className="shrink-0 font-mono text-[0.7rem] tracking-wide text-white/40 group-hover:text-white/70 transition-colors">
                      {item.host} ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs tracking-wide text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Alexander Carter</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-1" aria-label="法律与安全">
            <Link className="hover:text-white/70 transition-colors" href="/privacy">
              隐私
            </Link>
            <Link className="hover:text-white/70 transition-colors" href="/terms">
              条款
            </Link>
            <Link className="hover:text-white/70 transition-colors" href="/security/policy">
              安全
            </Link>
            <a
              className="hover:text-white/70 transition-colors"
              href="/.well-known/security.txt"
            >
              security.txt
            </a>
          </nav>
          <p className="font-mono uppercase tracking-[0.16em]">Darkroom Folio</p>
        </div>
      </div>
    </footer>
  )
}
