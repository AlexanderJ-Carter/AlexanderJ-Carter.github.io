'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'

const CURRENCIES = ['CNY', 'USD', 'EUR', 'GBP', 'JPY', 'HKD', 'AUD', 'CAD'] as const

type Rates = Record<string, number>

export function CurrencyTool() {
  const [amount, setAmount] = useState(100)
  const [from, setFrom] = useState<string>('USD')
  const [to, setTo] = useState<string>('CNY')
  const [rates, setRates] = useState<Rates | null>(null)
  const [updated, setUpdated] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('https://api.frankfurter.app/latest?from=USD')
      if (!res.ok) throw new Error('fx')
      const json = await res.json()
      const next: Rates = { USD: 1, ...(json.rates as Rates) }
      setRates(next)
      setUpdated(json.date || null)
    } catch {
      setError(true)
      setRates(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const result = useMemo(() => {
    if (!rates || !rates[from] || !rates[to]) return null
    const inUsd = amount / rates[from]!
    return Math.round(inUsd * rates[to]! * 10000) / 10000
  }, [rates, amount, from, to])

  const major = useMemo(() => {
    if (!rates?.CNY) return []
    return (['USD', 'EUR', 'GBP', 'JPY', 'HKD'] as const)
      .filter((c) => rates[c])
      .map((c) => ({
        code: c,
        cny: Math.round((rates.CNY! / rates[c]!) * 10000) / 10000,
      }))
  }, [rates])

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="border border-border p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">主要货币汇率</h2>
          <button
            type="button"
            className="text-xs uppercase tracking-wider border border-border px-2 py-1"
            onClick={() => void load()}
          >
            刷新
          </button>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">今日参考（1 单位外币 ≈ ? 人民币）</p>
        {loading && <p className="text-sm text-muted-foreground">加载中…</p>}
        {error && <p className="text-sm text-muted-foreground">加载失败，请稍后重试</p>}
        {!loading && !error && (
          <ul className="divide-y divide-border border-y border-border">
            {major.map((row) => (
              <li key={row.code} className="flex justify-between py-3 font-mono text-sm">
                <span>{row.code}</span>
                <span className="tabular-nums">{row.cny}</span>
              </li>
            ))}
          </ul>
        )}
        {updated && (
          <p className="mt-3 text-xs text-muted-foreground">数据日期 {updated} · Frankfurter</p>
        )}
        <p className="mt-2 text-xs text-muted-foreground">仅供参考，不作为交易依据。</p>
      </div>

      <div className="border border-border p-6">
        <h2 className="mb-4 text-lg font-semibold">汇率计算器</h2>
        <label className="mb-3 block text-xs text-muted-foreground">
          金额
          <input
            type="number"
            className="mt-1 w-full border border-border bg-transparent px-3 py-2 text-sm"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </label>
        <div className="mb-3 grid grid-cols-2 gap-3">
          <label className="block text-xs text-muted-foreground">
            从
            <select
              className="mt-1 w-full border border-border bg-transparent px-3 py-2 text-sm"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-muted-foreground">
            到
            <select
              className="mt-1 w-full border border-border bg-transparent px-3 py-2 text-sm"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="border border-border bg-muted/30 px-3 py-4 font-mono text-2xl tabular-nums">
          {result == null ? '—' : result}
        </p>
      </div>
    </div>
  )
}
