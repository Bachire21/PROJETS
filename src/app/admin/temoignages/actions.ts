"use server";

import {
  loadTemoignagesContent,
  saveTemoignagesContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { TemoignagesContent } from "@/lib/content-store";
import type { Testimonial } from "@/data/temoignages";
import { logStorageError, safeStorageMessage } from "@/lib/storage/errors";
import { requireAdminSession } from "@/lib/require-admin";

export type SaveResult = { ok: boolean; message?: string };

export async function saveTemoignagesContentAction(
  content: TemoignagesContent,
  activityNote?: string,
): Promise<SaveResult> {
  await requireAdminSession();
  try {
    await saveTemoignagesContent(content);
    await appendActivityLog(
      activityNote ?? "Témoignages enregistrés",
      "Témoignages",
      "Enregistré",
    );
    console.log("[DEBUG] action saveTemoignagesContentAction OK");
    return { ok: true };
  } catch (error) {
    logStorageError("saveTemoignagesContentAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'enregistrement a échoué."),
    };
  }
}

export async function publishTestimonialAction(
  item: Testimonial,
  published: boolean,
): Promise<SaveResult> {
  await requireAdminSession();
  try {
    const content = await loadTemoignagesContent();
    content.testimonials = content.testimonials.map((current) =>
      current.id === item.id ? { ...current, published } : current,
    );
    await saveTemoignagesContent(content);
    await appendActivityLog(
      published ? "Témoignage publié" : "Témoignage dépublié",
      `${item.firstName} ${item.lastName}`.trim(),
      published ? "Publié" : "Brouillon",
    );
    console.log(`[DEBUG] action publishTestimonialAction OK (published=${published})`);
    return { ok: true };
  } catch (error) {
    logStorageError("publishTestimonialAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'action a échoué."),
    };
  }
}

export async function deleteTestimonialAction(
  item: Testimonial,
): Promise<SaveResult> {
  await requireAdminSession();
  try {
    const content = await loadTemoignagesContent();
    content.testimonials = content.testimonials.filter(
      (current) => current.id !== item.id,
    );
    await saveTemoignagesContent(content);
    await appendActivityLog(
      "Témoignage supprimé",
      `${item.firstName} ${item.lastName}`.trim(),
      "Supprimé",
    );
    console.log("[DEBUG] action deleteTestimonialAction OK");
    return { ok: true };
  } catch (error) {
    logStorageError("deleteTestimonialAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "La suppression a échoué."),
    };
  }
}