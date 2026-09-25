'use client'

import React, { useMemo, useState } from 'react'

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      default:
        h = ((r - g) / d + 4) / 6
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export function ColorPicker() {
  const [hex, setHex] = useState('#3d7382')
  const [copied, setCopied] = useState<string | null>(null)

  const { r, g, b } = useMemo(() => hexToRgb(hex), [hex])
  const hsl = useMemo(() => rgbToHsl(r, g, b), [r, g, b])

  const copy = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(label)
    window.setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="glass-card fun-toy p-6">
      <p className="folio-mark mb-2">Swatch</p>
      <h3 className="text-lg font-semibold mb-4">颜色选择器</h3>
      <div className="relative mb-4 h-28 overflow-hidden rounded-sm border border-border" style={{ background: hex }}>
        <input
          type="color"
          value={hex}
          aria-label="选取颜色"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={(e) => setHex(e.target.value)}
        />
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-xl font-bold text-white drop-shadow">
          {hex.toUpperCase()}
        </p>
      </div>
      <ul className="space-y-2 text-sm font-mono">
        {[
          ['HEX', hex.toUpperCase()],
          ['RGB', `${r}, ${g}, ${b}`],
          ['HSL', `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`],
        ].map(([label, value]) => (
          <li key={label} className="flex items-center justify-between gap-2 border border-border px-3 py-2">
            <span>
              <span className="text-muted-foreground mr-2">{label}</span>
              {value}
            </span>
            <button
              type="button"
              className="text-xs uppercase tracking-wider underline-offset-2 hover:underline"
              onClick={() => void copy(label, value)}
            >
              {copied === label ? '已复制' : '复制'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
