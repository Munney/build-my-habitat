// Ported 1:1 from indicators.py. IMPORTANT: this bot uses SIMPLE ROLLING
// MEANS for RSI and ATR, not Wilder smoothing, despite docstrings elsewhere
// claiming PineScript parity. Do not "fix" this to Wilder — it will make
// every threshold in setups.js diverge from the bot's real behavior.

// Simple-rolling-mean RSI (pandas: gain.rolling(14).mean() / loss.rolling(14).mean()).
// Returns an array aligned to `closes`, null during warmup.
export function rsiSimple(closes, length = 14) {
  const out = new Array(closes.length).fill(null);
  const gains = new Array(closes.length).fill(0);
  const losses = new Array(closes.length).fill(0);

  for (let i = 1; i < closes.length; i++) {
    const delta = closes[i] - closes[i - 1];
    gains[i] = delta > 0 ? delta : 0;
    losses[i] = delta < 0 ? -delta : 0;
  }

  for (let i = length; i < closes.length; i++) {
    let gainSum = 0;
    let lossSum = 0;
    for (let k = i - length + 1; k <= i; k++) {
      gainSum += gains[k];
      lossSum += losses[k];
    }
    const avgGain = gainSum / length;
    const avgLoss = lossSum / length;
    const rs = avgLoss === 0 ? Infinity : avgGain / avgLoss;
    out[i] = 100 - 100 / (1 + rs);
  }
  return out;
}

// pandas .ewm(span=length, adjust=False).mean() — true recursive EMA,
// seeded with the first close (adjust=False semantics).
export function ema(closes, length = 30) {
  const out = new Array(closes.length).fill(null);
  if (closes.length === 0) return out;
  const alpha = 2 / (length + 1);
  out[0] = closes[0];
  for (let i = 1; i < closes.length; i++) {
    out[i] = alpha * closes[i] + (1 - alpha) * out[i - 1];
  }
  return out;
}

// Simple-rolling-mean ATR (pandas: tr.rolling(14).mean()), not Wilder.
export function atrSimple(bars, length = 14) {
  const out = new Array(bars.length).fill(null);
  const tr = bars.map((b, i) => {
    if (i === 0) return b.high - b.low;
    const prevClose = bars[i - 1].close;
    return Math.max(b.high - b.low, Math.abs(b.high - prevClose), Math.abs(b.low - prevClose));
  });

  for (let i = length - 1; i < bars.length; i++) {
    let sum = 0;
    for (let k = i - length + 1; k <= i; k++) sum += tr[k];
    out[i] = sum / length;
  }
  return out;
}

// series[i-1] <= threshold AND series[i] > threshold
export function detectCrossover(series, i, threshold) {
  if (i < 1 || series[i - 1] == null || series[i] == null) return false;
  return series[i - 1] <= threshold && series[i] > threshold;
}

// series[i-1] >= threshold AND series[i] < threshold
export function detectCrossunder(series, i, threshold) {
  if (i < 1 || series[i - 1] == null || series[i] == null) return false;
  return series[i - 1] >= threshold && series[i] < threshold;
}

// Kept for convenience elsewhere (not part of the bot's five triggers).
export function sma(values, period) {
  const out = new Array(values.length).fill(null);
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
    if (i >= period) sum -= values[i - period];
    if (i >= period - 1) out[i] = sum / period;
  }
  return out;
}
