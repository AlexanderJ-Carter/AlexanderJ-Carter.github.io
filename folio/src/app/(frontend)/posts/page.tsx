import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageChrome } from '@/components/PageChrome'
import type { CardPostData } from '@/components/Card'

import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 24,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })

  return (
    <>
      <PageClient />
      <PageChrome
        mark="Writing"
        title="写作"
        description="精选短文与实践笔记。宁可少而清楚，不堆合集。"
      >
        {posts.docs.length === 0 ? (
          <div className="container max-w-2xl">
            <p className="text-muted-foreground">暂无已发布文章。</p>
          </div>
        ) : (
          <CollectionArchive posts={posts.docs as CardPostData[]} />
        )}
      </PageChrome>
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: '写作',
    description: '精选短文与实践笔记。',
  }
}
