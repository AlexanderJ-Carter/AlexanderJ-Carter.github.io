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
  const dividerClass = cn(
    'mx-2 hidden h-3 w-px md:inline-block',
    overHero ? 'bg-white/35' : 'bg-border',
  )

  return (
    <nav className="flex items-center gap-1 md:gap-0" aria-label="主导航">
      {navItems.length > 0
        ? navItems.map(({ link }, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span aria-hidden className={dividerClass} />}
              <CMSLink {...link} appearance="link" className={linkClass} />
            </React.Fragment>
          ))
        : FALLBACK_NAV.map((item, i) => (
            <React.Fragment key={item.url}>
              {i > 0 && <span aria-hidden className={dividerClass} />}
              <Link href={item.url} className={linkClass}>
                {item.label}
              </Link>
            </React.Fragment>
          ))}
      <span
        aria-hidden
        className={cn('mx-2 hidden h-3 w-px sm:inline-block', overHero ? 'bg-white/35' : 'bg-border')}
      />
      <Link
        href="/search"
        className={cn(
          'site-nav-link inline-flex items-center gap-1.5 px-2 py-1',
          overHero ? 'text-white/80 hover:text-white' : 'text-foreground/70 hover:text-foreground',
        )}
      >
        <SearchIcon className="size-3.5 opacity-80" aria-hidden />
        <span className="sr-only md:not-sr-only">搜索</span>
      </Link>
      <span
        aria-hidden
        className={cn('mx-1.5 hidden h-3 w-px sm:inline-block', overHero ? 'bg-white/35' : 'bg-border')}
      />
      <ThemeSelector overHero={overHero} />
    </nav>
  )
}
