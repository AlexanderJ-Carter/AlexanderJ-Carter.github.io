/**
 * 按日期写入当前或即将到来的节日短窗公告。
 *
 *   pnpm configure:seasonal
 *
 * 覆盖：中秋、国庆、元旦。一次只挂一条；过完再跑即可切下一条。
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

/**
 * @typedef {{
 *   noticeId: string
 *   title: string
 *   body: string
 *   href: string
 *   ctaLabel: string
 *   startsAt: string
 *   endsAt: string
 * }} FestivalNotice
 */

/**
 * @param {number} year
 * @returns {FestivalNotice[]}
 */
function festivalsFor(year) {
  // 农历中秋需按年核对；2025=10-06，2026=09-25，2027=09-15
  const midAutumnDay = {
    2025: '10-06',
    2026: '09-25',
    2027: '09-15',
  }[year]

  /** @type {FestivalNotice[]} */
  const list = []

  if (midAutumnDay) {
    const day = `${year}-${midAutumnDay}`
    // 短窗到国庆前夜，避免两节之间空窗
    const endDay =
      year === 2026 ? `${year}-09-30` : year === 2025 ? `${year}-10-08` : `${year}-09-17`
    list.push({
      noticeId: `notice-mid-autumn-${year}`,
      title: '中秋快乐',
      body: '愿月圆人安，灯火温软。今晚不妨慢慢翻几张片——画廊还亮着，想跟站务也可以订阅一声。',
      href: '/gallery',
      ctaLabel: '去看月色 →',
      startsAt: `${day}T00:00:00+08:00`,
      endsAt: `${endDay}T23:59:59+08:00`,
    })
  }

  list.push({
    noticeId: `notice-national-${year}`,
    title: '国庆快乐',
    body: '长假好时辰，愿你旅途顺意、归家团圆。站里画廊、写作与研究都开着，慢慢逛。',
    href: '/network',
    ctaLabel: '逛站群 →',
    startsAt: `${year}-10-01T00:00:00+08:00`,
    endsAt: `${year}-10-07T23:59:59+08:00`,
  })

  list.push({
    noticeId: `notice-ny-${year + 1}`,
    title: '元旦快乐',
    body: '新年伊始，愿你诸事顺遂、眼里有光。画廊与研究都在；想跟站务，订阅一声就好。',
    href: '/gallery',
    ctaLabel: '开年逛逛 →',
    startsAt: `${year + 1}-01-01T00:00:00+08:00`,
    endsAt: `${year + 1}-01-03T23:59:59+08:00`,
  })

  return list
}

/**
 * @param {FestivalNotice[]} festivals
 * @param {number} now
 */
function pickFestival(festivals, now) {
  const active = festivals.find((f) => {
    const a = Date.parse(f.startsAt)
    const b = Date.parse(f.endsAt)
    return now >= a && now <= b
  })
  if (active) return active

  const upcoming = festivals
    .filter((f) => Date.parse(f.startsAt) > now)
    .sort((x, y) => Date.parse(x.startsAt) - Date.parse(y.startsAt))
  return upcoming[0] || festivals[festivals.length - 1]
}

async function main() {
  const year = new Date().getFullYear()
  const now = Date.now()
  const notice = pickFestival([...festivalsFor(year), ...festivalsFor(year + 1)], now)

  const payload = await getPayload({ config })
  await payload.updateGlobal({
    slug: 'announcement',
    overrideAccess: true,
    data: {
      enabled: true,
      dismissible: true,
      ...notice,
    },
  })
  payload.logger.info(
    `seasonal → ${notice.noticeId} · ${notice.title} · ${notice.startsAt} … ${notice.endsAt}`,
  )
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
