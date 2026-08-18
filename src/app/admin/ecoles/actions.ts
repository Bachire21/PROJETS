"use server";

import {
  loadEcolesContent,
  saveEcolesContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { EcolesContent } from "@/lib/content-store";
import type { Establishment, Formation } from "@/data/ecoles-formations";
import { logStorageError, safeStorageMessage } from "@/lib/storage/errors";
import { requireAdminSession } from "@/lib/require-admin";

export type SaveResult = { ok: boolean; message?: string };

export async function saveEcolesContentAction(
  content: EcolesContent,
  activityNote?: string,
): Promise<SaveResult> {
  await requireAdminSession();
  try {
    await saveEcolesContent(content);
    await appendActivityLog(
      activityNote ?? "Catalogue enregistré",
      "Écoles & Formations",
      "Enregistré",
    );
    console.log("[DEBUG] action saveEcolesContentAction OK");
    return { ok: true };
  } catch (error) {
    logStorageError("saveEcolesContentAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'enregistrement a échoué."),
    };
  }
}

export async function publishEstablishmentAction(
  item: Establishment,
  published: boolean,
): Promise<SaveResult> {
  await requireAdminSession();
  try {
    const content = await loadEcolesContent();
    content.establishments = content.establishments.map((current) =>
      current.id === item.id ? { ...current, published } : current,
    );
    await saveEcolesContent(content);
    await appendActivityLog(
      published ? "Établissement publié" : "Établissement dépublié",
      item.name,
      published ? "Publié" : "Brouillon",
    );
    console.log(`[DEBUG] action publishEstablishmentAction OK (published=${published})`);
    return { ok: true };
  } catch (error) {
    logStorageError("publishEstablishmentAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'action a échoué."),
    };
  }
}

export async function deleteEstablishmentAction(
  item: Establishment,
): Promise<SaveResult> {
  await requireAdminSession();
  try {
    const content = await loadEcolesContent();
    content.establishments = content.establishments.filter(
      (current) => current.id !== item.id,
    );
    await saveEcolesContent(content);
    await appendActivityLog("Établissement supprimé", item.name, "Supprimé");
    console.log("[DEBUG] action deleteEstablishmentAction OK");
    return { ok: true };
  } catch (error) {
    logStorageError("deleteEstablishmentAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "La suppression a échoué."),
    };
  }
}

export async function publishFormationAction(
  item: Formation,
  published: boolean,
): Promise<SaveResult> {
  await requireAdminSession();
  try {
    const content = await loadEcolesContent();
    content.formations = content.formations.map((current) =>
      current.id === item.id ? { ...current, published } : current,
    );
    await saveEcolesContent(content);
    await appendActivityLog(
      published ? "Formation publiée" : "Formation dépubliée",
      item.name,
      published ? "Publié" : "Brouillon",
    );
    console.log(`[DEBUG] action publishFormationAction OK (published=${published})`);
    return { ok: true };
  } catch (error) {
    logStorageError("publishFormationAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "L'action a échoué."),
    };
  }
}

export async function deleteFormationAction(
  item: Formation,
): Promise<SaveResult> {
  await requireAdminSession();
  try {
    const content = await loadEcolesContent();
    content.formations = content.formations.filter(
      (current) => current.id !== item.id,
    );
    await saveEcolesContent(content);
    await appendActivityLog("Formation supprimée", item.name, "Supprimé");
    console.log("[DEBUG] action deleteFormationAction OK");
    return { ok: true };
  } catch (error) {
    logStorageError("deleteFormationAction", error);
    return {
      ok: false,
      message: safeStorageMessage(error, "La suppression a échoué."),
    };
  }
}