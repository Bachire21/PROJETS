"use server";

import {
  loadDemandesContent,
  saveDemandesContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { OrientationRequestStatus } from "@/data/demandes";
import { orientationRequestStatuses } from "@/data/demandes";

export type SaveResult = { ok: boolean; message?: string };

export async function updateRequestStatusAction(
  id: string,
  status: OrientationRequestStatus,
): Promise<SaveResult> {
  try {
    const content = await loadDemandesContent();
    const request = content.requests.find((current) => current.id === id);
    if (!request) {
      return { ok: false, message: "Demande introuvable." };
    }
    content.requests = content.requests.map((current) =>
      current.id === id
        ? { ...current, status, updatedAt: new Date().toISOString() }
        : current,
    );
    await saveDemandesContent(content);
    const label =
      orientationRequestStatuses.find((item) => item.value === status)?.label ??
      status;
    await appendActivityLog(
      `Demande ${request.number} — statut ${label}`,
      `${request.firstName} ${request.lastName}`.trim(),
      "Traité",
    );
    console.log(`[DEBUG] action updateRequestStatusAction OK (status=${status})`);
    return { ok: true };
  } catch (error) {
    console.log(`[DEBUG] action updateRequestStatusAction FAILED: ${(error as Error).message}`);
    return { ok: false, message: "La mise à jour a échoué." };
  }
}

export async function addRequestNoteAction(
  id: string,
  text: string,
): Promise<SaveResult> {
  const trimmed = text.trim();
  if (!trimmed) {
    return { ok: false, message: "La note est vide." };
  }
  try {
    const content = await loadDemandesContent();
    const request = content.requests.find((current) => current.id === id);
    if (!request) {
      return { ok: false, message: "Demande introuvable." };
    }
    content.requests = content.requests.map((current) =>
      current.id === id
        ? {
            ...current,
            notes: [
              ...current.notes,
              {
                id: crypto.randomUUID(),
                text: trimmed,
                createdAt: new Date().toISOString(),
              },
            ],
            updatedAt: new Date().toISOString(),
          }
        : current,
    );
    await saveDemandesContent(content);
    await appendActivityLog(
      `Note ajoutée sur la demande ${request.number}`,
      `${request.firstName} ${request.lastName}`.trim(),
      "Enregistré",
    );
    console.log("[DEBUG] action addRequestNoteAction OK");
    return { ok: true };
  } catch (error) {
    console.log(`[DEBUG] action addRequestNoteAction FAILED: ${(error as Error).message}`);
    return { ok: false, message: "L'ajout de la note a échoué." };
  }
}

export async function archiveRequestAction(id: string): Promise<SaveResult> {
  return updateRequestStatusAction(id, "archivee");
}