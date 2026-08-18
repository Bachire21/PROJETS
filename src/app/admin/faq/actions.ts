"use server";

import {
  loadFaqContent,
  saveFaqContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { FaqContent } from "@/lib/content-store";
import type { FAQItem } from "@/data/faq";
import { logStorageError, safeStorageMessage } from "@/lib/storage/errors";
import { requireAdminSession } from "@/lib/require-admin";

export type SaveResult = { ok: boolean; message?: string };

export async function saveFaqContentAction(
  content: FaqContent,
  activityNote?: string,
): Promise<SaveResult> {
  await requireAdminSession();
  try {
    await saveFaqContent(content);
    const note = activityNote ?? "FAQ enregistrée";
    await appendActivityLog(note, "FAQ", "Enregistré");
    console.log("[DEBUG] action saveFaqContentAction OK");
    return { ok: true };
  } catch (error) {
    logStorageError("saveFaqContentAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'enregistrement a échoué."),
    };
  }
}

export async function publishFaqAction(
  item: FAQItem,
  published: boolean,
): Promise<SaveResult> {
  await requireAdminSession();
  try {
    const content = await loadFaqContent();
    content.faqItems = content.faqItems.map((current) =>
      current.id === item.id ? { ...current, published } : current,
    );
    await saveFaqContent(content);
    await appendActivityLog(
      published ? "FAQ publiée" : "FAQ dépubliée",
      item.question,
      published ? "Publié" : "Brouillon",
    );
    console.log(`[DEBUG] action publishFaqAction OK (published=${published})`);
    return { ok: true };
  } catch (error) {
    logStorageError("publishFaqAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'action a échoué."),
    };
  }
}

export async function deleteFaqAction(item: FAQItem): Promise<SaveResult> {
  await requireAdminSession();
  try {
    const content = await loadFaqContent();
    content.faqItems = content.faqItems.filter(
      (current) => current.id !== item.id,
    );
    await saveFaqContent(content);
    await appendActivityLog("FAQ supprimée", item.question, "Supprimé");
    console.log("[DEBUG] action deleteFaqAction OK");
    return { ok: true };
  } catch (error) {
    logStorageError("deleteFaqAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "La suppression a échoué."),
    };
  }
}