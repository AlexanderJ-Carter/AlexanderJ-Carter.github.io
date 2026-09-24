'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { galleryItems, type GalleryItem } from '@/data/gallery'

export function DailyFrame() {
  const [frame, setFrame] = useState<GalleryItem>(galleryItems[0]!)

  useEffect(() => {
    const day = Math.floor(Date.now() / 86_400_000)
    setFrame(galleryItems[day % galleryItems.length]!)
  }, [])

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 pb-4">
        <h3 className="text-lg font-semibold mb-1">今日一帧</h3>
        <p className="text-sm text-muted-foreground">随机展示一张画廊作品</p>
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
          height={600}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="contact-sheet__meta">
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-white/70">{frame.category}</p>
          <p className="text-sm font-medium text-white">{frame.title}</p>
        </div>
      </Link>
      <div className="p-4">
        <Link href="/gallery" className="text-sm underline underline-offset-4">
          前往画廊 →
        </Link>
      </div>
    </div>
  )
}
