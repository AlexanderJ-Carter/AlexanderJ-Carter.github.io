import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      sort: '-publishedAt',
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <section className="py-4" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <RichText
            className="ms-0 max-w-[40rem] [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:tracking-tight"
            data={introContent}
            enableGutter={false}
          />
          <Link
            href="/posts"
            className="text-sm text-muted-foreground hover:text-primary transition-colors shrink-0"
          >
            全部文章 →
          </Link>
        </div>
      )}
      <CollectionArchive posts={posts} />
    </section>
  )
}
