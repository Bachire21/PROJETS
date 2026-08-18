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
import { logStorageError, safeStorageMessage } from "@/lib/storage/errors";
import { requireAdminSession } from "@/lib/require-admin";

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
// 4 Mo max : sous la limite des Server Actions (6 Mo configurés) et sous
// la limite de body des fonctions Vercel (4,5 Mo), en laissant la marge
// de l'encodage multipart.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export async function uploadMediaAction(
  formData: FormData,
): Promise<SaveResult & { media?: MediaItem }> {
  await requireAdminSession();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Aucun fichier reçu." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, message: "Le fichier dépasse 4 Mo." };
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
    console.log(`[DEBUG] action uploadMediaAction OK (${uploaded.size} bytes)`);
    return { ok: true, media };
  } catch (error) {
    logStorageError("uploadMediaAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'import de l'image a échoué."),
    };
  }
}

export async function addMediaAction(
  item: Omit<MediaItem, "id" | "createdAt" | "custom">,
): Promise<SaveResult> {
  await requireAdminSession();
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
    console.log("[DEBUG] action addMediaAction OK");
    return { ok: true };
  } catch (error) {
    logStorageError("addMediaAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'ajout du média a échoué."),
    };
  }
}

export async function deleteMediaAction(item: MediaItem): Promise<SaveResult> {
  await requireAdminSession();
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
      await getStorage().deleteObject(item.url).catch((error) => {
      logStorageError(`deleteMediaAction deleteObject "${item.url}"`, error);
    });
    }
    await appendActivityLog("Média supprimé", item.name, "Supprimé");
    console.log("[DEBUG] action deleteMediaAction OK");
    return { ok: true };
  } catch (error) {
    logStorageError("deleteMediaAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "La suppression a échoué."),
    };
  }
}