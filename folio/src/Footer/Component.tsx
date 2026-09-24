import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container py-10 gap-8 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="space-y-2">
          <Link className="inline-flex text-foreground no-underline" href="/">
            <Logo />
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm">
            摄影与写作。文章在这里改完就能读。
          </p>
        </div>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-foreground/80 hover:text-primary" key={i} {...link} />
            })}
            <a
              className="text-foreground/80 hover:text-primary text-sm"
              href="https://cook.alexander.xin"
              rel="noopener noreferrer"
              target="_blank"
            >
              MyCook
            </a>
            <a
              className="text-foreground/80 hover:text-primary text-sm"
              href="https://git.alexander.xin"
              rel="noopener noreferrer"
              target="_blank"
            >
              Gitea
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
