import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { Source_Serif_4, Syne } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { AnnouncementBanner } from '@/Announcement/Component'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { getInstance } from '@/instance'

/** 布局依赖 CMS Globals；构建镜像时库可能未迁全表，禁止静态预渲染整站壳。 */
export const dynamic = 'force-dynamic'

const display = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700'],
})

const body = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '600'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(display.variable, body.variable, GeistMono.variable)}
      lang="zh-CN"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <AnnouncementBanner />
          {children}
          <Footer />
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
