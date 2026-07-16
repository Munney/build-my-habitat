"""
Portfolio Monitoring System
Monitors multiple stocks simultaneously using the same trading strategy
"""
import time
import sys
from datetime import datetime

import pandas as pd

import config
from unified_data_fetcher import UnifiedDataFetcher
from indicators import calculate_all_indicators
from strategy import TradingStrategy
from alerts import AlertSystem
from paper_trader import PaperTrader
from market_filters import (
    is_market_open_blocked,
    is_time_blocked,
    check_market_regime,
    check_vix_filter,
    check_btc_4h_ema_slope,
    log_btc_4h_ema_slope,
    check_btc_flat_regime,
    check_btc_direction_cooldown,
    print_spy_regime_line,
)
from warmup import get_required_warmup_bars
from ohlcv_utils import OHLCVFetchError, normalize_timestamp_utc, validate_ohlcv_dataframe
from cycle_health import (
    assess_ohlcv_freshness,
    format_data_line,
    populate_cycle_strat_fields,
    print_cycle_summary_table,
)
from filter_cost_ledger import FilterCostLedger, _primary_filter_from_diag


def _diag_fetch_failed_snapshot(*, data_freshness_status="empty"):
    """Per-symbol DIAG payload when OHLCV cannot be loaded or validated."""
    return {
        "raw_long_signal": False,
        "raw_short_signal": False,
        "raw_side": "none",
        "fetch_error": True,
        "data_unavailable": True,
        "data_freshness_status": data_freshness_status,
        "cycle_score": 0,
        "cycle_chosen": "none",
        "cycle_signal": "-",
        "blocked_by_market_open": False,
        "blocked_by_stale_bar": False,
        "blocked_by_spy_regime": False,
        "blocked_by_btc_4h_regime": False,
        "blocked_by_vix": False,
        "blocked_by_flat_regime": False,
        "blocked_by_cooldown": False,
        "blocked_by_max_positions": False,
        "blocked_by_daily_loss": False,
        "blocked_by_data_quality": True,
        "blocked_by_capital": False,
        "blocked_by_spy_data_unavailable": False,
        "capped": False,
        "final_order_sent": False,
    }


def _cycle_diag_from_signals(signals, *, data_freshness_status="ok", **overrides):
    """Minimal diag payload for cycle summary when returning before full filter diag."""
    snap = {
        "raw_long_signal": bool(signals.get("long")),
        "raw_short_signal": bool(signals.get("short")),
        "data_freshness_status": data_freshness_status,
        "fetch_error": False,
        "data_unavailable": False,
        "blocked_by_data_quality": False,
        "blocked_by_stale_bar": False,
        "blocked_by_spy_regime": False,
        "blocked_by_spy_data_unavailable": False,
        "blocked_by_btc_4h_regime": False,
        "blocked_by_vix": False,
        "blocked_by_flat_regime": False,
        "blocked_by_cooldown": False,
        "blocked_by_market_open": False,
        "blocked_by_max_positions": False,
        "blocked_by_daily_loss": False,
        "blocked_by_capital": False,
        "final_order_sent": False,
        "capped": False,
    }
    populate_cycle_strat_fields(snap, signals)
    snap.update(overrides)
    return snap


class SymbolMonitor:
    """Monitors a single symbol for trading signals"""
    def __init__(self, symbol, config_obj, shared_paper_trader=None, spy_fetcher=None, btc_4h_fetcher=None):
        self.symbol = symbol
        self.config = config_obj
        
        # Determine asset type based on symbol format
        # Crypto symbols have "/" (e.g., "BTC/USD"), stocks don't
        if "/" in symbol:
            asset_type = "crypto"
        else:
            asset_type = "stock"
        
        self.asset_type = asset_type
        
        self.data_fetcher = UnifiedDataFetcher(
            asset_type=asset_type,
            exchange_name=config_obj.EXCHANGE,
            symbol=symbol,
            timeframe=config_obj.TIMEFRAME
        )
        self.strategy = TradingStrategy(config_obj)
        self.alert_system = AlertSystem(config_obj)
        
        # Track previous signal states for rising edge detection
        self.prev_long_signal = False
        self.prev_short_signal = False
        self.last_checked_bar_index = None
        
        # Use shared paper trader if provided (portfolio mode)
        self.paper_trader = shared_paper_trader
        
        # SPY fetcher for market regime filter
        self.spy_fetcher = spy_fetcher
        
        # BTC 4H fetcher for BTC EMA slope filter
        self.btc_4h_fetcher = btc_4h_fetcher
        
        # BTC 4H fetcher for BTC EMA slope filter
        self.btc_4h_fetcher = btc_4h_fetcher

        # Warmup / historical bar gating
        self.required_warmup_bars = get_required_warmup_bars(config_obj)
        self.warmup_ready = False
        self.warmup_loaded_count = 0
        self.warmup_range_start = None
        self.warmup_range_end = None
        self._last_logged_warmup_ts = None
        self._btc_last_signal_direction = None
        self._btc_last_signal_bar_index = None
        self.gated_entry_types = set()
        self.gated_directions = set()
        self.filter_cost_ledger = None

    def _signal_fields_for_side(self, side, signals):
        if side == "long":
            return signals.get("entry_type_long"), signals.get("entry_score_long")
        return signals.get("entry_type_short"), signals.get("entry_score_short")

    def _record_filter_cost(
        self,
        filter_name,
        side,
        signals,
        block_price,
        block_atr,
        block_ts,
        reason=None,
    ):
        ledger = getattr(self, "filter_cost_ledger", None)
        if not ledger or not filter_name or not side:
            return
        entry_type, score = self._signal_fields_for_side(side, signals)
        ledger.record_block(
            symbol=self.symbol,
            side=side,
            signal_entry_type=entry_type,
            score=score,
            filter_name=filter_name,
            block_price=block_price,
            atr=block_atr,
            block_ts=block_ts,
            reason=reason,
        )

    def _update_filter_cost_forwards(self, df):
        ledger = getattr(self, "filter_cost_ledger", None)
        if ledger is not None and df is not None and len(df) > 0:
            ledger.update_symbol_forwards(self.symbol, df)

    def check_for_signals(self, stock_spy_regime_ok=True, spy_ohlcv_df=None):
        try:
            def _diag(signals_ret, bar_skipped=False, had_long_edge=False, had_short_edge=False, blocked_reason=None, blocked_side=None, diag_snapshot=None):
                return {
                    "signals": signals_ret,
                    "bar_skipped": bar_skipped,
                    "had_long_edge": had_long_edge,
                    "had_short_edge": had_short_edge,
                    "blocked_reason": blocked_reason,
                    "blocked_side": blocked_side,
                    "diag": diag_snapshot or {},
                }

            try:
                df = self.data_fetcher.fetch_ohlcv(limit=200)
            except OHLCVFetchError as e:
                assessment = assess_ohlcv_freshness(None)
                print(format_data_line(self.symbol, assessment))
                snap = _diag_fetch_failed_snapshot()
                snap["blocked_by_data_quality"] = True
                print(f"[FILTER] blocked: data_quality=1 ({self.symbol} fetch failed)")
                return _diag({"long": False, "short": False}, diag_snapshot=snap)

            ok_fetch, fetch_reason = validate_ohlcv_dataframe(df, min_rows=1)
            if not ok_fetch:
                assessment = assess_ohlcv_freshness(None)
                print(format_data_line(self.symbol, assessment))
                snap = _diag_fetch_failed_snapshot()
                snap["blocked_by_data_quality"] = True
                print(
                    f"[FILTER] blocked: data_quality=1 ({self.symbol} invalid: {fetch_reason})"
                )
                return _diag({"long": False, "short": False}, diag_snapshot=snap)

            fetch_meta = self.data_fetcher.get_last_fetch_meta()
            assessment = assess_ohlcv_freshness(
                df,
                symbol=self.symbol,
                fetch_source=fetch_meta.get("source"),
                live_fetch_ok=fetch_meta.get("live_fetch_ok", True),
            )
            print(format_data_line(self.symbol, assessment))
            if assessment["status"] != "ok":
                snap = _diag_fetch_failed_snapshot(
                    data_freshness_status=assessment["status"]
                )
                snap["blocked_by_data_quality"] = True
                snap["fetch_error"] = False
                snap["data_unavailable"] = assessment["status"] == "empty"
                print(
                    f"[FILTER] blocked: data_quality=1 ({self.symbol} "
                    f"status={assessment['status']})"
                )
                return _diag({"long": False, "short": False}, diag_snapshot=snap)

            df = calculate_all_indicators(df, self.config)
            self._update_filter_cost_forwards(df)
            if pd.isna(df["close"].iloc[-1]) or pd.isna(df["atr"].iloc[-1]):
                snap = _diag_fetch_failed_snapshot()
                snap["blocked_by_data_quality"] = True
                print(f"[FILTER] blocked: data_quality=1 ({self.symbol} non-finite last bar)")
                return _diag({"long": False, "short": False}, diag_snapshot=snap)

            # We currently treat df.iloc[-1] as the latest CLOSED bar.
            # This is only correct if the data feed returns closed bars only.
            # Verification rule:
            # - If wall clock is 9:37 ET and latest bar timestamp is 9:00 ET, iloc[-1] is correct.
            # - If wall clock is 9:37 ET and latest bar timestamp is 9:30 ET, the feed includes the forming bar,
            #   and signal evaluation should switch to df.iloc[-2].
            current_price = df['close'].iloc[-1]
            current_atr = df['atr'].iloc[-1]
            current_time = normalize_timestamp_utc(df.index[-1])
            current_bar_index = len(df) - 1  # diagnostics / position logic only; bar identity is timestamp
            bar_close_ts = current_time
            if getattr(self, "_diag_last_bar_ts", None) != current_time:
                self._diag_last_bar_ts = current_time
                self._diag_logged_this_bar = False

            if (
                self.symbol.upper().startswith("BTC")
                and getattr(self.config, "USE_BTC_4H_EMA_FILTER", True)
                and getattr(self, "btc_4h_fetcher", None)
            ):
                try:
                    log_btc_4h_ema_slope(
                        self.btc_4h_fetcher,
                        getattr(self.config, "BTC_4H_EMA_LENGTH", 30),
                    )
                except Exception:
                    pass

            if self.asset_type == 'stock' and getattr(self.config, 'USE_MARKET_REGIME_FILTER', True):
                try:
                    from indicators import calculate_ema, calculate_atr
                    spy_df = spy_ohlcv_df if spy_ohlcv_df is not None else (self.spy_fetcher.fetch_ohlcv(limit=200) if self.spy_fetcher else None)
                    if spy_df is not None and len(spy_df) > 0:
                        spy_df = spy_df.copy()
                        spy_df["ema"] = calculate_ema(spy_df, getattr(self.config, "EMA_LENGTH", 30))
                        spy_df["atr"] = calculate_atr(spy_df, getattr(self.config, "ATR_LENGTH", 14))
                        spy_price = float(spy_df["close"].iloc[-1])
                        spy_ema = float(spy_df["ema"].iloc[-1])
                        spy_atr = float(spy_df["atr"].iloc[-1])
                        print_spy_regime_line(spy_price, spy_ema, spy_atr, self.config)
                except Exception:
                    pass
            
            # Update paper trading positions if enabled
            if self.paper_trader:
                exit_occurred, closed_trade = self.paper_trader.update_positions(
                    self.symbol, current_price, current_atr, current_bar_index, current_time
                )
                if exit_occurred and closed_trade:
                    # Handle both PaperTrade objects and dictionaries
                    if hasattr(closed_trade, 'get_pnl'):
                        pnl_R = closed_trade.get_pnl()
                        entry_type = closed_trade.entry_type
                        exit_reason = closed_trade.exit_reason
                        entry_price = closed_trade.entry_price
                        exit_price = closed_trade.exit_price
                    else:
                        # Dictionary from loaded history
                        pnl_R = closed_trade.get('pnl_R')
                        entry_type = closed_trade.get('entry_type', 'unknown')
                        exit_reason = closed_trade.get('exit_reason', 'unknown')
                        entry_price = closed_trade.get('entry_price', 0)
                        exit_price = closed_trade.get('exit_price', 0)
                    
                    if pnl_R is not None:
                        print(f"\n[{self.symbol}] PAPER TRADE CLOSED: {entry_type.upper()} exit: {exit_reason}")
                        print(f"  Entry: ${entry_price:,.2f} | Exit: ${exit_price:,.2f}")
                        print(f"  P&L: {pnl_R:.2f}R ({pnl_R*100:.1f}%)")
            
            # Check for signals
            # Warmup gate: do not evaluate entry signals until we have enough
            # historical 30m bars for RSI(14), ATR(14), EMA(30) stability.
            warmup_ok = len(df) >= self.required_warmup_bars
            signals = {"long": False, "short": False}
            if warmup_ok:
                signals = self.strategy.check_signals(df, diag_symbol=self.symbol)
                from expectancy_gates import apply_expectancy_gates_to_signals

                pre_short = bool(signals.get("short"))
                pre_long = bool(signals.get("long"))
                pre_gate_signals = {
                    "long": pre_long,
                    "short": pre_short,
                    "entry_type_long": signals.get("entry_type_long"),
                    "entry_score_long": signals.get("entry_score_long"),
                    "entry_type_short": signals.get("entry_type_short"),
                    "entry_score_short": signals.get("entry_score_short"),
                }
                signals = apply_expectancy_gates_to_signals(
                    signals,
                    getattr(self, "gated_entry_types", None),
                    getattr(self, "gated_directions", None),
                )
                self._expectancy_gate_blocked_short = pre_short and not signals.get("short")
                self._expectancy_gate_blocked_long = pre_long and not signals.get("long")
                if self._expectancy_gate_blocked_long:
                    self._record_filter_cost(
                        "expectancy_gate", "long", pre_gate_signals,
                        current_price, current_atr, current_time,
                    )
                if self._expectancy_gate_blocked_short:
                    self._record_filter_cost(
                        "expectancy_gate", "short", pre_gate_signals,
                        current_price, current_atr, current_time,
                    )
            else:
                self._expectancy_gate_blocked_short = False
                self._expectancy_gate_blocked_long = False
                print(
                    f"[STRAT] {self.symbol} | skipped: warmup {len(df)}/{self.required_warmup_bars} "
                    f"bars insufficient"
                )

            # Bar-close integrity: process each bar (by timestamp) only once. Identity is
            # normalized bar-close timestamp only—not dataframe position.
            if getattr(self.config, 'USE_BAR_CLOSE_INTEGRITY', True):
                from bar_close_integrity import BarCloseIntegrity
                bar_integrity = getattr(self, 'bar_integrity', None)
                if bar_integrity is None:
                    bar_integrity = BarCloseIntegrity(self.config)
                    self.bar_integrity = bar_integrity
                bar_close_ts = bar_integrity.get_bar_close_timestamp(current_time, self.config.TIMEFRAME)
                should_process, reason = bar_integrity.should_process_bar(
                    self.symbol, bar_close_ts, current_bar_index
                )
                if not should_process:
                    return _diag(
                        signals,
                        bar_skipped=True,
                        diag_snapshot=_cycle_diag_from_signals(signals),
                    )

                if not warmup_ok:
                    first_ts = df.index[0]
                    last_ts = df.index[-1]
                    print(
                        f"[{self.symbol}] Insufficient history: {len(df)}/{self.required_warmup_bars} bars loaded, "
                        f"range: {first_ts} -> {last_ts} | warmup=INSUFFICIENT (need {self.required_warmup_bars}). "
                        f"Skipping entry evaluation."
                    )

            # Skip duplicate entries on the same bar; strategy diagnostics already ran above.
            if self.paper_trader and self.paper_trader.should_skip_processed_bar(self.symbol, bar_close_ts):
                return _diag(
                    signals,
                    bar_skipped=True,
                    diag_snapshot=_cycle_diag_from_signals(signals),
                )
            
            # Filter-diagnostic: only log when new bar + (raw signal, or blocked, or order sent)
            rl, rs = signals["long"], signals["short"]
            raw_side = "long" if rl and not rs else ("short" if rs and not rl else ("both" if (rl and rs) else "none"))
            diag = {
                "raw_long_signal": rl,
                "raw_short_signal": rs,
                "raw_side": raw_side,
                "data_freshness_status": "ok",
                "fetch_error": False,
                "data_unavailable": False,
                "blocked_by_market_open": False,
                "blocked_by_stale_bar": False,
                "blocked_by_spy_regime": False,
                "blocked_by_spy_data_unavailable": False,
                "blocked_by_btc_4h_regime": False,
                "blocked_by_vix": False,
                "blocked_by_flat_regime": False,
                "blocked_by_cooldown": False,
                "blocked_by_max_positions": False,
                "blocked_by_daily_loss": False,
                "blocked_by_data_quality": (not warmup_ok),
                "blocked_by_capital": False,
                "blocked_by_expectancy_gate": bool(
                    getattr(self, "_expectancy_gate_blocked_short", False)
                    or getattr(self, "_expectancy_gate_blocked_long", False)
                ),
                "capped": False,
                "final_order_sent": False,
            }
            populate_cycle_strat_fields(diag, signals)

            def _log_filter_diag(*, blocked_side=None):
                if getattr(self, "_diag_logged_this_bar", False):
                    return
                if not (diag["raw_long_signal"] or diag["raw_short_signal"] or diag["fetch_error"] or diag["data_unavailable"]
                       or diag["blocked_by_market_open"] or diag["blocked_by_stale_bar"] or diag["blocked_by_spy_regime"] or diag["blocked_by_spy_data_unavailable"]
                       or diag["blocked_by_btc_4h_regime"] or diag["blocked_by_vix"]
                       or diag["blocked_by_flat_regime"] or diag["blocked_by_cooldown"] or diag["blocked_by_max_positions"]
                       or diag["blocked_by_daily_loss"] or diag["blocked_by_data_quality"] or diag["blocked_by_capital"]
                       or diag.get("blocked_by_expectancy_gate")
                       or diag["capped"]
                       or diag["final_order_sent"]):
                    return
                fname = _primary_filter_from_diag(diag)
                if fname and blocked_side:
                    self._record_filter_cost(
                        fname, blocked_side, signals,
                        current_price, current_atr, current_time,
                    )
                parts = [f"[DIAG] {self.symbol}"]
                parts.append(f"raw_side={diag['raw_side']}")
                parts.append(f"raw_long={int(diag['raw_long_signal'])} raw_short={int(diag['raw_short_signal'])}")
                parts.append("fetch_error=%d data_unavailable=%d" % (int(diag["fetch_error"]), int(diag["data_unavailable"])))
                parts.append("blocked: open=%d stale=%d spy_regime=%d spy_data=%d btc4h=%d vix=%d flat_regime=%d cooldown=%d max_pos=%d daily_loss=%d data_quality=%d capital=%d" % (
                    diag["blocked_by_market_open"], diag["blocked_by_stale_bar"], diag["blocked_by_spy_regime"], diag["blocked_by_spy_data_unavailable"],
                    diag["blocked_by_btc_4h_regime"],
                    diag["blocked_by_vix"], diag["blocked_by_flat_regime"], diag["blocked_by_cooldown"],
                    diag["blocked_by_max_positions"], diag["blocked_by_daily_loss"], diag["blocked_by_data_quality"],
                    diag["blocked_by_capital"]))
                parts.append("capped=%d" % int(diag["capped"]))
                parts.append("order_sent=%d" % diag["final_order_sent"])
                print(" | ".join(parts))
                self._diag_logged_this_bar = True

            # BTC flat regime + opposite-direction cooldown (crypto only; not SPY-based)
            if "/" in self.symbol:
                flat_ok, _flat_reason = check_btc_flat_regime(df, self.symbol, self.config)
                if not flat_ok:
                    print(f"[FILTER] BTC flat regime blocked: {self.symbol}")
                    if signals["long"] and not signals["short"]:
                        self._record_filter_cost(
                            "btc_flat_regime", "long", signals,
                            current_price, current_atr, current_time, reason=_flat_reason,
                        )
                    elif signals["short"] and not signals["long"]:
                        self._record_filter_cost(
                            "btc_flat_regime", "short", signals,
                            current_price, current_atr, current_time, reason=_flat_reason,
                        )
                    signals["long"] = False
                    signals["short"] = False
                    diag["blocked_by_flat_regime"] = True
                else:
                    btc_side = None
                    if signals["long"] and not signals["short"]:
                        btc_side = "long"
                    elif signals["short"] and not signals["long"]:
                        btc_side = "short"
                    if btc_side:
                        cd_ok, cd_msg = check_btc_direction_cooldown(
                            self.symbol,
                            btc_side,
                            current_bar_index,
                            self._btc_last_signal_direction,
                            self._btc_last_signal_bar_index,
                            self.config,
                        )
                        if not cd_ok:
                            if cd_msg:
                                print(cd_msg)
                            self._record_filter_cost(
                                "cooldown", btc_side, signals,
                                current_price, current_atr, current_time, reason=cd_msg,
                            )
                            signals["long"] = False
                            signals["short"] = False
                            diag["blocked_by_cooldown"] = True
                        else:
                            self._btc_last_signal_direction = btc_side
                            self._btc_last_signal_bar_index = current_bar_index
            
            # Rising edge detection
            long_rising_edge = signals['long'] and not self.prev_long_signal
            short_rising_edge = signals['short'] and not self.prev_short_signal
            
            # Process entry signals ONLY on rising edge
            if long_rising_edge:
                # Filter 1: Market open block (stocks only)
                if self.asset_type == 'stock' and getattr(self.config, 'BLOCK_MARKET_OPEN', True):
                    _mopen_start = getattr(self.config, 'MARKET_OPEN_BLOCK_START', '09:30')
                    _mopen_end = getattr(self.config, 'MARKET_OPEN_BLOCK_END', '10:00')
                    if is_market_open_blocked(current_time, _mopen_start, _mopen_end):
                        _mopen_win = f"{_mopen_start}-{_mopen_end} ET"
                        if getattr(self.config, 'USE_FILTER_TELEMETRY', True):
                            from filter_telemetry import FilterTelemetry
                            telemetry = getattr(self, 'telemetry', None)
                            if telemetry is None:
                                telemetry = FilterTelemetry(self.config)
                                self.telemetry = telemetry
                            market_state = {
                                'current_price': current_price,
                                'atr': current_atr,
                                'atr_pct': (current_atr / current_price * 100) if current_price > 0 else 0,
                            }
                            telemetry.log_block(
                                self.symbol, 'market_open_block', market_state,
                                f"Market open period ({_mopen_win})",
                            )
                        print(f"[FILTER] blocked: open=1 ({_mopen_win})")
                        print(f"[{self.symbol}] Entry blocked: Market open period ({_mopen_win})")
                        diag["blocked_by_market_open"] = True
                        _log_filter_diag(blocked_side="long")
                        return _diag(signals, had_long_edge=True, blocked_reason="Market open period", blocked_side="long", diag_snapshot=diag)
                
                # Filter 2: Max positions check
                if self.paper_trader:
                    max_positions = getattr(self.config, 'MAX_OPEN_POSITIONS', 2)
                    if len(self.paper_trader.open_trades) >= max_positions:
                        print(f"[{self.symbol}] Entry blocked: Max positions reached ({max_positions})")
                        diag["blocked_by_max_positions"] = True
                        _log_filter_diag(blocked_side="long")
                        return _diag(signals, had_long_edge=True, blocked_reason=f"Max positions ({max_positions})", blocked_side="long", diag_snapshot=diag)
                
                # Filter 3: Market regime filter (stocks only; BTC bypasses check_market_regime)
                if self.asset_type == 'stock' and getattr(self.config, 'USE_MARKET_REGIME_FILTER', True) and self.spy_fetcher:
                    if not stock_spy_regime_ok:
                        print(
                            f"[FILTER] SPY regime blocked: {self.symbol} long: SPY data unavailable this cycle"
                        )
                        diag["blocked_by_spy_data_unavailable"] = True
                        _log_filter_diag(blocked_side="long")
                        return _diag(
                            signals,
                            had_long_edge=True,
                            blocked_reason="SPY data unavailable",
                            blocked_side="long",
                            diag_snapshot=diag,
                        )
                    allowed, reason = check_market_regime(
                        self.symbol, 'long', self.spy_fetcher, self.config, spy_ohlcv_df=spy_ohlcv_df
                    )
                    if not allowed:
                        # Log telemetry
                        if getattr(self.config, 'USE_FILTER_TELEMETRY', True):
                            from filter_telemetry import FilterTelemetry
                            telemetry = getattr(self, 'telemetry', None)
                            if telemetry is None:
                                telemetry = FilterTelemetry(self.config)
                                self.telemetry = telemetry
                            
                            # Get SPY state for telemetry
                            try:
                                spy_df = spy_ohlcv_df
                                if spy_df is not None and len(spy_df) > 50:
                                    spy_df = spy_df.tail(50)
                                elif spy_df is None:
                                    spy_df = self.spy_fetcher.fetch_ohlcv(limit=50)
                                from indicators import calculate_ema, calculate_atr
                                spy_df['ema'] = calculate_ema(spy_df, 30)
                                spy_df['atr'] = calculate_atr(spy_df, 14)
                                spy_price = spy_df['close'].iloc[-1]
                                spy_ema = spy_df['ema'].iloc[-1]
                                spy_atr = spy_df['atr'].iloc[-1]
                                spy_atr_pct = (spy_atr / spy_price * 100) if spy_price > 0 else 0
                            except:
                                spy_price = spy_ema = spy_atr_pct = None
                            
                            market_state = {
                                'spy_price': spy_price,
                                'spy_ema': spy_ema,
                                'spy_atr_pct': spy_atr_pct,
                                'current_price': current_price,
                                'atr': current_atr,
                            }
                            telemetry.log_block(self.symbol, 'market_regime_filter', market_state, reason)
                        
                        print(f"[FILTER] SPY regime blocked: {self.symbol} long: {reason}")
                        print(f"[{self.symbol}] Entry blocked: {reason}")
                        diag["blocked_by_flat_regime" if "Flat" in reason or "flat" in reason else "blocked_by_spy_regime"] = True
                        _log_filter_diag(blocked_side="long")
                        return _diag(signals, had_long_edge=True, blocked_reason=reason, blocked_side="long", diag_snapshot=diag)
                
                # Filter 4: BTC 4H EMA slope filter (crypto only)
                if self.symbol.upper().startswith("BTC") and getattr(self.config, 'USE_BTC_4H_EMA_FILTER', True):
                    # Need 4H timeframe fetcher for BTC
                    if hasattr(self, 'btc_4h_fetcher') and self.btc_4h_fetcher:
                        allowed, reason = check_btc_4h_ema_slope(self.btc_4h_fetcher, 'long', 
                                                               getattr(self.config, 'BTC_4H_EMA_LENGTH', 30))
                        if not allowed:
                            print(f"[{self.symbol}] Entry blocked: {reason}")
                            diag["blocked_by_btc_4h_regime"] = True
                            _log_filter_diag(blocked_side="long")
                            return _diag(signals, had_long_edge=True, blocked_reason=reason, blocked_side="long", diag_snapshot=diag)
                
                # Fire alert (update symbol in signals for proper formatting)
                signals_with_symbol = signals.copy()
                signals_with_symbol['symbol'] = self.symbol
                # Temporarily update config symbol for alert formatting
                original_symbol = self.config.SYMBOL
                self.config.SYMBOL = self.symbol
                alert_sent = self.alert_system.send_alert(signals_with_symbol, "Long")
                self.config.SYMBOL = original_symbol
                if alert_sent is None:
                    diag["blocked_by_stale_bar"] = True
                    _log_filter_diag(blocked_side="long")
                    return _diag(
                        signals,
                        had_long_edge=True,
                        blocked_reason="stale bar or off-hours (alert suppressed)",
                        blocked_side="long",
                        diag_snapshot=diag,
                    )

                # Open paper trade if enabled
                if self.paper_trader:
                    entry_meta = {
                        "entry_type": signals.get("entry_type_long"),
                        "entry_score": signals.get("entry_score_long"),
                        "entry_reason": signals.get("entry_reason_long"),
                        "timestamp": signals.get("timestamp"),
                    }
                    success, message = self.paper_trader.open_position(
                        self.symbol, 'long', current_price, current_time, current_bar_index, current_atr, entry_metadata=entry_meta
                    )
                    if success:
                        if "capped=1" in message:
                            diag["capped"] = True
                        # Find the newly opened trade (last one in the list)
                        new_trade = self.paper_trader.open_trades[-1]
                        print(f"\n[{self.symbol}] PAPER TRADE OPENED: {message}")
                        print(f"  Entry: ${new_trade.entry_price:,.2f}")
                        print(f"  Stop Loss: ${new_trade.base_stop:,.2f}")
                        if new_trade.take_profit:
                            if getattr(self.config, 'USE_TWO_TIER_TP', True) and hasattr(new_trade, 'tp1') and new_trade.tp1:
                                print(f"  Take Profit 1: ${new_trade.tp1:,.2f} (1.0R) - Stop moves to breakeven")
                                print(f"  Take Profit 2: ${new_trade.tp2:,.2f} (1.8R)")
                            else:
                                if new_trade.entry_type == 'long':
                                    tp_pct = ((new_trade.take_profit - new_trade.entry_price) / new_trade.entry_price) * 100
                                else:
                                    tp_pct = ((new_trade.entry_price - new_trade.take_profit) / new_trade.entry_price) * 100
                                print(f"  Take Profit: ${new_trade.take_profit:,.2f} ({tp_pct:.1f}%)")
                        print(f"  Open Positions for {self.symbol}: {sum(1 for t in self.paper_trader.open_trades if t.symbol == self.symbol)}")
                        if self.asset_type == 'stock':
                            print(f"  Position Size: {new_trade.position_shares:.2f} shares (${new_trade.position_size_dollars:,.2f})")
                        else:
                            print(f"  Position Size: ${new_trade.position_size_dollars:,.2f} ({new_trade.position_shares:.6f} BTC)")
                        diag["final_order_sent"] = True
                        _log_filter_diag(blocked_side="long")
                    else:
                        print(f"[{self.symbol}] Entry blocked (risk/position): {message}")
                        msg_l = message.lower()
                        if "daily" in msg_l or "loss guard" in msg_l:
                            diag["blocked_by_daily_loss"] = True
                        elif "cooldown" in msg_l:
                            diag["blocked_by_cooldown"] = True
                        elif "max position" in msg_l:
                            diag["blocked_by_max_positions"] = True
                        elif "insufficient capital" in msg_l or "required capital" in msg_l:
                            diag["blocked_by_capital"] = True
                        _log_filter_diag(blocked_side="long")
                        return _diag(signals, had_long_edge=True, blocked_reason=message, blocked_side="long", diag_snapshot=diag)
            
            if short_rising_edge:
                # Filter 1: Market open block (stocks only)
                if self.asset_type == 'stock' and getattr(self.config, 'BLOCK_MARKET_OPEN', True):
                    _mopen_start = getattr(self.config, 'MARKET_OPEN_BLOCK_START', '09:30')
                    _mopen_end = getattr(self.config, 'MARKET_OPEN_BLOCK_END', '10:00')
                    if is_market_open_blocked(current_time, _mopen_start, _mopen_end):
                        _mopen_win = f"{_mopen_start}-{_mopen_end} ET"
                        if getattr(self.config, 'USE_FILTER_TELEMETRY', True):
                            from filter_telemetry import FilterTelemetry
                            telemetry = getattr(self, 'telemetry', None)
                            if telemetry is None:
                                telemetry = FilterTelemetry(self.config)
                                self.telemetry = telemetry
                            
                            market_state = {
                                'current_price': current_price,
                                'atr': current_atr,
                                'atr_pct': (current_atr / current_price * 100) if current_price > 0 else 0,
                            }
                            telemetry.log_block(
                                self.symbol, 'market_open_block', market_state,
                                f"Market open period ({_mopen_win})",
                            )
                        
                        print(f"[FILTER] blocked: open=1 ({_mopen_win})")
                        print(f"[{self.symbol}] Entry blocked: Market open period ({_mopen_win})")
                        diag["blocked_by_market_open"] = True
                        _log_filter_diag(blocked_side="short")
                        return _diag(signals, had_short_edge=True, blocked_reason="Market open period", blocked_side="short", diag_snapshot=diag)
                
                # Filter 1b: Lunch chop block (stocks only)
                if self.asset_type == 'stock' and getattr(self.config, 'BLOCK_LUNCH_CHOP', True):
                    if is_time_blocked(current_time,
                                      getattr(self.config, 'LUNCH_CHOP_START', '11:30'),
                                      getattr(self.config, 'LUNCH_CHOP_END', '13:30')):
                        print(f"[{self.symbol}] Entry blocked: Lunch chop period (11:30-1:30 ET)")
                        diag["blocked_by_market_open"] = True  # lunch chop is a time-based block like open
                        _log_filter_diag(blocked_side="short")
                        return _diag(signals, had_short_edge=True, blocked_reason="Lunch chop period", blocked_side="short", diag_snapshot=diag)
                
                # Filter 1c: VIX filter (stocks only)
                if self.asset_type == 'stock' and getattr(self.config, 'USE_VIX_FILTER', True):
                    allowed, reason, risk_mult = check_vix_filter(
                        getattr(self.config, 'VIX_MAX_THRESHOLD', 30.0),
                        getattr(self.config, 'VIX_RISK_SCALING', True),
                        None,  # spy_ema_check (could be added)
                        self.config
                    )
                    if not allowed:
                        # Log telemetry
                        if getattr(self.config, 'USE_FILTER_TELEMETRY', True):
                            from filter_telemetry import FilterTelemetry
                            telemetry = getattr(self, 'telemetry', None)
                            if telemetry is None:
                                telemetry = FilterTelemetry(self.config)
                                self.telemetry = telemetry
                            
                            # Try to get VIX value
                            try:
                                import yfinance as yf
                                vix = yf.Ticker("^VIX")
                                vix_data = vix.history(period="1d", interval="1m")
                                current_vix = vix_data['Close'].iloc[-1] if not vix_data.empty else None
                            except:
                                current_vix = None
                            
                            market_state = {
                                'vix': current_vix,
                                'vix_threshold': getattr(self.config, 'VIX_MAX_THRESHOLD', 30.0),
                                'risk_multiplier': risk_mult,
                            }
                            telemetry.log_block(self.symbol, 'vix_filter', market_state, reason)
                        
                        print(f"[{self.symbol}] Entry blocked: {reason}")
                        diag["blocked_by_vix"] = True
                        _log_filter_diag(blocked_side="short")
                        return _diag(signals, had_short_edge=True, blocked_reason=reason, blocked_side="short", diag_snapshot=diag)
                
                # Filter 2: Max positions check
                if self.paper_trader:
                    max_positions = getattr(self.config, 'MAX_OPEN_POSITIONS', 2)
                    if len(self.paper_trader.open_trades) >= max_positions:
                        print(f"[{self.symbol}] Entry blocked: Max positions reached ({max_positions})")
                        diag["blocked_by_max_positions"] = True
                        _log_filter_diag(blocked_side="short")
                        return _diag(signals, had_short_edge=True, blocked_reason=f"Max positions ({max_positions})", blocked_side="short", diag_snapshot=diag)
                
                # Filter 3: Market regime filter (stocks only; BTC bypasses check_market_regime)
                if self.asset_type == 'stock' and getattr(self.config, 'USE_MARKET_REGIME_FILTER', True) and self.spy_fetcher:
                    if not stock_spy_regime_ok:
                        print(
                            f"[FILTER] SPY regime blocked: {self.symbol} short: SPY data unavailable this cycle"
                        )
                        diag["blocked_by_spy_data_unavailable"] = True
                        _log_filter_diag(blocked_side="short")
                        return _diag(
                            signals,
                            had_short_edge=True,
                            blocked_reason="SPY data unavailable",
                            blocked_side="short",
                            diag_snapshot=diag,
                        )
                    allowed, reason = check_market_regime(
                        self.symbol, 'short', self.spy_fetcher, self.config, spy_ohlcv_df=spy_ohlcv_df
                    )
                    if not allowed:
                        print(f"[FILTER] SPY regime blocked: {self.symbol} short: {reason}")
                        print(f"[{self.symbol}] Entry blocked: {reason}")
                        diag["blocked_by_flat_regime" if "Flat" in reason or "flat" in reason else "blocked_by_spy_regime"] = True
                        _log_filter_diag(blocked_side="short")
                        return _diag(signals, had_short_edge=True, blocked_reason=reason, blocked_side="short", diag_snapshot=diag)
                
                # Filter 4: BTC 4H EMA slope filter (crypto only)
                if self.symbol.upper().startswith("BTC") and getattr(self.config, 'USE_BTC_4H_EMA_FILTER', True):
                    if hasattr(self, 'btc_4h_fetcher') and self.btc_4h_fetcher:
                        allowed, reason = check_btc_4h_ema_slope(self.btc_4h_fetcher, 'short',
                                                                 getattr(self.config, 'BTC_4H_EMA_LENGTH', 30))
                        if not allowed:
                            print(f"[{self.symbol}] Entry blocked: {reason}")
                            diag["blocked_by_btc_4h_regime"] = True
                            _log_filter_diag(blocked_side="short")
                            return _diag(signals, had_short_edge=True, blocked_reason=reason, blocked_side="short", diag_snapshot=diag)
                
                # Fire alert (update symbol in signals for proper formatting)
                signals_with_symbol = signals.copy()
                signals_with_symbol['symbol'] = self.symbol
                # Temporarily update config symbol for alert formatting
                original_symbol = self.config.SYMBOL
                self.config.SYMBOL = self.symbol
                alert_sent = self.alert_system.send_alert(signals_with_symbol, "Short")
                self.config.SYMBOL = original_symbol
                if alert_sent is None:
                    diag["blocked_by_stale_bar"] = True
                    _log_filter_diag(blocked_side="short")
                    return _diag(
                        signals,
                        had_short_edge=True,
                        blocked_reason="stale bar or off-hours (alert suppressed)",
                        blocked_side="short",
                        diag_snapshot=diag,
                    )

                # Open paper trade if enabled
                if self.paper_trader:
                    entry_meta = {
                        "entry_type": signals.get("entry_type_short"),
                        "entry_score": signals.get("entry_score_short"),
                        "entry_reason": signals.get("entry_reason_short"),
                        "timestamp": signals.get("timestamp"),
                    }
                    success, message = self.paper_trader.open_position(
                        self.symbol, 'short', current_price, current_time, current_bar_index, current_atr, entry_metadata=entry_meta
                    )
                    if success:
                        if "capped=1" in message:
                            diag["capped"] = True
                        # Find the newly opened trade (last one in the list)
                        new_trade = self.paper_trader.open_trades[-1]
                        print(f"\n[{self.symbol}] PAPER TRADE OPENED: {message}")
                        print(f"  Entry: ${new_trade.entry_price:,.2f}")
                        print(f"  Stop Loss: ${new_trade.base_stop:,.2f}")
                        if new_trade.take_profit:
                            if getattr(self.config, 'USE_TWO_TIER_TP', True) and hasattr(new_trade, 'tp1') and new_trade.tp1:
                                print(f"  Take Profit 1: ${new_trade.tp1:,.2f} (1.0R)")
                                print(f"  Take Profit 2: ${new_trade.tp2:,.2f} (1.8R)")
                            else:
                                tp_pct = ((new_trade.entry_price - new_trade.take_profit) / new_trade.entry_price) * 100
                                print(f"  Take Profit: ${new_trade.take_profit:,.2f} ({tp_pct:.1f}%)")
                        print(f"  Open Positions for {self.symbol}: {sum(1 for t in self.paper_trader.open_trades if t.symbol == self.symbol)}")
                        if self.asset_type == 'stock':
                            print(f"  Position Size: {new_trade.position_shares:.2f} shares (${new_trade.position_size_dollars:,.2f})")
                        else:
                            print(f"  Position Size: ${new_trade.position_size_dollars:,.2f} ({new_trade.position_shares:.6f} BTC)")
                        diag["final_order_sent"] = True
                        _log_filter_diag(blocked_side="short")
                    else:
                        print(f"[{self.symbol}] Entry blocked (risk/position): {message}")
                        msg_l = message.lower()
                        if "daily" in msg_l or "loss guard" in msg_l:
                            diag["blocked_by_daily_loss"] = True
                        elif "cooldown" in msg_l:
                            diag["blocked_by_cooldown"] = True
                        elif "max position" in msg_l:
                            diag["blocked_by_max_positions"] = True
                        elif "insufficient capital" in msg_l or "required capital" in msg_l:
                            diag["blocked_by_capital"] = True
                        _log_filter_diag(blocked_side="short")
                        return _diag(signals, had_short_edge=True, blocked_reason=message, blocked_side="short", diag_snapshot=diag)
            
            # Update state tracking
            self.prev_long_signal = signals['long']
            self.prev_short_signal = signals['short']
            self.last_checked_bar_index = current_bar_index
            if not signals['long'] and not signals['short']:
                print(f"[INFO] {self.symbol} no signal: no RSI cross")
            _log_filter_diag()
            populate_cycle_strat_fields(diag, signals)
            return _diag(signals, diag_snapshot=diag)
            
        except OHLCVFetchError as e:
            print(f"[{self.symbol}] OHLCV fetch error: {e}")
            return {
                "signals": None,
                "bar_skipped": False,
                "had_long_edge": False,
                "had_short_edge": False,
                "blocked_reason": None,
                "blocked_side": None,
                "diag": _diag_fetch_failed_snapshot(),
                "error": str(e),
            }
        except Exception as e:
            print(f"[{self.symbol}] Error checking signals: {e}")
            return {"signals": None, "bar_skipped": False, "had_long_edge": False, "had_short_edge": False, "blocked_reason": None, "blocked_side": None, "diag": {}, "error": str(e)}


class PortfolioMonitor:
    """Monitors multiple symbols simultaneously"""
    def __init__(self, symbols, config_obj):
        self.symbols = symbols
        self.config = config_obj
        self.monitors = {}
        self._data_stale_consecutive = {}
        self._data_stale_warned = set()
        self._cycle_data_counts = {"ok": 0, "stale": 0, "empty": 0}
        self._gated_entry_types = set()
        self._gated_directions = set()
        
        print(f"Initializing Portfolio Monitor for {len(symbols)} symbols...")
        print(f"Timeframe: {config_obj.TIMEFRAME}")
        print(f"Version: {config_obj.VERSION_LOCK}")
        print(f"Symbols: {', '.join(symbols)}")
        self._log_preflight_config()
        
        # Count asset types
        crypto_count = sum(1 for s in symbols if "/" in s)
        stock_count = len(symbols) - crypto_count
        if crypto_count > 0 and stock_count > 0:
            print(f"Asset Types: {crypto_count} Crypto, {stock_count} Stocks (Mixed Portfolio)")
        elif crypto_count > 0:
            print(f"Asset Type: Crypto")
        else:
            print(f"Asset Type: Stocks")
        
        # Initialize shared paper trader for portfolio mode
        self.shared_paper_trader = None
        if config_obj.PAPER_TRADING_ENABLED:
            self.shared_paper_trader = PaperTrader(
                config_obj,
                initial_capital=config_obj.PAPER_TRADING_INITIAL_CAPITAL,
                portfolio_mode=True  # Enable portfolio mode
            )
            print(f"[PREFLIGHT] active_positions_at_start={len(self.shared_paper_trader.open_trades)}")
            print(f"Paper Trading: Enabled (Shared Portfolio: ${config_obj.PAPER_TRADING_INITIAL_CAPITAL:,.2f})")
            print(f"Max Open Positions: {getattr(config_obj, 'MAX_OPEN_POSITIONS', 2)}")
        else:
            print("[PREFLIGHT] active_positions_at_start=0")
        
        # Initialize SPY data fetcher for market regime filter (stocks only)
        self.spy_fetcher = None
        if getattr(config_obj, 'USE_MARKET_REGIME_FILTER', True) and stock_count > 0:
            try:
                spy_symbol = getattr(config_obj, 'MARKET_REGIME_SYMBOL', 'SPY')
                self.spy_fetcher = UnifiedDataFetcher(
                    asset_type='stock',
                    exchange_name='',
                    symbol=spy_symbol,
                    timeframe=config_obj.TIMEFRAME
                )
                print(f"Market Regime Filter: Enabled (using {spy_symbol})")
            except Exception as e:
                print(f"Warning: Could not initialize market regime filter: {e}")

        # Per-cycle SPY OHLCV cache / health (live monitoring; see _resolve_spy_for_cycle)
        self._spy_last_good_ohlcv = None
        self._last_cycle_spy_df = None
        self._last_cycle_spy_ok = True
        self._last_cycle_spy_err = None
        
        # Initialize BTC 4H fetcher for BTC EMA slope filter (crypto only)
        self.btc_4h_fetcher = None
        if crypto_count > 0 and getattr(config_obj, 'USE_BTC_4H_EMA_FILTER', True):
            try:
                # Check if BTC is in the portfolio
                if any("/" in s for s in symbols):
                    self.btc_4h_fetcher = UnifiedDataFetcher(
                        asset_type='crypto',
                        exchange_name=config_obj.EXCHANGE,
                        symbol='BTC/USD',
                        timeframe='4h'  # 4H timeframe for slope filter
                    )
                    print(f"BTC 4H EMA Filter: Enabled")
            except Exception as e:
                print(f"Warning: Could not initialize BTC 4H EMA filter: {e}")
        
        # Market open blocking
        if getattr(config_obj, 'BLOCK_MARKET_OPEN', True) and stock_count > 0:
            block_start = getattr(config_obj, 'MARKET_OPEN_BLOCK_START', '09:30')
            block_end = getattr(config_obj, 'MARKET_OPEN_BLOCK_END', '10:00')
            print(f"Market Open Block: {block_start} - {block_end} ET (stocks only)")
        
        # Lunch chop blocking
        if getattr(config_obj, 'BLOCK_LUNCH_CHOP', True) and stock_count > 0:
            lunch_start = getattr(config_obj, 'LUNCH_CHOP_START', '11:30')
            lunch_end = getattr(config_obj, 'LUNCH_CHOP_END', '13:30')
            print(f"Lunch Chop Block: {lunch_start} - {lunch_end} ET (stocks only)")
        
        # VIX filter
        if getattr(config_obj, 'USE_VIX_FILTER', True) and stock_count > 0:
            vix_threshold = getattr(config_obj, 'VIX_MAX_THRESHOLD', 30.0)
            print(f"VIX Filter: Enabled (max VIX: {vix_threshold})")
        
        # Risk model
        if getattr(config_obj, 'USE_FIXED_RISK_PERCENT', True):
            risk_pct = getattr(config_obj, 'RISK_PERCENT_PER_TRADE', 0.5)
            print(f"Risk Model: Fixed {risk_pct}% risk per trade")
        
        # Exposure limits
        max_per_dir = getattr(config_obj, 'MAX_POSITIONS_PER_DIRECTION', 1)
        print(f"Exposure Control: Max {max_per_dir} position(s) per direction")
        
        # Daily loss guard
        if getattr(config_obj, 'USE_DAILY_LOSS_GUARD', True):
            loss_limit = getattr(config_obj, 'DAILY_LOSS_LIMIT_PCT', 2.0)
            print(f"Daily Loss Guard: Enabled ({loss_limit}% limit)")
        
        print("-" * 60)

        if getattr(config_obj, "USE_FILTER_COST_LEDGER", True):
            self.filter_cost_ledger = FilterCostLedger(config_obj)
            print("Filter Cost Ledger: Enabled (counterfactual shadow R tracking)")
        else:
            self.filter_cost_ledger = None

        required_bars = get_required_warmup_bars(config_obj)
        
        # Initialize monitor for each symbol
        for symbol in symbols:
            try:
                print(f"Initializing {symbol}...", end=" ")
                monitor = SymbolMonitor(symbol, config_obj, shared_paper_trader=self.shared_paper_trader, 
                                       spy_fetcher=self.spy_fetcher, btc_4h_fetcher=self.btc_4h_fetcher)
                monitor.filter_cost_ledger = self.filter_cost_ledger
                
                # Verify symbol
                monitor.data_fetcher.verify_symbol()
                
                # Warmup data fetch (historical bars for indicator stability)
                warmup_df = monitor.data_fetcher.fetch_ohlcv(limit=required_bars)
                warmup_count = len(warmup_df)
                warmup_first = warmup_df.index[0] if warmup_count > 0 else None
                warmup_last = warmup_df.index[-1] if warmup_count > 0 else None
                monitor.warmup_loaded_count = warmup_count
                monitor.warmup_range_start = warmup_first
                monitor.warmup_range_end = warmup_last
                monitor.warmup_ready = warmup_count >= required_bars
                warmup_status = "OK" if monitor.warmup_ready else "INSUFFICIENT"
                
                print(
                    f"[{symbol}] Initialized: {warmup_count} bars | "
                    f"range: {warmup_first} -> {warmup_last} | "
                    f"warmup={warmup_status} (need {required_bars})"
                )
                
                self.monitors[symbol] = monitor
                
            except Exception as e:
                print(f"[ERROR] Failed to initialize {symbol}: {e}")
                continue
        
        print(f"\nSuccessfully initialized {len(self.monitors)}/{len(symbols)} symbols")
        print("=" * 60 + "\n")

    def _log_preflight_config(self):
        """Log critical runtime parameters at startup."""
        required_bars = get_required_warmup_bars(self.config)
        max_period = max(
            int(getattr(self.config, "EMA_LENGTH", 30)),
            int(getattr(self.config, "RSI_LENGTH", 14)),
            int(getattr(self.config, "ATR_LENGTH", 14)),
        )
        risk_cfg = float(getattr(self.config, "RISK_PERCENT_PER_TRADE", 0.5))
        risk_fraction = risk_cfg / 100.0 if risk_cfg > 0.05 else risk_cfg
        print(
            "[PREFLIGHT] "
            f"risk_per_trade={risk_fraction:.4f} "
            f"max_positions={getattr(self.config, 'MAX_OPEN_POSITIONS', 2)} "
            f"daily_loss_limit={getattr(self.config, 'DAILY_LOSS_LIMIT_PCT', 2.0)} "
            f"cooldown_bars={getattr(self.config, 'SYMBOL_COOLDOWN_BARS', 2)} "
            f"min_entry_score={getattr(self.config, 'MIN_ENTRY_SCORE', 60)}"
        )
        print(
            "[PREFLIGHT] periods "
            f"EMA={getattr(self.config, 'EMA_LENGTH', 30)} "
            f"RSI={getattr(self.config, 'RSI_LENGTH', 14)} "
            f"ATR={getattr(self.config, 'ATR_LENGTH', 14)} "
            f"warmup_required={required_bars} "
            f"warmup_ok={required_bars >= (max_period + 30)}"
        )
        print(
            f"[PREFLIGHT] watchlist={len(self.symbols)} symbols: {', '.join(self.symbols)}"
        )

    def _resolve_spy_for_cycle(self):
        """
        Fetch SPY once per monitoring cycle for regime context.
        Fail closed for stock entries when SPY OHLCV is missing/invalid (unless stale override is enabled).
        """
        self._last_cycle_spy_df = None
        self._last_cycle_spy_err = None
        self._last_cycle_spy_ok = True

        has_stocks = any("/" not in s for s in self.monitors)
        if not has_stocks:
            return

        if not getattr(self.config, "USE_MARKET_REGIME_FILTER", True):
            return

        if not self.spy_fetcher:
            self._last_cycle_spy_ok = False
            self._last_cycle_spy_err = "SPY fetcher not initialized"
            print("[PORTFOLIO] SPY data unavailable → blocking stock entries this cycle (SPY fetcher not initialized)")
            return

        ema_len = getattr(self.config, "EMA_LENGTH", 30)
        atr_len = getattr(self.config, "ATR_LENGTH", 14)
        min_rows = max(ema_len, atr_len) + 2

        spy_df = None
        try:
            spy_df = self.spy_fetcher.fetch_ohlcv(limit=200)
        except Exception as e:
            self._last_cycle_spy_err = str(e)

        if spy_df is not None:
            ok, reason = validate_ohlcv_dataframe(spy_df, min_rows=min_rows)
            if ok:
                self._spy_last_good_ohlcv = spy_df.copy()
                self._last_cycle_spy_df = spy_df
                self._last_cycle_spy_ok = True
                return
            self._last_cycle_spy_err = self._last_cycle_spy_err or reason

        allow_stale = getattr(self.config, "ALLOW_STALE_SPY_REGIME_FOR_ENTRIES", False)
        cached = getattr(self, "_spy_last_good_ohlcv", None)
        if allow_stale and cached is not None:
            ok2, reason2 = validate_ohlcv_dataframe(cached, min_rows=min_rows)
            if ok2:
                print(
                    "[PORTFOLIO] SPY fetch failed; using last-good SPY bars for regime "
                    "(ALLOW_STALE_SPY_REGIME_FOR_ENTRIES=true)"
                )
                self._last_cycle_spy_df = cached
                self._last_cycle_spy_ok = True
                self._last_cycle_spy_err = None
                return

        self._last_cycle_spy_ok = False
        err_msg = self._last_cycle_spy_err or "unknown error"
        print(f"[PORTFOLIO] SPY data unavailable → blocking stock entries this cycle ({err_msg})")
    
    def _record_data_freshness_from_result(self, symbol: str, result: dict) -> None:
        """Tally [DATA] summary counts and track consecutive stale/empty cycles."""
        diag = (result or {}).get("diag") or {}
        status = diag.get("data_freshness_status")
        if status not in ("ok", "stale", "empty"):
            if diag.get("fetch_error") or diag.get("data_unavailable"):
                status = "empty"
            else:
                status = "ok"
        if status in self._cycle_data_counts:
            self._cycle_data_counts[status] += 1

        if status in ("stale", "empty"):
            n = self._data_stale_consecutive.get(symbol, 0) + 1
            self._data_stale_consecutive[symbol] = n
            if n >= 3 and symbol not in self._data_stale_warned:
                print(
                    f"[WARN] {symbol} has returned stale/empty data for 3 consecutive cycles "
                    f"— consider removing from watchlist or checking yfinance ticker"
                )
                self._data_stale_warned.add(symbol)
        else:
            self._data_stale_consecutive[symbol] = 0

    def _log_stale_cache_files(self):
        """Report any pickle/cache artifacts in project root (observability only)."""
        import glob
        import os

        root = os.path.dirname(os.path.abspath(__file__))
        patterns = ("*.pkl", "*.pickle", "*.cache", ".cache")
        found = []
        for pat in patterns:
            found.extend(glob.glob(os.path.join(root, pat)))
        if found:
            print(f"[DATA] cache files in project root (not used by fetcher): {', '.join(found)}")
        else:
            print("[DATA] no .pkl or .cache files in project root")

    def _refresh_expectancy_gates(self):
        """Load [GATE] state from performance CSVs for this cycle."""
        from expectancy_gates import build_cycle_gates, log_cycle_gates

        gated_layers, gated_dirs, entry_stats, direction_stats = build_cycle_gates()
        self._gated_entry_types = gated_layers
        self._gated_directions = gated_dirs
        log_cycle_gates(entry_stats, direction_stats)

    def check_all_symbols(self, symbol_subset=None):
        """Check all symbols for signals and print diagnostic summary.

        Args:
            symbol_subset: optional list of symbols to check (scheduler filter only).
        """
        self._cycle_data_counts = {"ok": 0, "stale": 0, "empty": 0}
        self._log_stale_cache_files()
        self._refresh_expectancy_gates()
        self._resolve_spy_for_cycle()
        if not getattr(self, "_cycle_watchlist_logged", False):
            active = list(self.monitors.keys())
            print(
                f"[PREFLIGHT] cycle_watchlist={len(active)} symbols: {', '.join(active)}"
            )
            self._cycle_watchlist_logged = True
        if not self._last_cycle_spy_ok and any("/" not in s for s in self.monitors):
            stock_syms = [s for s in self.monitors if "/" not in s]
            print(
                f"[FILTER] SPY regime blocked: all stock entries this cycle "
                f"({len(stock_syms)} symbols: {', '.join(stock_syms)}) — SPY OHLCV unavailable"
            )
        results = {}
        monitor_items = self.monitors.items()
        if symbol_subset is not None:
            allowed = set(symbol_subset)
            monitor_items = [(s, m) for s, m in self.monitors.items() if s in allowed]

        for symbol, monitor in monitor_items:
            monitor.gated_entry_types = self._gated_entry_types
            monitor.gated_directions = self._gated_directions
            is_stock = "/" not in symbol
            spy_ok = self._last_cycle_spy_ok if is_stock else True
            spy_df_arg = self._last_cycle_spy_df if (is_stock and self._last_cycle_spy_ok) else None
            try:
                out = monitor.check_for_signals(stock_spy_regime_ok=spy_ok, spy_ohlcv_df=spy_df_arg)
                results[symbol] = out
                self._record_data_freshness_from_result(symbol, out)
            except OHLCVFetchError as e:
                print(format_data_line(symbol, assess_ohlcv_freshness(None)))
                snap = _diag_fetch_failed_snapshot()
                snap["blocked_by_data_quality"] = True
                print(f"[FILTER] blocked: data_quality=1 ({symbol} fetch error)")
                results[symbol] = {
                    "signals": None,
                    "bar_skipped": False,
                    "had_long_edge": False,
                    "had_short_edge": False,
                    "blocked_reason": None,
                    "blocked_side": None,
                    "diag": snap,
                    "error": str(e),
                }
                self._record_data_freshness_from_result(symbol, results[symbol])
            except Exception as e:
                print(f"[{symbol}] Error: {e}")
                results[symbol] = {"signals": None, "bar_skipped": False, "had_long_edge": False, "had_short_edge": False, "blocked_reason": None, "blocked_side": None, "diag": {}, "error": str(e)}
                self._record_data_freshness_from_result(symbol, results[symbol])

        c = self._cycle_data_counts
        print(
            f"[DATA] summary: ok={c['ok']} stale={c['stale']} empty={c['empty']}"
        )
        
        # Diagnostic summary (why no trades)
        self._print_diagnostic_summary(results)
        if self.filter_cost_ledger is not None:
            self.filter_cost_ledger.print_summary()
        return results
    
    def _print_diagnostic_summary(self, results):
        """Print a one-line summary of why no trades may have occurred"""
        if not results:
            return
        checked = len(results)
        bar_skipped = sum(1 for r in results.values() if r and r.get("bar_skipped"))
        new_bars = checked - bar_skipped
        long_edges = [(s, r) for s, r in results.items() if r and r.get("had_long_edge")]
        short_edges = [(s, r) for s, r in results.items() if r and r.get("had_short_edge")]
        errors = sum(1 for r in results.values() if r and r.get("error"))
        raw_longs = sum(1 for r in results.values() if r and (r.get("diag", {}).get("raw_long_signal")))
        raw_shorts = sum(1 for r in results.values() if r and (r.get("diag", {}).get("raw_short_signal")))
        no_signal_count = sum(
            1 for r in results.values()
            if r and not r.get("diag", {}).get("raw_long_signal") and not r.get("diag", {}).get("raw_short_signal")
        )
        orders = sum(1 for r in results.values() if r and (r.get("diag", {}).get("final_order_sent")))
        blocked_open = sum(1 for r in results.values() if r and (r.get("diag", {}).get("blocked_by_market_open")))
        blocked_spy = sum(1 for r in results.values() if r and (r.get("diag", {}).get("blocked_by_spy_regime")))
        blocked_btc4h = sum(1 for r in results.values() if r and (r.get("diag", {}).get("blocked_by_btc_4h_regime")))
        blocked_vix = sum(1 for r in results.values() if r and (r.get("diag", {}).get("blocked_by_vix")))
        blocked_flat = sum(1 for r in results.values() if r and (r.get("diag", {}).get("blocked_by_flat_regime")))
        blocked_cooldown = sum(1 for r in results.values() if r and (r.get("diag", {}).get("blocked_by_cooldown")))
        blocked_max_pos = sum(1 for r in results.values() if r and (r.get("diag", {}).get("blocked_by_max_positions")))
        blocked_daily_loss = sum(1 for r in results.values() if r and (r.get("diag", {}).get("blocked_by_daily_loss")))
        blocked_data_quality = sum(1 for r in results.values() if r and (r.get("diag", {}).get("blocked_by_data_quality")))
        blocked_capital = sum(1 for r in results.values() if r and (r.get("diag", {}).get("blocked_by_capital")))
        capped_trades = sum(1 for r in results.values() if r and (r.get("diag", {}).get("capped")))
        blocked_spy_unavail = sum(1 for r in results.values() if r and (r.get("diag", {}).get("blocked_by_spy_data_unavailable")))
        fetch_errors = sum(1 for r in results.values() if r and (r.get("diag", {}).get("fetch_error")))
        symbols_skipped_due_to_fetch = sum(1 for r in results.values() if r and (r.get("diag", {}).get("data_unavailable")))
        portfolio_total = (
            float(self.shared_paper_trader.current_capital)
            if self.shared_paper_trader is not None
            else None
        )
        initial_capital = (
            float(self.shared_paper_trader.initial_capital)
            if self.shared_paper_trader is not None
            else None
        )
        portfolio_return_pct = (
            ((portfolio_total - initial_capital) / initial_capital) * 100.0
            if portfolio_total is not None and initial_capital and initial_capital > 0
            else None
        )

        has_stock_result = any("/" not in s for s in results)
        spy_fetch_error = 0
        if (
            has_stock_result
            and getattr(self.config, "USE_MARKET_REGIME_FILTER", True)
            and self.spy_fetcher
            and not getattr(self, "_last_cycle_spy_ok", True)
        ):
            spy_fetch_error = 1

        # SPY regime (for context) — use same SPY frame as this cycle when available (no extra fetch)
        spy_status = ""
        ema_len = getattr(self.config, "EMA_LENGTH", 30)
        atr_len = getattr(self.config, "ATR_LENGTH", 14)
        if self.spy_fetcher and getattr(self.config, "USE_MARKET_REGIME_FILTER", True):
            if not getattr(self, "_last_cycle_spy_ok", True):
                err = getattr(self, "_last_cycle_spy_err", "") or ""
                spy_status = f" (SPY: unavailable - {err})"
            else:
                spy_df = getattr(self, "_last_cycle_spy_df", None)
                if spy_df is not None and len(spy_df) > 0:
                    try:
                        from indicators import calculate_ema, calculate_atr
                        spy_tail = spy_df.tail(max(50, ema_len + 5)).copy()
                        spy_tail["ema"] = calculate_ema(spy_tail, ema_len)
                        spy_tail["atr"] = calculate_atr(spy_tail, atr_len)
                        spy_price = spy_tail["close"].iloc[-1]
                        spy_ema = spy_tail["ema"].iloc[-1]
                        spy_atr_pct = (spy_tail["atr"].iloc[-1] / spy_price * 100) if spy_price > 0 else 0
                        flat_thresh = getattr(self.config, "FLAT_REGIME_THRESHOLD_PCT", 0.15)
                        low_atr = getattr(self.config, "FLAT_REGIME_LOW_ATR_PCT", 0.5)
                        if abs(spy_price - spy_ema) / spy_ema * 100 < flat_thresh and spy_atr_pct < low_atr:
                            spy_status = " (SPY: flat/chop)"
                        elif spy_price > spy_ema:
                            spy_status = " (SPY: above EMA → longs allowed)"
                        else:
                            spy_status = " (SPY: below EMA → shorts allowed)"
                    except Exception:
                        spy_status = " (SPY: regime context unavailable)"
        
        parts = [
            f"Cycle: checked={checked}",
            f"new_bars={new_bars}",
            f"raw_longs={raw_longs}",
            f"raw_shorts={raw_shorts}",
            "blocked(open=%d spy=%d spy_unavail=%d btc4h=%d vix=%d flat=%d cooldown=%d max_pos=%d daily_loss=%d data_quality=%d capital=%d)" % (
                blocked_open, blocked_spy, blocked_spy_unavail, blocked_btc4h, blocked_vix, blocked_flat,
                blocked_cooldown, blocked_max_pos, blocked_daily_loss, blocked_data_quality, blocked_capital
            ),
            f"capped={capped_trades}",
            f"orders={orders}",
            f"fetch_errors={fetch_errors}",
            f"symbols_skipped_due_to_fetch={symbols_skipped_due_to_fetch}",
            f"spy_fetch_error={spy_fetch_error}",
        ]
        if portfolio_total is not None:
            parts.append(f"portfolio_total=${portfolio_total:,.2f}")
        if portfolio_return_pct is not None:
            parts.append(f"portfolio_return={portfolio_return_pct:.2f}%")
        if long_edges or short_edges:
            parts.append(f"edges(long={len(long_edges)} short={len(short_edges)})")
        if errors:
            parts.append(f"errors: {errors}")
        line = " | ".join(parts) + spy_status
        print(f"  → {line}")
        symbol_order = [s for s in self.symbols if s in results]
        symbol_order += [s for s in results if s not in symbol_order]
        print_cycle_summary_table(symbol_order, results)

        print(
            f"\n[CYCLE STATS] new_bars={new_bars} | signals long={raw_longs} short={raw_shorts} | "
            f"orders={orders} | capped={capped_trades} | no_signal={no_signal_count}"
        )
        if portfolio_total is not None:
            print(f"[CYCLE STATS] Portfolio Total: ${portfolio_total:,.2f}")
        if portfolio_return_pct is not None:
            print(f"[CYCLE STATS] Portfolio Return: {portfolio_return_pct:.2f}%")
    
    def run_once(self, symbol_subset=None):
        """Run a single check for all symbols (or subset when scheduled)."""
        self.check_all_symbols(symbol_subset=symbol_subset)
        return True

    def run_scheduled(self, interval_minutes=30):
        """
        Run on a 30-minute grid: all symbols during stock hours, BTC-only otherwise.
        Does not alter signal, filter, or risk logic — only which symbols are checked.
        """
        from portfolio_scheduler import (
            SCHEDULE_INTERVAL_MINUTES,
            log_scheduler_next_run,
            log_scheduler_started,
            log_scheduler_stopped,
            schedule_mode_at,
            sleep_until,
            symbols_for_schedule_mode,
        )

        interval_minutes = int(interval_minutes or SCHEDULE_INTERVAL_MINUTES)
        log_scheduler_started()

        try:
            while True:
                mode = schedule_mode_at()
                subset = symbols_for_schedule_mode(self.symbols, mode)
                print(
                    f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] "
                    f"Scheduled cycle mode={mode} symbols={len(subset)}/{len(self.symbols)}"
                )
                self.check_all_symbols(symbol_subset=subset)

                if self.shared_paper_trader:
                    open_count = len(self.shared_paper_trader.open_trades)
                    if open_count > 0:
                        print(f"\nOpen Positions: {open_count}")
                        print(
                            f"Portfolio Capital: ${self.shared_paper_trader.current_capital:,.2f}"
                        )
                    self.shared_paper_trader.print_entry_type_performance_summary()

                next_et, next_mode = log_scheduler_next_run()
                sleep_until(next_et)

        except KeyboardInterrupt:
            log_scheduler_stopped()
            if self.shared_paper_trader:
                print("\n" + "=" * 60)
                print("FINAL PORTFOLIO STATUS")
                print("=" * 60)
                self.shared_paper_trader.print_status()
                self.shared_paper_trader.save_trade_history()
                print("=" * 60)
            sys.exit(0)
        except Exception as e:
            print(f"\n[SCHEDULER] error: {e}")
            log_scheduler_stopped()
            sys.exit(1)
    
    def run_continuous(self, check_interval=60):
        """
        Run continuously, checking all symbols at regular intervals
        
        Args:
            check_interval: Seconds between checks (default 60)
        """
        print(f"Running in continuous mode (checking every {check_interval} seconds)")
        print("Press Ctrl+C to stop\n")
        
        try:
            while True:
                print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Checking all symbols...")
                self.check_all_symbols()
                
                # Print summary of open positions
                if self.shared_paper_trader:
                    open_count = len(self.shared_paper_trader.open_trades)
                    if open_count > 0:
                        print(f"\nOpen Positions: {open_count}/{len(self.monitors)}")
                        print(f"Portfolio Capital: ${self.shared_paper_trader.current_capital:,.2f}")
                    # Live per-entry-type performance summary (if any closed trades exist)
                    self.shared_paper_trader.print_entry_type_performance_summary()
                
                time.sleep(check_interval)
                
        except KeyboardInterrupt:
            print("\n\nStopping portfolio monitoring...")
            
            # Print final status for portfolio
            if self.shared_paper_trader:
                print("\n" + "="*60)
                print("FINAL PORTFOLIO STATUS")
                print("="*60)
                self.shared_paper_trader.print_status()
                self.shared_paper_trader.save_trade_history()
                print("="*60)
            
            sys.exit(0)
        except Exception as e:
            print(f"\nError in continuous mode: {e}")
            sys.exit(1)


def main():
    """Main entry point for portfolio monitoring"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='Portfolio Trading Alert System - Monitors multiple symbols'
    )
    parser.add_argument(
        '--mode',
        choices=['once', 'continuous', 'scheduled'],
        default='continuous',
        help='Run mode: once, continuous (default), or scheduled (30m grid; stocks Mon-Fri 10:00-16:00 ET, BTC 24/7)'
    )
    parser.add_argument(
        '--interval',
        type=int,
        default=60,
        help='Sleep seconds between cycles (continuous) or grid minutes hint (scheduled uses 30m wall clock; pass --interval 30)'
    )
    parser.add_argument(
        '--stats',
        action='store_true',
        help='Show paper trading statistics for all symbols and exit'
    )
    
    args = parser.parse_args()

    from trading_file_logger import configure_trading_file_log
    configure_trading_file_log()

    # Get symbols from config
    if config.SYMBOLS:
        symbols = config.SYMBOLS
    else:
        # Fall back to single symbol
        symbols = [config.SYMBOL]
    
    if not symbols:
        print("Error: No symbols configured. Set SYMBOLS environment variable or SYMBOL in config.")
        return
    
    # Create portfolio monitor
    portfolio = PortfolioMonitor(symbols, config)
    
    if not portfolio.monitors:
        print("Error: No symbols could be initialized.")
        return
    
    # Show stats and exit if requested
    if args.stats:
        if portfolio.shared_paper_trader:
            print("\n" + "="*60)
            print("PORTFOLIO STATISTICS")
            print("="*60)
            portfolio.shared_paper_trader.print_status()
        else:
            print("Paper trading is not enabled.")
        return
    
    if args.mode == 'once':
        from portfolio_scheduler import (
            log_scheduler_next_run,
            schedule_mode_at,
            symbols_for_schedule_mode,
        )

        mode = schedule_mode_at()
        subset = symbols_for_schedule_mode(portfolio.symbols, mode)
        print(f"[SCHEDULER] cycle mode={mode} symbols={len(subset)}/{len(portfolio.symbols)}")
        portfolio.run_once(symbol_subset=subset)
        log_scheduler_next_run()
        if portfolio.shared_paper_trader:
            print("\n" + "="*60)
            print("PORTFOLIO STATUS")
            print("="*60)
            portfolio.shared_paper_trader.print_status()
    elif args.mode == 'scheduled':
        portfolio.run_scheduled(interval_minutes=args.interval)
    else:
        portfolio.run_continuous(check_interval=args.interval)


if __name__ == "__main__":
    main()

