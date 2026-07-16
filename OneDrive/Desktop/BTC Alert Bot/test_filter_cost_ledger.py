"""Tests for filter-cost counterfactual ledger (measurement only)."""
import os
import tempfile
import unittest
from datetime import datetime, timezone

import pandas as pd

from filter_cost_ledger import FilterCostLedger


class FilterCostLedgerTests(unittest.TestCase):
    def setUp(self):
        self.tmpdir = tempfile.TemporaryDirectory()
        self.cwd = os.getcwd()
        os.chdir(self.tmpdir.name)

    def tearDown(self):
        os.chdir(self.cwd)
        self.tmpdir.cleanup()

    def test_record_and_summary(self):
        cfg = type("C", (), {
            "USE_FILTER_COST_LEDGER": True,
            "FILTER_COST_LEDGER_CSV": "filter_cost_ledger.csv",
            "FILTER_COST_LEDGER_JSONL": "filter_cost_ledger.jsonl",
            "USE_TWO_TIER_TP": True,
            "TP1_R": 1.0,
            "TP2_R": 1.8,
            "STOP_ATR_MULTIPLIER": 1.0,
        })()
        ledger = FilterCostLedger(cfg)
        ts = datetime(2026, 6, 18, 15, 0, tzinfo=timezone.utc)
        ledger.record_block(
            symbol="AAPL",
            side="long",
            signal_entry_type="breakout",
            score=72,
            filter_name="open_block",
            block_price=100.0,
            atr=2.0,
            block_ts=ts,
            reason="test",
        )
        totals = ledger.summary_by_filter()
        self.assertEqual(totals["open_block"]["count"], 1)
        self.assertEqual(totals["open_block"]["unresolved"], 1)
        self.assertEqual(totals["open_block"]["resolved"], 0)
        self.assertEqual(totals["open_block"]["cumulative_hypothetical_r"], 0.0)
        self.assertTrue(os.path.exists("filter_cost_ledger.csv"))
        self.assertTrue(os.path.exists("filter_cost_ledger.jsonl"))

    def test_forward_resolution_stop_loss(self):
        cfg = type("C", (), {
            "USE_FILTER_COST_LEDGER": True,
            "FILTER_COST_LEDGER_CSV": "filter_cost_ledger.csv",
            "FILTER_COST_LEDGER_JSONL": "filter_cost_ledger.jsonl",
            "USE_TWO_TIER_TP": True,
            "TP1_R": 1.0,
            "TP2_R": 1.8,
            "STOP_ATR_MULTIPLIER": 1.0,
            "USE_TIME_IN_TRADE_EXIT": False,
            "USE_TIME_STOP": False,
        })()
        ledger = FilterCostLedger(cfg)
        ts = datetime(2026, 6, 18, 15, 0, tzinfo=timezone.utc)
        ledger.record_block(
            symbol="AAPL",
            side="long",
            signal_entry_type="breakout",
            score=70,
            filter_name="max_pos",
            block_price=100.0,
            atr=2.0,
            block_ts=ts,
        )
        idx = pd.date_range(start=ts, periods=4, freq="30min", tz="UTC")
        df = pd.DataFrame(
            {
                "open": [100, 99, 98, 97],
                "high": [101, 100, 99, 98],
                "low": [99, 97, 96, 95],
                "close": [100, 98, 97, 96],
                "volume": [1, 1, 1, 1],
                "atr": [2, 2, 2, 2],
            },
            index=idx,
        )
        ledger.update_symbol_forwards("AAPL", df)
        open_row = ledger._open[0]
        self.assertEqual(open_row["resolved"], "1")
        self.assertLess(float(open_row["hypothetical_r"]), 0)

    def test_unresolved_excluded_from_cumulative_r(self):
        cfg = type("C", (), {
            "USE_FILTER_COST_LEDGER": True,
            "FILTER_COST_LEDGER_CSV": "filter_cost_ledger.csv",
            "FILTER_COST_LEDGER_JSONL": "filter_cost_ledger.jsonl",
            "USE_TWO_TIER_TP": True,
            "TP1_R": 1.0,
            "TP2_R": 1.8,
            "STOP_ATR_MULTIPLIER": 1.0,
            "USE_TIME_IN_TRADE_EXIT": False,
            "USE_TIME_STOP": False,
        })()
        ledger = FilterCostLedger(cfg)
        ts = datetime(2026, 6, 18, 15, 0, tzinfo=timezone.utc)
        ledger.record_block(
            symbol="AAPL",
            side="long",
            signal_entry_type="breakout",
            score=70,
            filter_name="spy_regime",
            block_price=100.0,
            atr=2.0,
            block_ts=ts,
        )
        # Sideways bars: no stop (98) or TP1 (102) hit on close.
        idx = pd.date_range(start=ts, periods=5, freq="30min", tz="UTC")
        df = pd.DataFrame(
            {
                "open": [100, 100, 100, 100, 100],
                "high": [100.5, 100.5, 100.5, 100.5, 100.5],
                "low": [99.5, 99.5, 99.5, 99.5, 99.5],
                "close": [100, 100, 100, 100, 100],
                "volume": [1, 1, 1, 1, 1],
                "atr": [2, 2, 2, 2, 2],
            },
            index=idx,
        )
        ledger.update_symbol_forwards("AAPL", df)
        row = ledger._open[0]
        self.assertEqual(row["resolved"], "0")
        self.assertEqual(row["hypothetical_r"], "")
        self.assertEqual(float(row["last_forward_price"]), 100.0)

        totals = ledger.summary_by_filter()
        self.assertEqual(totals["spy_regime"]["count"], 1)
        self.assertEqual(totals["spy_regime"]["resolved"], 0)
        self.assertEqual(totals["spy_regime"]["unresolved"], 1)
        self.assertEqual(totals["spy_regime"]["cumulative_hypothetical_r"], 0.0)


if __name__ == "__main__":
    unittest.main()
