import { rsiSimple, ema } from './indicators';
import {
  RSI_LENGTH,
  EMA_LENGTH,
  SPY_REGIME_EMA_TOLERANCE_FRAC,
  USE_FLAT_REGIME_FILTER,
  FLAT_REGIME_THRESHOLD_PCT,
  FLAT_REGIME_LOW_ATR_PCT,
  isCrypto,
} from './config';
import { atrSimple } from './indicators';
import { ATR_LENGTH } from './config';

// spy_regime_band_state — classifies SPY vs its own 30-EMA within a
// tolerance band. Note this is SPY vs SPY's own EMA — no exemption, this is
// intentional per the source.
export function spyRegimeBandState(spyPrice, spyEma, tolFrac = SPY_REGIME_EMA_TOLERANCE_FRAC) {
  const longOk = spyPrice > spyEma * (1 - tolFrac);
  const shortOk = spyPrice < spyEma * (1 + tolFrac);
  if (longOk && shortOk) return 'neutral';
  if (longOk) return 'long';
  return 'short';
}

// Computes the current SPY band from its own bars. Fails closed at the
// call site if bars are missing/invalid (ALLOW_STALE_SPY_REGIME_FOR_ENTRIES
// = False in the bot) — see route.js, which blocks all stock entries for
// the cycle if this can't be computed, rather than silently skipping.
export function computeSpyBand(spyBars) {
  if (!spyBars || spyBars.length < Math.max(EMA_LENGTH, RSI_LENGTH, ATR_LENGTH) + 2) return null;
  const closes = spyBars.map((b) => b.close);
  const emaSeries = ema(closes, EMA_LENGTH);
  const i = closes.length - 1;
  if (emaSeries[i] == null) return null;

  const price = closes[i];
  const emaVal = emaSeries[i];

  if (USE_FLAT_REGIME_FILTER) {
    const atrSeries = atrSimple(spyBars, ATR_LENGTH);
    const atrPct = atrSeries[i] != null ? (atrSeries[i] / price) * 100 : null;
    const withinFlatBand = Math.abs(price - emaVal) / emaVal * 100 <= FLAT_REGIME_THRESHOLD_PCT;
    const lowAtr = atrPct != null && atrPct < FLAT_REGIME_LOW_ATR_PCT;
    if (withinFlatBand && lowAtr) return 'flat_blocked';
  }

  return spyRegimeBandState(price, emaVal);
}

// check_market_regime — is this side allowed to enter, given the symbol
// and the current SPY band? Crypto bypasses entirely.
export function isEntryAllowedByRegime(symbol, side, band) {
  if (isCrypto(symbol)) return true;
  if (band == null) return false; // fail-closed at the cycle level, see route.js
  if (band === 'flat_blocked') return false;
  if (band === 'neutral') return true; // flat/chop filter is off by default in the bot
  if (side === 'long') return band === 'long';
  return band === 'short';
}
