'use client';

import { useState } from 'react';

const REGIME_LABEL = {
  long: 'SPY risk-on (long)',
  short: 'SPY risk-off (short)',
  neutral: 'SPY neutral',
  flat_blocked: 'SPY flat/chop — blocked',
};

export default function ScannerClient() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [regime, setRegime] = useState(null);
  const [error, setError] = useState(null);

  async function runScan() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/scan', { method: 'POST' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      const data = await res.json();
      setResults(data.signals || []);
      setRegime(data.regime || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button className="btn" onClick={runScan} disabled={loading}>
          {loading ? 'Scanning…' : 'Run scan'}
        </button>
        {regime && (
          <span className={`badge ${regime === 'long' ? 'active' : 'locked'}`}>
            {REGIME_LABEL[regime] || regime}
          </span>
        )}
      </div>

      {error && (
        <p className="mono" style={{ color: 'var(--red)', marginTop: 16, fontSize: 13 }}>
          {error}
        </p>
      )}

      {results && (
        <div className="card" style={{ marginTop: 24, padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                {['Symbol', 'Side', 'Setup', 'Score', 'Notes'].map((h) => (
                  <th
                    key={h}
                    className="mono dim"
                    style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.length === 0 && (
                <tr>
                  <td colSpan={5} className="dim" style={{ padding: 16, fontSize: 14 }}>
                    No setups cleared scoring, regime, and expectancy gates right now.
                  </td>
                </tr>
              )}
              {results.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td className="mono" style={{ padding: '12px 16px', fontWeight: 600 }}>{r.symbol}</td>
                  <td
                    className="mono"
                    style={{ padding: '12px 16px', fontWeight: 600, color: r.side === 'long' ? 'var(--green)' : 'var(--red)' }}
                  >
                    {r.side.toUpperCase()}
                  </td>
                  <td className="mono dim" style={{ padding: '12px 16px', fontSize: 13 }}>{r.setup}</td>
                  <td className="mono" style={{ padding: '12px 16px', fontWeight: 600 }}>{r.score}</td>
                  <td className="dim" style={{ padding: '12px 16px', fontSize: 13 }}>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
