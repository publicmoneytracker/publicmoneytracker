export const metadata = {
  title: 'Professional Access',
  description: 'Industry influence chain reports, lobbying cross-reference, and stock trade activity. $29/month.',
}

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }
const body: React.CSSProperties = { fontFamily: 'var(--font-body)' }

export default function Pro() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ ...mono, fontSize: '0.65rem', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>
        Professional Access
      </div>
      <h1 style={{ ...display, fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1.5rem', lineHeight: 1.2 }}>
        Professional Access — $29/month
      </h1>
      <p style={{ ...body, fontSize: '1rem', color: '#2c2c2c', lineHeight: 1.8, marginBottom: '1.5rem' }}>
        Everything in Analyst Access plus industry influence chain reports,
        lobbying cross-reference, and stock trade activity.
      </p>
      <a href="/account" style={{
        display: 'inline-block',
        background: '#c0392b',
        color: '#ffffff',
        ...mono,
        fontSize: '0.75rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '0.85rem 2rem',
        textDecoration: 'none',
        marginBottom: '0.75rem',
      }}>
        Subscribe — $29/mo
      </a>
      <p style={{ ...mono, fontSize: '0.75rem', color: '#8b7355' }}>
        Annual plan — $249/year (save 29%)
      </p>
    </div>
  )
}
