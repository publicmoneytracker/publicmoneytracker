import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Use service role client for webhook — bypasses RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.supabase_user_id
        const tier = session.metadata?.tier

        if (!userId || !tier) {
          console.error('Missing metadata in checkout session:', session.id)
          break
        }

        await supabaseAdmin
          .from('users')
          .update({
            tier,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)

        console.log(`✓ Upgraded user ${userId} to ${tier}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.supabase_user_id

        if (!userId) {
          // Try to find user by stripe_customer_id
          const customerId = subscription.customer as string

          const { data: userData } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('stripe_customer_id', customerId)
            .single()

          if (userData) {
            await supabaseAdmin
              .from('users')
              .update({
                tier: 'public_access',
                updated_at: new Date().toISOString(),
              })
              .eq('id', userData.id)

            console.log(`✓ Downgraded user ${userData.id} to public_access`)
          }
          break
        }

        await supabaseAdmin
          .from('users')
          .update({
            tier: 'public_access',
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)

        console.log(`✓ Downgraded user ${userId} to public_access`)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        const { data: userData } = await supabaseAdmin
          .from('users')
          .select('id, email')
          .eq('stripe_customer_id', customerId)
          .single()

        if (userData) {
          // Log the failure — do not downgrade yet
          // Stripe will retry and send subscription.deleted
          // if payment ultimately fails
          console.warn(
            `⚠ Payment failed for user ${userData.id} (${userData.email})`
          )
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

// Note: raw body access via request.text() is native to
// App Router Route Handlers — no bodyParser config needed.
