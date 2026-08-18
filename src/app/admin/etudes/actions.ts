"use server";

import {
  saveEtudesContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { EtudesPageData } from "@/data/etudier-au-maroc";
import { logStorageError, safeStorageMessage } from "@/lib/storage/errors";
import { requireAdminSession } from "@/lib/require-admin";

export type SaveResult = { ok: boolean; message?: string };

export async function saveEtudesContentAction(
  content: EtudesPageData,
  activityNote?: string,
): Promise<SaveResult> {
  await requireAdminSession();
  try {
    await saveEtudesContent(content);
    await appendActivityLog(
      activityNote ?? "Contenu « Étudier au Maroc » enregistré",
      "Étudier au Maroc",
      "Enregistré",
    );
    console.log("[DEBUG] action saveEtudesContentAction OK");
    return { ok: true };
  } catch (error) {
    logStorageError("saveEtudesContentAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'enregistrement a échoué."),
    };
  }
}