'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

const WORK_SEC = 25 * 60
const BREAK_SEC = 5 * 60

function fmt(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function PomodoroTimer() {
  const [mode, setMode] = useState<'work' | 'break'>('work')
  const [remaining, setRemaining] = useState(WORK_SEC)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const reduceRef = useRef(false)

  useEffect(() => {
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false)
          if (mode === 'work') setSessions((n) => n + 1)
          return 0
        }
        return r - 1
      })
    }, reduceRef.current ? 1000 : 1000)
    return () => window.clearInterval(id)
  }, [running, mode])

  const switchMode = useCallback((next: 'work' | 'break') => {
    setMode(next)
    setRunning(false)
    setRemaining(next === 'work' ? WORK_SEC : BREAK_SEC)
  }, [])

  const total = mode === 'work' ? WORK_SEC : BREAK_SEC
  const progress = total === 0 ? 0 : ((total - remaining) / total) * 553

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">番茄钟</h3>
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          className={`flex-1 py-2 text-sm border ${mode === 'work' ? 'border-foreground bg-foreground text-background' : 'border-border'}`}
          onClick={() => switchMode('work')}
        >
          专注 25 分
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-sm border ${mode === 'break' ? 'border-foreground bg-foreground text-background' : 'border-border'}`}
          onClick={() => switchMode('break')}
        >
          休息 5 分
        </button>
      </div>
      <div className="relative mx-auto mb-4 h-40 w-40">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 192 192" aria-hidden>
          <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="8" opacity="0.12" />
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="553"
            strokeDashoffset={553 - progress}
            className={reduceRef.current ? '' : 'transition-[stroke-dashoffset] duration-1000'}
          />
        </svg>
        <p className="absolute inset-0 flex items-center justify-center font-mono text-3xl tabular-nums">
          {fmt(remaining)}
        </p>
      </div>
      <div className="flex gap-2 justify-center">
        <button
          type="button"
          className="px-4 py-2 text-sm border border-border hover:border-foreground"
          onClick={() => setRunning((v) => !v)}
        >
          {running ? '暂停' : '开始'}
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm border border-border hover:border-foreground"
          onClick={() => {
            setRunning(false)
            setRemaining(mode === 'work' ? WORK_SEC : BREAK_SEC)
          }}
        >
          重置
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">已完成 {sessions} 个番茄</p>
    </div>
  )
}
