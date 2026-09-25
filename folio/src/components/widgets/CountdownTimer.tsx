'use client'

import React, { useEffect, useState } from 'react'

const PRESETS = [
  { label: '5 分', minutes: 5 },
  { label: '10 分', minutes: 10 },
  { label: '30 分', minutes: 30 },
  { label: '1 小时', minutes: 60 },
]

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function CountdownTimer() {
  const [total, setTotal] = useState(5 * 60)
  const [remaining, setRemaining] = useState(5 * 60)
  const [running, setRunning] = useState(false)
  const [custom, setCustom] = useState({ d: 0, h: 0, m: 5, s: 0 })

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [running])

  const applySeconds = (sec: number) => {
    const n = Math.max(0, Math.floor(sec))
    setTotal(n)
    setRemaining(n)
    setRunning(false)
  }

  const d = Math.floor(remaining / 86400)
  const h = Math.floor((remaining % 86400) / 3600)
  const m = Math.floor((remaining % 3600) / 60)
  const s = remaining % 60
  const progress = total === 0 ? 0 : ((total - remaining) / total) * 100

  return (
    <div className="glass-card fun-toy p-6">
      <p className="folio-mark mb-2">Timer</p>
      <h3 className="text-lg font-semibold mb-4">倒计时</h3>
      <div className="grid grid-cols-4 gap-2 mb-6 text-center">
        {[
          [d, '天'],
          [h, '时'],
          [m, '分'],
          [s, '秒'],
        ].map(([val, label]) => (
          <div key={label as string}>
            <div className="border border-border px-2 py-3 font-mono text-2xl tabular-nums">
              {pad(val as number)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{label as string}</p>
          </div>
        ))}
      </div>

      <p className="text-sm font-medium mb-2">快速选择</p>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {PRESETS.map((p) => (
          <button
            key={p.minutes}
            type="button"
            className="py-2 text-xs border border-border hover:border-foreground"
            onClick={() => applySeconds(p.minutes * 60)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="text-sm font-medium mb-2">自定义</p>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {(
          [
            ['d', '天'],
            ['h', '时'],
            ['m', '分'],
            ['s', '秒'],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="text-xs text-muted-foreground">
            {label}
            <input
              type="number"
              min={0}
              className="mt-1 w-full border border-border bg-transparent px-2 py-1.5 text-sm text-foreground"
              value={custom[key]}
              onChange={(e) =>
                setCustom((c) => ({ ...c, [key]: Math.max(0, Number(e.target.value) || 0) }))
              }
            />
          </label>
        ))}
      </div>
      <button
        type="button"
        className="mb-4 w-full py-2 text-sm border border-border"
        onClick={() =>
          applySeconds(custom.d * 86400 + custom.h * 3600 + custom.m * 60 + custom.s)
        }
      >
        应用自定义时间
      </button>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          className="flex-1 py-2 text-sm border border-foreground bg-foreground text-background disabled:opacity-40"
          disabled={remaining === 0 && !running}
          onClick={() => setRunning((v) => !v)}
        >
          {running ? '暂停' : '开始'}
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm border border-border"
          onClick={() => {
            setRemaining(total)
            setRunning(false)
          }}
        >
          重置
        </button>
      </div>

      <div className="h-1.5 overflow-hidden bg-muted">
        <div
          className="h-full bg-foreground transition-[width] duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
