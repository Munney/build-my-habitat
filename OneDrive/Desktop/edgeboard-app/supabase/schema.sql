-- Run this in the Supabase SQL editor once, on a new project.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  stripe_customer_id text,
  subscription_tier text not null default 'free', -- 'free' | 'pro' | 'desk'
  subscription_status text not null default 'inactive', -- 'inactive' | 'active' | 'past_due' | 'canceled'
  current_period_end timestamptz,
  scans_today int not null default 0,
  scans_reset_at date not null default current_date,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Note: writes to subscription_tier / subscription_status only happen
-- server-side via the service role key (in the Stripe webhook handler),
-- never directly from the client. No update policy is granted to users.

-- Atomically checks and increments a user's daily scan count.
-- SECURITY DEFINER so it can bypass RLS to write scans_today/scans_reset_at,
-- but it independently verifies the caller is the same user (auth.uid())
-- so no one can spend down someone else's scan budget.
-- Returns true if the scan is allowed (and was counted), false if the
-- daily cap was already hit.
create or replace function public.try_consume_scan(p_user_id uuid, p_daily_cap int)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row record;
begin
  if auth.uid() is distinct from p_user_id then
    raise exception 'not authorized';
  end if;

  select scans_today, scans_reset_at into v_row
  from profiles
  where id = p_user_id
  for update;

  if v_row.scans_reset_at < current_date then
    update profiles
      set scans_today = 0, scans_reset_at = current_date
      where id = p_user_id;
    v_row.scans_today := 0;
  end if;

  if v_row.scans_today >= p_daily_cap then
    return false;
  end if;

  update profiles
    set scans_today = scans_today + 1
    where id = p_user_id;

  return true;
end;
$$;

grant execute on function public.try_consume_scan(uuid, int) to authenticated;

-- Historical expectancy per setup type, sourced from your own backtest/trade
-- journal — NOT computed by this app. Update these numbers directly in the
-- Supabase table editor as your bot's stats improve; the scan route reads
-- them live, so no redeploy is needed.
create table if not exists public.setup_stats (
  setup_type text primary key,
  expectancy_r numeric not null,
  win_rate numeric,
  sample_size int,
  updated_at timestamptz not null default now()
);

alter table public.setup_stats enable row level security;

create policy "Anyone signed in can read setup stats"
  on public.setup_stats for select
  using (auth.role() = 'authenticated');

-- Starter placeholders — sample_size = 0 means "insufficient data", so
-- these are allowed (not gated) until you run scripts/sync-expectancy.js
-- against your real trade log. rsi_cross is intentionally absent: the bot
-- folds the RSI-threshold cross into the breakout trigger, it is not a
-- separate entry type (VALID_ENTRY_TYPES has exactly four members).
insert into public.setup_stats (setup_type, expectancy_r, win_rate, sample_size)
values
  ('breakout', 0, null, 0),
  ('pullback', 0, null, 0),
  ('vol_expansion', 0, null, 0),
  ('continuation', 0, null, 0)
on conflict (setup_type) do nothing;

-- Direction-level expectancy gate (MIN_TRADES_DIRECTION = 20,
-- DIRECTION_EXPECTANCY_THRESHOLD = 0.0 in expectancy_gates.py).
create table if not exists public.direction_stats (
  direction text primary key check (direction in ('LONG', 'SHORT')),
  expectancy_r numeric not null,
  win_rate numeric,
  sample_size int,
  updated_at timestamptz not null default now()
);

alter table public.direction_stats enable row level security;

create policy "Anyone signed in can read direction stats"
  on public.direction_stats for select
  using (auth.role() = 'authenticated');

insert into public.direction_stats (direction, expectancy_r, win_rate, sample_size)
values
  ('LONG', 0, null, 0),
  ('SHORT', 0, null, 0)
on conflict (direction) do nothing;
