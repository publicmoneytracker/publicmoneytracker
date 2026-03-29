'use client'

import { useState, useEffect } from 'react'

interface BillMeta {
  week_ending: string
  total_introduced: number
  source: string
}

interface Bill {
  bill_number: string
  title: string
  sponsor_name: string
  sponsor_state: string
  sponsor_party: string
  introduced_date: string
  policy_area: string
  latest_action: string
}

interface BillsData {
  _meta: BillMeta
  bills: Bill[]
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + '…' : str
}

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const body: React.CSSProperties = { fontFamily: 'var(--font-body)' }

export default function BillsThisWeek() {
  const [data, setData] = useState<BillsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/bills_this_week.json')
      .then((r) => r.json())
      .then((d: BillsData) => {
        setData(d)
        setLoading(false)
      })
      .catch(() => {
        setData(null)
        setLoading(false)
      })
  }, [])

  return (
    <div
      style={{
        border: '2px solid #1a1a1a',
        background: '#f5f0e8',
        maxWidth: '860px',
        margin: '2rem auto 0',
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          background: '#1a1a1a',
          padding: '0.75rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <span style={{ ...mono, fontSize: '10px', color: '#f5f0e8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          Bills Introduced · Federal Legislation
        </span>
        <span style={{ ...mono, fontSize: '10px', color: '#d4c5a9' }}>
          {loading
            ? '— bills · loading'
            : data
            ? `Top bills · week ending ${formatDate(data._meta.week_ending)}`
            : '—'}
        </span>
      </div>

      {/* Bill list */}
      <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
        {loading && (
          <div style={{ padding: '1.5rem 1rem', ...mono, fontSize: '11px', color: '#8b7355' }}>
            Loading bills…
          </div>
        )}
        {!loading && (!data || data.bills.length === 0) && (
          <div style={{ padding: '1.5rem 1rem', ...mono, fontSize: '11px', color: '#8b7355', fontStyle: 'italic' }}>
            Bill data updates every Friday.
          </div>
        )}
        {!loading && data && data.bills.map((bill, i) => (
          <BillRow key={bill.bill_number + i} bill={bill} />
        ))}
      </div>

      {/* Footer bar */}
      <div
        style={{
          background: '#1a1a1a',
          padding: '0.5rem 1rem',
        }}
      >
        <span style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Top Spending-Related Bills · Source: Congress.gov · Full List Updates Friday
        </span>
      </div>
    </div>
  )
}

function BillRow({ bill }: { bill: Bill }) {
  const [hovered, setHovered] = useState(false)

  const sponsorLabel = (() => {
    const prefix = bill.sponsor_name.startsWith('Sen.') ? '' : bill.sponsor_name.startsWith('Rep.') ? '' : 'Rep. '
    const name = bill.sponsor_name.replace(/^(Rep\.|Sen\.)\s*/, '')
    const title = bill.sponsor_name.startsWith('Sen.') ? 'Sen.' : 'Rep.'
    return `${title} ${name} (${bill.sponsor_party}-${bill.sponsor_state}) · ${formatDate(bill.introduced_date)}`
  })()

  const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
  const body: React.CSSProperties = { fontFamily: 'var(--font-body)' }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '0.75rem 1rem',
        borderBottom: '1px solid #d4c5a9',
        background: hovered ? '#ede8df' : '#f5f0e8',
        transition: 'background 0.1s',
      }}
    >
      {/* Row 1: bill number + policy area tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
        <span style={{ ...mono, fontSize: '11px', color: '#1a1a1a', fontWeight: 700 }}>
          {bill.bill_number}
        </span>
        <span
          style={{
            ...mono,
            fontSize: '8px',
            color: '#8b7355',
            border: '1px solid #d4c5a9',
            padding: '1px 6px',
            marginLeft: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {bill.policy_area}
        </span>
      </div>

      {/* Row 2: title */}
      <div style={{ ...body, fontSize: '13px', color: '#2c2c2c', lineHeight: 1.4, marginBottom: '0.25rem' }}>
        {truncate(bill.title, 80)}
      </div>

      {/* Row 3: sponsor + date */}
      <div style={{ ...mono, fontSize: '9px', color: '#8b7355', marginBottom: bill.latest_action ? '0.2rem' : '0' }}>
        {sponsorLabel}
      </div>

      {/* Row 4: latest action */}
      {bill.latest_action && (
        <div style={{ fontStyle: 'italic', fontSize: '11px', color: '#8b7355', fontFamily: 'var(--font-body)' }}>
          {truncate(bill.latest_action, 80)}
        </div>
      )}
    </div>
  )
}
