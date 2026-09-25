import Link from 'next/link'
import React from 'react'

import { AssistantReopenLink } from '@/components/SiteAssistant/ReopenLink'
import { getInstance } from '@/instance'

/** 页脚本站链接：与主导航对齐，不读 CMS，避免重复/过时项 */
const SITE_LINKS = [
  { label: '画廊', href: '/gallery' },
  { label: '写作', href: '/posts' },
  { label: '研究', href: '/research' },
  { label: '项目', href: '/projects' },
  { label: '工具', href: '/tools' },
  { label: '玩乐', href: '/fun' },
  { label: '关于', href: '/about' },
  { label: '联系', href: '/contact' },
  { label: '订阅', href: '/subscribe' },
  { label: '更新', href: '/updates' },
] as const

export async function Footer() {
  const instance = getInstance()
  const elsewhere = instance.elsewhere

  return (
    <footer className="site-footer mt-auto">
      <div className="container py-14 md:py-20">
        <div className="mb-12 max-w-xl md:mb-14">
          <p className="folio-mark site-footer__mark mb-2">{instance.siteName}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{instance.tagline}</p>
        </div>

        <nav className="mb-12 md:mb-14" aria-label="本站">
          <p className="site-footer__label mb-4">本站</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
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
          <div className="mb-12 md:mb-14">
            <p className="site-footer__label mb-5">站外</p>
            <ul className="elsewhere-grid">
              {elsewhere.map((item) => (
                <li key={item.href}>
                  <a
                    className="elsewhere-tile"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="elsewhere-tile__copy">
                      <span className="elsewhere-tile__name">{item.name}</span>
                      <span className="elsewhere-tile__desc">{item.desc}</span>
                    </span>
                    <span className="elsewhere-tile__host">
                      {item.host}
                      <span className="elsewhere-tile__arrow" aria-hidden>
                        ↗
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

          <div className="flex flex-col gap-4 pt-2 text-xs tracking-wide text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {instance.siteName}
            </p>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="法律">
              <Link className="transition-colors hover:text-foreground" href="/privacy">
                隐私
              </Link>
              <Link className="transition-colors hover:text-foreground" href="/privacy#cookies">
                Cookie
              </Link>
              <Link className="transition-colors hover:text-foreground" href="/terms">
                条款
              </Link>
              <Link className="transition-colors hover:text-foreground" href="/security/policy">
                安全政策
              </Link>
              <AssistantReopenLink className="transition-colors hover:text-foreground" />
              <Link className="transition-colors hover:text-foreground" href="/admin">
                管理
              </Link>
            </nav>
          </div>
      </div>
    </footer>
  )
}
