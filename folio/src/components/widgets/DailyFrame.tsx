'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { galleryItems, type GalleryItem } from '@/data/gallery'

export function DailyFrame() {
  const [frame, setFrame] = useState<GalleryItem>(galleryItems[0]!)
  const [dayLabel, setDayLabel] = useState('')

  useEffect(() => {
    const day = Math.floor(Date.now() / 86_400_000)
    setFrame(galleryItems[day % galleryItems.length]!)
    setDayLabel(
      new Intl.DateTimeFormat('zh-CN', {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      }).format(new Date()),
    )
  }, [])

  return (
    <div className="glass-card fun-toy overflow-hidden">
      <div className="p-6 pb-4">
        <p className="folio-mark mb-2">Plate DF</p>
        <h3 className="text-lg font-semibold mb-1">今日一帧</h3>
        <p className="text-sm text-muted-foreground">
          {dayLabel ? `${dayLabel} · 按日期轮换画廊` : '按日期轮换画廊一帧'}
        </p>
      </div>
      <Link href="/gallery" className="contact-sheet__frame group relative block overflow-hidden">
        <span className="contact-sheet__no" aria-hidden>
          DF
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frame.src}
          alt={frame.title}
          width={800}
          height={800}
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:aspect-square"
          decoding="async"
        />
        <div className="contact-sheet__meta">
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-white/70">{frame.category}</p>
          <p className="text-sm font-medium text-white">{frame.title}</p>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-3 p-4">
        <Link href="/gallery" className="text-sm underline underline-offset-4">
          前往画廊 →
        </Link>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
          Contact sheet
        </span>
      </div>
    </div>
  )
}
