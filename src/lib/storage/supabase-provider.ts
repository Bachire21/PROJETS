import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { StorageProvider, UploadedObject } from "./types";

// Provider persistant pour Vercel : les documents de contenu vivent dans
// la table `documents` (Postgres), les images dans le bucket de stockage
// public `uploads`. Aucune écriture sur le filesystem éphémère.

const DOCUMENTS_TABLE = "documents";
const DEFAULT_BUCKET = "uploads";

let client: SupabaseClient | null = null;

function supabase(): SupabaseClient {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requis quand STORAGE_PROVIDER=supabase.",
    );
  }
  client = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

export function supabaseBucket(): string {
  return process.env.SUPABASE_BUCKET ?? DEFAULT_BUCKET;
}

export function isSupabaseUrl(url: string): boolean {
  return url.startsWith(`${process.env.SUPABASE_URL ?? ""}/storage/v1/object`);
}

export const supabaseProvider: StorageProvider = {
  async readDocument(key: string): Promise<string | null> {
    const { data, error } = await supabase()
      .from(DOCUMENTS_TABLE)
      .select("data")
      .eq("key", key)
      .maybeSingle();
    if (error || !data) return null;
    return JSON.stringify(data.data);
  },

  async writeDocument(key: string, json: string): Promise<void> {
    const { error } = await supabase()
      .from(DOCUMENTS_TABLE)
      .upsert(
        { key, data: JSON.parse(json), updated_at: new Date().toISOString() },
        { onConflict: "key" },
      );
    if (error) throw error;
  },

  async uploadObject(
    fileName: string,
    buffer: Buffer,
    contentType: string,
  ): Promise<UploadedObject> {
    const { error } = await supabase()
      .storage.from(supabaseBucket())
      .upload(fileName, buffer, {
        contentType,
        upsert: true,
      });
    if (error) throw error;
    const { data } = supabase()
      .storage.from(supabaseBucket())
      .getPublicUrl(fileName);
    return { url: data.publicUrl, size: buffer.length };
  },

  async deleteObject(url: string): Promise<void> {
    const bucket = supabaseBucket();
    const marker = `/storage/v1/object/public/${bucket}/`;
    const index = url.indexOf(marker);
    if (index === -1) return;
    const name = url.slice(index + marker.length);
    if (!name) return;
    const { error } = await supabase().storage.from(bucket).remove([name]);
    if (error) throw error;
  },
};