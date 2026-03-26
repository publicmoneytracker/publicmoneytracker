import Stripe from 'stripe'

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
  {
    apiVersion: '2026-02-25.clover',
    typescript: true,
  }
)

export const PRICE_IDS = {
  analyst: {
    monthly: process.env.STRIPE_ANALYST_MONTHLY!,
    annual:  process.env.STRIPE_ANALYST_ANNUAL!,
  },
  professional: {
    monthly: process.env.STRIPE_PRO_MONTHLY!,
    annual:  process.env.STRIPE_PRO_ANNUAL!,
  },
} as const

export type PlanInterval = 'monthly' | 'annual'
export type PlanTier = 'analyst' | 'professional'
