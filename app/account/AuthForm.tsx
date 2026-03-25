'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthForm({
  redirectTo
}: {
  redirectTo?: string
}) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d4c5a9',
    background: '#fff',
    fontFamily: 'var(--font-mono)' as const,
    fontSize: '0.9rem',
    color: '#1a1a1a',
    outline: 'none',
    marginBottom: '0.75rem',
    display: 'block' as const,
    boxSizing: 'border-box' as const,
  }

  const btnStyle = {
    width: '100%',
    padding: '0.85rem',
    background: '#c0392b',
    color: '#fff',
    border: 'none',
    fontFamily: 'var(--font-mono)' as const,
    fontSize: '0.85rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    marginTop: '0.5rem',
  }

  async function handleSubmit() {
    setLoading(true)
    setError('')
    setSuccess('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/account/callback`,
        },
      })
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Check your email to confirm your account.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setError('Invalid email or password.')
      } else {
        router.push(redirectTo || '/account/dashboard')
        router.refresh()
      }
    }

    setLoading(false)
  }

  return (
    <div>
      {/* Mode toggle */}
      <div style={{
        display: 'flex',
        gap: '1px',
        background: '#d4c5a9',
        marginBottom: '1.5rem',
      }}>
        {(['signin', 'signup'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              flex: 1,
              padding: '0.6rem',
              background: mode === m ? '#1a1a1a' : '#f5f0e8',
              color: mode === m ? '#f5f0e8' : '#8b7355',
              border: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            {m === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        ))}
      </div>

      {error && (
        <div style={{
          background: '#fff0f0',
          border: '1px solid #c0392b',
          padding: '0.65rem 1rem',
          marginBottom: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: '#c0392b',
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          background: '#f0fff4',
          border: '1px solid #2a7a2a',
          padding: '0.65rem 1rem',
          marginBottom: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: '#2a7a2a',
        }}>
          {success}
        </div>
      )}

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          ...btnStyle,
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
      </button>

      {mode === 'signin' && (
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#8b7355',
            textAlign: 'center',
            marginTop: '1rem',
            cursor: 'pointer',
          }}
          onClick={async () => {
            if (!email) {
              setError('Enter your email address first.')
              return
            }
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
              redirectTo: `${window.location.origin}/account/callback`,
            })
            if (error) {
              setError(error.message)
            } else {
              setSuccess('Password reset email sent.')
            }
          }}
        >
          Forgot password?
        </p>
      )}
    </div>
  )
}
