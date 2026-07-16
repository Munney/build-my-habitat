"""
Direct Coinbase public REST candles (api.coinbase.com brokerage market API).

CCXT Coinbase can fail on 30m requests; this module uses the documented
granularity enums (e.g. THIRTY_MINUTE) and Unix-second start/end windows.
"""
from __future__ import annotations

import time
from typing import Dict, Optional, Tuple

import pandas as pd
import requests

from ohlcv_utils import OHLCVFetchError, ensure_utc_index

COINBASE_CANDLES_URL = (
    "https://api.coinbase.com/api/v3/brokerage/market/products/{product_id}/candles"
)

# timeframe -> (API granularity enum, bar length seconds)
TIMEFRAME_GRANULARITY: Dict[str, Tuple[str, int]] = {
    "1m": ("ONE_MINUTE", 60),
    "5m": ("FIVE_MINUTE", 300),
    "15m": ("FIFTEEN_MINUTE", 900),
    "30m": ("THIRTY_MINUTE", 1800),
    "1h": ("ONE_HOUR", 3600),
    "2h": ("TWO_HOUR", 7200),
    "4h": ("FOUR_HOUR", 14400),
    "6h": ("SIX_HOUR", 21600),
    "1d": ("ONE_DAY", 86400),
}


def symbol_to_product_id(symbol: str) -> str:
    """BTC/USD -> BTC-USD."""
    return symbol.replace("/", "-").upper()


def _granularity_for_timeframe(timeframe: str) -> Tuple[str, int]:
    key = (timeframe or "").lower().strip()
    if key in ("4hr",):
        key = "4h"
    if key not in TIMEFRAME_GRANULARITY:
        raise OHLCVFetchError(f"unsupported Coinbase timeframe: {timeframe}")
    return TIMEFRAME_GRANULARITY[key]


def fetch_coinbase_candles(
    symbol: str,
    timeframe: str,
    limit: int = 200,
    *,
    max_retries: int = 2,
    retry_delay_sec: float = 0.5,
    session: Optional[requests.Session] = None,
) -> pd.DataFrame:
    """
    Fetch OHLCV from Coinbase public market candles endpoint.

    Returns UTC-indexed DataFrame sorted oldest -> newest.
    """
    gran_enum, bar_sec = _granularity_for_timeframe(timeframe)
    product_id = symbol_to_product_id(symbol)
    url = COINBASE_CANDLES_URL.format(product_id=product_id)
    want = max(int(limit), 1)
    end = int(time.time())
    # Request a slightly wider window; API may cap per response.
    start = end - (want + 4) * bar_sec

    sess = session or requests.Session()
    last_err: Optional[str] = None
    attempts = max(1, int(max_retries) + 1)

    for attempt in range(attempts):
        try:
            resp = sess.get(
                url,
                params={
                    "granularity": gran_enum,
                    "start": str(start),
                    "end": str(end),
                },
                timeout=20,
            )
            if resp.status_code == 429:
                wait = float(resp.headers.get("Retry-After", retry_delay_sec * (attempt + 1)))
                time.sleep(max(0.25, wait))
                last_err = "rate limited (429)"
                continue
            if not resp.ok:
                last_err = f"HTTP {resp.status_code}: {resp.text[:200]}"
                if attempt < attempts - 1:
                    time.sleep(retry_delay_sec * (attempt + 1))
                continue

            payload = resp.json()
            candles = payload.get("candles") if isinstance(payload, dict) else None
            if not candles:
                last_err = f"empty candles payload: {str(payload)[:200]}"
                if attempt < attempts - 1:
                    time.sleep(retry_delay_sec * (attempt + 1))
                continue

            rows = []
            for c in candles:
                try:
                    ts = int(c["start"])
                    rows.append(
                        (
                            ts * 1000,
                            float(c["open"]),
                            float(c["high"]),
                            float(c["low"]),
                            float(c["close"]),
                            float(c.get("volume") or 0.0),
                        )
                    )
                except (KeyError, TypeError, ValueError) as e:
                    last_err = f"malformed candle: {c} ({e})"
                    rows = []
                    break

            if not rows:
                if attempt < attempts - 1:
                    time.sleep(retry_delay_sec * (attempt + 1))
                continue

            df = pd.DataFrame(
                rows,
                columns=["timestamp", "open", "high", "low", "close", "volume"],
            )
            df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms", utc=True)
            df = df.sort_values("timestamp").drop_duplicates(subset=["timestamp"])
            df.set_index("timestamp", inplace=True)
            df = ensure_utc_index(df)
            if len(df) > want:
                df = df.tail(want)
            if len(df) < 1:
                last_err = "parsed zero rows"
                if attempt < attempts - 1:
                    time.sleep(retry_delay_sec * (attempt + 1))
                continue
            return df

        except requests.RequestException as e:
            last_err = str(e)
            if attempt < attempts - 1:
                time.sleep(retry_delay_sec * (attempt + 1))

    raise OHLCVFetchError(
        f"{symbol} Coinbase REST candles failed after {attempts} attempt(s): {last_err}"
    )
