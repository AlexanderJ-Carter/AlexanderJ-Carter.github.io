'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
  index?: number
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps, index } = props

  const { slug, categories, meta, title, publishedAt } = doc || {}
  const { description } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`
  const dateLabel = publishedAt
    ? new Date(publishedAt).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : null
  const frame = typeof index === 'number' ? String(index + 1).padStart(2, '0') : null

  return (
    <article
      className={cn(
        'group folio-list-row relative border-b border-border/70 py-5 transition-colors hover:bg-muted/40',
        className,
      )}
      ref={card.ref}
    >
      <Link
        className="absolute inset-0 z-10"
        href={href}
        ref={link.ref}
        aria-label={titleToUse || '阅读文章'}
      />
      <div className="relative z-0 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
        <div className="flex shrink-0 items-baseline gap-3 text-muted-foreground">
          {frame && (
            <span className="font-mono text-xs tracking-[0.18em] text-primary/80">{frame}</span>
          )}
          {dateLabel && <time className="text-xs tabular-nums tracking-wide">{dateLabel}</time>}
        </div>
        <div className="min-w-0 flex-1">
          {showCategories && hasCategories && (
            <p className="mb-1 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
              {categories?.map((category, i) => {
                if (typeof category !== 'object') return null
                const categoryTitle = category.title || '未分类'
                const isLast = i === categories.length - 1
                return (
                  <Fragment key={i}>
                    {categoryTitle}
                    {!isLast && <Fragment> · </Fragment>}
                  </Fragment>
                )
              })}
            </p>
          )}
          {titleToUse && (
            <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {titleToUse}
            </h3>
          )}
          {sanitizedDescription && (
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 max-w-2xl">
              {sanitizedDescription}
            </p>
          )}
        </div>
        <span
          aria-hidden
          className="hidden sm:inline text-muted-foreground/70 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
        >
          →
        </span>
      </div>
    </article>
  )
}
