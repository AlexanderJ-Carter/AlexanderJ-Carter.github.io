'use client'

import React, { useCallback, useState } from 'react'

type Op = '+' | '-' | '*' | '/' | null

function apply(a: number, b: number, op: Op): number {
  switch (op) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case '/':
      return b === 0 ? NaN : a / b
    default:
      return b
  }
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return '错误'
  const r = Math.round(n * 1e9) / 1e9
  return String(r)
}

const OP_LABEL: Record<Exclude<Op, null>, string> = {
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
}

export function Calculator() {
  const [current, setCurrent] = useState('0')
  const [prev, setPrev] = useState('')
  const [op, setOp] = useState<Op>(null)
  const [reset, setReset] = useState(false)

  const expression = prev + (op ? ` ${OP_LABEL[op]} ` : '')

  const inputDigit = useCallback(
    (value: string) => {
      setCurrent((c) => {
        if (reset) {
          setReset(false)
          return value === '.' ? '0.' : value
        }
        if (value === '.' && c.includes('.')) return c
        if (c === '0' && value !== '.') return value
        return c + value
      })
    },
    [reset],
  )

  const chooseOp = useCallback(
    (next: Exclude<Op, null>) => {
      if (prev && op && !reset) {
        const result = apply(parseFloat(prev), parseFloat(current), op)
        const s = fmt(result)
        setPrev(s)
        setCurrent(s)
      } else {
        setPrev(current)
      }
      setOp(next)
      setReset(true)
    },
    [prev, op, reset, current],
  )

  const equals = useCallback(() => {
    if (!prev || !op) return
    const result = apply(parseFloat(prev), parseFloat(current), op)
    setCurrent(fmt(result))
    setPrev('')
    setOp(null)
    setReset(true)
  }, [prev, op, current])

  const clear = () => {
    setCurrent('0')
    setPrev('')
    setOp(null)
    setReset(false)
  }

  const btn =
    'py-3 text-sm border border-border hover:bg-muted/50 transition-colors active:scale-[0.98]'

  return (
    <div className="glass-card fun-toy p-6" tabIndex={0} aria-label="计算器">
      <p className="folio-mark mb-2">Calc</p>
      <h3 className="text-lg font-semibold mb-4">计算器</h3>
      <div className="mb-4 rounded-sm border border-border bg-muted/40 px-3 py-3 text-right">
        <p className="text-xs text-muted-foreground font-mono min-h-[1rem]">{expression || '\u00a0'}</p>
        <p className="text-3xl font-mono font-semibold tabular-nums break-all">{current}</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button type="button" className={btn} onClick={clear}>
          清空
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => setCurrent((c) => (c.length > 1 ? c.slice(0, -1) : '0'))}
        >
          ⌫
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => setCurrent((c) => fmt(parseFloat(c) / 100))}
        >
          %
        </button>
        <button type="button" className={btn} onClick={() => chooseOp('/')}>
          ÷
        </button>
        {['7', '8', '9'].map((d) => (
          <button key={d} type="button" className={btn} onClick={() => inputDigit(d)}>
            {d}
          </button>
        ))}
        <button type="button" className={btn} onClick={() => chooseOp('*')}>
          ×
        </button>
        {['4', '5', '6'].map((d) => (
          <button key={d} type="button" className={btn} onClick={() => inputDigit(d)}>
            {d}
          </button>
        ))}
        <button type="button" className={btn} onClick={() => chooseOp('-')}>
          −
        </button>
        {['1', '2', '3'].map((d) => (
          <button key={d} type="button" className={btn} onClick={() => inputDigit(d)}>
            {d}
          </button>
        ))}
        <button type="button" className={btn} onClick={() => chooseOp('+')}>
          +
        </button>
        <button type="button" className={`${btn} col-span-2`} onClick={() => inputDigit('0')}>
          0
        </button>
        <button type="button" className={btn} onClick={() => inputDigit('.')}>
          .
        </button>
        <button
          type="button"
          className="py-3 text-sm border border-foreground bg-foreground text-background"
          onClick={equals}
        >
          =
        </button>
      </div>
    </div>
  )
}
