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
  const [theme, setTheme] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const overHero = theme === 'dark' && !scrolled

  return (
    <header
      className={cn(
        'site-header fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,color] duration-300',
        overHero
          ? 'border-b border-transparent bg-transparent text-white'
          : 'border-b border-border/50 bg-background/90 text-foreground backdrop-blur-md supports-[backdrop-filter]:bg-background/75',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
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
