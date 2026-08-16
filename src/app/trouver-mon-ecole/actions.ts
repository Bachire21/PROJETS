"use server";

import {
  loadDemandesContent,
  saveDemandesContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { StudentFormData } from "@/data/find-school";
import { nextRequestNumber } from "@/lib/demandes";

export type SubmitResult = { ok: boolean; message?: string };

export async function submitOrientationRequest(
  data: StudentFormData,
): Promise<SubmitResult> {
  try {
    const content = await loadDemandesContent();
    const now = new Date().toISOString();
    const number = nextRequestNumber(content.requests);

    const request = {
      id: crypto.randomUUID(),
      number,
      status: "nouvelle" as const,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      country: data.country,
      whatsapp: data.whatsapp.trim(),
      email: data.email.trim(),
      diploma: data.diploma,
      level: data.educationLevel,
      field: data.desiredField,
      city: data.desiredCity,
      budget: data.budget,
      intake: data.intake,
      needs: {
        orientation: data.needs.includes("orientation"),
        admission: data.needs.includes("admission"),
        housing: data.needs.includes("logement"),
        installation: data.needs.includes("installation"),
      },
      message: data.message.trim(),
      notes: [],
      createdAt: now,
      updatedAt: now,
    };

    content.requests = [request, ...content.requests];
    await saveDemandesContent(content);
    await appendActivityLog(
      `Demande ${number} reçue`,
      `${data.firstName} ${data.lastName}`.trim(),
      "Nouvelle",
    );
    return { ok: true };
  } catch {
    return {
      ok: false,
      message:
        "L'envoi de ta demande a échoué. Réessaie dans quelques instants.",
    };
  }
}