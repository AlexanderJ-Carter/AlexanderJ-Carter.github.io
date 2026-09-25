'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

/** CMS 为空时的回退导航（与 configure-nav.mjs 对齐） */
const FALLBACK_NAV = [
  { label: '画廊', url: '/gallery' },
  { label: '写作', url: '/posts' },
  { label: '玩乐', url: '/fun' },
  { label: '工具', url: '/tools' },
  { label: '研究', url: '/research' },
  { label: '项目', url: '/projects' },
  { label: '关于', url: '/about' },
  { label: '联系', url: '/contact' },
  { label: '订阅', url: '/subscribe' },
] as const

export const HeaderNav: React.FC<{ data: HeaderType; overHero?: boolean }> = ({
  data,
  overHero,
}) => {
  const navItems = data?.navItems || []
  const linkClass = cn(
    'site-nav-link px-2 py-1',
    overHero ? 'text-white/80 hover:text-white' : 'text-foreground/70 hover:text-foreground',
  )

  return (
    <nav className="flex items-center gap-0.5 md:gap-1" aria-label="主导航">
      {navItems.length > 0
        ? navItems.map(({ link }, i) => (
            <CMSLink key={i} {...link} appearance="link" className={linkClass} />
          ))
        : FALLBACK_NAV.map((item) => (
            <Link key={item.url} href={item.url} className={linkClass}>
              {item.label}
            </Link>
          ))}
      <Link
        href="/search"
        className={cn(
          'site-nav-link ml-1 inline-flex items-center gap-1.5 px-2 py-1',
          overHero ? 'text-white/80 hover:text-white' : 'text-foreground/70 hover:text-foreground',
        )}
      >
        <SearchIcon className="size-3.5 opacity-80" aria-hidden />
        <span className="sr-only md:not-sr-only">搜索</span>
      </Link>
      <ThemeSelector overHero={overHero} className="ml-0.5" />
    </nav>
  )
}
