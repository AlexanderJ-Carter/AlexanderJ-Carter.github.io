'use client'

import React from 'react'

export function AssistantReopenLink({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event('folio:open-assistant'))}
    >
      问站
    </button>
  )
}
