'use client';

import { useState } from 'react';

export default function CheckoutButton({ priceKey = 'pro' }) {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceKey }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="btn" onClick={startCheckout} disabled={loading}>
      {loading ? 'Redirecting…' : 'Subscribe — $29/mo'}
    </button>
  );
}
