"use server";

import {
  loadEcolesContent,
  saveEcolesContent,
  appendActivityLog,
} from "@/lib/content-store";
import type { EcolesContent } from "@/lib/content-store";
import type { Establishment, Formation } from "@/data/ecoles-formations";

export type SaveResult = { ok: boolean; message?: string };

export async function saveEcolesContentAction(
  content: EcolesContent,
  activityNote?: string,
): Promise<SaveResult> {
  try {
    await saveEcolesContent(content);
    await appendActivityLog(
      activityNote ?? "Catalogue enregistré",
      "Écoles & Formations",
      "Enregistré",
    );
    return { ok: true };
  } catch {
    return { ok: false, message: "L'enregistrement a échoué." };
  }
}

export async function publishEstablishmentAction(
  item: Establishment,
  published: boolean,
): Promise<SaveResult> {
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
    return { ok: true };
  } catch {
    return { ok: false, message: "L'action a échoué." };
  }
}

export async function deleteEstablishmentAction(
  item: Establishment,
): Promise<SaveResult> {
  try {
    const content = await loadEcolesContent();
    content.establishments = content.establishments.filter(
      (current) => current.id !== item.id,
    );
    await saveEcolesContent(content);
    await appendActivityLog("Établissement supprimé", item.name, "Supprimé");
    return { ok: true };
  } catch {
    return { ok: false, message: "La suppression a échoué." };
  }
}

export async function publishFormationAction(
  item: Formation,
  published: boolean,
): Promise<SaveResult> {
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
    return { ok: true };
  } catch {
    return { ok: false, message: "L'action a échoué." };
  }
}

export async function deleteFormationAction(
  item: Formation,
): Promise<SaveResult> {
  try {
    const content = await loadEcolesContent();
    content.formations = content.formations.filter(
      (current) => current.id !== item.id,
    );
    await saveEcolesContent(content);
    await appendActivityLog("Formation supprimée", item.name, "Supprimé");
    return { ok: true };
  } catch {
    return { ok: false, message: "La suppression a échoué." };
  }
}