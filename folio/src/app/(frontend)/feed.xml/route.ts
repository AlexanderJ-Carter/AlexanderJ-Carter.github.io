import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { getInstance } from '@/instance'

export const dynamic = 'force-dynamic'
export const revalidate = 600

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const instance = getInstance()
  const site = instance.siteUrl.replace(/\/$/, '')
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 50,
    overrideAccess: false,
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      publishedAt: true,
      updatedAt: true,
      meta: true,
    },
  })

  const items = posts.docs
    .filter((p) => p.slug)
    .map((p) => {
      const link = `${site}/posts/${p.slug}`
      const title = escapeXml(p.title || p.slug || 'Untitled')
      const desc = escapeXml(
        (typeof p.meta?.description === 'string' && p.meta.description) || p.title || '',
      )
      const date = p.publishedAt || p.updatedAt || new Date().toISOString()
      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <description>${desc}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(instance.siteName)} · 写作</title>
    <link>${site}/posts</link>
    <description>${escapeXml(instance.tagline)}</description>
    <language>zh-CN</language>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
    },
  })
}
