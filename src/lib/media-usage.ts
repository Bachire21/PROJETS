import { DOCUMENT_KEYS, getStorage } from "@/lib/storage";
import type { MediaItem } from "@/data/media";

// Usage dynamique des médias : le champ `usage` stocké sur chaque MediaItem
// n'est jamais maintenu à jour par les pages (elles ne déclarent pas leur
// usage). À la place, on scanne tous les documents de contenu à la demande
// pour retrouver les références par `id` (ex. hero de Étudier au Maroc) ou
// par `url` (ex. champs image des autres pages).

export { PAGE_LABELS, pageLabel } from "@/lib/media-page-labels";

function walk(
  value: unknown,
  ids: Set<string>,
  urls: Set<string>,
): Set<string> {
  const found = new Set<string>();
  if (typeof value === "string") {
    if (urls.has(value)) found.add("url");
    return found;
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      for (const kind of walk(entry, ids, urls)) found.add(kind);
    }
    return found;
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.id === "string" && ids.has(record.id)) found.add("id");
    for (const entry of Object.values(record)) {
      for (const kind of walk(entry, ids, urls)) found.add(kind);
    }
  }
  return found;
}

export async function computeMediaUsage(
  mediaItems: MediaItem[],
): Promise<Record<string, string[]>> {
  const result: Record<string, string[]> = {};
  const ids = new Set(mediaItems.map((item) => item.id));
  const urls = new Set(mediaItems.map((item) => item.url));

  for (const key of Object.values(DOCUMENT_KEYS)) {
    if (key === DOCUMENT_KEYS.media) continue;
    const raw = await getStorage().readDocument(key);
    if (raw === null) continue;
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      continue;
    }
    for (const item of mediaItems) {
      const kinds = walk(parsed, ids, urls);
      if (kinds.size > 0) {
        (result[item.id] ??= []).push(key);
      }
    }
  }
  return result;
}