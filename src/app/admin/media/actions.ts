"use server";

import path from "node:path";
import { revalidatePath } from "next/cache";
import {
  loadMediaContent,
  saveMediaContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { MediaItem } from "@/data/media";
import { knownImages } from "@/lib/known-images";
import { computeMediaUsage, pageLabel } from "@/lib/media-usage";
import { getStorage, isSupabaseUrl } from "@/lib/storage";
import { logStorageError, safeStorageMessage } from "@/lib/storage/errors";
import { requireAdminSession } from "@/lib/require-admin";

export type SaveResult = { ok: boolean; message?: string };

// Formats acceptés, classés par type de média. Le dossier du bucket
// (`images/`, `documents/`, `videos/`) dépend du type détecté : la
// médiathèque reste organisée même quand elle grossit.
const TYPE_BY_EXTENSION: Record<string, MediaItem["type"]> = {
  ".jpg": "image",
  ".jpeg": "image",
  ".png": "image",
  ".webp": "image",
  ".gif": "image",
  ".avif": "image",
  ".svg": "image",
  ".pdf": "document",
  ".doc": "document",
  ".docx": "document",
  ".mp4": "video",
  ".webm": "video",
  ".mov": "video",
};

const TYPE_FOLDER: Record<MediaItem["type"], string> = {
  image: "images",
  document: "documents",
  video: "videos",
};

const TYPE_LABEL: Record<MediaItem["type"], string> = {
  image: "image",
  document: "document",
  video: "vidéo",
};

// Taille maximale par type. Les images restent à 4 Mo (comportement actuel,
// sous la limite de body des fonctions Vercel en laissant la marge de
// l'encodage multipart) ; documents et vidéos acceptent des fichiers plus
// lourds, plafonnés par serverActions.bodySizeLimit (voir next.config.ts).
const MAX_BYTES: Record<MediaItem["type"], number> = {
  image: 4 * 1024 * 1024,
  document: 10 * 1024 * 1024,
  video: 15 * 1024 * 1024,
};

const FORMAT_ERROR =
  "Ce format de fichier n'est pas pris en charge (images : JPG, PNG, WEBP, GIF, AVIF, SVG — documents : PDF, DOC, DOCX — vidéos : MP4, WEBM, MOV).";

function sizeError(type: MediaItem["type"]): string {
  const mb = Math.round(MAX_BYTES[type] / (1024 * 1024));
  return `Ce fichier dépasse la taille maximale autorisée (${mb} Mo pour une ${TYPE_LABEL[type]}).`;
}

function refreshMediaPage(): void {
  revalidatePath("/admin/media");
}

export async function listMediaAction(): Promise<MediaItem[]> {
  await requireAdminSession();
  const content = await loadMediaContent();
  return content.items;
}

export async function uploadMediaAction(
  formData: FormData,
): Promise<SaveResult & { media?: MediaItem }> {
  await requireAdminSession();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Aucun fichier reçu." };
  }
  const extension = path.extname(file.name).toLowerCase();
  const type = TYPE_BY_EXTENSION[extension];
  if (!type) {
    return { ok: false, message: FORMAT_ERROR };
  }
  if (file.size > MAX_BYTES[type]) {
    return { ok: false, message: sizeError(type) };
  }
  try {
    const baseName = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
    const folder = TYPE_FOLDER[type];
    const fileName = `${folder}/${Date.now()}-${baseName || "media"}${extension}`;
    const contentType = file.type || "application/octet-stream";
    const uploaded = await getStorage().uploadObject(
      fileName,
      Buffer.from(await file.arrayBuffer()),
      contentType,
    );

    const media: MediaItem = {
      id: crypto.randomUUID(),
      name: baseName || file.name,
      type,
      size: uploaded.size,
      url: uploaded.url,
      createdAt: new Date().toISOString(),
      usage: [],
      custom: true,
      path: uploaded.path,
      mimeType: contentType,
    };
    const content = await loadMediaContent();
    content.items = [media, ...content.items];
    await saveMediaContent(content);
    await appendActivityLog("Média ajouté", media.name, "Enregistré");
    refreshMediaPage();
    console.log(`[DEBUG] action uploadMediaAction OK (${uploaded.size} bytes)`);
    return { ok: true, media };
  } catch (error) {
    logStorageError("uploadMediaAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'import du média a échoué."),
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
    refreshMediaPage();
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
  if (knownImages.includes(item.url)) {
    return {
      ok: false,
      message:
        "Ce média est une image du site utilisée par les contenus par défaut : il ne peut pas être supprimé.",
    };
  }
  try {
    const usage = await computeMediaUsage([item]);
    const pages = [...new Set([...(usage[item.id] ?? []), ...item.usage])].map(
      pageLabel,
    );
    if (pages.length > 0) {
      return {
        ok: false,
        message: `Ce média est utilisé par le site public (${pages.join(", ")}) : il ne peut pas être supprimé.`,
      };
    }
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
    refreshMediaPage();
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