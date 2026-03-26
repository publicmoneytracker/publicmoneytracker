export const metadata = {
  title: 'Methodology',
  description: 'How Public Money Tracker verifies data. Every figure traces to a primary federal source.',
}

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }
const body: React.CSSProperties = { fontFamily: 'var(--font-body)' }

const SOURCES = [
  { name: 'USASpending.gov', desc: 'federal contracts and grants' },
  { name: 'FEC.gov', desc: 'campaign finance filings' },
  { name: 'Senate LDA', desc: 'lobbying disclosures' },
  { name: 'Congress.gov', desc: 'legislative activity' },
]

export default function Methodology() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ ...mono, fontSize: '0.65rem', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>
        How We Verify Data
      </div>
      <h1 style={{ ...display, fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1.5rem', lineHeight: 1.2 }}>
        Methodology
      </h1>
      <p style={{ ...body, fontSize: '1rem', color: '#2c2c2c', lineHeight: 1.8, marginBottom: '1.5rem' }}>
        Every figure published by Public Money Tracker traces to a primary federal data source.
        We do not publish numbers we cannot source.
      </p>
      <div style={{ borderTop: '1px solid #d4c5a9' }}>
        {SOURCES.map(({ name, desc }) => (
          <div key={name} style={{
            display: 'flex',
            gap: '1rem',
            padding: '0.75rem 0',
            borderBottom: '1px solid #d4c5a9',
            alignItems: 'baseline',
          }}>
            <span style={{ ...mono, fontSize: '0.75rem', color: '#1a1a1a', fontWeight: 500, minWidth: '160px' }}>
              {name}
            </span>
            <span style={{ ...body, fontSize: '0.9rem', color: '#2c2c2c' }}>
              {desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
