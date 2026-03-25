'use client'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NavAuth() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        router.refresh()
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <a
      href="/account"
      style={{
        color: '#c0392b',
        textDecoration: 'none',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
    >
      {user ? 'My Account' : 'Sign In'}
    </a>
  )
}
