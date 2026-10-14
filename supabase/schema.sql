-- Run this in Supabase SQL Editor after creating a new project.
-- Public website visitors may submit enquiries; only authorized admins should read them.
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  interest text not null default 'Property enquiry',
  message text,
  source text not null default 'website',
  created_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;

-- Public insert is intentionally limited to enquiry submissions.
create policy "Public can submit website enquiries"
on public.enquiries
for insert
to anon, authenticated
with check (
  length(trim(name)) between 2 and 120
  and length(trim(phone)) between 7 and 40
  and length(trim(interest)) between 2 and 180
  and (message is null or length(message) <= 5000)
);

-- Do NOT create a public SELECT policy for enquiries.
-- Admin reads should use authenticated users plus a role/claim-based policy,
-- or a server-side function. Never put the Supabase service-role key in VITE_ variables.
