-- ============================================================
--  À COLLER DANS SUPABASE :  SQL Editor  >  New query  >  Run
--  (une seule fois, ça crée la table et active le temps réel)
-- ============================================================

create table if not exists public.orders (
  id          uuid primary key default gen_random_uuid(),
  guest_id    text not null,
  guest_name  text not null,
  drink_id    text not null,
  drink_name  text not null,
  category    text,
  quantity    int  not null default 1,
  status      text not null default 'waiting',  -- waiting | preparing | ready | done
  created_at  timestamptz not null default now()
);

create index if not exists orders_guest_idx  on public.orders (guest_id);
create index if not exists orders_status_idx on public.orders (status);

-- Temps réel
alter publication supabase_realtime add table public.orders;

-- Soirée sans login : on autorise l'accès anonyme (clé "anon").
alter table public.orders enable row level security;

drop policy if exists "party_select" on public.orders;
drop policy if exists "party_insert" on public.orders;
drop policy if exists "party_update" on public.orders;
drop policy if exists "party_delete" on public.orders;

create policy "party_select" on public.orders for select using (true);
create policy "party_insert" on public.orders for insert with check (true);
create policy "party_update" on public.orders for update using (true) with check (true);
create policy "party_delete" on public.orders for delete using (true);

-- ============================================================
--  POUR REPARTIR À ZÉRO ENTRE DEUX SOIRÉES (optionnel) :
--    truncate table public.orders;
-- ============================================================
