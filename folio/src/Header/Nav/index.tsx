'use client'

import React, { useCallback, useEffect, useId, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Menu, SearchIcon, X } from 'lucide-react'
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

type NavItem = { label: string; url: string }

function resolveNavItems(data: HeaderType): NavItem[] {
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
  return FALLBACK_NAV.map((item) => ({ label: item.label, url: item.url }))
}

export const HeaderNav: React.FC<{ data: HeaderType; overHero?: boolean }> = ({
  data,
  overHero,
}) => {
  const sheetId = useId()
  const [menuOpen, setMenuOpen] = useState(false)
  const items = resolveNavItems(data)

  const linkClass = cn(
    'site-nav-link px-2.5 py-1.5 md:px-2 md:py-1',
    overHero ? 'text-white/85 hover:text-white' : 'text-foreground/75 hover:text-foreground',
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

  const sheetLinkClass = 'site-nav-sheet__link'

  return (
    <>
      <nav
        className="hidden items-center gap-0.5 md:flex md:gap-1"
        aria-label="主导航"
      >
        {data?.navItems && data.navItems.length > 0
          ? data.navItems.map(({ link }, i) => (
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
            'site-nav-link ml-1 inline-flex items-center gap-1.5 px-2.5 py-1.5 md:px-2 md:py-1',
            overHero ? 'text-white/85 hover:text-white' : 'text-foreground/75 hover:text-foreground',
          )}
        >
          <SearchIcon className="size-3.5 opacity-80" aria-hidden />
          <span className="sr-only md:not-sr-only">搜索</span>
        </Link>
        <ThemeSelector overHero={overHero} className="ml-0.5" />
      </nav>

      <div className="flex items-center gap-1 md:hidden">
        <Link
          href="/search"
          className={cn(
            'inline-flex size-10 items-center justify-center rounded-full transition-colors',
            overHero
              ? 'text-white/85 hover:bg-white/10 hover:text-white'
              : 'text-foreground/75 hover:bg-muted hover:text-foreground',
          )}
          aria-label="搜索"
        >
          <SearchIcon className="size-4" aria-hidden />
        </Link>
        <ThemeSelector overHero={overHero} />
        <button
          type="button"
          className={cn(
            'inline-flex size-10 items-center justify-center rounded-full transition-colors',
            overHero
              ? 'text-white/85 hover:bg-white/10 hover:text-white'
              : 'text-foreground/75 hover:bg-muted hover:text-foreground',
          )}
          aria-expanded={menuOpen}
          aria-controls={sheetId}
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      <div
        id={sheetId}
        className={cn('site-nav-sheet md:hidden', menuOpen && 'is-open')}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="站点导航"
      >
        <button
          type="button"
          className="site-nav-sheet__backdrop"
          aria-label="关闭菜单"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />
        <div className="site-nav-sheet__panel">
          <div className="mb-4 flex items-center justify-between gap-2 border-b border-border pb-3">
            <p className="folio-mark mb-0">Menu</p>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="关闭菜单"
              onClick={closeMenu}
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
            {items.map((item) => (
              <li key={item.url}>
                <Link href={item.url} className={sheetLinkClass} onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
