import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '../../../lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  pro: process.env.STRIPE_PRICE_PRO,
  desk: process.env.STRIPE_PRICE_DESK,
};

export async function POST(request) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }

  const { priceKey } = await request.json();
  const priceId = PRICE_IDS[priceKey];

  if (!priceId) {
    return NextResponse.json({ error: 'Unknown plan' }, { status: 400 });
  }

  // Look up (or leave blank to let Stripe create) an existing customer id
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: profile?.stripe_customer_id || undefined,
    customer_email: profile?.stripe_customer_id ? undefined : user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/scanner?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/scanner?checkout=cancelled`,
    // Carries the Supabase user id through to the webhook so we know
    // whose profile row to update when the subscription is created.
    client_reference_id: user.id,
    metadata: { supabase_user_id: user.id },
  });

  return NextResponse.json({ url: session.url });
}
