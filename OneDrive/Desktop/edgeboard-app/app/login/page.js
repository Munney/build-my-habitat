'use client';

import { useState } from 'react';
import { createClient } from '../../lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/scanner`,
      },
    });
    setStatus(error ? 'error' : 'sent');
  }

  return (
    <main className="wrap" style={{ paddingTop: 80, maxWidth: 420 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8, letterSpacing: '-0.02em' }}>Sign in</h1>
      <p className="dim" style={{ marginBottom: 28, fontSize: 14 }}>
        No password. We'll email you a one-time link.
      </p>

      {status === 'sent' ? (
        <div className="card">
          <p>Check your email for a sign-in link.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send sign-in link'}
          </button>
          {status === 'error' && (
            <p className="mono" style={{ color: 'var(--red)', fontSize: 13 }}>
              Something went wrong — try again.
            </p>
          )}
        </form>
      )}
    </main>
  );
}
