'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative flex items-end md:items-center text-white min-h-[100svh] overflow-hidden"
      data-theme="dark"
    >
      <div className="absolute inset-0 select-none" aria-hidden>
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="-z-10 object-cover scale-[1.04] saturate-[1.05] contrast-[1.04]"
            priority
            resource={media}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/25" />
        <div className="hero-grain" />
        <div className="hero-sweep" />
      </div>

      <div className="viewfinder-corners" aria-hidden>
        <span className="tl" />
        <span className="tr" />
        <span className="bl" />
        <span className="br" />
      </div>

      <div className="container relative z-10 pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="max-w-3xl">
          <p className="folio-mark mb-5 text-white/70">Photography · Writing · Research</p>
          {richText && (
            <RichText
              className="mb-8 [&_h1]:text-5xl [&_h1]:md:text-7xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:[font-family:var(--font-display),Syne,system-ui,sans-serif] [&_p]:text-lg [&_p]:md:text-xl [&_p]:text-white/85"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      <a
        href="#featured"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[0.7rem] uppercase tracking-[0.22em] text-white/55 hover:text-white/90 transition-colors"
      >
        向下浏览
      </a>
    </div>
  )
}
