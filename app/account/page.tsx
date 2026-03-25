import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AuthForm from './AuthForm'

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your Public Money Tracker account.',
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string; message?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Already logged in — go to dashboard
  if (user) {
    redirect('/account/dashboard')
  }

  const params = await searchParams

  return (
    <div style={{
      maxWidth: '420px',
      margin: '4rem auto',
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
        }}>Public Money Tracker</p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          fontWeight: 700,
          color: '#1a1a1a',
          marginBottom: '0.5rem',
        }}>Sign In</h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: '#8b7355',
        }}>
          Access your federal spending reports.
        </p>
      </div>
      {params.message && (
        <div style={{
          background: '#fff8ee',
          border: '1px solid #d4c5a9',
          borderLeft: '3px solid #c0392b',
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: '#1a1a1a',
        }}>
          {params.message}
        </div>
      )}
      <AuthForm redirectTo={params.redirectTo} />
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: '#8b7355',
        letterSpacing: '0.05em',
        marginTop: '2rem',
        textAlign: 'center',
        lineHeight: 1.7,
      }}>
        New subscribers get free Analyst Access<br />
        for 30 days · No credit card required
      </p>
    </div>
  )
}
