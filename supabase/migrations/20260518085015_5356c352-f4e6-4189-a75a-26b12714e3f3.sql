-- Profiles
create table public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  subscription_status text not null default 'free' check (subscription_status in ('free','paid')),
  subscription_start timestamptz,
  sessions_today integer not null default 0,
  last_session_date date
);
alter table public.user_profiles enable row level security;
create policy "own profile read" on public.user_profiles for select using (auth.uid() = id);
create policy "own profile insert" on public.user_profiles for insert with check (auth.uid() = id);
create policy "own profile update" on public.user_profiles for update using (auth.uid() = id);
create policy "own profile delete" on public.user_profiles for delete using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_profiles (id) values (new.id) on conflict do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Sessions
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  session_number integer not null default 1,
  title text,
  summary text
);
alter table public.sessions enable row level security;
create policy "own sessions read" on public.sessions for select using (auth.uid() = user_id);
create policy "own sessions insert" on public.sessions for insert with check (auth.uid() = user_id);
create policy "own sessions update" on public.sessions for update using (auth.uid() = user_id);
create policy "own sessions delete" on public.sessions for delete using (auth.uid() = user_id);
create index sessions_user_created_idx on public.sessions(user_id, created_at desc);

-- Messages
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text not null,
  lever_tags text[] not null default '{}',
  state_family text,
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;
create policy "own messages read" on public.messages for select using (auth.uid() = user_id);
create policy "own messages insert" on public.messages for insert with check (auth.uid() = user_id);
create policy "own messages delete" on public.messages for delete using (auth.uid() = user_id);
create index messages_session_idx on public.messages(session_id, created_at);