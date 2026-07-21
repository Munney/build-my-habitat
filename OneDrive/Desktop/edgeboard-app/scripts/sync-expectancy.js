#!/usr/bin/env node
// Run this from your bot's project directory (where the CSVs live), or
// pass paths explicitly. It replicates expectancy_gates.py's math exactly:
// mean R-multiple per group, no rolling window, all rows aggregated.
//
// Usage:
//   ENTRY_TYPE_CSV=./entry_type_performance.csv \
//   DIRECTION_CSV=./direction_performance.csv \
//   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
//   node scripts/sync-expectancy.js
//
// Run this on a schedule (cron, GitHub Action, etc.) so the app's gates
// stay current with your live trade log — there's no automatic connection
// between your bot's local files and Supabase.

import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

function parseCsv(path) {
  const raw = fs.readFileSync(path, 'utf8').trim();
  const [headerLine, ...lines] = raw.split('\n');
  const headers = headerLine.split(',').map((h) => h.trim());
  return lines
    .filter((l) => l.trim().length > 0)
    .map((line) => {
      const cells = line.split(',').map((c) => c.trim());
      const row = {};
      headers.forEach((h, idx) => { row[h] = cells[idx]; });
      return row;
    });
}

function meanRByGroup(rows, groupKey, valueKey) {
  const groups = {};
  for (const row of rows) {
    const key = row[groupKey];
    const value = parseFloat(row[valueKey]);
    if (!key || Number.isNaN(value)) continue;
    if (!groups[key]) groups[key] = [];
    groups[key].push(value);
  }
  const out = {};
  for (const [key, values] of Object.entries(groups)) {
    const sum = values.reduce((a, b) => a + b, 0);
    out[key] = {
      expectancy_r: sum / values.length,
      win_rate: values.filter((v) => v > 0).length / values.length,
      sample_size: values.length,
    };
  }
  return out;
}

async function main() {
  const entryTypeCsvPath = process.env.ENTRY_TYPE_CSV || './entry_type_performance.csv';
  const directionCsvPath = process.env.DIRECTION_CSV || './direction_performance.csv';

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  if (fs.existsSync(entryTypeCsvPath)) {
    const rows = parseCsv(entryTypeCsvPath);
    const stats = meanRByGroup(rows, 'entry_type', 'R_multiple');
    for (const [setupType, s] of Object.entries(stats)) {
      const { error } = await supabase.from('setup_stats').upsert({
        setup_type: setupType,
        expectancy_r: s.expectancy_r,
        win_rate: s.win_rate,
        sample_size: s.sample_size,
        updated_at: new Date().toISOString(),
      });
      if (error) console.error(`Failed to upsert ${setupType}:`, error.message);
      else console.log(`setup_stats.${setupType} -> expectancy_r=${s.expectancy_r.toFixed(3)} n=${s.sample_size}`);
    }
  } else {
    console.warn(`Skipping entry-type stats — ${entryTypeCsvPath} not found`);
  }

  if (fs.existsSync(directionCsvPath)) {
    const rows = parseCsv(directionCsvPath);
    const stats = meanRByGroup(rows, 'direction', 'R_multiple');
    for (const [direction, s] of Object.entries(stats)) {
      const { error } = await supabase.from('direction_stats').upsert({
        direction: direction.toUpperCase(),
        expectancy_r: s.expectancy_r,
        win_rate: s.win_rate,
        sample_size: s.sample_size,
        updated_at: new Date().toISOString(),
      });
      if (error) console.error(`Failed to upsert ${direction}:`, error.message);
      else console.log(`direction_stats.${direction} -> expectancy_r=${s.expectancy_r.toFixed(3)} n=${s.sample_size}`);
    }
  } else {
    console.warn(`Skipping direction stats — ${directionCsvPath} not found`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
