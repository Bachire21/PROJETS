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
    console.log("[DEBUG] action saveSettingsContentAction OK");
    return { ok: true };
  } catch (error) {
    console.log(`[DEBUG] action saveSettingsContentAction FAILED: ${(error as Error).message}`);
    return { ok: false, message: "L'enregistrement a échoué." };
  }
}