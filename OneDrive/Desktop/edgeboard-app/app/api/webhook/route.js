import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '../../../lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_TO_TIER = {
  [process.env.STRIPE_PRICE_PRO]: 'pro',
  [process.env.STRIPE_PRICE_DESK]: 'desk',
};

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const userId = session.metadata?.supabase_user_id || session.client_reference_id;
      if (userId) {
        await supabase
          .from('profiles')
          .update({ stripe_customer_id: session.customer })
          .eq('id', userId);
      }
      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object;
      const priceId = sub.items.data[0]?.price?.id;
      const tier = PRICE_TO_TIER[priceId] || 'free';
      const status = sub.status === 'active' || sub.status === 'trialing' ? 'active' : sub.status;

      await supabase
        .from('profiles')
        .update({
          subscription_tier: tier,
          subscription_status: status,
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        })
        .eq('stripe_customer_id', sub.customer);
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      await supabase
        .from('profiles')
        .update({ subscription_tier: 'free', subscription_status: 'canceled' })
        .eq('stripe_customer_id', sub.customer);
      break;
    }

    default:
      // Unhandled event types are ignored on purpose — only the three above
      // affect subscription_status, which is what the paywall checks.
      break;
  }

  return NextResponse.json({ received: true });
}
