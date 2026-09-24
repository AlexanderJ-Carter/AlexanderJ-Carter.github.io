import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getInstance } from '@/instance'

/** 页脚本站链接：与主导航对齐，不读 CMS，避免重复/过时项 */
const SITE_LINKS = [
  { label: '画廊', href: '/gallery' },
  { label: '研究', href: '/research' },
  { label: '项目', href: '/projects' },
  { label: '工具', href: '/tools' },
  { label: '玩乐', href: '/fun' },
  { label: '关于', href: '/about' },
  { label: '联系', href: '/contact' },
  { label: '订阅', href: '/subscribe' },
] as const

export async function Footer() {
  const instance = getInstance()
  const elsewhere = instance.elsewhere

  return (
    <footer className="site-footer mt-auto">
      <div className="container py-12 md:py-16">
        <div className="border-t border-border pt-10">
          <div className="mb-10 max-w-xl">
            <p className="folio-mark site-footer__mark mb-2">{instance.siteName}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{instance.tagline}</p>
          </div>

          <nav className="mb-12" aria-label="本站">
            <p className="site-footer__label mb-4">本站</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {SITE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link className="site-footer__link" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {elsewhere.length > 0 ? (
            <div className="mb-12">
              <p className="site-footer__label mb-4">Elsewhere</p>
              <ul className="grid gap-0 border-t border-border sm:grid-cols-2">
                {elsewhere.map((item) => (
                  <li key={item.href} className="border-b border-border">
                    <a
                      className="group flex items-baseline justify-between gap-4 py-4 pr-2 no-underline"
                      href={item.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="min-w-0">
                        <span className="block text-[0.95rem] font-medium text-foreground transition-colors group-hover:text-primary">
                          {item.name}
                        </span>
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          {item.desc}
                        </span>
                      </span>
                      <span className="shrink-0 font-mono text-[0.65rem] tracking-wide text-muted-foreground transition-colors group-hover:text-foreground">
                        {item.host} ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="flex flex-col gap-4 border-t border-border pt-6 text-xs tracking-wide text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {instance.siteName}
            </p>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="法律与外观">
              <Link className="transition-colors hover:text-foreground" href="/privacy">
                隐私
              </Link>
              <Link className="transition-colors hover:text-foreground" href="/terms">
                条款
              </Link>
              <Link className="transition-colors hover:text-foreground" href="/security/policy">
                安全政策
              </Link>
              <Link className="transition-colors hover:text-foreground" href="/admin">
                管理
              </Link>
              <span className="hidden h-3 w-px bg-border sm:inline-block" aria-hidden />
              <span className="[&_button]:h-auto [&_button]:border-0 [&_button]:bg-transparent [&_button]:px-0 [&_button]:text-xs [&_button]:text-muted-foreground [&_button]:shadow-none [&_button]:hover:text-foreground [&_span]:text-muted-foreground">
                <ThemeSelector />
              </span>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
