"use server";

import {
  saveServicesContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { ServicesPageData } from "@/data/services";
import { logStorageError, safeStorageMessage } from "@/lib/storage/errors";

export type SaveResult = { ok: boolean; message?: string };

export async function saveServicesContentAction(
  content: ServicesPageData,
  activityNote?: string,
): Promise<SaveResult> {
  try {
    await saveServicesContent(content);
    await appendActivityLog(
      activityNote ?? "Contenu « Nos services » enregistré",
      "Nos services",
      "Enregistré",
    );
    console.log("[DEBUG] action saveServicesContentAction OK");
    return { ok: true };
  } catch (error) {
    logStorageError("saveServicesContentAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'enregistrement a échoué."),
    };
  }
}