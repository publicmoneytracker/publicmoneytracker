export default function SubstackCTA() {
  const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
  const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }
  const body: React.CSSProperties = { fontFamily: 'var(--font-body)' }

  return (
    <div style={{
      background: '#1a1a1a',
      padding: '2.5rem',
      textAlign: 'center',
    }}>
      <div style={{ ...mono, fontSize: '9px', color: '#d4c5a9', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
        Free Newsletter
      </div>
      <h2 style={{ ...display, fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.6rem', lineHeight: 1.3 }}>
        Get every Monday report in your inbox.
      </h2>
      <p style={{ ...body, fontStyle: 'italic', color: '#8b7355', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        Federal data. No commentary.
      </p>
      <a
        href="https://publicmoneytracker.substack.com"
        style={{
          display: 'inline-block',
          background: '#c0392b',
          color: '#ffffff',
          ...mono,
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '0.85rem 2rem',
          textDecoration: 'none',
        }}
      >
        Subscribe Free on Substack
      </a>
      <p style={{ ...body, fontStyle: 'italic', color: '#8b7355', fontSize: '0.8rem', marginTop: '1rem' }}>
        Free weekly newsletter. No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}
