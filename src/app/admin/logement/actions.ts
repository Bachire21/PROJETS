"use server";

import {
  saveLogementContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { LogementPageData } from "@/data/logement-installation";

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
    return { ok: true };
  } catch {
    return { ok: false, message: "L'enregistrement a échoué." };
  }
}