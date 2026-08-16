"use server";

import {
  saveServicesContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { ServicesPageData } from "@/data/services";

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
    return { ok: true };
  } catch {
    return { ok: false, message: "L'enregistrement a échoué." };
  }
}