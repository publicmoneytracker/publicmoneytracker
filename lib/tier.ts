// Tier code values — import from here, never hardcode strings
export const TIERS = {
  PUBLIC:        'public_access',
  ANALYST:       'analyst_access',
  PROFESSIONAL:  'professional_access',
  INSTITUTIONAL: 'institutional_access',
} as const

export type Tier = typeof TIERS[keyof typeof TIERS]

export const ANALYST_AND_ABOVE: Tier[] = [
  TIERS.ANALYST,
  TIERS.PROFESSIONAL,
  TIERS.INSTITUTIONAL,
]

export const PROFESSIONAL_AND_ABOVE: Tier[] = [
  TIERS.PROFESSIONAL,
  TIERS.INSTITUTIONAL,
]

export function hasAnalystAccess(tier: Tier): boolean {
  return ANALYST_AND_ABOVE.includes(tier)
}

export function hasProfessionalAccess(tier: Tier): boolean {
  return PROFESSIONAL_AND_ABOVE.includes(tier)
}
