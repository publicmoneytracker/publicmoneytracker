import type { Metadata } from 'next'
import { Playfair_Display, Source_Serif_4, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import NavAuth from './NavAuth'
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  axes: ['opsz'],
})
const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})
export const metadata: Metadata = {
  title: {
    default: 'Public Money Tracker',
    template: '%s | Public Money Tracker',
  },
  description: 'Federal spending analysis. Published every Monday. Every number traces to a public federal data source.',
  metadataBase: new URL('https://publicmoneytracker.com'),
  openGraph: {
    siteName: 'Public Money Tracker',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/pmt-icon.jpg',
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSerif.variable} ${ibmMono.variable}`}>
      <body>
        {/* Masthead */}
        <header style={{
          borderTop: '3px solid #1a1a1a',
          borderBottom: '2px solid #1a1a1a',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          <a href="/" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            fontWeight: 900,
            color: '#1a1a1a',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}>
            Public Money Tracker
          </a>
          <nav style={{
            display: 'flex',
            gap: '1.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            flexWrap: 'wrap',
          }}>
            <a href="/reports" style={{ color: '#8b7355', textDecoration: 'none' }}>Reports</a>
            <a href="/districts" style={{ color: '#8b7355', textDecoration: 'none' }}>Districts</a>
            <a href="/analyst" style={{ color: '#8b7355', textDecoration: 'none' }}>Analyst Access</a>
            <a href="/pro" style={{ color: '#8b7355', textDecoration: 'none' }}>Professional Access</a>
            <a href="/about" style={{ color: '#8b7355', textDecoration: 'none' }}>About</a>
            <a href="/methodology" style={{ color: '#8b7355', textDecoration: 'none' }}>Methodology</a>
            <NavAuth />
          </nav>
        </header>
        {/* Page content */}
        <main style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        {/* Footer */}
        <footer style={{
          borderTop: '2px solid #1a1a1a',
          padding: '1.5rem',
          marginTop: '3rem',
          maxWidth: '1200px',
          margin: '3rem auto 0',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.95rem',
            fontWeight: 700,
            marginBottom: '0.3rem',
          }}>Public Money Tracker</p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#8b7355',
            letterSpacing: '0.05em',
            lineHeight: 1.8,
          }}>
            A Sievela LLC publication ·{' '}
            <a href="https://publicmoneytracker.substack.com"
               style={{ color: '#8b7355' }}>
              publicmoneytracker.substack.com
            </a>
            <br />
            Data: USASpending.gov · FEC · Senate LDA · Congress.gov
          </p>
        </footer>
      </body>
    </html>
  )
}
