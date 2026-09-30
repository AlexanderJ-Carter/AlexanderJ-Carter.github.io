'use client'

import React, { useEffect, useState } from 'react'

import { AdminBar } from '@/components/AdminBar'

/**
 * 客户端探测 payload 会话，避免 layout 调用 cookies()/draftMode()
 * 把整站打成动态渲染。
 */
export function AdminBarGate() {
  const [show, setShow] = useState(false)
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    const jar = document.cookie
    setShow(/(?:^|; )payload-token=/.test(jar))
    setPreview(/(?:^|; )__prerender_bypass=/.test(jar) || /(?:^|; )__next_preview_data=/.test(jar))
  }, [])

  if (!show) return null
  return <AdminBar adminBarProps={{ preview }} />
}
