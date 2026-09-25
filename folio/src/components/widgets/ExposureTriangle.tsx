'use client'

import React, { useMemo, useState } from 'react'

const APERTURES = ['1.4', '2', '2.8', '4', '5.6', '8', '11', '16', '22']
const SHUTTERS = [
  { v: 1 / 4000, label: '1/4000' },
  { v: 1 / 2000, label: '1/2000' },
  { v: 1 / 1000, label: '1/1000' },
  { v: 1 / 500, label: '1/500' },
  { v: 1 / 250, label: '1/250' },
  { v: 1 / 125, label: '1/125' },
  { v: 1 / 60, label: '1/60' },
  { v: 1 / 30, label: '1/30' },
  { v: 1 / 15, label: '1/15' },
  { v: 1 / 8, label: '1/8' },
  { v: 1 / 4, label: '1/4' },
  { v: 0.5, label: '1/2' },
  { v: 1, label: '1″' },
  { v: 2, label: '2″' },
]
const ISOS = ['100', '200', '400', '800', '1600', '3200', '6400']

export function ExposureTriangle() {
  const [aperture, setAperture] = useState('5.6')
  const [shutter, setShutter] = useState(String(1 / 125))
  const [iso, setIso] = useState('100')

  const ev = useMemo(() => {
    const N = parseFloat(aperture)
    const t = parseFloat(shutter)
    const S = parseFloat(iso)
    if (!(N > 0 && t > 0 && S > 0)) return null
    const ev100 = Math.log2((N * N) / t)
    return Math.round((ev100 - Math.log2(S / 100)) * 10) / 10
  }, [aperture, shutter, iso])

  const field = 'mt-1 w-full border border-border bg-transparent px-3 py-2 text-sm'

  return (
    <div className="glass-card fun-toy p-6">
      <p className="folio-mark mb-2">Plate EV</p>
      <h3 className="text-lg font-semibold mb-1">曝光三角</h3>
      <p className="text-sm text-muted-foreground mb-5">调光圈、快门、ISO，看等效曝光怎么变。</p>
      <div className="space-y-4">
        <label className="block text-xs uppercase tracking-wider text-muted-foreground">
          光圈
          <select className={field} value={aperture} onChange={(e) => setAperture(e.target.value)}>
            {APERTURES.map((a) => (
              <option key={a} value={a}>
                f/{a}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs uppercase tracking-wider text-muted-foreground">
          快门
          <select className={field} value={shutter} onChange={(e) => setShutter(e.target.value)}>
            {SHUTTERS.map((s) => (
              <option key={s.label} value={s.v}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs uppercase tracking-wider text-muted-foreground">
          感光度
          <select className={field} value={iso} onChange={(e) => setIso(e.target.value)}>
            {ISOS.map((i) => (
              <option key={i} value={i}>
                ISO {i}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-border pt-4">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">曝光值</span>
        <span className="text-3xl font-semibold tabular-nums">
          {ev == null ? '—' : ev.toFixed(1)}
        </span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
        <span className="font-medium text-foreground">提示</span>{' '}
        光圈开大一档，快门大约要快一倍，才能保持相近亮度。
      </p>
    </div>
  )
}
