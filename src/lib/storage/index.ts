import type { StorageProvider } from "./types";
import { DOCUMENT_KEYS } from "./types";
import { fileProvider } from "./file-provider";
import { supabaseProvider } from "./supabase-provider";
import { logStorageError } from "./errors";

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
  console.log("[DEBUG] storage provider =", mode);
  return provider;
}

export async function readStoredJson<T>(key: string, fallback: () => T): Promise<T> {
  const start = Date.now();
  const raw = await getStorage().readDocument(key);
  if (raw === null) {
    console.log(`[DEBUG] readStoredJson "${key}" -> null (fallback) in ${Date.now() - start}ms`);
    return JSON.parse(JSON.stringify(fallback())) as T;
  }
  try {
    const parsed = JSON.parse(raw) as T;
    console.log(`[DEBUG] readStoredJson "${key}" -> ${raw.length} bytes in ${Date.now() - start}ms`);
    return parsed;
  } catch (error) {
    logStorageError(`readStoredJson "${key}" (parse)`, error);
    return JSON.parse(JSON.stringify(fallback())) as T;
  }
}

export async function writeStoredJson<T>(key: string, content: T): Promise<void> {
  const start = Date.now();
  const json = JSON.stringify(content, null, 2);
  try {
    await getStorage().writeDocument(key, json);
    console.log(`[DEBUG] writeStoredJson "${key}" -> ${json.length} bytes in ${Date.now() - start}ms`);
  } catch (error) {
    logStorageError(`writeStoredJson "${key}"`, error);
    throw error;
  }
}

export { isSupabaseUrl } from "./supabase-provider";