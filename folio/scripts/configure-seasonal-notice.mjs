/**
 * 写入节日短窗公告示例（元旦）。按需改日期后执行。
 *
 *   node --import tsx scripts/configure-seasonal-notice.mjs
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const year = new Date().getFullYear()
const nextNewYear = `${year + 1}-01-01T00:00:00.000Z`
const end = `${year + 1}-01-03T23:59:59.000Z`

const NOTICE = {
  enabled: true,
  noticeId: `notice-ny-${year + 1}`,
  title: '元旦好',
  body: '新的一年，慢慢看片、慢慢写。画廊与研究都在；想跟站务可订阅。',
  href: '/gallery',
  ctaLabel: '去画廊 →',
  dismissible: true,
  startsAt: nextNewYear,
  endsAt: end,
}

async function main() {
  const payload = await getPayload({ config })
  await payload.updateGlobal({
    slug: 'announcement',
    overrideAccess: true,
    data: NOTICE,
  })
  payload.logger.info(
    `seasonal → ${NOTICE.noticeId} ${NOTICE.startsAt} … ${NOTICE.endsAt}`,
  )
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
