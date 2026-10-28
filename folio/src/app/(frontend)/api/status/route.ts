import { NextResponse } from 'next/server'

import { getCachedProbes } from '@/utilities/probeStatus'

export const dynamic = 'force-dynamic'

export async function GET() {
  const payload = await getCachedProbes()
  const up = payload.results.filter((r) => r.ok && !r.skipped).length
  const down = payload.results.filter((r) => !r.ok && !r.skipped).length
  const skipped = payload.results.filter((r) => r.skipped).length

  return NextResponse.json(
    {
      checkedAt: payload.checkedAt,
      summary: { up, down, skipped, total: payload.results.length },
      results: payload.results,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    },
  )
}
