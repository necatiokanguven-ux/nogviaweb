-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.lite_otp_codes (
  email text primary key,
  code text not null,
  first_name text not null,
  last_name text not null,
  attempts integer not null default 0,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.lite_download_leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  verified_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint lite_download_leads_email_key unique (email)
);

create index if not exists lite_download_leads_created_at_idx
  on public.lite_download_leads (created_at desc);

alter table public.lite_otp_codes enable row level security;
alter table public.lite_download_leads enable row level security;

-- No public policies: only service role (Edge Functions) can read/write.
