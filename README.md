# Campus Way

Site public + espace d'administration (CMS) de Campus Way — orientation et accompagnement des étudiants africains francophones vers les études au Maroc.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- Authentification Admin par cookie signé (HMAC), accès protégé par `src/proxy.ts`
- Stockage via une couche unique `src/lib/storage/` :
  - `STORAGE_PROVIDER=file` : fichiers locaux (`content/*.json`, `public/uploads/`) — développement / VPS
  - `STORAGE_PROVIDER=supabase` : table `documents` (Postgres) + bucket `uploads` — production Vercel

## Démarrage

```bash
npm install
npm run dev
```

Variables requises (voir `.env.example`) : `CW_ADMIN_SESSION_SECRET`, `CW_ADMIN_EMAIL`, `CW_ADMIN_CODE_SALT`, `CW_ADMIN_CODE_HASH`, `STORAGE_PROVIDER`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_BUCKET`, `NEXT_PUBLIC_SITE_URL`.

## Production Vercel

1. Créer le projet Supabase et exécuter `supabase/schema.sql` (table `documents`).
2. Renseigner les variables d'environnement dans Vercel (`STORAGE_PROVIDER=supabase`).
3. Déployer, puis migrer les données locales : `node scripts/migrate-to-supabase.mjs`.
4. Pointage du domaine : `NEXT_PUBLIC_SITE_URL` (ex. `https://campusway.ma`).

## Scripts

```bash
npm run dev      # développement
npm run lint     # ESLint
npm run build    # build de production
npm run start    # serveur de production
```

## Données

Les contenus administrables (établissements, formations, FAQ, témoignages, logement, services, étudier au Maroc, médiathèque, demandes d'orientation, journal d'activité) sont lus à chaque requête : une publication depuis l'Admin est visible immédiatement sur le site public.
