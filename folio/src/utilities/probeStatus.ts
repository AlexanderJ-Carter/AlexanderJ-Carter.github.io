import { unstable_cache } from 'next/cache'

import { getVisibleElsewhere, publicOriginFromInstance } from '@/instance'

export type ProbeTarget = {
  id: string
  name: string
  url: string
  kind: 'self' | 'elsewhere'
}

export type ProbeResult = ProbeTarget & {
  ok: boolean
  status: number | null
  ms: number | null
  skipped?: boolean
  reason?: string
}

const SKIP_HOST = /^(github\.com|gitlab\.com|gitee\.com)$/i
const TIMEOUT_MS = 5000
const CONCURRENCY = 4

function shouldSkip(url: string): string | null {
  try {
    const u = new URL(url)
    if (SKIP_HOST.test(u.hostname)) return '外链资料站，不做 HTTP 探活'
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return '非 http(s)'
  } catch {
    return '无效 URL'
  }
  return null
}

export function listProbeTargets(): ProbeTarget[] {
  const origin = publicOriginFromInstance().replace(/\/$/, '')
  const self: ProbeTarget[] = [
    { id: 'folio-home', name: 'Folio 首页', url: `${origin}/`, kind: 'self' },
    { id: 'folio-health', name: 'Folio health', url: `${origin}/api/health`, kind: 'self' },
  ]
  const away = getVisibleElsewhere().map((e) => ({
    id: `elsewhere-${e.host}`,
    name: e.name,
    url: e.href,
    kind: 'elsewhere' as const,
  }))
  return [...self, ...away]
}

async function probeOne(target: ProbeTarget): Promise<ProbeResult> {
  const skip = shouldSkip(target.url)
  if (skip) {
    return { ...target, ok: true, status: null, ms: null, skipped: true, reason: skip }
  }

  const started = Date.now()
  try {
    const res = await fetch(target.url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        'User-Agent': 'FolioStatusProbe/1.0',
        Accept: '*/*',
      },
      cache: 'no-store',
    })
    const ms = Date.now() - started
    const ok = res.status > 0 && res.status < 500
    return { ...target, ok, status: res.status, ms }
  } catch {
    return { ...target, ok: false, status: null, ms: Date.now() - started }
  }
}

async function mapPool<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let next = 0
  async function worker() {
    while (next < items.length) {
      const i = next++
      out[i] = await fn(items[i]!)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
  return out
}

export async function probeAll(): Promise<{ checkedAt: string; results: ProbeResult[] }> {
  const targets = listProbeTargets()
  const results = await mapPool(targets, CONCURRENCY, probeOne)
  return { checkedAt: new Date().toISOString(), results }
}

/** 60s 缓存，减轻重复探活。 */
export const getCachedProbes = unstable_cache(probeAll, ['folio-status-probes'], {
  revalidate: 60,
})
