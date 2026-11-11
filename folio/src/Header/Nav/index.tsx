'use client'

import React, { useCallback, useEffect, useId, useMemo, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'
import { Menu, SearchIcon, X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

type NavItem = { label: string; url: string }

const PRIMARY_ORDER = ['/gallery', '/posts', '/research', '/tools', '/projects', '/about'] as const

const displayFont = { fontFamily: 'var(--font-display), Outfit, system-ui, sans-serif' } as const

function resolveNavItems(data: HeaderType, fallbackNav: NavItem[]): NavItem[] {
  const navItems = data?.navItems || []
  if (navItems.length > 0) {
    return navItems
      .map(({ link }) => {
        const label = link?.label
        if (!label) return null
        const href =
          link?.type === 'reference' &&
          typeof link.reference?.value === 'object' &&
          link.reference.value &&
          'slug' in link.reference.value &&
          link.reference.value.slug
            ? `${link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''}/${link.reference.value.slug}`
            : link?.url
        if (!href) return null
        return { label, url: href }
      })
      .filter((item): item is NavItem => item !== null)
  }
  return fallbackNav
}

export const HeaderNav: React.FC<{
  data: HeaderType
  fallbackNav: NavItem[]
  overHero?: boolean
}> = ({ data, fallbackNav, overHero }) => {
  const sheetId = useId()
  const [menuOpen, setMenuOpen] = useState(false)
  const items = resolveNavItems(data, fallbackNav)

  const primary = useMemo(() => {
    const matched = PRIMARY_ORDER.map((href) => items.find((item) => item.url === href)).filter(
      (item): item is NavItem => Boolean(item),
    )
    if (matched.length > 0) return matched
    return items.slice(0, 5)
  }, [items])

  const linkClass = cn(
    'inline-flex h-9 shrink-0 items-center px-2 text-[0.9rem] font-medium tracking-[-0.01em] no-underline transition-colors',
    overHero ? 'text-white/85 hover:text-white' : 'text-foreground/75 hover:text-foreground',
  )

  const toolBtn = cn(
    'inline-flex size-9 shrink-0 items-center justify-center rounded-md transition-colors',
    overHero
      ? 'text-white/85 hover:bg-white/12 hover:text-white'
      : 'text-foreground/70 hover:bg-muted hover:text-foreground',
  )

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen, closeMenu])

  return (
    <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
      <nav
        className="mr-1 flex min-w-0 max-w-full items-center gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="主导航"
        style={displayFont}
      >
        {primary.map((item) => (
          <Link key={item.url} href={item.url} className={linkClass}>
            {item.label}
          </Link>
        ))}
      </nav>

      <Link href="/search" className={toolBtn} aria-label="搜索">
        <SearchIcon className="size-4" aria-hidden />
      </Link>
      <ThemeSelector overHero={overHero} className="!size-9 !rounded-md" />
      <button
        type="button"
        className={cn(
          'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border px-2.5 text-[0.86rem] font-medium transition-colors',
          overHero
            ? 'border-white/30 bg-white/12 text-white hover:bg-white/18'
            : 'border-border bg-muted/70 text-foreground hover:bg-muted',
        )}
        style={displayFont}
        aria-expanded={menuOpen}
        aria-controls={sheetId}
        aria-label={menuOpen ? '关闭菜单' : '打开完整目录'}
        onClick={() => setMenuOpen((o) => !o)}
      >
        {menuOpen ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
        <span>更多</span>
      </button>

      {menuOpen ? (
        <div
          id={sheetId}
          className="fixed inset-0 z-[60] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="站点导航"
        >
          <button
            type="button"
            className="absolute inset-0 bg-foreground/40"
            aria-label="关闭菜单"
            onClick={closeMenu}
          />
          <div
            className="relative h-full w-[min(18.5rem,88vw)] overflow-y-auto border-l border-border bg-card px-4 py-5 shadow-[-12px_0_40px_rgb(0_0_0_/_0.14)]"
            style={displayFont}
          >
            <div className="mb-5 flex items-center justify-between gap-2 border-b border-border pb-4">
              <div>
                <p className="mb-1 text-xs tracking-[0.14em] text-muted-foreground uppercase">目录</p>
                <p className="text-xl font-semibold tracking-[-0.03em]">本站导航</p>
              </div>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="关闭菜单"
                onClick={closeMenu}
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <ul className="m-0 flex list-none flex-col p-0">
              {items.map((item, index) => (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    className="flex min-h-11 items-center gap-3 rounded-md px-2 py-2 no-underline transition-colors hover:bg-muted"
                    onClick={closeMenu}
                  >
                    <span className="w-7 font-mono text-[0.68rem] tracking-wider text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base font-medium tracking-[-0.01em] text-foreground">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}
