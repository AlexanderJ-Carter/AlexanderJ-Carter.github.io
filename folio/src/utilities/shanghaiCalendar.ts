const SHANGHAI_TZ = 'Asia/Shanghai'

export function shanghaiCalendarParts(now = new Date()): { month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: SHANGHAI_TZ,
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(now)
  const month = Number(parts.find((p) => p.type === 'month')?.value)
  const day = Number(parts.find((p) => p.type === 'day')?.value)
  return { month, day }
}

export function shanghaiCalendarMonth(now = new Date()): number {
  return shanghaiCalendarParts(now).month
}
