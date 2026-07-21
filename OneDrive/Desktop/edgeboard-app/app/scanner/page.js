import { createServerSupabaseClient } from '../../lib/supabase/server';
import ScannerClient from './ScannerClient';
import CheckoutButton from './CheckoutButton';

export default async function ScannerPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Middleware already redirects unauthenticated users to /login,
  // but guard here too in case this page is ever reached directly.
  if (!user) {
    return (
      <main className="wrap" style={{ paddingTop: 80 }}>
        <p>Please sign in to view the scanner.</p>
      </main>
    );
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_tier, subscription_status')
    .eq('id', user.id)
    .single();

  const isActive = profile?.subscription_status === 'active';
  const tier = profile?.subscription_tier ?? 'free';

  if (!isActive) {
    return (
      <main className="wrap" style={{ paddingTop: 80, maxWidth: 480 }}>
        <span className="badge locked">Locked</span>
        <h1 style={{ fontSize: 26, margin: '14px 0 10px', letterSpacing: '-0.02em' }}>
          The full scanner is a Pro feature
        </h1>
        <p className="dim" style={{ marginBottom: 24, fontSize: 15 }}>
          You're signed in as {user.email}, but you don't have an active subscription yet.
          Subscribe to unlock live scans across all five setup types.
        </p>
        <CheckoutButton />
      </main>
    );
  }

  return (
    <main className="wrap" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <span className="badge active">Active · {tier}</span>
          <h1 style={{ fontSize: 26, marginTop: 12, letterSpacing: '-0.02em' }}>Live scan</h1>
        </div>
      </div>
      <ScannerClient />
    </main>
  );
}
