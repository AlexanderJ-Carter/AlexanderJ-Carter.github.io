'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = (await res.json()) as { ok?: boolean; message?: string }

    if (!res.ok || !data.ok) {
      setStatus('error')
      setMessage(data.message || '订阅失败，请稍后再试')
      return
    }

    setStatus('ok')
    setMessage(data.message || '已加入名单')
    setEmail('')
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <label className="block text-sm font-medium" htmlFor="subscribe-email">
        邮箱
      </label>
      <input
        id="subscribe-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        placeholder="you@example.com"
        disabled={status === 'loading'}
      />
      <Button type="submit" disabled={status === 'loading' || !email.trim()}>
        {status === 'loading' ? '提交中…' : '订阅'}
      </Button>
      {message ? (
        <p
          className={
            status === 'error' ? 'text-sm text-destructive' : 'text-sm text-muted-foreground'
          }
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  )
}
