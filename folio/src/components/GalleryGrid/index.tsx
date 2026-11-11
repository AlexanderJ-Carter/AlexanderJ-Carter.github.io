'use client'

import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'

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

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  return (
    <>
      <div className="gallery-toolbar">
        <div className="gallery-stats" aria-label="画廊统计">
          <span>
            <strong>{galleryItems.length}</strong> 帧
          </span>
          <span>L {counts.landscape}</span>
          <span>N {counts.nature}</span>
          <span>F {counts.food}</span>
          {filter !== 'all' ? <span>筛选 {items.length}</span> : null}
        </div>
        <div className="gallery-tabs" role="tablist" aria-label="画廊分类">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={filter === cat.id}
              className="gallery-tab"
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="gallery-masonry">
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
              <Image
                src={item.src}
                alt={item.title}
                width={800}
                height={1000}
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 50vw, (max-width: 1100px) 33vw, 25vw"
                quality={78}
                priority={i < 2}
                loading={i < 2 ? undefined : i < 6 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="contact-sheet__meta">
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-white/70">
                  {galleryCategories.find((c) => c.id === item.category)?.label || item.category}
                </p>
                <p className="text-sm font-medium text-white md:text-[0.95rem]">{item.title}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="gallery-lightbox__close"
            onClick={() => setActive(null)}
          >
            关闭
          </button>
          <div className="gallery-lightbox__frame" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src.replace('-md.webp', '-lg.webp')}
              alt={active.title}
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <div className="gallery-lightbox__meta">
            <p>
              {galleryCategories.find((c) => c.id === active.category)?.label || active.category}
            </p>
            <p>{active.title}</p>
          </div>
        </div>
      ) : null}
    </>
  )
}
