'use client'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={signOut}
      style={{
        background: 'transparent',
        border: '1px solid #d4c5a9',
        padding: '0.65rem 1.25rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#8b7355',
        cursor: 'pointer',
      }}
    >
      Sign Out
    </button>
  )
}
