'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
  fallbackNav: { label: string; url: string }[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, fallbackNav }) => {
  const [overHero, setOverHero] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    const hero = document.querySelector('[data-site-hero]')
    if (!hero) {
      setOverHero(false)
      return
    }

    const update = () => {
      const rect = hero.getBoundingClientRect()
      setOverHero(rect.bottom > 96 && rect.top < 64)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,box-shadow,color] duration-300',
        pathname === '/awareness' && 'hidden',
        overHero
          ? cn(
              'border-white/15 text-white',
              scrolled ? 'bg-black/40 backdrop-blur-md' : 'bg-black/25 backdrop-blur-sm',
            )
          : cn(
              'border-border/60 text-foreground',
              scrolled ? 'bg-background/96 shadow-sm backdrop-blur-md' : 'bg-background/92 backdrop-blur-sm',
            ),
      )}
      data-over-hero={overHero ? 'true' : 'false'}
    >
      <div className="container flex h-14 items-center gap-3 md:h-16 md:gap-5">
        <Link
          href="/"
          className={cn(
            'shrink-0 text-[1.15rem] font-semibold tracking-[-0.04em] no-underline transition-opacity hover:opacity-80 md:text-[1.25rem]',
            overHero ? 'text-white' : 'text-foreground',
          )}
          style={{ fontFamily: 'var(--font-display), Outfit, system-ui, sans-serif' }}
        >
          <Logo loading="eager" priority="high" />
        </Link>
        <HeaderNav data={data} fallbackNav={fallbackNav} overHero={overHero} />
      </div>
    </header>
  )
}
