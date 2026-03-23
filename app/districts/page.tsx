export const metadata = {
  title: 'Districts',
  description: 'Federal spending by congressional district. 435 districts ranked by obligation per capita.',
}

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }
const body: React.CSSProperties = { fontFamily: 'var(--font-body)' }

export default function Districts() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ ...mono, fontSize: '0.65rem', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>
        Federal Spending by Congressional District
      </div>
      <h1 style={{ ...display, fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1.5rem', lineHeight: 1.2 }}>
        Districts
      </h1>
      <p style={{ ...body, fontSize: '1rem', color: '#2c2c2c', lineHeight: 1.8, marginBottom: '1rem' }}>
        435 congressional districts ranked by federal obligation per capita.
      </p>
      <p style={{ ...mono, fontSize: '0.75rem', color: '#8b7355' }}>
        District data and ZIP code lookup coming in Phase 10.
      </p>
    </div>
  )
}
