'use client'

import React, { useState } from 'react'

function round(n: number, digits = 4) {
  const p = 10 ** digits
  return Math.round(n * p) / p
}

export function UnitsTool() {
  const [c, setC] = useState(25)
  const [m, setM] = useState(1)
  const [kg, setKg] = useState(1)

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="border border-border p-6">
        <h2 className="mb-4 text-lg font-semibold">温度</h2>
        <label className="mb-3 block text-xs text-muted-foreground">
          摄氏度 °C
          <input
            type="number"
            step="0.1"
            className="mt-1 w-full border border-border bg-transparent px-3 py-2 text-sm"
            value={c}
            onChange={(e) => setC(Number(e.target.value))}
          />
        </label>
        <label className="block text-xs text-muted-foreground">
          华氏度 °F
          <input
            type="number"
            step="0.1"
            className="mt-1 w-full border border-border bg-transparent px-3 py-2 text-sm"
            value={round(c * 1.8 + 32, 2)}
            onChange={(e) => setC(round((Number(e.target.value) - 32) / 1.8, 2))}
          />
        </label>
      </div>

      <div className="border border-border p-6">
        <h2 className="mb-4 text-lg font-semibold">长度</h2>
        <label className="mb-3 block text-xs text-muted-foreground">
          米 m
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full border border-border bg-transparent px-3 py-2 text-sm"
            value={m}
            onChange={(e) => setM(Number(e.target.value))}
          />
        </label>
        <label className="mb-3 block text-xs text-muted-foreground">
          千米 km
          <input
            type="number"
            step="0.001"
            className="mt-1 w-full border border-border bg-transparent px-3 py-2 text-sm"
            value={round(m / 1000, 6)}
            onChange={(e) => setM(Number(e.target.value) * 1000)}
          />
        </label>
        <p className="text-sm text-muted-foreground">
          {round(m * 3.28084, 2)} ft · {round(m * 39.3701, 2)} in
        </p>
      </div>

      <div className="border border-border p-6">
        <h2 className="mb-4 text-lg font-semibold">重量</h2>
        <label className="mb-3 block text-xs text-muted-foreground">
          千克 kg
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full border border-border bg-transparent px-3 py-2 text-sm"
            value={kg}
            onChange={(e) => setKg(Number(e.target.value))}
          />
        </label>
        <label className="block text-xs text-muted-foreground">
          磅 lb
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full border border-border bg-transparent px-3 py-2 text-sm"
            value={round(kg * 2.20462, 3)}
            onChange={(e) => setKg(round(Number(e.target.value) / 2.20462, 3))}
          />
        </label>
      </div>
    </div>
  )
}
