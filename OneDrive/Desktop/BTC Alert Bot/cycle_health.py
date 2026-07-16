"""
Cycle health / observability helpers (no signal or risk logic).
"""
from __future__ import annotations

from datetime import datetime, time, timezone
from typing import Any, Dict, List, Optional, Tuple

import pandas as pd
import pytz

# Default thresholds (minutes); stocks use context-aware thresholds below
DATA_STALE_AGE_MINUTES = 60
DATA_STALE_AGE_OFF_HOURS_MINUTES = 720

ET = pytz.timezone("US/Eastern")


def is_us_market_hours(now: Optional[datetime] = None) -> bool:
    """True during regular US equity session Mon–Fri 09:30–16:00 ET."""
    if now is None:
        now = datetime.now(timezone.utc)
    elif now.tzinfo is None:
        now = now.replace(tzinfo=timezone.utc)
    now_et = now.astimezone(ET)
    if now_et.weekday() >= 5:
        return False
    t = now_et.time()
    return time(9, 30) <= t < time(16, 0)


def stale_threshold_for_symbol(
    symbol: str,
    now: Optional[datetime] = None,
) -> Tuple[int, str, str]:
    """
    Shared staleness threshold for OHLCV freshness and alert dispatch.

    Returns:
        (threshold_minutes, display_label, context) where context is
        market_hours | off_hours | crypto.

    Stocks: 60m during market hours (Mon–Fri 09:30–16:00 ET), 720m off-hours/weekends.
    Crypto: 60m always.
    """
    if "/" in symbol:
        return DATA_STALE_AGE_MINUTES, "60m (crypto)", "crypto"
    if is_us_market_hours(now):
        return DATA_STALE_AGE_MINUTES, "60m (market_hours)", "market_hours"
    return DATA_STALE_AGE_OFF_HOURS_MINUTES, "720m (off_hours)", "off_hours"


def bar_age_minutes_utc(bar_ts: Any, now: Optional[datetime] = None) -> Optional[float]:
    """Minutes between bar close (UTC) and now (UTC). None if timestamp invalid."""
    if now is None:
        now = datetime.now(timezone.utc)
    elif now.tzinfo is None:
        now = now.replace(tzinfo=timezone.utc)

    if bar_ts is None:
        return None

    if isinstance(bar_ts, pd.Timestamp):
        bar_dt = bar_ts.to_pydatetime()
        if bar_ts.tzinfo is None:
            bar_dt = bar_dt.replace(tzinfo=timezone.utc)
        else:
            bar_dt = bar_dt.astimezone(timezone.utc)
    elif isinstance(bar_ts, datetime):
        bar_dt = bar_ts.replace(tzinfo=timezone.utc) if bar_ts.tzinfo is None else bar_ts.astimezone(timezone.utc)
    else:
        try:
            p = pd.Timestamp(bar_ts)
            bar_dt = p.to_pydatetime()
            if p.tzinfo is None:
                bar_dt = bar_dt.replace(tzinfo=timezone.utc)
            else:
                bar_dt = bar_dt.astimezone(timezone.utc)
        except Exception:
            return None

    return float((now - bar_dt).total_seconds() / 60.0)


def evaluate_bar_staleness(
    symbol: str,
    bar_ts: Any,
    now: Optional[datetime] = None,
) -> Tuple[bool, Optional[float], int, str]:
    """
    Returns (is_stale, age_minutes, threshold_minutes, context).
    """
    age = bar_age_minutes_utc(bar_ts, now)
    threshold_min, _label, context = stale_threshold_for_symbol(symbol, now)
    if age is None:
        return True, None, threshold_min, context
    return age > threshold_min, age, threshold_min, context


def assess_ohlcv_freshness(
    df: Optional[pd.DataFrame],
    *,
    symbol: Optional[str] = None,
    stale_minutes: Optional[int] = None,
    now: Optional[datetime] = None,
    fetch_source: Optional[str] = None,
    live_fetch_ok: bool = True,
) -> Dict[str, Any]:
    """Classify fetch result: ok | stale | stale_fallback | empty."""
    if now is None:
        now = datetime.now(timezone.utc)
    elif now.tzinfo is None:
        now = now.replace(tzinfo=timezone.utc)

    if stale_minutes is None and symbol:
        stale_minutes, threshold_label, _ctx = stale_threshold_for_symbol(symbol, now)
    else:
        stale_minutes = stale_minutes or DATA_STALE_AGE_MINUTES
        threshold_label = f"{stale_minutes}m"

    if df is None or len(df) == 0:
        return {
            "bars": 0,
            "last_bar": None,
            "age_minutes": None,
            "status": "empty",
            "stale_threshold_minutes": stale_minutes,
            "threshold_label": threshold_label,
            "fetch_source": fetch_source,
            "live_fetch_ok": live_fetch_ok,
        }

    last_ts = pd.Timestamp(df.index[-1])
    if last_ts.tzinfo is None:
        last_ts = last_ts.tz_localize("UTC")
    else:
        last_ts = last_ts.tz_convert("UTC")

    now_ts = pd.Timestamp(now).tz_convert("UTC")
    age_minutes = float((now_ts - last_ts).total_seconds() / 60.0)
    if not live_fetch_ok or fetch_source == "cache_fallback":
        status = "stale_fallback"
    elif age_minutes > stale_minutes:
        status = "stale"
    else:
        status = "ok"
    return {
        "bars": len(df),
        "last_bar": last_ts,
        "age_minutes": round(age_minutes, 1),
        "status": status,
        "stale_threshold_minutes": stale_minutes,
        "threshold_label": threshold_label,
        "fetch_source": fetch_source,
        "live_fetch_ok": live_fetch_ok,
    }


def format_data_line(symbol: str, assessment: Dict[str, Any]) -> str:
    """[DATA] per-symbol freshness line."""
    status = assessment["status"]
    bars = assessment["bars"]
    threshold_label = assessment.get("threshold_label", "60m")
    source = assessment.get("fetch_source") or "-"
    if status == "empty":
        return (
            f"[DATA] {symbol} | bars=0 | last_bar=- | age_minutes=- | "
            f"source={source} | threshold={threshold_label} | status=empty"
        )
    last_bar = assessment["last_bar"]
    last_s = last_bar.strftime("%Y-%m-%d %H:%M:%S%z") if last_bar is not None else "-"
    age = assessment["age_minutes"]
    return (
        f"[DATA] {symbol} | bars={bars} | last_bar={last_s} | "
        f"age_minutes={age} | source={source} | threshold={threshold_label} | status={status}"
    )


def populate_cycle_strat_fields(diag: Dict[str, Any], signals: Optional[Dict[str, Any]]) -> None:
    """Mirror [STRAT] score/chosen/signal into diag for the cycle summary table."""
    if not signals:
        diag.setdefault("cycle_score", 0)
        diag.setdefault("cycle_chosen", "none")
        diag.setdefault("cycle_signal", "-")
        return

    ls = int(signals.get("entry_score_long") or 0)
    ss = int(signals.get("entry_score_short") or 0)
    rl = bool(signals.get("long"))
    rs = bool(signals.get("short"))

    if rl and not rs:
        diag["cycle_score"] = ls
        diag["cycle_chosen"] = signals.get("entry_type_long") or "none"
        diag["cycle_signal"] = "LONG"
    elif rs and not rl:
        diag["cycle_score"] = ss
        diag["cycle_chosen"] = signals.get("entry_type_short") or "none"
        diag["cycle_signal"] = "SHORT"
    else:
        diag["cycle_score"] = max(ls, ss)
        if ls >= ss and signals.get("entry_type_long"):
            diag["cycle_chosen"] = signals.get("entry_type_long")
        elif signals.get("entry_type_short"):
            diag["cycle_chosen"] = signals.get("entry_type_short")
        else:
            diag["cycle_chosen"] = "none"
        diag["cycle_signal"] = "-"


def primary_blocked_by(
    diag: Dict[str, Any],
    result: Optional[Dict[str, Any]] = None,
    symbol: Optional[str] = None,
) -> str:
    """Single Blocked By label for the cycle summary table."""
    if not diag:
        return "-"
    if diag.get("final_order_sent"):
        return "-"

    freshness = diag.get("data_freshness_status")
    if freshness == "empty" or diag.get("fetch_error") or (
        diag.get("data_unavailable") and freshness != "stale"
    ):
        return "empty_data"
    if freshness == "stale_fallback":
        return "stale_fallback"
    if freshness == "stale" or (
        diag.get("blocked_by_data_quality") and freshness == "stale"
    ):
        return "stale_data"
    if diag.get("blocked_by_data_quality"):
        return "data_quality"

    if diag.get("blocked_by_stale_bar"):
        return "stale_bar"
    if diag.get("blocked_by_market_open"):
        return "open_block"
    if diag.get("blocked_by_spy_regime") or diag.get("blocked_by_spy_data_unavailable"):
        return "spy_regime"
    if diag.get("blocked_by_btc_4h_regime"):
        return "btc_4h_regime"
    if diag.get("blocked_by_flat_regime"):
        sym = symbol or (result or {}).get("symbol") or ""
        if "/" in str(sym) or str(sym).upper().startswith("BTC"):
            return "btc_flat_regime"
        return "flat_regime"
    if diag.get("blocked_by_expectancy_gate"):
        return "expectancy_gate"
    if diag.get("blocked_by_cooldown"):
        return "btc_cooldown"
    if diag.get("blocked_by_vix"):
        return "vix"
    if diag.get("blocked_by_max_positions"):
        return "max_positions"
    if diag.get("blocked_by_daily_loss"):
        return "daily_loss"
    if diag.get("blocked_by_capital"):
        return "capital"

    blocked_reason = (result or {}).get("blocked_reason")
    if blocked_reason:
        br = str(blocked_reason).lower()
        if "market open" in br:
            return "open_block"
        if "spy" in br or "regime" in br:
            return "spy_regime"
        if "stale" in br:
            return "stale_bar"
        if "flat" in br:
            return "btc_flat_regime"
        if "cooldown" in br:
            return "btc_cooldown"
        if "max position" in br:
            return "max_positions"

    return "-"


def print_cycle_summary_table(symbol_order: List[str], results: Dict[str, Any]) -> None:
    """Consolidated per-symbol cycle health table."""
    print("\n[CYCLE SUMMARY]")
    print(f"{'Symbol':<10} | {'Score':>5} | {'Chosen':<12} | {'Signal':<6} | Blocked By")
    for symbol in symbol_order:
        r = results.get(symbol) or {}
        diag = r.get("diag") or {}
        score = int(diag.get("cycle_score", 0))
        chosen = str(diag.get("cycle_chosen", "none"))[:12]
        signal = str(diag.get("cycle_signal", "-"))
        blocked = primary_blocked_by(diag, r, symbol=symbol)
        print(f"{symbol:<10} | {score:>5} | {chosen:<12} | {signal:<6} | {blocked}")
