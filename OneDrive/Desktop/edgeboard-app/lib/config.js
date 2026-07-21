// Ported 1:1 from the Python bot's config.py / strategy.py constants.
// Change these here if the bot's config changes — don't hardcode elsewhere.

export const RSI_LENGTH = 14;
export const EMA_LENGTH = 30;
export const ATR_LENGTH = 14;

// VERSION_LOCK = "STS" preset
export const RSI_LONG_THRESH = 53;
export const RSI_SHORT_THRESH = 47;

export const ATR_MIN_PCT_CRYPTO = 0.20;
export const ATR_MIN_PCT_STOCKS = 0.25; // also used for "etf" branch — _asset_type() never returns 'etf'

export const PULLBACK_LOOKBACK_BARS = Math.max(2, 3); // = 3
export const EMA_TOUCH_ATR_TOLERANCE = 0.4;

export const VOL_EXPANSION_LOOKBACK_BARS = Math.max(3, 5); // = 5
export const VOL_EXPANSION_MULTIPLIER = 1.2;

export const CONTINUATION_LOOKBACK_BARS = Math.max(2, 3); // = 3

export const WARMUP_BUFFER_BARS = 30;
export const WARMUP_MIN_BARS = Math.max(EMA_LENGTH, RSI_LENGTH, ATR_LENGTH) + WARMUP_BUFFER_BARS; // = 60

export const MIN_ENTRY_SCORE = 60;

// choose_entry priority order — first true layer in this order wins
export const ENTRY_PRIORITY = ['breakout', 'pullback', 'vol_expansion', 'continuation'];
export const VALID_ENTRY_TYPES = ['breakout', 'pullback', 'vol_expansion', 'continuation'];

// SPY regime filter
export const USE_MARKET_REGIME_FILTER = true;
export const SPY_REGIME_EMA_TOLERANCE_FRAC = 0.002;
export const USE_FLAT_REGIME_FILTER = false; // off by default in the bot
export const FLAT_REGIME_THRESHOLD_PCT = 0.15;
export const FLAT_REGIME_LOW_ATR_PCT = 0.5;

// Expectancy gates (expectancy_gates.py) — CSV-driven mean R-multiple, not win_rate*avg_win form
export const MIN_TRADES_ENTRY_TYPE = 10;
export const ENTRY_TYPE_EXPECTANCY_THRESHOLD = 0.10;
export const MIN_TRADES_DIRECTION = 20;
export const DIRECTION_EXPECTANCY_THRESHOLD = 0.0;

// Symbols, exactly as in config.py (SPY was added; original 23 = this minus SPY).
// "BTC/USD" kept in bot notation for the isCrypto() check (contains '/');
// mapped to Yahoo's "BTC-USD" only at the data-fetch boundary.
export const SYMBOLS = [
  'AAPL', 'GOOGL', 'MSFT', 'NVDA', 'AMD', 'META', 'TSLA', 'AMZN',
  'PLTR', 'AVGO', 'QQQ', 'SPY', 'JPM', 'WMT', 'BABA', 'HOOD', 'NFLX',
  'XOM', 'MU', 'INTC', 'SHOP', 'SLV', 'GLD', 'BTC/USD',
];

export function isCrypto(symbol) {
  return symbol.includes('/');
}

export function toYahooSymbol(symbol) {
  return symbol.includes('/') ? symbol.replace('/', '-') : symbol;
}

export function minAtrPctFor(symbol) {
  return isCrypto(symbol) ? ATR_MIN_PCT_CRYPTO : ATR_MIN_PCT_STOCKS;
}
