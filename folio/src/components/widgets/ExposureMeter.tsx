'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Variant = 'ink' | 'on-dark'

function formatMeter(now: Date) {
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now)
  const day = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Shanghai',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(now)
  return { time, day }
}

export function ExposureMeter({
  variant = 'ink',
  href = '/time',
  className = '',
}: {
  variant?: Variant
  href?: string
  className?: string
}) {
  const [{ time, day }, setMeter] = useState(() => formatMeter(new Date()))

  useEffect(() => {
    const tick = () => setMeter(formatMeter(new Date()))
    tick()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = window.setInterval(tick, reduce ? 60_000 : 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <Link
      href={href}
      className={`exif-meter exif-meter--${variant} ${className}`.trim()}
      aria-label="北京时间，打开世界时间"
    >
      <span className="exif-meter__rec" aria-hidden />
      <span className="exif-meter__time">{time}</span>
      <span className="exif-meter__sep" aria-hidden>
        ·
      </span>
      <span>Asia/Shanghai</span>
      <span className="exif-meter__sep" aria-hidden>
        ·
      </span>
      <span>{day}</span>
    </Link>
  )
}
