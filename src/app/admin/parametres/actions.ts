"use server";

import {
  saveSettingsContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { SiteSettings } from "@/data/settings";

export type SaveResult = { ok: boolean; message?: string };

export async function saveSettingsContentAction(
  content: SiteSettings,
): Promise<SaveResult> {
  try {
    await saveSettingsContent(content);
    await appendActivityLog(
      "Paramètres du site modifiés",
      "Paramètres",
      "Enregistré",
    );
    return { ok: true };
  } catch {
    return { ok: false, message: "L'enregistrement a échoué." };
  }
}