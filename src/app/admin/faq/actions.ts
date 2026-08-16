"use server";

import {
  loadFaqContent,
  saveFaqContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { FaqContent } from "@/lib/content-store";
import type { FAQItem } from "@/data/faq";

export type SaveResult = { ok: boolean; message?: string };

export async function saveFaqContentAction(
  content: FaqContent,
  activityNote?: string,
): Promise<SaveResult> {
  try {
    await saveFaqContent(content);
    const note = activityNote ?? "FAQ enregistrée";
    await appendActivityLog(note, "FAQ", "Enregistré");
    return { ok: true };
  } catch {
    return { ok: false, message: "L'enregistrement a échoué." };
  }
}

export async function publishFaqAction(
  item: FAQItem,
  published: boolean,
): Promise<SaveResult> {
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
    return { ok: true };
  } catch {
    return { ok: false, message: "L'action a échoué." };
  }
}

export async function deleteFaqAction(item: FAQItem): Promise<SaveResult> {
  try {
    const content = await loadFaqContent();
    content.faqItems = content.faqItems.filter(
      (current) => current.id !== item.id,
    );
    await saveFaqContent(content);
    await appendActivityLog("FAQ supprimée", item.question, "Supprimé");
    return { ok: true };
  } catch {
    return { ok: false, message: "La suppression a échoué." };
  }
}