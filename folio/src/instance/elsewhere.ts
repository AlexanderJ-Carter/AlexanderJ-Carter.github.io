import { shanghaiCalendarMonth } from '../utilities/shanghaiCalendar'

import { getInstance } from './index'
import type { ElsewhereKind, InstanceElsewhere } from './types'

export { shanghaiCalendarMonth, shanghaiCalendarParts } from '../utilities/shanghaiCalendar'

export function getVisibleElsewhere(now = new Date()): InstanceElsewhere[] {
  const month = shanghaiCalendarMonth(now)
  return getInstance().elsewhere.filter((item) => {
    if (!item.visibleMonths?.length) return true
    return item.visibleMonths.includes(month)
  })
}

export const elsewhereKindMeta: Record<
  ElsewhereKind,
  { mark: string; title: string; blurb: string }
> = {
  personal: { mark: 'Warm', title: '生活向', blurb: '年度回顾与节庆小站' },
  product: { mark: 'Ship', title: '产品', blurb: '日常用得上的成品站' },
  tool: { mark: 'Hard', title: '硬核工具', blurb: '网络、终端与实验台' },
  infra: { mark: 'Ops', title: '基建', blurb: '仓库与通用工具箱' },
}

const kindOrder: ElsewhereKind[] = ['personal', 'product', 'tool', 'infra']

export function groupElsewhereByKind(
  items: InstanceElsewhere[],
): { kind: ElsewhereKind; items: InstanceElsewhere[] }[] {
  const buckets = new Map<ElsewhereKind, InstanceElsewhere[]>()
  for (const item of items) {
    const kind = item.kind ?? 'infra'
    const list = buckets.get(kind) ?? []
    list.push(item)
    buckets.set(kind, list)
  }
  return kindOrder
    .filter((kind) => buckets.has(kind))
    .map((kind) => ({ kind, items: buckets.get(kind)! }))
}
