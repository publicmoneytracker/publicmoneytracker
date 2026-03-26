'use client'

import { useState } from 'react'

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false)

  async function handlePortal() {
    setLoading(true)
    try {
      const res = await fetch('/api/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePortal}
      disabled={loading}
      style={{
        background: 'transparent',
        border: '1px solid #d4c5a9',
        padding: '0.65rem 1.25rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#8b7355',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? 'Loading...' : 'Manage Subscription'}
    </button>
  )
}
