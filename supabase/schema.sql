-- Campus Way — schéma Supabase (migration idempotente)
-- La table `documents` stocke chaque contenu administrable comme un
-- document JSON (clé = nom du contenu). Les images sont stockées dans
-- le bucket public `uploads` (créé par le script de migration).
--
-- Cette migration peut être exécutée plusieurs fois sans erreur :
--   - create table / alter table : déjà idempotents nativement ;
--   - la policy : `CREATE POLICY` n'a pas d'option IF NOT EXISTS en
--     PostgreSQL, elle est donc créée uniquement si absente (garde
--     vérifiée dans pg_policies), sans jamais supprimer l'existante.

create table if not exists public.documents (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.documents enable row level security;

-- Lecture publique autorisée (les contenus publiés sont publics).
-- Créée uniquement si elle n'existe pas déjà, sans la remplacer.
do $$
begin
  if not exists (
    select 1
    from pg_catalog.pg_policies
    where schemaname = 'public'
      and tablename = 'documents'
      and policyname = 'documents_select_public'
  ) then
    create policy "documents_select_public" on public.documents
      for select using (true);
  end if;
end $$;

-- Les écritures passent par la clé service_role (bypass RLS).
-- Aucune écriture n'est possible depuis le navigateur.
