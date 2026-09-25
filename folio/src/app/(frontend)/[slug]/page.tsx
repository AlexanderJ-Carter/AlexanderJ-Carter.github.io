import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { blockPanels, RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { AboutTimeline } from '@/components/AboutTimeline'
import { FeaturedStrip } from '@/components/FeaturedStrip'
import { HomeSnap } from '@/components/HomeSnap'
import { MethodStrip } from '@/components/MethodStrip'
import { PoemHistory } from '@/components/PoemHistory'
import { Publications } from '@/components/Publications'
import { ResearchStrip } from '@/components/ResearchStrip'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ViewTracker } from '@/components/ViewTracker'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const isHome = decodedSlug === 'home'
  const cmsBlocks = isHome ? blockPanels(layout) : []

  const homePanels = isHome
    ? [
        <RenderHero key="hero" {...hero} />,
        <div key="studio" className="home-snap-stack">
          <FeaturedStrip />
          <MethodStrip />
        </div>,
        <div key="notes" className="home-snap-stack home-snap-stack--dense">
          <PoemHistory />
          <ResearchStrip />
          {cmsBlocks.length > 0 ? <div className="home-snap-cms">{cmsBlocks}</div> : null}
        </div>,
      ]
    : []

  const homeLabels = isHome ? ['开场', '影像与法则', '今日与研究'] : []

  return (
    <article className={isHome ? 'pb-0' : 'pt-20 md:pt-24 pb-24'}>
      <PageClient />
      {page.id != null && (
        <ViewTracker
          collection="pages"
          id={page.id}
          initial={typeof page.viewCount === 'number' ? page.viewCount : 0}
          enabled={!draft}
          className={
            isHome ? 'sr-only' : 'container mb-2 text-xs text-muted-foreground meta-mono'
          }
        />
      )}
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {isHome ? (
        <HomeSnap panels={homePanels} labels={homeLabels} />
      ) : (
        <>
          <RenderHero {...hero} />
          <RenderBlocks blocks={layout} />
          {decodedSlug === 'about' && (
            <div className="container max-w-4xl">
              <AboutTimeline />
              <Publications compact />
            </div>
          )}
        </>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  const meta = await generateMeta({ doc: page })
  if (decodedSlug === 'about') {
    return {
      ...meta,
      robots: { index: false, follow: false },
    }
  }
  return meta
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
