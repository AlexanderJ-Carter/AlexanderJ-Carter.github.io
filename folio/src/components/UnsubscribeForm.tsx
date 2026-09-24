'use client'

import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

function UnsubscribeFormInner() {
  const search = useSearchParams()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const q = search.get('email')?.trim()
    if (q) setEmail(q)
  }, [search])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    const res = await fetch('/api/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = (await res.json()) as { ok?: boolean; message?: string }

    if (!res.ok || !data.ok) {
      setStatus('error')
      setMessage(data.message || '退订失败，请稍后再试')
      return
    }

    setStatus('ok')
    setMessage(data.message || '已退订')
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <label className="block text-sm font-medium" htmlFor="unsubscribe-email">
        邮箱
      </label>
      <input
        id="unsubscribe-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        placeholder="you@example.com"
        disabled={status === 'loading'}
      />
      <Button type="submit" variant="outline" disabled={status === 'loading' || !email.trim()}>
        {status === 'loading' ? '处理中…' : '确认退订'}
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

export function UnsubscribeForm() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">载入中…</p>}>
      <UnsubscribeFormInner />
    </Suspense>
  )
}
