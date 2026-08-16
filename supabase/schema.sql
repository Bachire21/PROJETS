-- Campus Way — schéma Supabase
-- La table `documents` stocke chaque contenu administrable comme un
-- document JSON (clé = nom du contenu). Les images sont stockées dans
-- le bucket public `uploads` (créé par le script de migration).

create table if not exists public.documents (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.documents enable row level security;

-- Lecture publique autorisée (les contenus publiés sont publics).
create policy "documents_select_public" on public.documents
  for select using (true);

-- Les écritures passent par la clé service_role (bypass RLS).
-- Aucune écriture n'est possible depuis le navigateur.