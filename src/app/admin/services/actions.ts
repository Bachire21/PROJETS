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
    console.log("[DEBUG] action saveServicesContentAction OK");
    return { ok: true };
  } catch (error) {
    console.log(`[DEBUG] action saveServicesContentAction FAILED: ${(error as Error).message}`);
    return { ok: false, message: "L'enregistrement a échoué." };
  }
}