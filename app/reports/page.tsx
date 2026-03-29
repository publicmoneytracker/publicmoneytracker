import { Metadata } from 'next'
import Link from 'next/link'
import SubstackCTA from '@/components/pmt/SubstackCTA'

export const metadata: Metadata = {
  title: 'Reports',
  description: 'Free weekly federal spending analysis from Public Money Tracker. New report every Monday.',
}

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }
const body: React.CSSProperties = { fontFamily: 'var(--font-body)' }

export default function Reports() {
  return (
    <>
      <style>{`
        .archive-card { transition: border-color 0.15s; }
        .archive-card:hover { border-color: #1a1a1a !important; }
      `}</style>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Header */}
        <div style={{ borderBottom: '1px solid #d4c5a9', marginBottom: '2rem', paddingBottom: '1.5rem' }}>
          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
            Federal Money Reports
          </div>
          <h1 style={{ ...display, fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, marginBottom: '0.75rem' }}>
            Monday Reports
          </h1>
          <p style={{ ...body, fontSize: '1rem', color: '#2c2c2c', lineHeight: 1.7 }}>
            Free weekly federal spending analysis. New report every Monday.
          </p>
        </div>

        {/* Report list */}
        <div>
          <Link
            href="/reports/march-23-2026"
            className="archive-card"
            style={{
              display: 'block',
              textDecoration: 'none',
              border: '1px solid #d4c5a9',
              padding: '1.25rem',
              marginBottom: '1px',
              background: '#f5f0e8',
            }}
          >
            <div style={{ ...mono, fontSize: '8px', color: '#c0392b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
              Monday Report · Free · Issue #1
            </div>
            <div style={{ ...display, fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3, marginBottom: '0.4rem' }}>
              Defense &amp; Aerospace Logs Full 4/4 Influence Chain
            </div>
            <div style={{ ...mono, fontSize: '9px', color: '#8b7355', marginBottom: '0.4rem' }}>
              Week ending March 22, 2026
            </div>
            <div style={{ ...mono, fontSize: '10px', color: '#1a1a1a' }}>
              $4.3B awarded · 536 actions · 42 bills introduced
            </div>
          </Link>

          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', marginTop: '0.75rem' }}>
            // More reports added every Monday. Subscribe free to get them in your inbox.
          </div>
        </div>

        {/* Substack CTA */}
        <div style={{ marginTop: '3rem' }}>
          <SubstackCTA />
        </div>
      </div>
    </>
  )
}
