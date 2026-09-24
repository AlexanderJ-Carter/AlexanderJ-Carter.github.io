'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType; overHero?: boolean }> = ({
  data,
  overHero,
}) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-1 md:gap-0" aria-label="主导航">
      {navItems.map(({ link }, i) => {
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <span
                aria-hidden
                className={cn(
                  'mx-2 hidden h-3 w-px md:inline-block',
                  overHero ? 'bg-white/35' : 'bg-border',
                )}
              />
            )}
            <CMSLink
              {...link}
              appearance="link"
              className={cn(
                'site-nav-link px-2 py-1',
                overHero
                  ? 'text-white/80 hover:text-white'
                  : 'text-foreground/70 hover:text-foreground',
              )}
            />
          </React.Fragment>
        )
      })}
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
    </nav>
  )
}
