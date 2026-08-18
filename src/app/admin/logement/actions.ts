"use server";

import {
  saveLogementContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { LogementPageData } from "@/data/logement-installation";
import { logStorageError, safeStorageMessage } from "@/lib/storage/errors";

export type SaveResult = { ok: boolean; message?: string };

export async function saveLogementContentAction(
  content: LogementPageData,
  activityNote?: string,
): Promise<SaveResult> {
  try {
    await saveLogementContent(content);
    await appendActivityLog(
      activityNote ?? "Contenu « Logement & Installation » enregistré",
      "Logement & Installation",
      "Enregistré",
    );
    console.log("[DEBUG] action saveLogementContentAction OK");
    return { ok: true };
  } catch (error) {
    logStorageError("saveLogementContentAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'enregistrement a échoué."),
    };
  }
}