# EdgeBoard — auth, paywall, and real ported scanner logic

Everything here runs on free tiers until you have paying subscribers.
There is no per-scan LLM cost — signal detection is a direct port of your
actual bot's logic (indicators.py / strategy.py / market_filters.py /
expectancy_gates.py), running as plain deterministic code.

## 1. Supabase (auth + subscription status + expectancy stats) — free

1. Create a project at supabase.com (free tier).
2. SQL editor → run `supabase/schema.sql`. This creates:
   - `profiles` (auth, subscription status/tier, daily scan counter)
   - `setup_stats` (entry-type expectancy — breakout/pullback/vol_expansion/continuation)
   - `direction_stats` (LONG/SHORT expectancy)
   - `try_consume_scan` (atomic daily scan-cap function)
3. Project Settings > API → copy URL / anon key / service role key into `.env.local`.
4. Authentication > URL Configuration → add your site URL as a redirect URL.
5. Auth is passwordless (magic link) — no email server to configure.

## 2. Stripe (billing) — free until you take a payment

Same as before: create Pro ($29) and Desk ($79) recurring prices, grab the
secret key, point a webhook at `/api/webhook` for
`checkout.session.completed` / `customer.subscription.updated` /
`customer.subscription.deleted`.

## 3. Keep expectancy numbers current — scripts/sync-expectancy.js

The bot computes expectancy live from your trade-history CSVs
(`entry_type_performance.csv`, `direction_performance.csv`) every cycle.
This web app can't reach those local files at request time, so instead:

```bash
cd /path/to/your/bot/project      # where the CSVs actually live
ENTRY_TYPE_CSV=./entry_type_performance.csv \
DIRECTION_CSV=./direction_performance.csv \
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
node /path/to/edgeboard-app/scripts/sync-expectancy.js
```

This computes the exact same mean-R-multiple formula the bot uses (no
rolling window, all rows aggregated) and upserts into Supabase. Run it on
a schedule (cron, GitHub Action) so the web app's gates track your real
trading results. Until you run this, every `sample_size` is 0, which means
"insufficient data" — every setup is allowed, nothing is gated yet.

## 4. Local setup

```bash
cp .env.example .env.local   # fill in Supabase + Stripe values
npm install
npm run dev
```

## 5. Deploy

Push to GitHub, import into Vercel (free tier), add the same env vars,
point the Stripe webhook at your real Vercel URL.

## What was ported, and where

| Bot concept | File here |
|---|---|
| `indicators.py` (simple-mean RSI/ATR, EMA) | `lib/indicators.js` |
| Config constants (RSI thresholds, lookbacks, multipliers) | `lib/config.js` |
| `check_breakout_entry` / `check_pullback_entry` / `check_vol_expansion_entry` / `check_continuation_entry` | `lib/setups.js` |
| `score_entry` / `choose_entry` | `lib/setups.js` |
| `market_filters.py` (SPY regime band, crypto bypass) | `lib/regime.js` |
| `expectancy_gates.py` (mean-R gates, entry type + direction) | `lib/expectancy.js` |
| `config.SYMBOLS` | `lib/config.js` |
| Trade-log → expectancy sync | `scripts/sync-expectancy.js` |

**Important divergences from a naive port, called out on purpose:**

- RSI and ATR use **simple rolling means**, not Wilder smoothing — this
  matches the bot's actual `indicators.py`, not the more common Wilder
  convention. Don't "fix" this.
- There is no separate `rsi_cross` entry type. The RSI threshold cross is
  folded into `breakout` (`detect_crossover` / `detect_crossunder`).
  `VALID_ENTRY_TYPES` has exactly four members.
- The SPY regime filter classifies SPY against **its own** 30-EMA with a
  ±0.2% tolerance band — there's no self-exemption, this is intentional
  in the bot.
- If SPY data can't be fetched/validated for a scan cycle, **all stock
  entries are blocked for that cycle** (fail-closed), matching
  `ALLOW_STALE_SPY_REGIME_FOR_ENTRIES = False`. Crypto bypasses the SPY
  filter entirely.
- Expectancy gating uses **two separate gates** — direction (LONG/SHORT,
  min 20 trades, threshold 0.0) and entry type (min 10 trades, threshold
  0.10) — both using plain mean R-multiple, not a win-rate/avg-win formula.
- `yahoo-finance2` bars are trimmed of the currently-forming bar (if the
  last bar started less than one interval ago) so index alignment matches
  the bot's assumption that `iloc[-1]` is always the latest **closed** bar.

**What's NOT ported** (present in your spec for reference only, not part
of this app): position sizing, stop placement, take-profit/trailing,
cooldowns, max-position limits, market-open blocking, VIX filter. Those are
trade-management concerns for your actual paper bot, not for a scanner
that only needs to surface a signal to a subscriber.

## How the paywall works (unchanged from before)

- `middleware.js` blocks `/scanner` for signed-out users.
- `app/scanner/page.js` checks `subscription_status`, shows paywall or scanner.
- `app/api/scan/route.js` re-checks subscription status server-side, plus
  the atomic daily scan cap (20/day Pro, 100/day Desk — tune in the route).
- `profiles.subscription_status` is only ever written by the Stripe webhook
  via the service role key — no client-side write path exists.
