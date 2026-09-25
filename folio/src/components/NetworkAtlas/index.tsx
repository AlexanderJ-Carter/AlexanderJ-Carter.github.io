'use client'

import Link from 'next/link'
import React, { useId, useState } from 'react'

export type AtlasNode = {
  href: string
  label: string
  note: string
  external?: boolean
}

export type AtlasZone = {
  id: string
  title: string
  blurb: string
  /** 地图坐标感标注，如 N1 */
  mark: string
  nodes: AtlasNode[]
}

type NetworkAtlasProps = {
  hubLabel: string
  zones: AtlasZone[]
  away: AtlasZone | null
}

export function NetworkAtlas({ hubLabel, zones, away }: NetworkAtlasProps) {
  const [active, setActive] = useState<string | null>(null)
  const svgId = useId().replace(/:/g, '')

  const allZones = away && away.nodes.length > 0 ? [...zones, away] : zones

  return (
    <div className="network-atlas" data-active={active || undefined}>
      <div className="network-atlas__plate">
        <div className="network-atlas__field" aria-hidden>
          <div className="network-atlas__grid" />
          <div className="network-atlas__haze" />
          <svg className="network-atlas__spokes" viewBox="0 0 100 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`${svgId}-spoke`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path d="M50 8 L18 28" stroke={`url(#${svgId}-spoke)`} fill="none" strokeWidth="0.35" />
            <path d="M50 8 L50 28" stroke={`url(#${svgId}-spoke)`} fill="none" strokeWidth="0.35" />
            <path d="M50 8 L82 28" stroke={`url(#${svgId}-spoke)`} fill="none" strokeWidth="0.35" />
            <path
              d="M50 8 L50 48"
              stroke={`url(#${svgId}-spoke)`}
              fill="none"
              strokeWidth="0.35"
              strokeDasharray="1.2 1.2"
            />
            <circle cx="50" cy="8" r="1.1" fill="currentColor" opacity="0.45" />
          </svg>
        </div>

        <header className="network-atlas__hub">
          <p className="network-atlas__hub-mark">Origin · 0°00′</p>
          <p className="network-atlas__hub-name">{hubLabel}</p>
          <p className="network-atlas__hub-note">本站与站外入口的一张总图 · 点选任一地点</p>
        </header>

        <div className="network-atlas__legend" aria-hidden>
          <span>本站</span>
          <span className="network-atlas__legend-gap" />
          <span>站外</span>
        </div>

        <div className="network-atlas__zones">
          {allZones.map((zone) => (
            <section
              key={zone.id}
              className={`network-atlas__zone${zone.id === 'away' ? ' network-atlas__zone--away' : ''}`}
              aria-labelledby={`atlas-zone-${zone.id}`}
              onMouseLeave={() => setActive(null)}
            >
              <header className="network-atlas__zone-head">
                <span className="network-atlas__zone-mark">{zone.mark}</span>
                <div>
                  <h2 id={`atlas-zone-${zone.id}`} className="network-atlas__zone-title">
                    {zone.title}
                  </h2>
                  <p className="network-atlas__zone-blurb">{zone.blurb}</p>
                </div>
              </header>
              <ul className="network-atlas__nodes">
                {zone.nodes.map((node) => (
                  <li key={node.href}>
                    <NodeLink
                      node={node}
                      active={active === node.href}
                      onFocus={() => setActive(node.href)}
                      onBlur={() => setActive(null)}
                      onEnter={() => setActive(node.href)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function NodeLink({
  node,
  active,
  onFocus,
  onBlur,
  onEnter,
}: {
  node: AtlasNode
  active: boolean
  onFocus: () => void
  onBlur: () => void
  onEnter: () => void
}) {
  const className = `network-atlas__node${active ? ' is-active' : ''}`

  const inner = (
    <>
      <span className="network-atlas__pin" aria-hidden />
      <span className="network-atlas__node-main">
        <span className="network-atlas__node-label">
          {node.label}
          {node.external ? (
            <span className="network-atlas__ext" aria-hidden>
              ↗
            </span>
          ) : null}
        </span>
        <span className="network-atlas__node-note">{node.note}</span>
      </span>
      <span className="network-atlas__node-path">
        {node.external ? hostOf(node.href) : node.href}
      </span>
    </>
  )

  if (node.external) {
    return (
      <a
        className={className}
        href={node.href}
        rel="noopener noreferrer"
        target="_blank"
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onEnter}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link
      className={className}
      href={node.href}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onEnter}
    >
      {inner}
    </Link>
  )
}

function hostOf(href: string): string {
  try {
    return new URL(href).host
  } catch {
    return href
  }
}
