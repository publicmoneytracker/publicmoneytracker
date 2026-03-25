import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { UserTier } from '@/types/database'

const ANALYST_AND_ABOVE: UserTier[] = [
  'analyst_access',
  'professional_access',
  'institutional_access'
]

const PROFESSIONAL_AND_ABOVE: UserTier[] = [
  'professional_access',
  'institutional_access'
]

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)
  const pathname = request.nextUrl.pathname

  // If not logged in — redirect to /account with return URL
  if (!user) {
    if (
      pathname.startsWith('/analyst') ||
      pathname.startsWith('/pro') ||
      pathname.startsWith('/account/billing')
    ) {
      const redirectUrl = new URL('/account', request.url)
      redirectUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(redirectUrl)
    }
    return supabaseResponse
  }

  // User is logged in — check tier for protected routes
  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()

  const { data: userData } = await supabase
    .from('users')
    .select('tier')
    .eq('id', user.id)
    .single()

  const tier = ((userData as { tier: string } | null)?.tier as UserTier) || 'public_access'

  // Protect /analyst/* routes
  if (pathname.startsWith('/analyst')) {
    if (!ANALYST_AND_ABOVE.includes(tier)) {
      return NextResponse.redirect(new URL('/analyst', request.url))
    }
  }

  // Protect /pro/* routes
  if (pathname.startsWith('/pro')) {
    if (!PROFESSIONAL_AND_ABOVE.includes(tier)) {
      return NextResponse.redirect(new URL('/pro', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/analyst/:path*',
    '/pro/:path*',
    '/account/:path*',
  ],
}
