'use client'

import React, { useMemo, useState } from 'react'

import {
  galleryCategories,
  galleryItems,
  type GalleryCategoryId,
  type GalleryItem,
} from '@/data/gallery'

export function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategoryId>('all')
  const [active, setActive] = useState<GalleryItem | null>(null)

  const items = useMemo(
    () => (filter === 'all' ? galleryItems : galleryItems.filter((i) => i.category === filter)),
    [filter],
  )

  const counts = useMemo(() => {
    const c = { landscape: 0, nature: 0, food: 0 }
    for (const item of galleryItems) {
      if (item.category in c) c[item.category as keyof typeof c]++
    }
    return c
  }, [])

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em] text-muted-foreground font-mono">
          <span>
            <strong className="text-foreground">{galleryItems.length}</strong> 帧
          </span>
          <span>L {counts.landscape}</span>
          <span>N {counts.nature}</span>
          <span>F {counts.food}</span>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="画廊分类">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={filter === cat.id}
              className={`px-3 py-1.5 text-xs tracking-[0.12em] uppercase border transition-colors ${
                filter === cat.id
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="contact-sheet grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 list-none p-0 m-0">
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              className="contact-sheet__frame group relative block w-full overflow-hidden text-left"
              onClick={() => setActive(item)}
              aria-label={`查看 ${item.title}`}
            >
              <span className="contact-sheet__no" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt=""
                width={800}
                height={800}
                className="aspect-square h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="contact-sheet__meta">
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-white/70">
                  {item.category}
                </p>
                <p className="text-sm font-medium text-white">{item.title}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setActive(null)
          }}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white/80 hover:text-white text-sm tracking-widest uppercase"
            onClick={() => setActive(null)}
          >
            关闭
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.src.replace('-md.webp', '-lg.webp')}
            alt={active.title}
            className="max-h-[90vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
