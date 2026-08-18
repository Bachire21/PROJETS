"use server";

import {
  saveSettingsContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { SiteSettings } from "@/data/settings";
import { logStorageError, safeStorageMessage } from "@/lib/storage/errors";

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
    logStorageError("saveSettingsContentAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'enregistrement a échoué."),
    };
  }
}