import type { Metadata } from 'next'
import Link from 'next/link'

import { PageChrome } from '@/components/PageChrome'
import { getFeatures } from '@/instance'
import { getCachedProbes } from '@/utilities/probeStatus'

export const metadata: Metadata = {
  title: '服务状态',
  description: '本站与站群公开入口的轻量探活（非运维内网看板）。',
}

export const revalidate = 60

export default async function StatusPage() {
  const features = getFeatures()
  const { checkedAt, results } = await getCachedProbes()
  const up = results.filter((r) => r.ok && !r.skipped).length
  const down = results.filter((r) => !r.ok && !r.skipped).length
  const stamp = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(new Date(checkedAt))

  return (
    <PageChrome
      mark="Status"
      title="服务状态"
      description="对公开 URL 做短超时探测。私用看板（Glance / Portainer）不在此页。"
      related={[
        ...(features.network ? [{ href: '/network', label: '站群地图 →' }] : []),
        { href: '/agents', label: 'Agent 入口 →' },
        { href: '/updates', label: '更新 →' },
      ]}
    >
      <div className="container max-w-3xl">
        <p className="mb-2 text-sm text-muted-foreground">
          探测于上海时区 {stamp} · 缓存约 60 秒
        </p>
        <p className="mb-8 font-mono text-xs tracking-wide text-muted-foreground">
          up {up} · down {down} · total {results.length}
        </p>
        <ul className="status-list">
          {results.map((r) => (
            <li key={r.id} className="status-list__row">
              <span
                className={
                  r.skipped
                    ? 'status-dot status-dot--skip'
                    : r.ok
                      ? 'status-dot status-dot--up'
                      : 'status-dot status-dot--down'
                }
                aria-hidden
              />
              <div className="status-list__main">
                <span className="status-list__name">{r.name}</span>
                <a
                  href={r.url}
                  className="status-list__url"
                  target={r.kind === 'elsewhere' ? '_blank' : undefined}
                  rel={r.kind === 'elsewhere' ? 'noopener noreferrer' : undefined}
                >
                  {r.url.replace(/^https?:\/\//, '')}
                </a>
              </div>
              <div className="status-list__meta">
                {r.skipped
                  ? r.reason
                  : r.ok
                    ? `${r.status ?? '—'} · ${r.ms ?? '—'}ms`
                    : `down · ${r.ms ?? '—'}ms`}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs text-muted-foreground">
          JSON：{' '}
          <Link href="/api/status" className="underline underline-offset-4">
            /api/status
          </Link>
          ·{' '}
          <Link href="/agents.json" className="underline underline-offset-4">
            /agents.json
          </Link>
        </p>
      </div>
    </PageChrome>
  )
}
