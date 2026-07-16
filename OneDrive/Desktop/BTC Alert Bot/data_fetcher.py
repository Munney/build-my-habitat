"""
Data Fetcher for Crypto Market Data
Uses Coinbase REST (primary) with CCXT fallback; honest cache on total live failure.
"""
import ccxt
import pandas as pd
from datetime import datetime
import time
import config

from coinbase_candles import fetch_coinbase_candles
from ohlcv_utils import OHLCVFetchError, ensure_utc_index, validate_ohlcv_dataframe


class DataFetcher:
    def __init__(self, exchange_name="coinbase", symbol="BTC/USD", timeframe="30m"):
        """
        Initialize data fetcher
        
        Args:
            exchange_name: Name of the exchange (e.g., 'coinbase', 'binance')
            symbol: Trading pair (e.g., 'BTC/USD')
            timeframe: Timeframe string (e.g., '30m', '1h', '1d')
        """
        self.exchange_name = exchange_name
        self.symbol = symbol
        self.timeframe = timeframe
        self._use_coinbase_rest = self._is_coinbase_exchange()
        self._use_4h_hourly_resample = (
            self._needs_4h_hourly_resample() and not self._use_coinbase_rest
        )
        self._last_good_ohlcv = None
        self.last_fetch_meta = {
            "source": None,
            "live_fetch_ok": False,
            "fetch_error": None,
        }
        
        # Initialize exchange
        exchange_class = getattr(ccxt, exchange_name)
        self.exchange = exchange_class({
            'enableRateLimit': True,
            'options': {
                'defaultType': 'spot',  # Use spot trading
            }
        })
        
        # Verify symbol is available
        if not self.exchange.has['fetchOHLCV']:
            raise Exception(f"{exchange_name} does not support OHLCV data")

    def _is_coinbase_exchange(self) -> bool:
        return self.exchange_name.lower() in (
            "coinbase",
            "coinbaseadvanced",
            "coinbasepro",
        )

    def _needs_4h_hourly_resample(self) -> bool:
        """Coinbase Advanced Trade rejects '4h' via CCXT; REST supports FOUR_HOUR directly."""
        tf = (self.timeframe or "").lower()
        if tf not in ("4h", "4hr"):
            return False
        return self._is_coinbase_exchange()

    def _set_fetch_meta(self, *, source: str, live_fetch_ok: bool, fetch_error=None) -> None:
        self.last_fetch_meta = {
            "source": source,
            "live_fetch_ok": bool(live_fetch_ok),
            "fetch_error": fetch_error,
        }

    def _fetch_ohlcv_coinbase_rest(self, limit: int) -> pd.DataFrame:
        max_retries = int(getattr(config, "OHLCV_FETCH_MAX_RETRIES", 2))
        delay = float(getattr(config, "OHLCV_FETCH_RETRY_DELAY_SEC", 0.35))
        return fetch_coinbase_candles(
            self.symbol,
            self.timeframe,
            limit=limit,
            max_retries=max_retries,
            retry_delay_sec=delay,
        )

    def _fetch_ohlcv_ccxt(self, limit: int) -> pd.DataFrame:
        if self._use_4h_hourly_resample:
            return self._fetch_ohlcv_hourly_resampled_4h(limit)

        ohlcv = self.exchange.fetch_ohlcv(
            self.symbol,
            self.timeframe,
            limit=limit,
        )

        df = pd.DataFrame(
            ohlcv,
            columns=['timestamp', 'open', 'high', 'low', 'close', 'volume']
        )
        df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms', utc=True)
        df.set_index('timestamp', inplace=True)
        return ensure_utc_index(df)

    def _fetch_ohlcv_hourly_resampled_4h(self, limit: int) -> pd.DataFrame:
        """
        Fetch 1H candles via CCXT and resample to 4H (last completed bar for slope).
        """
        hourly_limit = max(int(limit) * 4 + 4, 8)
        ohlcv = self.exchange.fetch_ohlcv(
            self.symbol,
            "1h",
            limit=hourly_limit,
        )
        df = pd.DataFrame(
            ohlcv,
            columns=["timestamp", "open", "high", "low", "close", "volume"],
        )
        df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms", utc=True)
        df.set_index("timestamp", inplace=True)
        resampled = (
            df.resample("4h", label="right", closed="right")
            .agg(
                {
                    "open": "first",
                    "high": "max",
                    "low": "min",
                    "close": "last",
                    "volume": "sum",
                }
            )
            .dropna()
        )
        if len(resampled) > limit:
            resampled = resampled.tail(limit)
        return ensure_utc_index(resampled)
    
    def fetch_ohlcv(self, limit=200):
        """
        Fetch OHLCV (Open, High, Low, Close, Volume) data
        
        Returns:
            pandas DataFrame with columns: timestamp, open, high, low, close, volume
        """
        live_errors = []

        if self._use_coinbase_rest:
            try:
                df = self._fetch_ohlcv_coinbase_rest(limit)
                ok, reason = validate_ohlcv_dataframe(df, min_rows=1)
                if ok:
                    self._last_good_ohlcv = df.copy()
                    self._set_fetch_meta(source="coinbase_rest", live_fetch_ok=True)
                    return df
                live_errors.append(f"coinbase_rest invalid: {reason}")
            except OHLCVFetchError as e:
                live_errors.append(f"coinbase_rest: {e}")
                print(f"[DATA] {self.symbol} Coinbase REST failed: {e}")
            except Exception as e:
                live_errors.append(f"coinbase_rest: {e}")
                print(f"[DATA] {self.symbol} Coinbase REST failed: {e}")

        try:
            df = self._fetch_ohlcv_ccxt(limit)
            ok, reason = validate_ohlcv_dataframe(df, min_rows=1)
            if not ok:
                raise OHLCVFetchError(f"{self.symbol}: {reason}")
            self._last_good_ohlcv = df.copy()
            source = "ccxt" if self._use_coinbase_rest else f"ccxt:{self.exchange_name}"
            self._set_fetch_meta(source=source, live_fetch_ok=True)
            return df
        except OHLCVFetchError as e:
            live_errors.append(str(e))
        except Exception as e:
            live_errors.append(str(e))
            print(f"[DATA] {self.symbol} CCXT failed: {e}")

        if self._last_good_ohlcv is not None:
            cached = self._last_good_ohlcv.copy()
            err_summary = "; ".join(live_errors) if live_errors else "unknown"
            self._set_fetch_meta(
                source="cache_fallback",
                live_fetch_ok=False,
                fetch_error=err_summary,
            )
            print(
                f"[DATA] {self.symbol} using cache_fallback "
                f"(live fetch failed: {err_summary})"
            )
            return cached

        raise OHLCVFetchError(
            f"{self.symbol}: live fetch failed ({'; '.join(live_errors)}) and no cache"
        )
    
    def get_latest_candle(self):
        """Get the latest candle data"""
        df = self.fetch_ohlcv(limit=2)
        return df.iloc[-1]
    
    def verify_symbol(self):
        """Verify that the symbol is available on the exchange"""
        try:
            if self._use_coinbase_rest:
                df = self._fetch_ohlcv_coinbase_rest(limit=2)
                ok, reason = validate_ohlcv_dataframe(df, min_rows=1)
                if not ok:
                    raise OHLCVFetchError(f"{self.symbol}: {reason}")
                return True
            markets = self.exchange.load_markets()
            if self.symbol not in markets:
                raise Exception(f"Symbol {self.symbol} not found on {self.exchange_name}")
            return True
        except Exception as e:
            print(f"Error verifying symbol: {e}")
            raise
