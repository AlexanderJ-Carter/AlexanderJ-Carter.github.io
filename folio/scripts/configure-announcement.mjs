/**
 * 更新站点公告（迁站说明）。
 * 用法：在 folio/ 目录
 *   node --import tsx scripts/configure-announcement.mjs
 * 容器内：
 *   docker compose -f compose.prod.yaml exec folio node --import tsx scripts/configure-announcement.mjs
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const NOTICE = {
  enabled: true,
  noticeId: 'notice-2026-home',
  title: '站有更新',
  body: '新址就绪。写作暂缓；长文仍在博客。想跟后续更新可以订阅。',
  href: '/subscribe',
  ctaLabel: '订阅 →',
  dismissible: true,
}

async function main() {
  const payload = await getPayload({ config })
  await payload.updateGlobal({
    slug: 'announcement',
    overrideAccess: true,
    data: NOTICE,
  })
  payload.logger.info(`announcement → ${NOTICE.noticeId}: ${NOTICE.title}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
