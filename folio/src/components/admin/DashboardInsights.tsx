'use client'

import React, { useEffect, useState } from 'react'

type Totals = {
  pages: number
  posts: number
  media: number
  submissions: number
}

type TopItem = {
  id: number | string
  title?: string | null
  slug?: string | null
  viewCount?: number | null
  kind: 'pages' | 'posts'
}

async function countOf(path: string): Promise<number> {
  const res = await fetch(path, { credentials: 'include' })
  if (!res.ok) return 0
  const data = await res.json()
  return typeof data.totalDocs === 'number' ? data.totalDocs : 0
}

export function DashboardInsights() {
  const [totals, setTotals] = useState<Totals | null>(null)
  const [top, setTop] = useState<TopItem[]>([])

  useEffect(() => {
    let alive = true
    ;(async () => {
      const [pages, posts, media, submissions] = await Promise.all([
        countOf('/api/pages?limit=0&depth=0'),
        countOf('/api/posts?limit=0&depth=0'),
        countOf('/api/media?limit=0&depth=0'),
        countOf('/api/form-submissions?limit=0&depth=0'),
      ])
      if (!alive) return
      setTotals({ pages, posts, media, submissions })

      const [topPages, topPosts] = await Promise.all([
        fetch(
          '/api/pages?limit=5&depth=0&sort=-viewCount&where[viewCount][greater_than]=0',
          { credentials: 'include' },
        ).then((r) => (r.ok ? r.json() : { docs: [] })),
        fetch(
          '/api/posts?limit=5&depth=0&sort=-viewCount&where[viewCount][greater_than]=0',
          { credentials: 'include' },
        ).then((r) => (r.ok ? r.json() : { docs: [] })),
      ])

      const merged: TopItem[] = [
        ...(topPages.docs || []).map((d: TopItem) => ({ ...d, kind: 'pages' as const })),
        ...(topPosts.docs || []).map((d: TopItem) => ({ ...d, kind: 'posts' as const })),
      ]
        .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
        .slice(0, 6)

      if (alive) setTop(merged)
    })()
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="folio-insights">
      <h5>站点速览</h5>
      <div className="folio-insights__stats">
        <a href="/admin/collections/pages">
          <strong>{totals ? totals.pages : '—'}</strong>
          <span>页面</span>
        </a>
        <a href="/admin/collections/posts">
          <strong>{totals ? totals.posts : '—'}</strong>
          <span>文章</span>
        </a>
        <a href="/admin/collections/media">
          <strong>{totals ? totals.media : '—'}</strong>
          <span>媒体</span>
        </a>
        <a href="/admin/collections/form-submissions">
          <strong>{totals ? totals.submissions : '—'}</strong>
          <span>留言</span>
        </a>
      </div>

      <h5 className="folio-insights__sub">访问量 TOP</h5>
      {top.length === 0 ? (
        <p className="folio-insights__empty">尚无统计。前台有人浏览后会出现在这里。</p>
      ) : (
        <ul className="folio-insights__top">
          {top.map((item) => {
            const href =
              item.kind === 'posts'
                ? `/admin/collections/posts/${item.id}`
                : `/admin/collections/pages/${item.id}`
            const live =
              item.kind === 'posts'
                ? `/posts/${item.slug}`
                : item.slug === 'home'
                  ? '/'
                  : `/${item.slug}`
            return (
              <li key={`${item.kind}-${item.id}`}>
                <a href={href}>{item.title || item.slug || item.id}</a>
                <span className="folio-insights__views">{item.viewCount ?? 0}</span>
                <a className="folio-insights__live" href={live} target="_blank" rel="noreferrer">
                  前台
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
