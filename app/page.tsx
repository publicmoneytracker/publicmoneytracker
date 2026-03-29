import FederalMoneyBoard from '@/components/pmt/FederalMoneyBoard'
import ZipLookup from '@/components/pmt/ZipLookup'
import SubstackCTA from '@/components/pmt/SubstackCTA'
import BillsThisWeek from '@/components/pmt/BillsThisWeek'

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }

export default function Home() {
  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <FederalMoneyBoard />

      <ZipLookup />

      {/* ── Latest Monday Reports ── */}
      <div style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ ...mono, fontSize: '0.7rem', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Latest Monday Reports
          </span>
          <a href="/reports" style={{ ...mono, fontSize: '0.7rem', color: '#8b7355', textDecoration: 'none', letterSpacing: '0.06em' }}>
            View all reports →
          </a>
        </div>

        <style>{`
          .report-card { transition: border-color 0.15s; }
          .report-card:hover { border-color: #1a1a1a !important; }
        `}</style>

        <a
          href="/reports/march-23-2026"
          className="report-card"
          style={{
            display: 'block',
            textDecoration: 'none',
            border: '1px solid #d4c5a9',
            background: '#f5f0e8',
            padding: '1.25rem',
            cursor: 'pointer',
          }}
        >
          <div style={{ ...mono, fontSize: '8px', color: '#c0392b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
            Monday Report · Free · Issue #1
          </div>
          <div style={{ ...display, fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.35, marginBottom: '0.5rem' }}>
            Defense &amp; Aerospace Logs Full 4/4 Influence Chain
          </div>
          <div style={{ ...mono, fontSize: '9px', color: '#8b7355', marginBottom: '0.5rem' }}>
            Week ending March 22, 2026 · Published March 23
          </div>
          <div style={{ ...mono, fontSize: '10px', color: '#1a1a1a', marginBottom: '0.75rem' }}>
            $4.3B awarded · 536 contract actions · 42 bills introduced
          </div>
          <div style={{ ...mono, fontSize: '10px', color: '#c0392b' }}>
            Read full report →
          </div>
        </a>
      </div>

      {/* ── Bills This Week ── */}
      <BillsThisWeek />

      {/* ── Substack CTA ── */}
      <div style={{ marginTop: '3rem' }}>
        <SubstackCTA />
      </div>
    </div>
  )
}
