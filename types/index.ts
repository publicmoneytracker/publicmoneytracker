import { Tier } from '@/lib/tier'

export interface User {
  id: string
  email: string
  tier: Tier
  stripe_customer_id?: string
  created_at: string
}

export interface Report {
  slug: string
  headline: string
  date: string
  tier: Tier
  report_type: 'monday' | 'state' | 'district' | 'industry'
  top_stats?: string[]
}

export interface TickerState {
  fy: string
  fy_start: string
  fy_end: string
  authorized_budget: number
  baseline_obligated: number
  baseline_timestamp: string
  rate_per_second: number
  last_refresh: string
  state_totals: Record<string, number>
  today: {
    contracts: number
    grants: number
    largest_award: number
    states_receiving: number
  }
}
