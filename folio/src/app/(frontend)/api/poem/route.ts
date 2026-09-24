import { NextResponse } from 'next/server'

/** Proxy 今日诗词（jinrishici），避免浏览器 CORS。 */
export async function GET() {
  const res = await fetch('https://v2.jinrishici.com/one.json', {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })
  if (!res.ok) {
    return NextResponse.json({ status: 'error' }, { status: 502 })
  }
  const data = await res.json()
  return NextResponse.json(data)
}
