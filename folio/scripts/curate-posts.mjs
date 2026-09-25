/**
 * 清理低质量 / 过时栈向文章，发布保留篇目。
 *
 *   node --import tsx scripts/curate-posts.mjs
 * 容器：
 *   docker compose -f compose.prod.yaml exec folio node --import tsx scripts/curate-posts.mjs
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

/** SEO 合集、泛教程、已过时的 Pages/Astro 叙事 */
const DELETE_SLUGS = new Set([
  'design-resources-collection',
  'developer-tools-2026',
  'photography-composition-guide',
  'minimalist-web-design',
  'personal-site-i18n',
  'site-architecture-pages-cloudflare',
  'astro-upgrade-journey',
  'why-astro-for-content-sites',
])

/** 个人经验向：发布 */
const PUBLISH_SLUGS = new Set([
  'darkroom-folio-site-language',
  'light-composition-moment',
  'street-photography-distance',
  'natural-light-photography',
  'minimal-structure-not-empty',
  'theme-toggle-without-flash',
  'privacy-friendly-analytics',
  'reading-list-as-site-page',
  'uses-page-as-self-description',
  'student-maintaining-projects',
  'web-performance-practice',
  'accessibility-keyboard-contrast',
  'static-site-security-headers',
  'static-site-ci-pipeline',
])

async function main() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    limit: 200,
    depth: 0,
    overrideAccess: true,
  })

  let deleted = 0
  let published = 0
  let left = 0

  for (const doc of docs) {
    const slug = doc.slug
    if (!slug) continue

    if (DELETE_SLUGS.has(slug)) {
      await payload.delete({
        collection: 'posts',
        id: doc.id,
        overrideAccess: true,
      })
      payload.logger.info(`delete ${slug}`)
      deleted += 1
      continue
    }

    if (PUBLISH_SLUGS.has(slug)) {
      if (doc._status !== 'published') {
        await payload.update({
          collection: 'posts',
          id: doc.id,
          overrideAccess: true,
          data: {
            _status: 'published',
            publishedAt: doc.publishedAt || new Date().toISOString(),
          },
        })
        payload.logger.info(`publish ${slug}`)
        published += 1
      } else {
        left += 1
      }
      continue
    }

    // 未列入的：保持草稿或不处理
    payload.logger.info(`leave ${slug} (${doc._status})`)
    left += 1
  }

  payload.logger.info(
    `curate-posts done: deleted=${deleted} published=${published} untouched=${left}`,
  )
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
