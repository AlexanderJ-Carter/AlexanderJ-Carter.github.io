'use client'

import React, { useMemo, useState } from 'react'

export function QrTool() {
  const [text, setText] = useState('https://alexander.xin')
  const src = useMemo(() => {
    const q = encodeURIComponent(text.trim() || 'https://alexander.xin')
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${q}`
  }, [text])

  return (
    <div className="max-w-xl border border-border p-6 md:p-8">
      <label className="mb-2 block text-sm font-medium" htmlFor="qr-input">
        输入网址或文字
      </label>
      <input
        id="qr-input"
        type="text"
        className="mb-4 w-full border border-border bg-transparent px-4 py-3 text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="例如 https://alexander.xin"
      />
      <div className="flex justify-center border border-border bg-white p-6 dark:bg-zinc-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="生成的二维码" width={240} height={240} className="h-60 w-60" />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">可右键保存图片。</p>
    </div>
  )
}
