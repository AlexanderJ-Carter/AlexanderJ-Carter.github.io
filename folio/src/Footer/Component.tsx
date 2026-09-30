import Link from 'next/link'
import React from 'react'

import { AssistantReopenLink } from '@/components/SiteAssistant/ReopenLink'
import { ElsewhereList } from '@/components/ElsewhereList'
import { getFeatures, getInstance, getSiteNav } from '@/instance'

export async function Footer() {
  const instance = getInstance()
  const elsewhere = instance.elsewhere
  const nav = getSiteNav()
  const features = getFeatures()
  const compliance = instance.compliance
  const icp = compliance?.icp?.trim()
  const gongan = compliance?.gongan?.trim()

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
            {nav.map((item) => (
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
            <ElsewhereList items={elsewhere} />
          </div>
        ) : null}

        <div className="flex flex-col gap-4 pt-2 text-xs tracking-wide text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              © {new Date().getFullYear()} {instance.siteName}
            </span>
            <span aria-hidden className="opacity-40">
              ·
            </span>
            <Link className="transition-colors hover:text-foreground" href="/terms#license">
              许可
            </Link>
            {icp ? (
              <>
                <span aria-hidden className="opacity-40">
                  ·
                </span>
                <a
                  className="transition-colors hover:text-foreground"
                  href={compliance?.icpUrl || 'https://beian.miit.gov.cn/'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {icp}
                </a>
              </>
            ) : null}
            {gongan ? (
              <>
                <span aria-hidden className="opacity-40">
                  ·
                </span>
                {compliance?.gonganUrl ? (
                  <a
                    className="transition-colors hover:text-foreground"
                    href={compliance.gonganUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {gongan}
                  </a>
                ) : (
                  <span>{gongan}</span>
                )}
              </>
            ) : null}
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
            {features.assistant ? (
              <AssistantReopenLink className="transition-colors hover:text-foreground" />
            ) : null}
            <Link className="transition-colors hover:text-foreground" href="/admin">
              管理
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
