-- Manual bank/crypto checkout orders (verified email + unique reference code)

create table if not exists public.manual_payment_otp_codes (
  email text primary key,
  code text not null,
  first_name text not null,
  last_name text not null,
  phone text not null,
  product_slug text not null check (product_slug in ('host-kit', 'guest-guide', 'finance')),
  payment_method text not null check (payment_method in ('bank', 'crypto')),
  attempts integer not null default 0,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.manual_payment_orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  product_slug text not null check (product_slug in ('host-kit', 'guest-guide', 'finance')),
  payment_method text not null check (payment_method in ('bank', 'crypto')),
  amount_usd numeric(10, 2) not null,
  status text not null default 'pending_payment',
  crypto_tx_hash text,
  email_verified_at timestamptz not null default now(),
  crypto_submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint manual_payment_orders_order_code_key unique (order_code),
  constraint manual_payment_orders_status_check check (
    status in (
      'pending_payment',
      'awaiting_crypto_tx',
      'pending_review',
      'paid',
      'fulfilled',
      'rejected'
    )
  )
);

create index if not exists manual_payment_orders_created_at_idx
  on public.manual_payment_orders (created_at desc);

create index if not exists manual_payment_orders_status_idx
  on public.manual_payment_orders (status);

create index if not exists manual_payment_orders_email_idx
  on public.manual_payment_orders (email);

alter table public.manual_payment_otp_codes enable row level security;
alter table public.manual_payment_orders enable row level security;

-- No public policies: Edge Functions use service role only.
