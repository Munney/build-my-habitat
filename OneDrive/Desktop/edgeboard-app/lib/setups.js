// Ported 1:1 from strategy.py's check_breakout_entry / check_pullback_entry /
// check_vol_expansion_entry / check_continuation_entry / score_entry /
// choose_entry. Operates on precomputed indicator series from computeContext().
//
// Note the source spec: there is no separate "rsi_cross" entry type in the
// bot. The RSI-threshold cross is folded into `breakout` (detect_crossover /
// detect_crossunder). VALID_ENTRY_TYPES = ("breakout", "pullback",
// "vol_expansion", "continuation") — four layers, not five.

import { rsiSimple, ema, atrSimple, detectCrossover, detectCrossunder } from './indicators';
import {
  RSI_LENGTH, EMA_LENGTH, ATR_LENGTH,
  RSI_LONG_THRESH, RSI_SHORT_THRESH,
  PULLBACK_LOOKBACK_BARS, EMA_TOUCH_ATR_TOLERANCE,
  VOL_EXPANSION_LOOKBACK_BARS, VOL_EXPANSION_MULTIPLIER,
  CONTINUATION_LOOKBACK_BARS,
  MIN_ENTRY_SCORE, ENTRY_PRIORITY,
  USE_MARKET_REGIME_FILTER,
  minAtrPctFor,
} from './config';

// Builds every series needed by the four detectors + scorer, once per symbol.
export function computeContext(bars, symbol) {
  const closes = bars.map((b) => b.close);
  const highs = bars.map((b) => b.high);
  const lows = bars.map((b) => b.low);
  const volumes = bars.map((b) => b.volume);

  const rsiSeries = rsiSimple(closes, RSI_LENGTH);
  const emaSeries = ema(closes, EMA_LENGTH);
  const atrSeries = atrSimple(bars, ATR_LENGTH);
  const atrPctSeries = closes.map((c, i) => (atrSeries[i] != null && c ? (atrSeries[i] / c) * 100 : null));

  return { symbol, closes, highs, lows, volumes, rsi: rsiSeries, ema: emaSeries, atr: atrSeries, atrPct: atrPctSeries, i: bars.length - 1 };
}

function volatilityOk(ctx) {
  const { atrPct, i, symbol } = ctx;
  if (atrPct[i] == null) return false;
  return atrPct[i] > minAtrPctFor(symbol); // strict >, per spec
}

// ---- breakout (folds in the RSI-cross trigger) ----
export function checkBreakout(ctx, side) {
  const { rsi, ema: emaSeries, closes, i } = ctx;
  const close = closes[i];
  const emaVal = emaSeries[i];
  if (emaVal == null) return false;
  const volOk = volatilityOk(ctx);

  if (side === 'long') {
    return detectCrossover(rsi, i, RSI_LONG_THRESH) && close > emaVal && volOk;
  }
  return detectCrossunder(rsi, i, RSI_SHORT_THRESH) && close < emaVal && volOk;
}

// ---- pullback ----
export function checkPullback(ctx, side) {
  const { rsi, ema: emaSeries, atr, closes, highs, lows, i } = ctx;
  if (i < 2 || atr[i] == null || emaSeries[i] == null || emaSeries[i - 1] == null) return false;

  const tol = atr[i] * EMA_TOUCH_ATR_TOLERANCE;
  const slope = emaSeries[i] - emaSeries[i - 1];
  const priorHigh = highs[i - 1];
  const priorLow = lows[i - 1];

  let touchedEma = false;
  for (let k = i - (PULLBACK_LOOKBACK_BARS - 1); k <= i; k++) {
    if (k < 0 || emaSeries[k] == null) continue;
    if (Math.abs(lows[k] - emaSeries[k]) <= tol || Math.abs(highs[k] - emaSeries[k]) <= tol) {
      touchedEma = true;
      break;
    }
  }

  const close = closes[i];
  if (side === 'long') {
    return close > emaSeries[i] && slope > 0 && rsi[i] > 50 && touchedEma && close > priorHigh;
  }
  return close < emaSeries[i] && slope < 0 && rsi[i] < 50 && touchedEma && close < priorLow;
}

// ---- vol_expansion ----
export function checkVolExpansion(ctx, side) {
  const { rsi, ema: emaSeries, atrPct, highs, lows, closes, i } = ctx;
  const lookback = VOL_EXPANSION_LOOKBACK_BARS;
  if (i < lookback || atrPct[i] == null || emaSeries[i] == null) return false;

  const histStart = i - lookback;
  const atrPctHist = atrPct.slice(histStart, i).filter((v) => v != null);
  if (atrPctHist.length < lookback) return false;
  const atrPctAvg = atrPctHist.reduce((a, b) => a + b, 0) / atrPctHist.length;
  const atrExpanding = atrPct[i] > atrPctAvg * VOL_EXPANSION_MULTIPLIER;

  const barRange = highs[i] - lows[i];
  const rangeHist = [];
  for (let k = histStart; k < i; k++) rangeHist.push(highs[k] - lows[k]);
  const avgRange = rangeHist.reduce((a, b) => a + b, 0) / rangeHist.length;
  const largeRange = barRange > avgRange * VOL_EXPANSION_MULTIPLIER;

  const close = closes[i];
  if (side === 'long') {
    const rsiOk = rsi[i] > rsi[i - 1] || rsi[i] > RSI_LONG_THRESH;
    return close > emaSeries[i] && atrExpanding && rsiOk && largeRange;
  }
  const rsiOk = rsi[i] < rsi[i - 1] || rsi[i] < RSI_SHORT_THRESH;
  return close < emaSeries[i] && atrExpanding && rsiOk && largeRange;
}

// ---- continuation ----
export function checkContinuation(ctx, side) {
  const { rsi, ema: emaSeries, highs, lows, closes, i } = ctx;
  if (i < 1 || emaSeries[i] == null || emaSeries[i - 1] == null) return false;

  const slope = emaSeries[i] - emaSeries[i - 1];
  const priorHigh = highs[i - 1];
  const priorLow = lows[i - 1];

  const windowStart = i - (CONTINUATION_LOOKBACK_BARS - 1);
  const windowHighs = highs.slice(Math.max(0, windowStart), i + 1);
  const windowLows = lows.slice(Math.max(0, windowStart), i + 1);
  const windowHighMax = Math.max(...windowHighs);
  const windowLowMin = Math.min(...windowLows);
  const rangeMid = windowLowMin + (windowHighMax - windowLowMin) * 0.5;

  const close = closes[i];
  if (side === 'long') {
    const base = rsi[i] > RSI_LONG_THRESH && close > emaSeries[i] && slope > 0;
    const strength = close > priorHigh || close > rangeMid;
    return base && strength;
  }
  const base = rsi[i] < RSI_SHORT_THRESH && close < emaSeries[i] && slope < 0;
  const strength = close < priorLow || close < rangeMid;
  return base && strength;
}

export function computeLayers(ctx, side) {
  return {
    breakout: checkBreakout(ctx, side),
    pullback: checkPullback(ctx, side),
    vol_expansion: checkVolExpansion(ctx, side),
    continuation: checkContinuation(ctx, side),
  };
}

// score_entry — integer 0-100
export function scoreEntry(ctx, side, layers) {
  const { rsi, ema: emaSeries, atrPct, closes, i } = ctx;
  let score = 0;

  const freshCross = side === 'long'
    ? detectCrossover(rsi, i, RSI_LONG_THRESH)
    : detectCrossunder(rsi, i, RSI_SHORT_THRESH);
  if (freshCross) score += 25;

  const priceVsEma = side === 'long' ? closes[i] > emaSeries[i] : closes[i] < emaSeries[i];
  if (priceVsEma) score += 15;

  const slope = emaSeries[i] - emaSeries[i - 1];
  const slopeOk = side === 'long' ? slope > 0 : slope < 0;
  if (slopeOk) score += 15;

  const volOk = volatilityOk(ctx);
  const minAtrPct = minAtrPctFor(ctx.symbol);
  const atrQuality = atrPct[i] != null && atrPct[i] >= minAtrPct * 1.2;
  if (volOk && atrQuality) score += 15;
  else if (volOk) score += 8;

  if (layers.pullback) score += 10;
  if (layers.vol_expansion) score += 10;

  const regimeAlignment = !USE_MARKET_REGIME_FILTER || priceVsEma;
  if (regimeAlignment) score += 10;

  return Math.max(0, Math.min(100, score));
}

// choose_entry — first true layer in priority order, gated by MIN_ENTRY_SCORE
export function chooseEntry(layers, score) {
  if (score < MIN_ENTRY_SCORE) return null;
  for (const type of ENTRY_PRIORITY) {
    if (layers[type]) return type;
  }
  return null;
}

// Full per-symbol evaluation: computes both sides, resolves the long/short
// conflict (higher score wins; tie favors long), per check_signals.
export function evaluateSymbol(bars, symbol) {
  const ctx = computeContext(bars, symbol);

  const longLayers = computeLayers(ctx, 'long');
  const shortLayers = computeLayers(ctx, 'short');
  const longScore = scoreEntry(ctx, 'long', longLayers);
  const shortScore = scoreEntry(ctx, 'short', shortLayers);
  const longEntry = chooseEntry(longLayers, longScore);
  const shortEntry = chooseEntry(shortLayers, shortScore);

  if (longEntry && shortEntry) {
    // Both fired on the same bar — higher score wins, tie favors long.
    return shortScore > longScore
      ? { side: 'short', entryType: shortEntry, score: shortScore }
      : { side: 'long', entryType: longEntry, score: longScore };
  }
  if (longEntry) return { side: 'long', entryType: longEntry, score: longScore };
  if (shortEntry) return { side: 'short', entryType: shortEntry, score: shortScore };
  return null;
}
