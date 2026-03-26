import { stripe, PRICE_IDS, PlanTier, PlanInterval } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { tier, interval } = await request.json() as {
      tier: PlanTier
      interval: PlanInterval
    }

    if (!tier || !interval) {
      return NextResponse.json(
        { error: 'tier and interval are required' },
        { status: 400 }
      )
    }

    const priceId = PRICE_IDS[tier][interval]

    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid tier or interval' },
        { status: 400 }
      )
    }

    // Get or create Stripe customer
    const { data: userData } = await supabase
      .from('users')
      .select('stripe_customer_id, email')
      .eq('id', user.id)
      .single()

    const typedUser = userData as { stripe_customer_id: string | null; email: string } | null
    let customerId = typedUser?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: typedUser?.email || user.email!,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id

      // Save customer ID to Supabase
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from('users') as any)
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
          tier: tier === 'analyst'
            ? 'analyst_access'
            : 'professional_access',
        },
      },
      metadata: {
        supabase_user_id: user.id,
        tier: tier === 'analyst'
          ? 'analyst_access'
          : 'professional_access',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
