import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

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
    <footer className="mt-auto border-t border-border bg-card/40">
      <div className="container py-12 md:py-16 space-y-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-3">
            <Link className="inline-flex text-foreground no-underline" href="/">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              摄影与写作之外，也在做 LLM Agent 研究。文章在这里改完就能读。
            </p>
            <div className="pt-2">
              <ThemeSelector />
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="folio-mark mb-4">On this site</p>
            <nav className="flex flex-col gap-2.5">
              {navItems.map(({ link }, i) => {
                return (
                  <CMSLink
                    className="text-foreground/85 hover:text-primary text-sm"
                    key={i}
                    {...link}
                  />
                )
              })}
            </nav>
          </div>

          <div className="lg:col-span-5">
            <p className="folio-mark mb-4">Plate 03 · Elsewhere</p>
            <ul className="folio-directory divide-y divide-border/70 border-y border-border/70">
              {elsewhere.map((item) => (
                <li key={item.href}>
                  <a
                    className="group flex items-baseline justify-between gap-4 py-3 no-underline"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>
                      <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      <span className="block text-xs text-muted-foreground mt-0.5">
                        {item.desc}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground/80 font-mono tracking-tight">
                      {item.host} ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
