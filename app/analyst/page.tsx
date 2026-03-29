import { Metadata } from 'next'
import CheckoutButton from '@/components/pmt/CheckoutButton'

export const metadata: Metadata = {
  title: 'Analyst Access',
  description: 'Full state reports, district scorecards, and Monday Report deep-dives. $12/month.',
}

export default function AnalystPage() {
  return (
    <div style={{
      maxWidth: '640px',
      margin: '3rem auto',
      padding: '0 1.5rem',
    }}>
      <div style={{
        borderTop: '2px solid #1a1a1a',
        paddingTop: '2rem',
        marginBottom: '2rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#8b7355',
          marginBottom: '0.5rem',
        }}>Analyst Access</p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          fontWeight: 700,
          color: '#1a1a1a',
          marginBottom: '0.5rem',
        }}>Full federal spending analysis.</h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: '#2c2c2c',
          lineHeight: 1.6,
        }}>
          Full weekly federal spending reports, state money
          reports, district ROI scorecards, and Monday Report
          deep-dives. Updated every Friday.
        </p>
      </div>

      {/* What's included */}
      <div style={{
        border: '1px solid #d4c5a9',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        background: '#ede8df',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#8b7355',
          marginBottom: '1rem',
        }}>What&apos;s included</p>
        {[
          'Full Monday Report (FMR) — weekly deep-dive',
          'State Money Reports — all 50 states',
          'District ROI Scorecards — all 435 districts',
          'Monday Report deep-dives and archives',
          'ZIP code district dashboard',
        ].map((item) => (
          <p key={item} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#1a1a1a',
            marginBottom: '0.5rem',
            lineHeight: 1.5,
          }}>✓ {item}</p>
        ))}
      </div>

      {/* Launch notice */}
      <div style={{
        background: '#fff8ee',
        border: '1px solid #d4c5a9',
        borderLeft: '3px solid #c0392b',
        padding: '0.75rem 1rem',
        marginBottom: '1.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        color: '#1a1a1a',
        lineHeight: 1.6,
      }}>
        Full report access launches in April 2026.
        Subscribe to the free newsletter to be
        notified when reports go live.
      </div>

      {/* Pricing */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1px',
        background: '#d4c5a9',
        marginBottom: '1rem',
      }}>
        <div style={{ background: '#f5f0e8', padding: '1.25rem' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#8b7355',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>Monthly</p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.6rem',
            fontWeight: 600,
            color: '#1a1a1a',
            marginBottom: '0.25rem',
          }}>$12<span style={{ fontSize: '0.9rem', fontWeight: 400, color: '#8b7355' }}>/mo</span></p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#8b7355',
            marginBottom: '1rem',
          }}>Billed monthly · Cancel anytime</p>
          <CheckoutButton
            tier="analyst"
            interval="monthly"
            label="Subscribe — $12/mo"
          />
        </div>
        <div style={{ background: '#f5f0e8', padding: '1.25rem' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#8b7355',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>Annual</p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.6rem',
            fontWeight: 600,
            color: '#1a1a1a',
            marginBottom: '0.25rem',
          }}>$99<span style={{ fontSize: '0.9rem', fontWeight: 400, color: '#8b7355' }}>/yr</span></p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#8b7355',
            marginBottom: '1rem',
          }}>Billed annually · Save 31%</p>
          <CheckoutButton
            tier="analyst"
            interval="annual"
            label="Subscribe — $99/yr"
          />
        </div>
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: '#8b7355',
        textAlign: 'center',
        letterSpacing: '0.05em',
      }}>
        No credit card required for first 30 days ·
        Cancel anytime
      </p>
    </div>
  )
}
