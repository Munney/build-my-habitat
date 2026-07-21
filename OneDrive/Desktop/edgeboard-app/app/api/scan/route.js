import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '../../../lib/supabase/server';
import { getBars } from '../../../lib/marketData';
import { evaluateSymbol } from '../../../lib/setups';
import { computeSpyBand, isEntryAllowedByRegime } from '../../../lib/regime';
import { applyExpectancyGates } from '../../../lib/expectancy';
import { SYMBOLS, WARMUP_MIN_BARS, isCrypto, toYahooSymbol } from '../../../lib/config';

export async function POST() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }

  // Re-check subscription status server-side on every call.
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status, subscription_tier')
    .eq('id', user.id)
    .single();

  if (profile?.subscription_status !== 'active') {
    return NextResponse.json({ error: 'Subscription required' }, { status: 402 });
  }

  const DAILY_CAPS = { pro: 20, desk: 100 };
  const dailyCap = DAILY_CAPS[profile.subscription_tier] ?? 5;

  const { data: allowed, error: capError } = await supabase.rpc('try_consume_scan', {
    p_user_id: user.id,
    p_daily_cap: dailyCap,
  });

  if (capError) {
    return NextResponse.json({ error: 'Could not verify scan usage — try again' }, { status: 500 });
  }
  if (!allowed) {
    return NextResponse.json(
      { error: `Daily scan limit reached (${dailyCap}/day on your plan). Resets at midnight.` },
      { status: 429 }
    );
  }

  // Expectancy stats: sourced from YOUR trade log via scripts/sync-expectancy.js,
  // not computed by this app.
  const { data: entryTypeStats } = await supabase
    .from('setup_stats')
    .select('setup_type, expectancy_r, sample_size');
  const { data: directionStats } = await supabase
    .from('direction_stats')
    .select('direction, expectancy_r, sample_size');

  // SPY regime — fail CLOSED at the cycle level if SPY data can't be
  // fetched/validated (ALLOW_STALE_SPY_REGIME_FOR_ENTRIES = False in the bot):
  // block all STOCK entries for this scan rather than silently skip the filter.
  let spyBand = null;
  let spyFetchFailed = false;
  try {
    const spyBars = await getBars('SPY');
    spyBand = computeSpyBand(spyBars);
    if (spyBand == null) spyFetchFailed = true;
  } catch {
    spyFetchFailed = true;
  }

  const signals = [];
  const skipped = [];

  for (const symbol of SYMBOLS) {
    let bars;
    try {
      bars = await getBars(toYahooSymbol(symbol));
    } catch {
      skipped.push({ symbol, reason: 'data fetch failed' });
      continue;
    }
    if (!bars || bars.length < WARMUP_MIN_BARS) {
      skipped.push({ symbol, reason: `insufficient bars (need ${WARMUP_MIN_BARS})` });
      continue;
    }

    const result = evaluateSymbol(bars, symbol);
    if (!result) continue;

    const { side, entryType, score } = result;

    // SPY regime filter — stocks only; crypto bypasses inside isEntryAllowedByRegime.
    if (!isCrypto(symbol) && spyFetchFailed) {
      skipped.push({ symbol, reason: 'SPY regime unavailable this cycle — stock entries blocked' });
      continue;
    }
    if (!isEntryAllowedByRegime(symbol, side, spyBand)) continue;

    // Expectancy gates — direction then entry type.
    const gate = applyExpectancyGates(entryType, side, entryTypeStats || [], directionStats || []);
    if (!gate.allowed) continue;

    signals.push({ symbol, side, setup: entryType, score, notes: `Score ${score}/100` });
  }

  signals.sort((a, b) => b.score - a.score);

  return NextResponse.json({ signals, regime: spyBand, spyFetchFailed, skipped });
}
