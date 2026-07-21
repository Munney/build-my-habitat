import yahooFinance from 'yahoo-finance2';

// Returns an array of { date, open, high, low, close, volume }, oldest first.
// Yahoo's chart endpoint supports 30m intervals for roughly the last 60 days,
// which is plenty for the indicator lookbacks used in lib/setups.js.
export async function getBars(symbol, { range = '45d', interval = '30m' } = {}) {
  const result = await yahooFinance.chart(symbol, { period1: rangeToPeriod1(range), interval });
  const quotes = result?.quotes || [];
  const bars = quotes
    .filter((q) => q.close != null && q.open != null && q.high != null && q.low != null)
    .map((q) => ({
      date: q.date,
      open: q.open,
      high: q.high,
      low: q.low,
      close: q.close,
      volume: q.volume ?? 0,
    }));

  // The bot's df.iloc[-1] is always the latest CLOSED bar. Yahoo's chart
  // endpoint can include the currently-forming bar as the last element
  // while the market is open. Drop it if it looks still-forming (started
  // less than one interval ago) so index alignment matches the bot exactly.
  return trimFormingBar(bars, interval);
}

function trimFormingBar(bars, interval) {
  if (bars.length < 2) return bars;
  const intervalMs = intervalToMs(interval);
  const last = bars[bars.length - 1];
  const lastDate = last.date instanceof Date ? last.date : new Date(last.date);
  const age = Date.now() - lastDate.getTime();
  if (age < intervalMs) return bars.slice(0, -1);
  return bars;
}

function intervalToMs(interval) {
  const match = /^(\d+)(m|h|d)$/.exec(interval);
  if (!match) return 30 * 60 * 1000;
  const n = parseInt(match[1], 10);
  const unit = match[2];
  const unitMs = unit === 'm' ? 60 * 1000 : unit === 'h' ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  return n * unitMs;
}

function rangeToPeriod1(range) {
  const days = parseInt(range, 10) || 30;
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}
