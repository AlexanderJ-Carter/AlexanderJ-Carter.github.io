import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

type Body = {
  collection?: 'pages' | 'posts'
  id?: number | string
}

const recent = new Map<string, number>()
const WINDOW_MS = 60_000

function clientKey(request: Request, collection: string, id: string | number) {
  const fwd = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = fwd || request.headers.get('x-real-ip') || 'unknown'
  return `${ip}:${collection}:${id}`
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Body | null
  const collection = body?.collection
  const id = body?.id

  if ((collection !== 'pages' && collection !== 'posts') || id == null || id === '') {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  const key = clientKey(request, collection, id)
  const now = Date.now()
  const last = recent.get(key) || 0
  if (now - last < WINDOW_MS) {
    return NextResponse.json({ ok: true, skipped: true })
  }
  recent.set(key, now)
  if (recent.size > 5000) {
    for (const [k, t] of recent) {
      if (now - t > WINDOW_MS) recent.delete(k)
    }
  }

  const payload = await getPayload({ config })
  const doc = await payload.findByID({
    collection,
    id,
    depth: 0,
    overrideAccess: true,
  })

  const next = (typeof doc.viewCount === 'number' ? doc.viewCount : 0) + 1
  await payload.update({
    collection,
    id,
    data: { viewCount: next },
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  return NextResponse.json({ ok: true, viewCount: next })
}
