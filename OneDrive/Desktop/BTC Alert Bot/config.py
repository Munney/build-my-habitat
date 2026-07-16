"""
Configuration file for Multi-Asset Trading Alert System
Supports both crypto and stock trading
"""
import os
from dotenv import load_dotenv

load_dotenv()

# Asset Type Configuration
ASSET_TYPE = os.getenv("ASSET_TYPE", "stock").lower()  # "crypto" or "stock"

# Trading Parameters
# For crypto: use format "BTC/USD", "ETH/USD", etc.
# For stocks: use ticker symbol like "AAPL", "MSFT", "TSLA", etc.
SYMBOL = os.getenv("SYMBOL", "AAPL" if ASSET_TYPE == "stock" else "BTC/USD")

# Portfolio Mode: If SYMBOLS is set, monitor multiple symbols
# Format: comma-separated list like "AAPL,MSFT,TSLA" or space-separated
SYMBOLS_ENV = os.getenv("SYMBOLS", "")
if SYMBOLS_ENV:
    # Parse symbols from environment variable (comma or space separated)
    SYMBOLS = [s.strip().upper() for s in SYMBOLS_ENV.replace(",", " ").split() if s.strip()]
else:
    # Default portfolio: All requested stocks + BTC
    SYMBOLS = [
        "AAPL", "GOOGL", "MSFT", "NVDA", "AMD", "META", "TSLA", "AMZN",
        "PLTR", "AVGO", "QQQ", "JPM", "WMT", "BABA", "HOOD", "NFLX",
        "XOM", "MU", "INTC", "SHOP", "SLV", "GLD", "BTC/USD",
    ]

EXCHANGE = os.getenv("EXCHANGE", "coinbase")  # Only used for crypto
TIMEFRAME = os.getenv("TIMEFRAME", "30m")  # 30 minutes

# Strategy Parameters
VERSION_LOCK = "STS"  # Options: "Core", "Swing", "Scalp", "STS"
# Deep strategy diagnostics ([STRAT] lines in strategy.check_signals); no effect on signals
USE_STRATEGY_DEEP_DIAG = os.getenv("USE_STRATEGY_DEEP_DIAG", "true").lower() == "true"
USE_CONTINUATION_ENTRIES = os.getenv("USE_CONTINUATION_ENTRIES", "true").lower() == "true"  # Allow RSI/EMA continuation entries
CONTINUATION_LOOKBACK_BARS = int(os.getenv("CONTINUATION_LOOKBACK_BARS", "3"))  # Optional pullback lookback for long continuations
PULLBACK_LOOKBACK_BARS = int(os.getenv("PULLBACK_LOOKBACK_BARS", "3"))  # Pullback scan depth for pullback continuation entries
EMA_TOUCH_ATR_TOLERANCE = float(os.getenv("EMA_TOUCH_ATR_TOLERANCE", "0.4"))  # EMA touch tolerance as ATR multiple
VOL_EXPANSION_LOOKBACK_BARS = int(os.getenv("VOL_EXPANSION_LOOKBACK_BARS", "5"))  # Lookback for ATR/range expansion
VOL_EXPANSION_MULTIPLIER = float(os.getenv("VOL_EXPANSION_MULTIPLIER", "1.2"))  # Expansion threshold multiplier
MIN_ENTRY_SCORE = int(os.getenv("MIN_ENTRY_SCORE", "60"))  # Minimum score (0-100) required to allow entry
VOL_FILTER_ENABLED = True
ATR_MIN = 0.5  # Legacy: absolute value (deprecated)
# New: ATR as percentage of price (portable across assets)
ATR_MIN_PCT_STOCKS = float(os.getenv("ATR_MIN_PCT_STOCKS", "0.25"))  # 0.25% for stocks
ATR_MIN_PCT_ETF = float(os.getenv("ATR_MIN_PCT_ETF", "0.15"))  # 0.15% for ETFs
ATR_MIN_PCT_CRYPTO = float(os.getenv("ATR_MIN_PCT_CRYPTO", "0.20"))  # 0.20% for crypto
USE_ATR_PCT_FILTER = os.getenv("USE_ATR_PCT_FILTER", "true").lower() == "true"  # Use % instead of absolute

RSI_LENGTH = 14
MACD_FAST = 8
MACD_SLOW = 21
MACD_SIGNAL = 6
EMA_LENGTH = 30
ATR_LENGTH = 14

# Warmup (historical bars) gating for 30m strategies.
# We require: max(EMA_LENGTH, RSI_LENGTH, ATR_LENGTH) + WARMUP_BUFFER_BARS
# Conservative default: 30 + 30 = 60 bars.
WARMUP_BUFFER_BARS = int(os.getenv("WARMUP_BUFFER_BARS", "30"))
WARMUP_MIN_BARS = int(os.getenv("WARMUP_MIN_BARS", "60"))
# Minimum calendar days for equity OHLCV fetch (30m needs ~14d to reach 60 RTH bars)
STOCK_FETCH_LOOKBACK_DAYS_MIN = int(os.getenv("STOCK_FETCH_LOOKBACK_DAYS_MIN", "14"))

# Exit Parameters
ATR_MULT_STOP = 0.9
# Legacy exits (OFF by default - use two-tier TP instead)
USE_TIME_STOP = os.getenv("USE_TIME_STOP", "false").lower() == "true"  # OFF by default
TIME_STOP_BARS = 4
TIME_STOP_MIN_R = 0.3
USE_BREAKEVEN = os.getenv("USE_BREAKEVEN", "false").lower() == "true"  # OFF by default (two-tier TP handles this)
BE_TRIGGER_R = 0.8
USE_ATR_TRAIL = os.getenv("USE_ATR_TRAIL", "false").lower() == "true"  # OFF by default (two-tier TP handles this)
TRAIL_TRIGGER_R = 0.8
ATR_MULT_TRAIL = 1.0
USE_TAKE_PROFIT = False
TAKE_PROFIT_R = 1.8
# Professional Exit Structure: TP1 take 50%, trail remaining 50%
USE_TWO_TIER_TP = os.getenv("USE_TWO_TIER_TP", "true").lower() == "true"  # Enable two-tier TP system
TP1_R = float(os.getenv("TP1_R", "1.0"))  # First take profit at 1.0R (take 50% here)
TP2_R = float(os.getenv("TP2_R", "1.8"))  # Second take profit at 1.8R (or trailing ATR)
TP1_PERCENT_TO_CLOSE = float(os.getenv("TP1_PERCENT_TO_CLOSE", "50.0"))  # % of position to close at TP1 (default 50%)
USE_TRAILING_FOR_REMAINDER = os.getenv("USE_TRAILING_FOR_REMAINDER", "true").lower() == "true"  # Trail remaining 50% with ATR
LONG_ONLY = False

# Paper Trading Configuration
PAPER_TRADING_ENABLED = os.getenv("PAPER_TRADING_ENABLED", "true").lower() == "true"
PAPER_TRADING_INITIAL_CAPITAL = float(os.getenv("PAPER_TRADING_INITIAL_CAPITAL", "10000"))
PAPER_TRADING_POSITION_SIZE = float(os.getenv("PAPER_TRADING_POSITION_SIZE", "0.10"))  # 10% of capital per trade (legacy)
MAX_OPEN_POSITIONS = int(os.getenv("MAX_OPEN_POSITIONS", "2"))  # Maximum number of open positions globally

# Risk Model - Fixed % Risk Per Trade (Professional Approach)
USE_FIXED_RISK_PERCENT = os.getenv("USE_FIXED_RISK_PERCENT", "true").lower() == "true"  # Enable fixed % risk model
RISK_PERCENT_PER_TRADE = float(os.getenv("RISK_PERCENT_PER_TRADE", "0.5"))  # 0.5-1% of account per trade (default 0.5%)
STOP_ATR_MULTIPLIER = float(os.getenv("STOP_ATR_MULTIPLIER", "1.0"))  # Stop = ATR × this multiplier (default 1.0)
MAX_POSITION_CAPITAL_PCT = float(os.getenv("MAX_POSITION_CAPITAL_PCT", "0.25"))  # Max 25% of capital per trade
MIN_POSITION_VALUE = float(os.getenv("MIN_POSITION_VALUE", "100"))  # Minimum notional position size after cap

# Exposure Control
MAX_POSITIONS_PER_DIRECTION = int(os.getenv("MAX_POSITIONS_PER_DIRECTION", "1"))  # Max 1 long OR 1 short
USE_SECTOR_LIMITS = os.getenv("USE_SECTOR_LIMITS", "false").lower() == "true"  # Enable sector-based limits
MAX_POSITIONS_PER_SECTOR = int(os.getenv("MAX_POSITIONS_PER_SECTOR", "1"))  # Max positions per sector

# Market Hours Configuration (for stocks only)
BLOCK_MARKET_OPEN = os.getenv("BLOCK_MARKET_OPEN", "true").lower() == "true"  # Block entries during market open
MARKET_OPEN_BLOCK_START = "09:30"  # ET - Market open time
MARKET_OPEN_BLOCK_END = "10:00"  # ET - End of block period (changed to 10:00)
BLOCK_LUNCH_CHOP = os.getenv("BLOCK_LUNCH_CHOP", "false").lower() == "true"  # Block entries during lunch chop (OFF by default - soft block)
LUNCH_CHOP_START = "11:30"  # ET - Lunch chop start
LUNCH_CHOP_END = "13:30"  # ET - Lunch chop end (1:30 PM)

# Market Regime Filter (stocks only)
USE_MARKET_REGIME_FILTER = os.getenv("USE_MARKET_REGIME_FILTER", "true").lower() == "true"  # Filter based on SPY trend
MARKET_REGIME_SYMBOL = "SPY"  # Symbol to use for market regime (default: SPY)
# SPY vs EMA ±tolerance (fraction, e.g. 0.002 = ±0.20%) before treating as clearly long/short vs neutral band
SPY_REGIME_EMA_TOLERANCE_FRAC = float(os.getenv("SPY_REGIME_EMA_TOLERANCE_FRAC", "0.002"))
USE_FLAT_REGIME_FILTER = os.getenv("USE_FLAT_REGIME_FILTER", "false").lower() == "true"  # OFF by default to allow more trades; enable to block chop
FLAT_REGIME_THRESHOLD_PCT = float(os.getenv("FLAT_REGIME_THRESHOLD_PCT", "0.15"))  # ±0.15% of EMA = flat
FLAT_REGIME_LOW_ATR_PCT = float(os.getenv("FLAT_REGIME_LOW_ATR_PCT", "0.5"))  # ATR < 0.5% = low vol chop
# BTC: opposite-direction signal cooldown (30m bars; 4 bars = 2 hours)
BTC_DIRECTION_COOLDOWN_BARS = int(os.getenv("BTC_DIRECTION_COOLDOWN_BARS", "4"))
USE_VIX_FILTER = os.getenv("USE_VIX_FILTER", "true").lower() == "true"  # Filter based on VIX (avoid high panic)
VIX_MAX_THRESHOLD = float(os.getenv("VIX_MAX_THRESHOLD", "30.0"))  # Block entries if VIX > this value

# BTC 4H EMA Slope Filter (crypto only)
USE_BTC_4H_EMA_FILTER = os.getenv("USE_BTC_4H_EMA_FILTER", "true").lower() == "true"  # Filter BTC based on 4H EMA slope
BTC_4H_EMA_LENGTH = int(os.getenv("BTC_4H_EMA_LENGTH", "30"))  # EMA length for BTC filter

# Daily Loss Guard
USE_DAILY_LOSS_GUARD = os.getenv("USE_DAILY_LOSS_GUARD", "true").lower() == "true"  # Enable daily loss circuit breaker
DAILY_LOSS_LIMIT_PCT = float(os.getenv("DAILY_LOSS_LIMIT_PCT", "2.0"))  # Disable trading if daily loss > this %

# Signal Quality Control (Cooldowns)
USE_SYMBOL_COOLDOWN = os.getenv("USE_SYMBOL_COOLDOWN", "true").lower() == "true"  # Enable per-symbol cooldown
SYMBOL_COOLDOWN_BARS = int(os.getenv("SYMBOL_COOLDOWN_BARS", "2"))  # Bars to wait before re-entry (default 2 = 60 min on 30m)
USE_GLOBAL_COOLDOWN = os.getenv("USE_GLOBAL_COOLDOWN", "true").lower() == "true"  # Enable global cooldown
CONSECUTIVE_STOPS_THRESHOLD = int(os.getenv("CONSECUTIVE_STOPS_THRESHOLD", "2"))  # Stops before global cooldown
GLOBAL_COOLDOWN_MINUTES = int(os.getenv("GLOBAL_COOLDOWN_MINUTES", "90"))  # Minutes to wait (default 90)

# Correlation/Basket Risk
USE_MARKET_VOLATILITY_ADJUSTMENT = os.getenv("USE_MARKET_VOLATILITY_ADJUSTMENT", "true").lower() == "true"  # Adjust risk based on market vol
MARKET_VOL_INDEX = os.getenv("MARKET_VOL_INDEX", "SPY")  # Index to check for volatility (SPY or QQQ)
HIGH_VOL_ATR_MULTIPLIER = float(os.getenv("HIGH_VOL_ATR_MULTIPLIER", "1.5"))  # ATR multiplier threshold for high vol
HIGH_VOL_MAX_POSITIONS = int(os.getenv("HIGH_VOL_MAX_POSITIONS", "1"))  # Max positions in high vol
HIGH_VOL_RISK_PCT = float(os.getenv("HIGH_VOL_RISK_PCT", "0.4"))  # Risk % in high vol (default 0.4%)

# Slippage + Fees Modeling
USE_SLIPPAGE_MODEL = os.getenv("USE_SLIPPAGE_MODEL", "true").lower() == "true"  # Enable slippage modeling
# Legacy: Fixed slippage (deprecated)
STOCK_SLIPPAGE_CENTS = float(os.getenv("STOCK_SLIPPAGE_CENTS", "2.0"))  # Legacy: fixed cents
HIGH_BETA_SLIPPAGE_CENTS = float(os.getenv("HIGH_BETA_SLIPPAGE_CENTS", "5.0"))  # Legacy: fixed cents
# New: Volatility-based slippage
USE_VOLATILITY_BASED_SLIPPAGE = os.getenv("USE_VOLATILITY_BASED_SLIPPAGE", "true").lower() == "true"  # Use ATR-based
STOCK_SLIPPAGE_MIN_CENTS = float(os.getenv("STOCK_SLIPPAGE_MIN_CENTS", "2.0"))  # Minimum slippage (cents)
STOCK_SLIPPAGE_ATR_MULTIPLIER = float(os.getenv("STOCK_SLIPPAGE_ATR_MULTIPLIER", "0.01"))  # Slippage = max(min, ATR × mult)
ETF_SLIPPAGE_MIN_BPS = float(os.getenv("ETF_SLIPPAGE_MIN_BPS", "1.0"))  # Minimum slippage for ETFs (basis points)
ETF_SLIPPAGE_SPREAD_MULTIPLIER = float(os.getenv("ETF_SLIPPAGE_SPREAD_MULTIPLIER", "0.5"))  # Slippage = max(min, spread × mult)
CRYPTO_SPREAD_BPS = float(os.getenv("CRYPTO_SPREAD_BPS", "10.0"))  # Crypto spread in basis points (default 10)
STOCK_COMMISSION = float(os.getenv("STOCK_COMMISSION", "0.0"))  # Commission per trade (default $0 for most brokers)
CRYPTO_FEE_PCT = float(os.getenv("CRYPTO_FEE_PCT", "0.001"))  # Crypto fee % (default 0.1%)

# VIX Filter Improvements
VIX_RISK_SCALING = os.getenv("VIX_RISK_SCALING", "true").lower() == "true"  # Use risk scaling instead of binary
VIX_RISK_REDUCTION_PCT = float(os.getenv("VIX_RISK_REDUCTION_PCT", "50.0"))  # Reduce risk by this % when VIX high
VIX_CHANGE_THRESHOLD = float(os.getenv("VIX_CHANGE_THRESHOLD", "5.0"))  # VIX change threshold for scaling

# Time-in-Trade Exits
USE_TIME_IN_TRADE_EXIT = os.getenv("USE_TIME_IN_TRADE_EXIT", "true").lower() == "true"  # Enable time-based exits
TP1_TIME_LIMIT_BARS = int(os.getenv("TP1_TIME_LIMIT_BARS", "4"))  # Bars to hit TP1 (default 4)
TIME_EXIT_ACTION = os.getenv("TIME_EXIT_ACTION", "tighten_stop")  # "exit" or "tighten_stop"

# Data Quality Protection
USE_DATA_QUALITY_GUARDS = os.getenv("USE_DATA_QUALITY_GUARDS", "true").lower() == "true"  # Enable data quality checks
MAX_PRICE_JUMP_PCT = float(os.getenv("MAX_PRICE_JUMP_PCT", "10.0"))  # Legacy: fixed % (deprecated)
USE_ATR_BASED_PRICE_JUMP = os.getenv("USE_ATR_BASED_PRICE_JUMP", "true").lower() == "true"  # Use ATR-based detection
PRICE_JUMP_ATR_MULTIPLIER = float(os.getenv("PRICE_JUMP_ATR_MULTIPLIER", "4.0"))  # Block if jump > 4× ATR
PRICE_JUMP_VOLUME_MULTIPLIER = float(os.getenv("PRICE_JUMP_VOLUME_MULTIPLIER", "2.0"))  # Require 2× avg volume to allow
MAX_ATR_PCT = float(os.getenv("MAX_ATR_PCT", "50.0"))  # Max ATR as % of price
MIN_ATR_PCT = float(os.getenv("MIN_ATR_PCT", "0.01"))  # Min ATR as % of price
MAX_SPREAD_PCT = float(os.getenv("MAX_SPREAD_PCT", "1.0"))  # Max spread % for crypto
DATA_HEARTBEAT_MINUTES = int(os.getenv("DATA_HEARTBEAT_MINUTES", "5"))  # Max age of data in minutes

# Symbol Eligibility Rules
USE_SYMBOL_ELIGIBILITY = os.getenv("USE_SYMBOL_ELIGIBILITY", "true").lower() == "true"  # Enable eligibility checks
MIN_PRICE = float(os.getenv("MIN_PRICE", "10.0"))  # Minimum price (default $10)
MIN_AVG_VOLUME = int(os.getenv("MIN_AVG_VOLUME", "100000"))  # Minimum average volume (default 100k)
EARNINGS_WINDOW_DAYS = int(os.getenv("EARNINGS_WINDOW_DAYS", "2"))  # Days around earnings to avoid (default 2)

# Limit Order Policy
USE_LIMIT_ORDER_POLICY = os.getenv("USE_LIMIT_ORDER_POLICY", "true").lower() == "true"  # Enable limit order execution
LIMIT_ORDER_OFFSET_BPS = float(os.getenv("LIMIT_ORDER_OFFSET_BPS", "5.0"))  # Limit at close ± X bps
LIMIT_ORDER_TIMEOUT_MINUTES = int(os.getenv("LIMIT_ORDER_TIMEOUT_MINUTES", "5"))  # Cancel if not filled within Y minutes
EXECUTION_METHOD = os.getenv("EXECUTION_METHOD", "limit")  # "market", "limit", or "market_on_open"

# Timestamp Normalization
USE_UTC_INTERNAL = os.getenv("USE_UTC_INTERNAL", "true").lower() == "true"  # Always store UTC internally
DISPLAY_TIMEZONE = os.getenv("DISPLAY_TIMEZONE", "America/New_York")  # Display timezone (ET for stocks)
STORE_BAR_CLOSE_TS = os.getenv("STORE_BAR_CLOSE_TS", "true").lower() == "true"  # Store bar close timestamp explicitly

# Minimum Trade Expectancy Gate (Optional - Portfolio Learning)
USE_EXPECTANCY_GATE = os.getenv("USE_EXPECTANCY_GATE", "false").lower() == "true"  # Enable symbol performance tracking
EXPECTANCY_WINDOW_TRADES = int(os.getenv("EXPECTANCY_WINDOW_TRADES", "20"))  # Rolling window of trades
MIN_EXPECTANCY_R = float(os.getenv("MIN_EXPECTANCY_R", "-0.5"))  # Disable if expectancy < -0.5R
EXPECTANCY_REDUCE_RISK = os.getenv("EXPECTANCY_REDUCE_RISK", "true").lower() == "true"  # Reduce risk instead of disable

# Kill Switch Hierarchy
USE_EMERGENCY_STOP = os.getenv("USE_EMERGENCY_STOP", "true").lower() == "true"  # Enable emergency stop
USE_FLATTEN_ALL = os.getenv("USE_FLATTEN_ALL", "true").lower() == "true"  # Enable flatten all positions

# Filter Telemetry
USE_FILTER_TELEMETRY = os.getenv("USE_FILTER_TELEMETRY", "true").lower() == "true"  # Enable filter block logging
USE_FILTER_COST_LEDGER = os.getenv("USE_FILTER_COST_LEDGER", "true").lower() == "true"
FILTER_COST_LEDGER_CSV = os.getenv("FILTER_COST_LEDGER_CSV", "filter_cost_ledger.csv")
FILTER_COST_LEDGER_JSONL = os.getenv("FILTER_COST_LEDGER_JSONL", "filter_cost_ledger.jsonl")
TELEMETRY_FILE = os.getenv("TELEMETRY_FILE", "filter_telemetry.jsonl")  # Telemetry log file

# Bar Close Integrity
USE_BAR_CLOSE_INTEGRITY = os.getenv("USE_BAR_CLOSE_INTEGRITY", "true").lower() == "true"  # Enforce bar-close integrity
BAR_CLOSE_DEBUG = os.getenv("BAR_CLOSE_DEBUG", "false").lower() == "true"  # Log bar ts / new bar for all symbols
BAR_CLOSE_DEBUG_SYMBOL = os.getenv("BAR_CLOSE_DEBUG_SYMBOL", "")  # Or log for one symbol only (e.g. AAPL)

# OHLCV fetch robustness (retries are lightweight; see unified_data_fetcher + ohlcv_utils)
OHLCV_FETCH_MAX_RETRIES = int(os.getenv("OHLCV_FETCH_MAX_RETRIES", "2"))  # extra attempts after first failure
OHLCV_FETCH_RETRY_DELAY_SEC = float(os.getenv("OHLCV_FETCH_RETRY_DELAY_SEC", "0.35"))  # backoff base seconds
# If True and SPY fetch fails, use last successful SPY OHLCV for regime only (entries still need valid cycle SPY unless True)
ALLOW_STALE_SPY_REGIME_FOR_ENTRIES = os.getenv("ALLOW_STALE_SPY_REGIME_FOR_ENTRIES", "false").lower() == "true"

# Asset-Class-Specific R Logic
USE_ASSET_CLASS_TP = os.getenv("USE_ASSET_CLASS_TP", "true").lower() == "true"  # Use different TP for different asset types
# TP targets by asset class (in R multiples)
TP_BTC = float(os.getenv("TP_BTC", "2.0"))  # BTC: 2.0R or trailing ATR
TP_LARGE_CAP = float(os.getenv("TP_LARGE_CAP", "1.5"))  # Large caps (AAPL, MSFT, etc.): 1.4-1.6R
TP_HIGH_BETA = float(os.getenv("TP_HIGH_BETA", "1.8"))  # High beta (TSLA, AMD, NVDA): 1.8R
TP_ETF = float(os.getenv("TP_ETF", "1.3"))  # ETFs (QQQ, GLD, SLV): 1.2-1.4R
TP_DEFAULT = float(os.getenv("TP_DEFAULT", "1.6"))  # Default for other stocks

# Alert Configuration
ALERT_WEBHOOK_URL = os.getenv("ALERT_WEBHOOK_URL", "")  # Optional webhook URL
ALERT_EMAIL_ENABLED = os.getenv("ALERT_EMAIL_ENABLED", "false").lower() == "true"
ALERT_EMAIL_TO = os.getenv("ALERT_EMAIL_TO", "")
# Reject Discord/trades when last candle is too old vs wall clock (stale feeds / restarts showing ancient bars)
ALERT_SKIP_STALE_BARS = os.getenv("ALERT_SKIP_STALE_BARS", "true").lower() == "true"
# Deprecated: alert/OHLCV staleness uses cycle_health.stale_threshold_for_symbol (60m RTH / 720m off-hours).
ALERT_MAX_BAR_AGE_MINUTES = int(os.getenv("ALERT_MAX_BAR_AGE_MINUTES", "60"))  # unused; kept for env compatibility
# If True, stock webhooks/entries only when US equity regular session is open (wall clock ET); crypto unaffected
ALERT_STOCKS_ONLY_US_RTH_WALL_CLOCK = os.getenv("ALERT_STOCKS_ONLY_US_RTH_WALL_CLOCK", "false").lower() == "true"

# Trading Log Configuration
# Options: "csv", "google_sheets", or "both"
TRADING_LOG_METHOD = os.getenv("TRADING_LOG_METHOD", "csv").lower()  # csv, google_sheets, or both
TRADING_LOG_FILE = os.getenv("TRADING_LOG_FILE", "trading_log.csv")  # CSV file path

# Google Sheets Logging Configuration (optional - requires Google Cloud setup)
GOOGLE_SHEETS_ENABLED = os.getenv("GOOGLE_SHEETS_ENABLED", "false").lower() == "true"
GOOGLE_SHEETS_ID = os.getenv("GOOGLE_SHEETS_ID", "")  # Sheet ID from the URL
GOOGLE_SHEETS_CREDENTIALS = os.getenv("GOOGLE_SHEETS_CREDENTIALS", "credentials.json")  # Path to service account JSON

# RSI Thresholds by Version
RSI_THRESHOLDS = {
    "Core": {"long": 60, "short": 40},
    "Swing": {"long": 58, "short": 42},
    "Scalp": {"long": 55, "short": 45},
    "STS": {"long": 53, "short": 47}
}

