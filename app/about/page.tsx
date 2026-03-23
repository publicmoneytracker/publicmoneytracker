export const metadata = {
  title: 'About',
  description: 'Public Money Tracker analyzes how federal dollars move through contracts, grants, and awards.',
}

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const display: React.CSSProperties = { fontFamily: 'var(--font-display)' }
const body: React.CSSProperties = { fontFamily: 'var(--font-body)' }

export default function About() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ ...mono, fontSize: '0.65rem', color: '#8b7355', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.6rem' }}>
        About Public Money Tracker
      </div>
      <h1 style={{ ...display, fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1.5rem', lineHeight: 1.2 }}>
        About
      </h1>
      <p style={{ ...body, fontSize: '1rem', color: '#2c2c2c', lineHeight: 1.8, marginBottom: '1rem' }}>
        Public Money Tracker analyzes how federal dollars move through contracts, grants, and awards.
        Every number traces to a public federal data source. No opinion. No commentary. The data speaks.
      </p>
      <p style={{ ...body, fontSize: '1rem', color: '#2c2c2c', lineHeight: 1.8 }}>
        Published by Sievela LLC. Subscribe free at{' '}
        <a href="https://publicmoneytracker.substack.com" style={{ color: '#8b7355' }}>
          publicmoneytracker.substack.com
        </a>
      </p>
    </div>
  )
}
