"""
Regression tests for BTC/Coinbase data feed honesty (stale_fallback vs ok).
"""
import unittest
from datetime import datetime, timedelta, timezone
from unittest.mock import MagicMock, patch

import pandas as pd

from cycle_health import assess_ohlcv_freshness
from data_fetcher import DataFetcher
from ohlcv_utils import OHLCVFetchError
from portfolio_monitor import SymbolMonitor


import config as app_config


class BtcFeedTestConfig:
    """Minimal overrides; other attrs fall through to config.py."""
    EXCHANGE = "coinbase"
    TIMEFRAME = "30m"
    SYMBOL = "BTC/USD"
    USE_BTC_4H_EMA_FILTER = False
    USE_MARKET_REGIME_FILTER = False
    BLOCK_MARKET_OPEN = False
    USE_BAR_CLOSE_INTEGRITY = False
    USE_STRATEGY_DEEP_DIAG = False
    ALERT_SKIP_STALE_BARS = False

    def __getattr__(self, name):
        return getattr(app_config, name)


def _synthetic_btc_df(*, bars: int = 65, last_bar_age_minutes: float = 15.0) -> pd.DataFrame:
    """OHLCV with last bar timestamp anchored relative to now (UTC)."""
    now = datetime.now(timezone.utc)
    last_ts = now - timedelta(minutes=last_bar_age_minutes)
    idx = pd.date_range(end=last_ts, periods=bars, freq="30min", tz="UTC")
    close = 60000.0 + pd.Series(range(bars), index=idx) * 10.0
    df = pd.DataFrame(
        {
            "open": close - 5,
            "high": close + 20,
            "low": close - 20,
            "close": close,
            "volume": 1.0,
        },
        index=idx,
    )
    return df


class BtcDataFeedRegressionTests(unittest.TestCase):
    def test_cache_fallback_assessment_is_stale_fallback_not_ok(self):
        df = _synthetic_btc_df(last_bar_age_minutes=10.0)
        assessment = assess_ohlcv_freshness(
            df,
            symbol="BTC/USD",
            fetch_source="cache_fallback",
            live_fetch_ok=False,
        )
        self.assertEqual(assessment["status"], "stale_fallback")
        self.assertNotEqual(assessment["status"], "ok")
        self.assertEqual(assessment["fetch_source"], "cache_fallback")
        self.assertFalse(assessment["live_fetch_ok"])

    def test_live_fetch_assessment_ok_when_bar_fresh(self):
        df = _synthetic_btc_df(last_bar_age_minutes=15.0)
        assessment = assess_ohlcv_freshness(
            df,
            symbol="BTC/USD",
            fetch_source="coinbase_rest",
            live_fetch_ok=True,
        )
        self.assertEqual(assessment["status"], "ok")
        self.assertEqual(assessment["fetch_source"], "coinbase_rest")

    def test_bar_age_uses_bar_timestamp_not_cache_write_time(self):
        """Age must grow with wall clock while bar timestamp is fixed (no cache-write reset)."""
        fixed_last = datetime(2026, 6, 18, 12, 0, 0, tzinfo=timezone.utc)
        idx = pd.date_range(end=fixed_last, periods=5, freq="30min", tz="UTC")
        df = pd.DataFrame(
            {
                "open": [1.0] * 5,
                "high": [1.1] * 5,
                "low": [0.9] * 5,
                "close": [1.0] * 5,
                "volume": [1.0] * 5,
            },
            index=idx,
        )
        t0 = fixed_last + timedelta(minutes=30)
        t1 = t0 + timedelta(hours=3)

        a0 = assess_ohlcv_freshness(
            df.copy(),
            symbol="BTC/USD",
            now=t0,
            fetch_source="cache_fallback",
            live_fetch_ok=False,
        )
        a1 = assess_ohlcv_freshness(
            df.copy(),
            symbol="BTC/USD",
            now=t1,
            fetch_source="cache_fallback",
            live_fetch_ok=False,
        )
        self.assertEqual(a0["status"], "stale_fallback")
        self.assertEqual(a1["status"], "stale_fallback")
        self.assertGreater(a1["age_minutes"], a0["age_minutes"])
        self.assertAlmostEqual(a1["age_minutes"] - a0["age_minutes"], 180.0, delta=0.5)

        stale_live = assess_ohlcv_freshness(
            df.copy(),
            symbol="BTC/USD",
            now=t1,
            fetch_source="coinbase_rest",
            live_fetch_ok=True,
        )
        self.assertEqual(stale_live["status"], "stale")

    def test_data_fetcher_cache_fallback_meta(self):
        fetcher = DataFetcher("coinbase", "BTC/USD", "30m")
        good = _synthetic_btc_df(bars=10)
        fetcher._last_good_ohlcv = good.copy()

        with patch.object(fetcher, "_fetch_ohlcv_coinbase_rest", side_effect=OHLCVFetchError("fail")):
            with patch.object(fetcher, "_fetch_ohlcv_ccxt", side_effect=OHLCVFetchError("fail")):
                out = fetcher.fetch_ohlcv(limit=10)

        self.assertEqual(fetcher.last_fetch_meta["source"], "cache_fallback")
        self.assertFalse(fetcher.last_fetch_meta["live_fetch_ok"])
        pd.testing.assert_frame_equal(out, good)

    def test_symbol_monitor_blocks_entry_on_cache_fallback(self):
        cfg = BtcFeedTestConfig()
        monitor = SymbolMonitor("BTC/USD", cfg, shared_paper_trader=MagicMock())
        monitor.paper_trader.open_trades = []
        monitor.paper_trader.open_position = MagicMock(return_value=(True, "ok"))
        monitor.paper_trader.update_positions = MagicMock(return_value=(False, None))

        stale_df = _synthetic_btc_df(bars=65, last_bar_age_minutes=10.0)
        fetch_meta = {"source": "cache_fallback", "live_fetch_ok": False, "fetch_error": "simulated"}

        with patch.object(monitor.data_fetcher, "fetch_ohlcv", return_value=stale_df):
            with patch.object(monitor.data_fetcher, "get_last_fetch_meta", return_value=fetch_meta):
                result = monitor.check_for_signals()

        diag = result["diag"]
        self.assertEqual(diag["data_freshness_status"], "stale_fallback")
        self.assertTrue(diag["blocked_by_data_quality"])
        self.assertFalse(diag.get("final_order_sent"))
        monitor.paper_trader.open_position.assert_not_called()

    def test_symbol_monitor_allows_entry_path_on_live_ok_fetch(self):
        cfg = BtcFeedTestConfig()
        paper = MagicMock()
        paper.open_trades = []
        paper.should_skip_processed_bar = MagicMock(return_value=False)
        paper.update_positions = MagicMock(return_value=(False, None))
        paper.open_position = MagicMock(return_value=(True, "opened"))
        new_trade = MagicMock(
            entry_price=60000,
            base_stop=59000,
            take_profit=None,
            tp1=61000,
            tp2=62000,
            entry_type="long",
            position_shares=0.01,
            position_size_dollars=600,
        )

        def _open_and_append(*_args, **_kwargs):
            paper.open_trades.append(new_trade)
            return True, "opened"

        paper.open_position = MagicMock(side_effect=_open_and_append)

        monitor = SymbolMonitor("BTC/USD", cfg, shared_paper_trader=paper)
        monitor.prev_long_signal = False
        monitor.alert_system.send_alert = MagicMock(return_value=True)

        fresh_df = _synthetic_btc_df(bars=65, last_bar_age_minutes=15.0)
        fetch_meta = {"source": "coinbase_rest", "live_fetch_ok": True, "fetch_error": None}

        with patch.object(monitor.data_fetcher, "fetch_ohlcv", return_value=fresh_df):
            with patch.object(monitor.data_fetcher, "get_last_fetch_meta", return_value=fetch_meta):
                with patch.object(monitor.strategy, "check_signals", return_value={
                    "long": True,
                    "short": False,
                    "entry_type_long": "breakout",
                    "entry_score_long": 80,
                    "entry_reason_long": "test",
                    "timestamp": fresh_df.index[-1],
                }):
                    with patch(
                        "expectancy_gates.apply_expectancy_gates_to_signals",
                        side_effect=lambda s, *a, **k: s,
                    ):
                        with patch(
                            "portfolio_monitor.check_btc_flat_regime",
                            return_value=(True, None),
                        ):
                            with patch(
                                "portfolio_monitor.check_btc_direction_cooldown",
                                return_value=(True, None),
                            ):
                                result = monitor.check_for_signals()

        diag = result["diag"]
        self.assertEqual(diag["data_freshness_status"], "ok")
        self.assertFalse(diag["blocked_by_data_quality"])
        paper.open_position.assert_called_once()
        self.assertTrue(diag.get("final_order_sent"))


if __name__ == "__main__":
    unittest.main()
