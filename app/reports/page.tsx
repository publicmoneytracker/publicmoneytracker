import SubstackCTA from '@/components/pmt/SubstackCTA'

export const metadata = {
  title: 'Reports',
  description: 'Free weekly federal spending analysis. New report every Monday.',
}

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }
const body: React.CSSProperties = { fontFamily: 'var(--font-body)' }

export default function Reports() {
  return (
    <>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ ...mono, fontSize: '0.65rem', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>
          Monday Federal Money Reports
        </div>
        <h1 style={{ ...display, fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1.5rem', lineHeight: 1.2 }}>
          Reports
        </h1>
        <p style={{ ...body, fontSize: '1rem', color: '#2c2c2c', lineHeight: 1.8, marginBottom: '1rem' }}>
          Free weekly federal spending analysis. New report every Monday.
        </p>
        <p style={{ ...mono, fontSize: '0.75rem', color: '#8b7355' }}>
          Report archive loads in Phase 4.
        </p>
      </div>
      <div style={{ maxWidth: '720px', margin: '2rem auto 0', padding: '0 1.5rem 2rem' }}>
        <SubstackCTA />
      </div>
    </>
  )
}
