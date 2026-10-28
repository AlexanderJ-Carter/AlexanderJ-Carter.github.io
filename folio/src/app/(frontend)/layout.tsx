import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { GeistMono } from 'geist/font/mono'
import { Noto_Serif_SC, Source_Serif_4, Syne } from 'next/font/google'
import React from 'react'

import { AdminBarGate } from '@/components/AdminBarGate'
import { AnalyticsBeacon } from '@/components/AnalyticsBeacon'
import { AnnouncementBanner } from '@/Announcement/Component'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { NavIdlePrefetch } from '@/components/NavIdlePrefetch'
import { SiteAssistantLazy } from '@/components/SiteAssistant/Lazy'
import { SpeculationHints } from '@/components/SpeculationHints'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { cn } from '@/utilities/ui'
import { getServerSideURL } from '@/utilities/getURL'
import { getFeatures, getInstance } from '@/instance'

import './globals.css'

const CookieConsent = dynamic(() =>
  import('@/components/CookieConsent').then((m) => m.CookieConsent),
)
const SponsorSlot = dynamic(() =>
  import('@/components/SponsorSlot').then((m) => m.SponsorSlot),
)

/** Header/Globals 短缓存；layout 不再读 cookies/draftMode，避免整站动态。 */
export const revalidate = 60

const display = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700'],
  display: 'swap',
  adjustFontFallback: true,
  preload: true,
})

const body = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '600'],
  display: 'swap',
  adjustFontFallback: true,
  preload: true,
})

const notoSerifSc = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-noto-serif-sc',
  display: 'swap',
  adjustFontFallback: true,
  preload: false,
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const features = getFeatures()

  return (
    <html
      className={cn(display.variable, body.variable, notoSerifSc.variable, GeistMono.variable)}
      lang="zh-CN"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <noscript>
          <style>{`html{opacity:1!important}`}</style>
        </noscript>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/humans.txt" rel="author" type="text/plain" />
        <SpeculationHints />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <a className="skip-link" href="#main-content">
            跳到主要内容
          </a>
          <AdminBarGate />
          <Header />
          <main id="main-content">{children}</main>
          <SponsorSlot />
          <Footer />
          <AnnouncementBanner />
          <CookieConsent />
          {features.assistant ? <SiteAssistantLazy /> : null}
          <AnalyticsBeacon />
          <NavIdlePrefetch />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = (() => {
  const instance = getInstance()
  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      default: instance.siteName,
      template: `%s · ${instance.siteName}`,
    },
    description: instance.tagline,
    openGraph: mergeOpenGraph(),
    twitter: {
      card: 'summary_large_image',
      ...(instance.twitterCreator ? { creator: instance.twitterCreator } : {}),
    },
  }
})()
