-- Optional: the app creates these tables itself on first use.
-- Run this in Supabase → SQL Editor if you prefer to create them up front.
create table if not exists purchases (
  stripe_session_id text primary key,
  user_id text,                -- Supabase auth user id
  email text not null,
  amount integer,              -- in cents
  currency text,
  payment_intent text,
  status text not null default 'paid',   -- paid | refunded
  created_at timestamptz not null default now()
);
create index if not exists purchases_email_idx on purchases (email);
create index if not exists purchases_user_idx on purchases (user_id);

create table if not exists library_requests (
  email text primary key,
  name text,
  provider text not null default 'email',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Only the server (direct Postgres connection) reads these. Block the public API.
alter table purchases enable row level security;
alter table library_requests enable row level security;
