"""
Unified Data Fetcher
Factory pattern to support both crypto and stock data fetching
"""
import config
from data_fetcher import DataFetcher
from stock_data_fetcher import StockDataFetcher
from alpaca_data_fetcher import AlpacaDataFetcher
from ohlcv_utils import OHLCVFetchError, fetch_ohlcv_with_retries


class UnifiedDataFetcher:
    """
    Unified interface for fetching data from both crypto exchanges and stock markets
    """
    def __init__(self, asset_type="crypto", exchange_name="coinbase", symbol="BTC/USD", timeframe="30m"):
        """
        Initialize unified data fetcher
        
        Args:
            asset_type: "crypto" or "stock"
            exchange_name: Exchange name for crypto (e.g., 'coinbase', 'binance')
            symbol: Trading symbol (e.g., 'BTC/USD' for crypto, 'AAPL' for stocks)
            timeframe: Timeframe string (e.g., '30m', '1h', '1d')
        """
        self.asset_type = asset_type.lower()
        self.symbol = symbol
        self.timeframe = timeframe
        self.last_provider_used = None
        
        if self.asset_type == "crypto":
            self.fetcher = DataFetcher(
                exchange_name=exchange_name,
                symbol=symbol,
                timeframe=timeframe
            )
        elif self.asset_type == "stock":
            self.fetcher = StockDataFetcher(
                symbol=symbol,
                timeframe=timeframe
            )
            # Alpaca is primary provider for stocks.
            self.alpaca_fetcher = None
            try:
                self.alpaca_fetcher = AlpacaDataFetcher(
                    symbol=symbol,
                    timeframe=timeframe
                )
            except Exception as e:
                print(f"[DATA] {self.symbol} ALPACA unavailable at init: {e}")
            self.yahoo_fetcher = self.fetcher
        else:
            raise ValueError(f"Unsupported asset_type: {asset_type}. Must be 'crypto' or 'stock'")

    def _fetch_with_retries(self, fetcher, limit, label):
        max_retries = int(getattr(config, "OHLCV_FETCH_MAX_RETRIES", 2))
        delay = float(getattr(config, "OHLCV_FETCH_RETRY_DELAY_SEC", 0.35))

        def _call(lim: int):
            return fetcher.fetch_ohlcv(limit=lim)

        return fetch_ohlcv_with_retries(_call, limit, max_retries, delay, label=label)

    def _fetch_stock_with_fallback(self, limit=200):
        """Yahoo (yfinance) primary; Alpaca fallback. Both use rolling window ending at now."""
        fetch_limit = max(int(limit), 80)
        yahoo_err = None
        try:
            df = self._fetch_with_retries(
                self.yahoo_fetcher,
                fetch_limit,
                f"stock:{self.symbol}:YAHOO",
            )
            self.last_provider_used = "YAHOO"
            print(f"[DATA] {self.symbol} fetched via YAHOO")
            return df
        except Exception as e:
            yahoo_err = e
            print(f"[DATA] {self.symbol} YAHOO failed: {e}")

        alpaca_err = None
        if self.alpaca_fetcher is not None:
            try:
                df = self._fetch_with_retries(
                    self.alpaca_fetcher,
                    fetch_limit,
                    f"stock:{self.symbol}:ALPACA",
                )
                self.last_provider_used = "ALPACA"
                print(f"[DATA] {self.symbol} fetched via ALPACA (fallback)")
                return df
            except Exception as e:
                alpaca_err = e
                print(f"[DATA] {self.symbol} ALPACA failed: {e}")
        else:
            alpaca_err = "ALPACA not configured"

        raise OHLCVFetchError(
            f"{self.symbol}: YAHOO failed ({yahoo_err}) and ALPACA failed ({alpaca_err})"
        )
    
    def fetch_ohlcv(self, limit=200):
        """Fetch OHLCV data with lightweight retries and validation (see ohlcv_utils)."""
        if self.asset_type == "stock":
            return self._fetch_stock_with_fallback(limit=limit)

        df = self._fetch_with_retries(
            self.fetcher, limit, f"{self.asset_type}:{self.symbol}"
        )
        meta = getattr(self.fetcher, "last_fetch_meta", None) or {}
        source = meta.get("source")
        if source:
            self.last_provider_used = str(source).upper()
        return df

    def get_last_fetch_meta(self) -> dict:
        """Last fetch provenance (crypto: coinbase_rest | ccxt | cache_fallback)."""
        if self.asset_type == "crypto":
            return dict(getattr(self.fetcher, "last_fetch_meta", {}) or {})
        return {
            "source": (self.last_provider_used or "unknown").lower(),
            "live_fetch_ok": True,
            "fetch_error": None,
        }
    
    def get_latest_candle(self):
        """Get the latest candle data"""
        if self.asset_type == "stock":
            df = self.fetch_ohlcv(limit=2)
            return df.iloc[-1]
        return self.fetcher.get_latest_candle()
    
    def verify_symbol(self):
        """Verify that the symbol is available"""
        if self.asset_type != "stock":
            return self.fetcher.verify_symbol()

        # Keep verify robust against transient Yahoo NoneType responses.
        # Order requested: Yahoo(retry) -> Alpaca.
        yahoo_err = None
        try:
            self._fetch_with_retries(
                self.yahoo_fetcher, 5, f"verify:{self.symbol}:YAHOO"
            )
            self.last_provider_used = "YAHOO"
            print(f"[DATA] {self.symbol} verified via YAHOO")
            return True
        except Exception as e:
            yahoo_err = e
            print(f"[DATA] {self.symbol} YAHOO verify failed: {e}")

        try:
            if self.alpaca_fetcher is None:
                raise OHLCVFetchError("ALPACA not configured")
            self._fetch_with_retries(self.alpaca_fetcher, 5, f"verify:{self.symbol}:ALPACA")
            self.last_provider_used = "ALPACA"
            print(f"[DATA] {self.symbol} verified via ALPACA")
            return True
        except Exception as alpaca_err:
            raise OHLCVFetchError(
                f"{self.symbol}: verify failed on YAHOO ({yahoo_err}) and ALPACA ({alpaca_err})"
            ) from alpaca_err
    
    def get_symbol_display(self):
        """Get formatted symbol for display"""
        if self.asset_type == "crypto":
            return self.symbol.replace("/", "")
        else:
            return self.symbol



