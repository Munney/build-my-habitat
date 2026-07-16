"""
Filter-cost counterfactual ledger (measurement only — no orders).

Records blocked signals and tracks forward hypothetical R under normal TP/SL rules.
"""
from __future__ import annotations

import csv
import json
import os
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

import pandas as pd

from paper_trader import PaperTrade

CSV_FIELDS = [
    "block_id",
    "timestamp",
    "symbol",
    "side",
    "signal_entry_type",
    "score",
    "filter_name",
    "block_price",
    "atr",
    "R",
    "stop_price",
    "tp1",
    "tp2",
    "hypothetical_r",
    "hypothetical_exit_price",
    "hypothetical_exit_reason",
    "resolved",
    "last_forward_price",
    "last_forward_ts",
    "reason",
]


def _primary_filter_from_diag(diag: Dict[str, Any]) -> Optional[str]:
    mapping = [
        ("blocked_by_market_open", "open_block"),
        ("blocked_by_max_positions", "max_pos"),
        ("blocked_by_spy_regime", "spy_regime"),
        ("blocked_by_spy_data_unavailable", "spy_regime"),
        ("blocked_by_expectancy_gate", "expectancy_gate"),
        ("blocked_by_cooldown", "cooldown"),
        ("blocked_by_flat_regime", "btc_flat_regime"),
        ("blocked_by_btc_4h_regime", "btc_4h_regime"),
        ("blocked_by_stale_bar", "stale_bar"),
        ("blocked_by_vix", "vix"),
        ("blocked_by_daily_loss", "daily_loss"),
        ("blocked_by_capital", "capital"),
        ("blocked_by_data_quality", "data_quality"),
    ]
    for key, name in mapping:
        if diag.get(key):
            return name
    return None


class FilterCostLedger:
    """Counterfactual ledger for filter-blocked signals."""

    def __init__(self, config_obj):
        self.config = config_obj
        self.csv_path = getattr(config_obj, "FILTER_COST_LEDGER_CSV", "filter_cost_ledger.csv")
        self.jsonl_path = getattr(config_obj, "FILTER_COST_LEDGER_JSONL", "filter_cost_ledger.jsonl")
        self._open: List[Dict[str, Any]] = []
        self._ensure_csv_header()

    def _ensure_csv_header(self) -> None:
        if os.path.exists(self.csv_path):
            return
        try:
            with open(self.csv_path, "w", newline="", encoding="utf-8") as f:
                csv.DictWriter(f, fieldnames=CSV_FIELDS).writeheader()
        except OSError as e:
            print(f"[FILTER-COST] Warning: could not create ledger CSV: {e}")

    def _append_csv(self, row: Dict[str, Any]) -> None:
        try:
            with open(self.csv_path, "a", newline="", encoding="utf-8") as f:
                csv.DictWriter(f, fieldnames=CSV_FIELDS).writerow(row)
        except OSError as e:
            print(f"[FILTER-COST] Warning: CSV write failed: {e}")

    def _append_jsonl(self, row: Dict[str, Any]) -> None:
        try:
            with open(self.jsonl_path, "a", encoding="utf-8") as f:
                f.write(json.dumps(row) + "\n")
        except OSError as e:
            print(f"[FILTER-COST] Warning: JSONL write failed: {e}")

    def record_block(
        self,
        *,
        symbol: str,
        side: str,
        signal_entry_type: Optional[str],
        score: Optional[float],
        filter_name: str,
        block_price: float,
        atr: float,
        block_ts: Any,
        reason: Optional[str] = None,
    ) -> None:
        if not getattr(self.config, "USE_FILTER_COST_LEDGER", True):
            return

        side = (side or "").lower()
        if side not in ("long", "short"):
            return

        atr_floor = float(block_price) * 0.001
        atr_use = max(float(atr), atr_floor)
        shadow = PaperTrade(
            symbol,
            side,
            float(block_price),
            block_ts,
            0,
            atr_use,
            self.config,
            entry_metadata={
                "entry_type": signal_entry_type,
                "entry_score": score,
            },
        )

        block_id = str(uuid.uuid4())
        ts_iso = (
            block_ts.isoformat()
            if hasattr(block_ts, "isoformat")
            else str(block_ts)
        )
        row = {
            "block_id": block_id,
            "timestamp": ts_iso,
            "symbol": symbol,
            "side": side,
            "signal_entry_type": signal_entry_type or "",
            "score": score if score is not None else "",
            "filter_name": filter_name,
            "block_price": round(float(block_price), 8),
            "atr": round(atr_use, 8),
            "R": round(float(shadow.R), 8),
            "stop_price": round(float(shadow.base_stop), 8),
            "tp1": round(float(shadow.tp1), 8) if shadow.tp1 else "",
            "tp2": round(float(shadow.tp2), 8) if shadow.tp2 else "",
            "hypothetical_r": "",
            "hypothetical_exit_price": "",
            "hypothetical_exit_reason": "",
            "resolved": "0",
            "last_forward_price": round(float(block_price), 8),
            "last_forward_ts": ts_iso,
            "reason": reason or "",
        }
        self._append_csv(row)
        self._append_jsonl(row)
        self._open.append({**row, "_shadow": shadow, "_entry_bar_index": 0})

    def update_symbol_forwards(self, symbol: str, ohlcv_df: pd.DataFrame) -> None:
        """Advance unresolved shadow trades using subsequent OHLCV bars."""
        if ohlcv_df is None or len(ohlcv_df) == 0:
            return

        for entry in self._open:
            if entry.get("resolved") == "1" or entry["symbol"] != symbol:
                continue

            shadow: PaperTrade = entry["_shadow"]
            block_ts = pd.Timestamp(entry["timestamp"])
            if block_ts.tzinfo is None:
                block_ts = block_ts.tz_localize("UTC")
            else:
                block_ts = block_ts.tz_convert("UTC")

            future = ohlcv_df[ohlcv_df.index > block_ts]
            if len(future) == 0:
                last_close = float(ohlcv_df["close"].iloc[-1])
                entry["last_forward_price"] = round(last_close, 8)
                entry["last_forward_ts"] = str(ohlcv_df.index[-1])
                continue

            start_idx = max(int(entry.get("_entry_bar_index", 0)), 0)
            for i, (ts, row) in enumerate(future.iloc[start_idx:].iterrows(), start=start_idx):
                close = float(row["close"])
                atr = float(row.get("atr", shadow.atr_at_entry) or shadow.atr_at_entry)
                bar_index = i + 1
                shadow.update_stops(close, atr, bar_index)
                should_exit, exit_reason = shadow.check_exit(close, atr, bar_index)
                entry["last_forward_price"] = round(close, 8)
                entry["last_forward_ts"] = str(ts)
                entry["_entry_bar_index"] = bar_index
                if should_exit:
                    shadow.close_trade(close, ts.to_pydatetime(), exit_reason)
                    pnl_r = shadow.get_pnl()
                    entry["hypothetical_r"] = round(float(pnl_r), 4) if pnl_r is not None else ""
                    entry["hypothetical_exit_price"] = round(close, 8)
                    entry["hypothetical_exit_reason"] = exit_reason or ""
                    entry["resolved"] = "1"
                    self._rewrite_csv_row(entry)
                    break

    def _rewrite_csv_row(self, updated: Dict[str, Any]) -> None:
        """Best-effort CSV row update by block_id."""
        if not os.path.exists(self.csv_path):
            return
        try:
            with open(self.csv_path, newline="", encoding="utf-8") as f:
                rows = list(csv.DictReader(f))
            for row in rows:
                if row.get("block_id") == updated["block_id"]:
                    row.update({k: updated.get(k, row.get(k)) for k in CSV_FIELDS})
            with open(self.csv_path, "w", newline="", encoding="utf-8") as f:
                w = csv.DictWriter(f, fieldnames=CSV_FIELDS)
                w.writeheader()
                w.writerows(rows)
        except OSError:
            pass

    def summary_by_filter(self) -> Dict[str, Dict[str, Any]]:
        """Aggregate blocked count and cumulative hypothetical R per filter."""
        if not os.path.exists(self.csv_path):
            return {}
        totals: Dict[str, Dict[str, Any]] = {}
        with open(self.csv_path, newline="", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                fn = row.get("filter_name") or "unknown"
                bucket = totals.setdefault(
                    fn,
                    {
                        "count": 0,
                        "resolved": 0,
                        "unresolved": 0,
                        "cumulative_hypothetical_r": 0.0,
                    },
                )
                bucket["count"] += 1
                is_resolved = str(row.get("resolved")) == "1"
                if is_resolved:
                    bucket["resolved"] += 1
                    hr = row.get("hypothetical_r")
                    if hr not in (None, ""):
                        try:
                            bucket["cumulative_hypothetical_r"] += float(hr)
                        except ValueError:
                            pass
                else:
                    bucket["unresolved"] += 1
        for bucket in totals.values():
            bucket["cumulative_hypothetical_r"] = round(bucket["cumulative_hypothetical_r"], 4)
        return totals

    def print_summary(self) -> None:
        totals = self.summary_by_filter()
        if not totals:
            return
        print("\n[FILTER-COST SUMMARY]")
        print(
            f"{'Filter':<20} | {'Blocked':>7} | {'Resolved':>8} | "
            f"{'Unresolved':>10} | {'Cum. hyp. R':>12}"
        )
        print(
            "  (Cum. hyp. R includes only resolved shadow trades that hit TP/SL; "
            "unresolved are excluded.)"
        )
        for fn in sorted(totals.keys()):
            b = totals[fn]
            print(
                f"{fn:<20} | {b['count']:>7} | {b['resolved']:>8} | "
                f"{b['unresolved']:>10} | {b['cumulative_hypothetical_r']:>12.4f}"
            )
