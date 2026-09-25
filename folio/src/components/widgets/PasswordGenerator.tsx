'use client'

import React, { useCallback, useState } from 'react'

function strengthLabel(len: number, kinds: number) {
  const score = len + kinds * 4
  if (score < 20) return '弱'
  if (score < 32) return '中等'
  if (score < 44) return '强'
  return '非常强'
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    let chars = ''
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (numbers) chars += '0123456789'
    if (symbols) chars += '!@#$%^&*_-+=?'
    if (!chars) {
      setPassword('')
      return
    }
    const buf = new Uint32Array(length)
    crypto.getRandomValues(buf)
    let out = ''
    for (let i = 0; i < length; i++) {
      out += chars[buf[i]! % chars.length]
    }
    setPassword(out)
    setCopied(false)
  }, [length, upper, lower, numbers, symbols])

  const kinds = [upper, lower, numbers, symbols].filter(Boolean).length

  return (
    <div className="glass-card fun-toy p-6">
      <p className="folio-mark mb-2">Key</p>
      <h3 className="text-lg font-semibold mb-4">密码生成器</h3>
      <div className="mb-4 rounded-sm border border-border bg-muted/40 px-3 py-3 font-mono text-sm break-all min-h-[2.75rem]">
        {password || '点击生成'}
      </div>
      <label className="block text-sm mb-4">
        长度：{length}
        <input
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="mt-2 w-full"
        />
      </label>
      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        {[
          ['大写字母', upper, setUpper],
          ['小写字母', lower, setLower],
          ['数字', numbers, setNumbers],
          ['特殊符号', symbols, setSymbols],
        ].map(([label, checked, set]) => (
          <label key={label as string} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checked as boolean}
              onChange={(e) => (set as (v: boolean) => void)(e.target.checked)}
            />
            {label as string}
          </label>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mb-4">强度：{strengthLabel(length, kinds)}</p>
      <div className="flex gap-2">
        <button
          type="button"
          className="px-4 py-2 text-sm border border-foreground bg-foreground text-background"
          onClick={generate}
        >
          生成密码
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm border border-border"
          disabled={!password}
          onClick={async () => {
            await navigator.clipboard.writeText(password)
            setCopied(true)
          }}
        >
          {copied ? '已复制！' : '复制'}
        </button>
      </div>
    </div>
  )
}
