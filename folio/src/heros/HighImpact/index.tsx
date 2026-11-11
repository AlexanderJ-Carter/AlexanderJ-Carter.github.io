'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Image from 'next/image'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ExposureMeter } from '@/components/widgets/ExposureMeter'

const HERO_FALLBACK = '/img/gallery-optimized/landscape-01-lg.webp'

function hasUsableMedia(media: Page['hero']['media']): boolean {
  if (!media || typeof media !== 'object') return false
  return Boolean(media.url)
}

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const useCmsMedia = hasUsableMedia(media)

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <div
      className="site-hero relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#0b1218] text-white md:items-center"
      data-theme="dark"
      data-site-hero
    >
      <div className="site-hero__media absolute inset-0 z-0" aria-hidden>
        {useCmsMedia ? (
          <Media
            fill
            className="absolute inset-0"
            pictureClassName="absolute inset-0 block size-full"
            imgClassName="object-cover"
            priority
            size="100vw"
            resource={media}
          />
        ) : (
          <Image
            src={HERO_FALLBACK}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
        )}
      </div>

      <div
        className="site-hero__shade pointer-events-none absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(180deg, rgb(6 12 18 / 0.42) 0%, rgb(6 12 18 / 0.18) 38%, rgb(6 12 18 / 0.28) 62%, rgb(6 12 18 / 0.72) 100%), linear-gradient(90deg, rgb(6 12 18 / 0.45) 0%, transparent 42%, transparent 100%)',
        }}
        aria-hidden
      />
      <div className="hero-grain" style={{ zIndex: 2 }} aria-hidden />

      <div className="viewfinder-corners" style={{ zIndex: 2 }} aria-hidden>
        <span className="tl" />
        <span className="tr" />
        <span className="bl" />
        <span className="br" />
      </div>

      <div className="container relative z-10 pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <p className="folio-mark mb-0 text-white/75">摄影 · 写作 · 研究</p>
            <ExposureMeter variant="on-dark" href="/tools?t=time" />
          </div>
          {richText && (
            <RichText
              className="mb-9 [&_h1]:text-5xl [&_h1]:font-bold [&_h1]:tracking-[-0.045em] [&_h1]:drop-shadow-[0_2px_28px_rgba(0,0,0,0.35)] [&_h1]:[font-family:var(--font-display),Outfit,system-ui,sans-serif] sm:[&_h1]:text-6xl md:[&_h1]:text-7xl lg:[&_h1]:text-[5.6rem] [&_p]:max-w-xl [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-white/90 md:[&_p]:text-[1.35rem]"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="hero-cta flex flex-col gap-3 sm:flex-row sm:gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink
                    {...link}
                    appearance={i === 0 ? 'default' : 'outline'}
                    className={i === 0 ? 'hero-cta__primary' : 'hero-cta__secondary'}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <a
        href="#featured"
        className="absolute bottom-6 left-1/2 z-10 inline-flex -translate-x-1/2 flex-col items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-white/95"
      >
        <span>向下浏览</span>
        <span className="block h-6 w-px bg-gradient-to-b from-white/60 to-transparent" aria-hidden />
      </a>
    </div>
  )
}
