'use client'

import { useState } from 'react'
import { PlanTier, PlanInterval } from '@/lib/stripe'
import { SUBSCRIPTIONS_OPEN } from '@/lib/config'

interface CheckoutButtonProps {
  tier: PlanTier
  interval: PlanInterval
  label: string
  style?: React.CSSProperties
}

export default function CheckoutButton({
  tier,
  interval,
  label,
  style,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCheckout() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, interval }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/account?redirectTo=' +
            encodeURIComponent(window.location.pathname)
          return
        }
        setError(data.error || 'Something went wrong.')
        setLoading(false)
        return
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  if (!SUBSCRIPTIONS_OPEN) {
    return (
      <div style={{
        background: '#ede8df',
        border: '1px solid #d4c5a9',
        padding: '0.85rem 2rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#8b7355',
        textAlign: 'center',
        width: '100%',
      }}>
        Coming Soon
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          background: '#c0392b',
          color: '#fff',
          border: 'none',
          padding: '0.85rem 2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          width: '100%',
          ...style,
        }}
      >
        {loading ? 'Redirecting to checkout...' : label}
      </button>
      {error && (
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#c0392b',
          marginTop: '0.5rem',
        }}>
          {error}
        </p>
      )}
    </div>
  )
}
