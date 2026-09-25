import { NextResponse } from 'next/server'

/** 进程存活探针：不碰 Payload / SQLite，避免 healthcheck 打满首页 SSR。 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export function GET() {
  return new NextResponse('ok', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
