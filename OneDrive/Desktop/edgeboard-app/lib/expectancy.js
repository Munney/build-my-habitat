import {
  MIN_TRADES_ENTRY_TYPE, ENTRY_TYPE_EXPECTANCY_THRESHOLD,
  MIN_TRADES_DIRECTION, DIRECTION_EXPECTANCY_THRESHOLD,
} from './config';

// Both gates use plain mean R-multiple (sum(R)/count), NOT a win_rate *
// avg_win form, and there's no rolling window — it's an all-time aggregate
// in the bot (from CSV). Here the numbers come from Supabase tables that
// you keep in sync with your real trade log — see scripts/sync-expectancy.js.

// entryTypeStats: [{ setup_type, expectancy_r, sample_size }]
// directionStats: [{ direction: 'LONG'|'SHORT', expectancy_r, sample_size }]

export function isEntryTypeGated(entryType, entryTypeStats) {
  const row = entryTypeStats.find((r) => r.setup_type === entryType);
  if (!row || row.sample_size == null || row.sample_size < MIN_TRADES_ENTRY_TYPE) {
    return false; // insufficient data -> allowed, not gated
  }
  return row.expectancy_r < ENTRY_TYPE_EXPECTANCY_THRESHOLD;
}

export function isDirectionGated(side, directionStats) {
  const direction = side === 'long' ? 'LONG' : 'SHORT';
  const row = directionStats.find((r) => r.direction === direction);
  if (!row || row.sample_size == null || row.sample_size < MIN_TRADES_DIRECTION) {
    return false; // insufficient data -> allowed
  }
  return row.expectancy_r < DIRECTION_EXPECTANCY_THRESHOLD;
}

// Applies both gates. Returns { allowed, reason }.
export function applyExpectancyGates(entryType, side, entryTypeStats, directionStats) {
  if (isDirectionGated(side, directionStats)) {
    return { allowed: false, reason: `${side} direction gated (expectancy below threshold)` };
  }
  if (isEntryTypeGated(entryType, entryTypeStats)) {
    return { allowed: false, reason: `${entryType} entry type gated (expectancy below threshold)` };
  }
  return { allowed: true, reason: null };
}
