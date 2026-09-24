/**
 * 配置后台导航与页脚（不重跑全文 migrate）。
 * 用法：在 folio/ 目录
 *   node --import tsx scripts/configure-nav.mjs
 * 或容器内：
 *   docker compose -f compose.prod.yaml exec folio node --import tsx scripts/configure-nav.mjs
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

async function main() {
  const payload = await getPayload({ config })

  const about = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
    overrideAccess: true,
  })
  const contact = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    limit: 1,
    overrideAccess: true,
  })
  const aboutId = about.docs[0]?.id
  const contactId = contact.docs[0]?.id
  if (!aboutId || !contactId) {
    throw new Error('缺少 about/contact 页面，请先 migrate:site')
  }

  await payload.updateGlobal({
    slug: 'header',
    overrideAccess: true,
    data: {
      navItems: [
        { link: { type: 'custom', label: '画廊', url: '/gallery' } },
        { link: { type: 'custom', label: '玩乐', url: '/fun' } },
        { link: { type: 'custom', label: '工具', url: '/tools' } },
        { link: { type: 'custom', label: '研究', url: '/research' } },
        { link: { type: 'custom', label: '项目', url: '/projects' } },
        {
          link: {
            type: 'reference',
            label: '关于',
            reference: { relationTo: 'pages', value: aboutId },
          },
        },
        {
          link: {
            type: 'reference',
            label: '联系',
            reference: { relationTo: 'pages', value: contactId },
          },
        },
        { link: { type: 'custom', label: '订阅', url: '/subscribe' } },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    overrideAccess: true,
    data: {
      navItems: [
        { link: { type: 'custom', label: '画廊', url: '/gallery' } },
        { link: { type: 'custom', label: '玩乐', url: '/fun' } },
        { link: { type: 'custom', label: '工具', url: '/tools' } },
        { link: { type: 'custom', label: '研究', url: '/research' } },
        { link: { type: 'custom', label: '项目', url: '/projects' } },
        {
          link: {
            type: 'reference',
            label: '关于',
            reference: { relationTo: 'pages', value: aboutId },
          },
        },
        { link: { type: 'custom', label: '订阅', url: '/subscribe' } },
        { link: { type: 'custom', label: '后台', url: '/admin' } },
        {
          link: {
            type: 'custom',
            label: 'GitHub',
            url: 'https://github.com/AlexanderJ-Carter',
            newTab: true,
          },
        },
      ],
    },
  })

  console.log('✓ 页头 / 页脚导航已更新')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
