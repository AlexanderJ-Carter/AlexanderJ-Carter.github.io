/**
 * 更新站点公告（非节日常驻文案；默认关闭）。
 * 节日请用：pnpm configure:seasonal
 *
 *   node --import tsx scripts/configure-announcement.mjs
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const NOTICE = {
  enabled: false,
  noticeId: 'notice-idle',
  title: '站有更新',
  body: '公开变更见更新日志；想跟后续可以订阅。',
  href: '/updates',
  ctaLabel: '更新日志 →',
  dismissible: true,
  startsAt: null,
  endsAt: null,
}

async function main() {
  const payload = await getPayload({ config })
  await payload.updateGlobal({
    slug: 'announcement',
    overrideAccess: true,
    data: NOTICE,
  })
  payload.logger.info(`announcement → ${NOTICE.noticeId}: enabled=${NOTICE.enabled}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
