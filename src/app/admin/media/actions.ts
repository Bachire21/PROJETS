"use server";

import path from "node:path";
import {
  loadMediaContent,
  saveMediaContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { MediaItem } from "@/data/media";
import { knownImages } from "@/components/admin/ui/fields";
import { getStorage, isSupabaseUrl } from "@/lib/storage";

export type SaveResult = { ok: boolean; message?: string };

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".svg",
]);
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export async function uploadMediaAction(
  formData: FormData,
): Promise<SaveResult & { media?: MediaItem }> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Aucun fichier reçu." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, message: "Le fichier dépasse 5 Mo." };
  }
  const extension = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return {
      ok: false,
      message: "Format non pris en charge (JPG, PNG, WEBP, GIF, AVIF, SVG).",
    };
  }
  try {
    const baseName = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
    const fileName = `${Date.now()}-${baseName || "image"}${extension}`;
    const contentType = file.type || "application/octet-stream";
    const uploaded = await getStorage().uploadObject(
      fileName,
      Buffer.from(await file.arrayBuffer()),
      contentType,
    );

    const media: MediaItem = {
      id: crypto.randomUUID(),
      name: baseName || file.name,
      type: "image",
      size: uploaded.size,
      url: uploaded.url,
      createdAt: new Date().toISOString(),
      usage: [],
      custom: true,
    };
    const content = await loadMediaContent();
    content.items = [media, ...content.items];
    await saveMediaContent(content);
    await appendActivityLog("Média ajouté", media.name, "Enregistré");
    return { ok: true, media };
  } catch {
    return { ok: false, message: "L'import de l'image a échoué." };
  }
}

export async function addMediaAction(
  item: Omit<MediaItem, "id" | "createdAt" | "custom">,
): Promise<SaveResult> {
  try {
    const content = await loadMediaContent();
    const media: MediaItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      custom: true,
    };
    content.items = [media, ...content.items];
    await saveMediaContent(content);
    await appendActivityLog("Média ajouté", item.name, "Enregistré");
    return { ok: true };
  } catch {
    return { ok: false, message: "L'ajout du média a échoué." };
  }
}

export async function deleteMediaAction(item: MediaItem): Promise<SaveResult> {
  if (item.usage.length > 0 || knownImages.includes(item.url)) {
    return {
      ok: false,
      message:
        "Ce média est utilisé par le site public : il ne peut pas être supprimé.",
    };
  }
  try {
    const content = await loadMediaContent();
    content.items = content.items.filter((current) => current.id !== item.id);
    await saveMediaContent(content);
    if (
      item.custom &&
      (item.url.startsWith("/uploads/") || isSupabaseUrl(item.url))
    ) {
      await getStorage().deleteObject(item.url).catch(() => {});
    }
    await appendActivityLog("Média supprimé", item.name, "Supprimé");
    return { ok: true };
  } catch {
    return { ok: false, message: "La suppression a échoué." };
  }
}