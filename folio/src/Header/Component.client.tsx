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
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [overHero, setOverHero] = useState(false)
  const { setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Observe the homepage hero — don't rely on theme race with PageClient.
  useEffect(() => {
    const hero = document.querySelector('[data-site-hero]')
    if (!hero) {
      setOverHero(false)
      return
    }

    const update = () => {
      const rect = hero.getBoundingClientRect()
      // Still "over hero" while the hero covers most of the upper viewport.
      setOverHero(rect.bottom > 96 && rect.top < 120)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname])

  return (
    <header
      className={cn(
        'site-header fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow,color] duration-300',
        overHero
          ? 'border-b border-white/10 bg-black/50 text-white shadow-none backdrop-blur-md'
          : 'border-b border-transparent bg-background/92 text-foreground shadow-[0_1px_0_color-mix(in_oklch,var(--foreground)_6%,transparent)] backdrop-blur-md supports-[backdrop-filter]:bg-background/80',
      )}
      data-over-hero={overHero ? 'true' : 'false'}
    >
      <div className="container flex h-14 md:h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className={cn(
            'no-underline transition-opacity hover:opacity-80',
            overHero ? 'text-white' : 'text-foreground',
          )}
        >
          <Logo loading="eager" priority="high" />
        </Link>
        <HeaderNav data={data} overHero={overHero} />
      </div>
    </header>
  )
}
