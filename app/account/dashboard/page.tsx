import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SignOutButton from '../SignOutButton'

export const metadata = {
  title: 'My Account',
  description: 'Manage your Public Money Tracker subscription.',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/account')

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  const tier = (userData as { tier: string } | null)?.tier || 'public_access'

  const tierLabels: Record<string, string> = {
    public_access: 'Public Access',
    analyst_access: 'Analyst Access',
    professional_access: 'Professional Access',
    institutional_access: 'Institutional Access',
  }

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
        }}>My Account</p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          fontWeight: 700,
          color: '#1a1a1a',
        }}>Welcome back</h1>
      </div>

      {/* Account details */}
      <div style={{
        border: '1px solid #d4c5a9',
        padding: '1.5rem',
        marginBottom: '1.5rem',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#8b7355',
          marginBottom: '1rem',
        }}>Account Details</div>

        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: '#8b7355',
            marginBottom: '0.2rem',
          }}>Email</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            color: '#1a1a1a',
          }}>{user.email}</div>
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: '#8b7355',
            marginBottom: '0.2rem',
          }}>Access Level</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            color: tier === 'public_access' ? '#8b7355' : '#1a1a1a',
            fontWeight: 600,
          }}>{tierLabels[tier] || tier}</div>
        </div>
      </div>

      {/* Coming soon reports */}
      <div style={{
        border: '1px solid #d4c5a9',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        background: '#ede8df',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#8b7355',
          marginBottom: '0.75rem',
        }}>Your Reports</div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: '#2c2c2c',
          lineHeight: 1.6,
          marginBottom: '0.5rem',
        }}>
          Full federal spending reports are coming in April 2026.
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: '#8b7355',
        }}>
          You will be notified by email when reports go live.
          Your {tierLabels[tier]} is active and ready.
        </p>
      </div>

      {/* Sign out */}
      <SignOutButton />
    </div>
  )
}
