// Proxy (route protection with tier inheritance)
// Built in Phase 2 (Supabase Auth)
// Renamed from middleware.ts → proxy.ts (Next.js 16 convention)
// Tier inheritance rules:
//   /analyst/* → ['analyst_access','professional_access','institutional_access'].includes(tier)
//   /pro/*     → ['professional_access','institutional_access'].includes(tier)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Passthrough — no-op until Phase 2 wires in Supabase Auth
export function proxy(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  // Only run on protected routes — expand in Phase 2
  matcher: ['/analyst/:path*', '/pro/:path*', '/account/:path*'],
}
