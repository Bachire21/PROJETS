"use server";

import {
  saveEtudesContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { EtudesPageData } from "@/data/etudier-au-maroc";

export type SaveResult = { ok: boolean; message?: string };

export async function saveEtudesContentAction(
  content: EtudesPageData,
  activityNote?: string,
): Promise<SaveResult> {
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
    console.log(`[DEBUG] action saveEtudesContentAction FAILED: ${(error as Error).message}`);
    return { ok: false, message: "L'enregistrement a échoué." };
  }
}