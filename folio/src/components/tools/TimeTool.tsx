'use client'

import React, { useEffect, useState } from 'react'

const ZONES = [
  { id: 'Asia/Shanghai', label: '北京' },
  { id: 'UTC', label: 'UTC' },
  { id: 'Europe/London', label: '伦敦' },
  { id: 'America/New_York', label: '纽约' },
  { id: 'Asia/Tokyo', label: '东京' },
  { id: 'Australia/Sydney', label: '悉尼' },
] as const

function formatInZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

export function TimeTool() {
  const [now, setNow] = useState(() => new Date())
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const copy = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(label)
    window.setTimeout(() => setCopied(null), 1200)
  }

  return (
    <div className="space-y-6">
      <div className="border border-border p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">北京时间</p>
        <p className="mt-2 font-mono text-3xl tabular-nums md:text-4xl">
          {formatInZone(now, 'Asia/Shanghai')}
        </p>
        <button
          type="button"
          className="mt-4 text-sm underline underline-offset-4"
          onClick={() => void copy('bj', formatInZone(now, 'Asia/Shanghai'))}
        >
          {copied === 'bj' ? '已复制' : '复制'}
        </button>
      </div>

      <div>
        <h2 className="mb-4 text-sm uppercase tracking-[0.16em] text-muted-foreground">世界时区</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ZONES.map((z) => {
            const value = formatInZone(now, z.id)
            return (
              <li key={z.id} className="border border-border p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-medium">{z.label}</span>
                  <button
                    type="button"
                    className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                    onClick={() => void copy(z.id, value)}
                  >
                    {copied === z.id ? '已复制' : '复制'}
                  </button>
                </div>
                <p className="mt-2 font-mono text-lg tabular-nums">{value}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{z.id}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
