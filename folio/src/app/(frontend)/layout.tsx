import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { Noto_Serif_SC, Source_Serif_4, Syne } from 'next/font/google'
import React from 'react'

import { AdminBarGate } from '@/components/AdminBarGate'
import { AnalyticsBeacon } from '@/components/AnalyticsBeacon'
import { AnnouncementBanner } from '@/Announcement/Component'
import { CookieConsent } from '@/components/CookieConsent'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { SiteAssistantLazy } from '@/components/SiteAssistant/Lazy'
import { SponsorSlot } from '@/components/SponsorSlot'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { cn } from '@/utilities/ui'
import { getServerSideURL } from '@/utilities/getURL'
import { getFeatures, getInstance } from '@/instance'

import './globals.css'

/** Header/Globals 短缓存；layout 不再读 cookies/draftMode，避免整站动态。 */
export const revalidate = 60

const display = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700'],
  display: 'swap',
})

const body = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '600'],
  display: 'swap',
})

const notoSerifSc = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-noto-serif-sc',
  display: 'swap',
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
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <AdminBarGate />
          <Header />
          {children}
          <SponsorSlot />
          <Footer />
          <AnnouncementBanner />
          <CookieConsent />
          {features.assistant ? <SiteAssistantLazy /> : null}
          <AnalyticsBeacon />
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
