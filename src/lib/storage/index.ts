import type { StorageProvider } from "./types";
import { DOCUMENT_KEYS } from "./types";
import { fileProvider } from "./file-provider";
import { supabaseProvider } from "./supabase-provider";

export { DOCUMENT_KEYS };

// Couche de stockage unique. Provider choisi par variable d'environnement :
//   STORAGE_PROVIDER=file      -> fichiers locaux (développement, VPS)
//   STORAGE_PROVIDER=supabase  -> Postgres + stockage d'objets (Vercel)
// Tous les accès aux données passent par cette couche.

let provider: StorageProvider | null = null;

export function getStorage(): StorageProvider {
  if (provider) return provider;
  const mode = process.env.STORAGE_PROVIDER ?? "file";
  provider = mode === "supabase" ? supabaseProvider : fileProvider;
  return provider;
}

export async function readStoredJson<T>(key: string, fallback: () => T): Promise<T> {
  const raw = await getStorage().readDocument(key);
  if (raw === null) return JSON.parse(JSON.stringify(fallback())) as T;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return JSON.parse(JSON.stringify(fallback())) as T;
  }
}

export async function writeStoredJson<T>(key: string, content: T): Promise<void> {
  await getStorage().writeDocument(key, JSON.stringify(content, null, 2));
}

export { isSupabaseUrl } from "./supabase-provider";