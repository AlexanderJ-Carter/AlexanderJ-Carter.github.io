import Link from 'next/link'
import React from 'react'

import { AssistantReopenLink } from '@/components/SiteAssistant/ReopenLink'
import { getFeatures, getInstance, getSiteNav, getVisibleElsewhere } from '@/instance'

const displayFont = { fontFamily: 'var(--font-display), Outfit, system-ui, sans-serif' } as const

export async function Footer() {
  const instance = getInstance()
  const elsewhere = getVisibleElsewhere().slice(0, 6)
  const nav = getSiteNav()
  const features = getFeatures()
  const compliance = instance.compliance
  const icp = compliance?.icp?.trim()
  const gongan = compliance?.gongan?.trim()

  return (
    <footer
      className="mt-auto border-t border-border/70"
      style={{
        background:
          'linear-gradient(180deg, color-mix(in oklch, var(--background) 92%, var(--muted)) 0%, color-mix(in oklch, var(--muted) 45%, var(--background)) 100%)',
      }}
    >
      <div className="container py-14 md:py-16">
        <div
          className="grid gap-10"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))' }}
        >
          <div className="max-w-md">
            <p
              className="mb-3 text-[1.75rem] font-semibold tracking-[-0.04em] text-foreground md:text-[2rem]"
              style={displayFont}
            >
              {instance.siteName}
            </p>
            <p className="text-[1.02rem] leading-relaxed text-muted-foreground">{instance.tagline}</p>
          </div>

          <nav aria-label="本站">
            <p className="mb-4 text-xs tracking-[0.16em] text-muted-foreground uppercase">本站</p>
            <ul
              className="m-0 grid list-none gap-x-5 gap-y-2.5 p-0"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(5.5rem, 1fr))' }}
            >
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-[0.95rem] font-medium tracking-[-0.01em] text-foreground/80 no-underline transition-colors hover:text-primary"
                    style={displayFont}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {elsewhere.length > 0 ? (
          <div className="mt-10 border-t border-border/55 pt-8">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">站外</p>
              {features.network ? (
                <Link
                  href="/network"
                  className="text-sm font-medium text-foreground/75 no-underline transition-colors hover:text-primary"
                  style={displayFont}
                >
                  站群地图
                </Link>
              ) : null}
            </div>
            <ul
              className="m-0 grid list-none gap-x-8 gap-y-3 p-0"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))' }}
            >
              {elsewhere.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-0.5 no-underline"
                  >
                    <span
                      className="text-[0.95rem] font-medium tracking-[-0.01em] text-foreground transition-colors group-hover:text-primary"
                      style={displayFont}
                    >
                      {item.name}
                    </span>
                    <span className="truncate font-mono text-[0.68rem] text-muted-foreground">
                      {item.host}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col gap-4 border-t border-border/55 pt-6 text-xs tracking-wide text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              © {new Date().getFullYear()} {instance.siteName}
            </span>
            <span aria-hidden className="opacity-40">
              ·
            </span>
            <Link className="transition-colors hover:text-foreground" href="/terms#license">
              BSD · CC BY-NC-ND
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
            <a className="transition-colors hover:text-foreground" href="/humans.txt">
              humans.txt
            </a>
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
