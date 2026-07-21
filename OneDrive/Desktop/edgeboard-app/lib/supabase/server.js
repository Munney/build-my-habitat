import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Use for any server component / route handler that needs to know
// who the logged-in user is (respects RLS, uses the anon key).
export function createServerSupabaseClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Called from a Server Component with no request context — safe to ignore,
            // middleware handles session refresh on navigation.
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // see note above
          }
        },
      },
    }
  );
}

// Use ONLY in trusted server code (Stripe webhook) that must bypass RLS
// to write subscription_status / subscription_tier. Never expose this
// client or the service role key to the browser.
export function createServiceRoleClient() {
  const { createClient } = require('@supabase/supabase-js');
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
