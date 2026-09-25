'use client'

import React, { useEffect, useId, useRef, useState } from 'react'

type HomeSnapProps = {
  panels: React.ReactNode[]
  labels?: string[]
}

/**
 * Homepage section snap — few dense panels, then normal scroll into the footer.
 * Last panel uses proximity stop so the footer remains reachable.
 */
export function HomeSnap({ panels, labels = [] }: HomeSnapProps) {
  const rootId = useId()
  const panelRefs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)
  const count = panels.length

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('home-snap-root')
    return () => {
      root.classList.remove('home-snap-root')
    }
  }, [])

  useEffect(() => {
    const nodes = panelRefs.current.filter(Boolean) as HTMLElement[]
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible?.target) return
        const idx = nodes.indexOf(visible.target as HTMLElement)
        if (idx >= 0) setActive(idx)
      },
      { root: null, threshold: [0.25, 0.45, 0.65] },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [count])

  const jump = (index: number) => {
    panelRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {panels.map((panel, index) => {
        const isFirst = index === 0
        const isLast = index === count - 1
        return (
          <section
            key={`${rootId}-${index}`}
            ref={(el) => {
              panelRefs.current[index] = el
            }}
            className={[
              'home-snap-panel',
              isFirst ? 'home-snap-panel--hero' : '',
              isLast ? 'home-snap-panel--tail' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-label={labels[index] || `第 ${index + 1} 屏`}
            data-snap-index={index}
          >
            {panel}
          </section>
        )
      })}

      {count > 1 ? (
        <nav className="home-snap-dots" aria-label="首页分屏">
          {panels.map((_, index) => (
            <button
              key={`${rootId}-dot-${index}`}
              type="button"
              className={
                index === active ? 'home-snap-dots__btn is-active' : 'home-snap-dots__btn'
              }
              aria-label={labels[index] || `转到第 ${index + 1} 屏`}
              aria-current={index === active ? 'true' : undefined}
              onClick={() => jump(index)}
            />
          ))}
        </nav>
      ) : null}
    </>
  )
}
