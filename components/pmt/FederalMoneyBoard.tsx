'use client'
import { useState, useEffect } from 'react'

// ── BASELINE — updated weekly from USASpending.gov ──
const BUDGET = 6752000000000
const BASELINE = 3949702552340          // as of Apr 12, 2026
const RATE = 212600                     // $/sec interpolated
const BASELINE_TIMESTAMP = new Date('2026-04-12T02:00:00Z').getTime()
const FY_END = new Date('2026-09-30T23:59:59Z').getTime()

const LAST_REFRESH = 'Apr 12, 2026'

function fmt(n: number): string {
  return '$' + Math.floor(n).toLocaleString('en-US')
}

function fmtT(n: number): string {
  return '$' + (n / 1e12).toFixed(2) + 'T'
}

function getDaysRemaining(): number {
  return Math.max(0, Math.ceil((FY_END - Date.now()) / (1000 * 60 * 60 * 24)))
}

function getObligated(now: number): number {
  const secondsSinceBaseline = Math.max(0, (now - BASELINE_TIMESTAMP) / 1000)
  return BASELINE + RATE * secondsSinceBaseline
}

export default function FederalMoneyBoard() {
  // Initialize to 0 so SSR and first client render agree (avoids hydration mismatch).
  // useEffect sets the real value and starts the live ticker on the client only.
  const [now, setNow] = useState<number>(0)
  const [daysRemaining, setDaysRemaining] = useState<number>(0)

  useEffect(() => {
    setNow(Date.now())
    setDaysRemaining(getDaysRemaining())
    const ticker = setInterval(() => setNow(Date.now()), 1000)
    const dayClock = setInterval(() => setDaysRemaining(getDaysRemaining()), 60000)
    return () => {
      clearInterval(ticker)
      clearInterval(dayClock)
    }
  }, [])

  const obligated = getObligated(now)
  const remainder = BUDGET - obligated
  const committedPct = (obligated / BUDGET) * 100

  const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
  const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }

  return (
    <div style={{
      background: '#f5f0e8',
      border: '2px solid #1a1a1a',
      overflow: 'hidden',
      maxWidth: '860px',
      margin: '0 auto',
    }}>

      {/* ── HEADER BAR ── */}
      <div style={{
        background: '#1a1a1a',
        padding: '0.6rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.4rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#c0392b',
            animation: 'pulse 1.5s ease-in-out infinite',
            flexShrink: 0,
          }} />
          <span style={{ ...mono, fontSize: '0.7rem', letterSpacing: '0.12em', color: '#f5f0e8', textTransform: 'uppercase' }}>
            Federal Money Board
          </span>
        </div>
        <span style={{ ...mono, fontSize: '0.65rem', color: '#d4c5a9', letterSpacing: '0.06em' }}>
          FY 2026 · Oct 1, 2025 – Sep 30, 2026 · {daysRemaining} days remaining
        </span>
      </div>

      {/* ── BUDGET STRIP ── */}
      <div style={{
        background: '#2c2c2c',
        padding: '0.5rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.4rem',
      }}>
        <span style={{ ...mono, fontSize: '0.7rem', color: '#f5f0e8', letterSpacing: '0.06em' }}>
          FY 2026 Authorized: $6.752 Trillion
        </span>
        <span style={{ ...mono, fontSize: '0.65rem', color: '#d4c5a9', letterSpacing: '0.04em' }}>
          Discretionary $1.694T&nbsp;&nbsp;Mandatory $4.117T&nbsp;&nbsp;Interest $941B
        </span>
      </div>

      {/* ── MAIN BLOCK ── */}
      <div style={{ padding: '1.25rem 1rem 1rem', background: '#f5f0e8' }}>
        {/* Eyebrow */}
        <div style={{ ...mono, fontSize: '0.65rem', color: '#8b7355', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          Federal Dollars Moved · FY 2026 · Updated Weekly
        </div>

        {/* Big counter */}
        <div style={{
          ...mono,
          fontSize: 'clamp(30px, 7vw, 56px)',
          color: '#c0392b',
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          marginBottom: '0.3rem',
        }}>
          {fmt(obligated)}
        </div>

        {/* Italic label */}
        <div style={{
          ...display,
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: '#2c2c2c',
          marginBottom: '0.5rem',
        }}>
          Federal dollars committed so far this fiscal year
        </div>

        {/* Secondary line */}
        <div style={{ ...mono, fontSize: '0.7rem', color: '#8b7355', marginBottom: '0.75rem' }}>
          {fmtT(remainder)} unobligated budget remains
        </div>

        {/* Bar labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
          <span style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Committed so far
          </span>
          <span style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {committedPct.toFixed(1)}% of $6.752T
          </span>
          <span style={{ ...mono, fontSize: '9px', color: '#8b7355', letterSpacing: '0.08em' }}>
            $6.752T
          </span>
        </div>

        {/* Bar track + fill */}
        <div style={{
          height: '6px',
          background: '#d4c5a9',
          borderRadius: '3px',
          overflow: 'hidden',
          marginBottom: '0.35rem',
        }}>
          <div style={{
            height: '100%',
            background: '#c0392b',
            borderRadius: '3px',
            width: `${Math.min(committedPct, 100)}%`,
            transition: 'width 1s linear',
          }} />
        </div>

        {/* Bar sub-label */}
        <div style={{ ...mono, fontSize: '9px', color: '#8b7355', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
          {fmtT(obligated)} obligated of $6.752T · growing ~$212,600/sec
        </div>

        {/* Interpolation note */}
        <div style={{ ...mono, fontSize: '9px', color: '#8b7355' }}>
          Baseline updated weekly from USASpending.gov. Interpolated between refreshes.
        </div>
      </div>

      {/* ── STATS ROW — real figures from week ending Apr 12, 2026 ── */}
      <div className="fmb-stats-grid" style={{
        display: 'grid',
        gap: '1px',
        background: '#d4c5a9',
        borderTop: '1px solid #d4c5a9',
      }}>
        {/* Cell 1: Contracts */}
        <div style={{ background: '#f5f0e8', padding: '0.65rem 0.75rem' }}>
          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
            Contracts W/E Apr 12
          </div>
          <div style={{ ...mono, fontSize: '15px', color: '#1a1a1a', fontWeight: 500 }}>
            $2.8B
          </div>
          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', marginTop: '0.15rem' }}>
            954 contract actions
          </div>
        </div>

        {/* Cell 2: Largest award */}
        <div style={{ background: '#f5f0e8', padding: '0.65rem 0.75rem' }}>
          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
            Largest Award
          </div>
          <div style={{ ...mono, fontSize: '15px', color: '#1a1a1a', fontWeight: 500 }}>
            $196.2M
          </div>
          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', marginTop: '0.15rem' }}>
            Idaho Environmental Coalition · DOE
          </div>
        </div>
      </div>

      {/* ── FOOTER BAR ── */}
      <div style={{
        background: '#1a1a1a',
        padding: '0.5rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.4rem',
      }}>
        <span style={{ ...mono, fontSize: '9px', color: '#8b7355', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Source: USASpending.gov · CBO · Week ending Apr 12, 2026
        </span>
        <span style={{ ...mono, fontSize: '9px', color: '#8b7355', letterSpacing: '0.06em' }}>
          Last refresh: {LAST_REFRESH} · Updated weekly every Friday
        </span>
      </div>

      {/* Pulse animation + responsive stats grid */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .fmb-stats-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 480px) {
          .fmb-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  )
}
