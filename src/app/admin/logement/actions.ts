"use server";

import {
  saveLogementContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { LogementPageData } from "@/data/logement-installation";
import { logStorageError, safeStorageMessage } from "@/lib/storage/errors";
import { requireAdminSession } from "@/lib/require-admin";

export type SaveResult = { ok: boolean; message?: string };

export async function saveLogementContentAction(
  content: LogementPageData,
  activityNote?: string,
): Promise<SaveResult> {
  await requireAdminSession();
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