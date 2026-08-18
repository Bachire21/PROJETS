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
    console.log("[DEBUG] action saveEcolesContentAction OK");
    return { ok: true };
  } catch (error) {
    console.log(`[DEBUG] action saveEcolesContentAction FAILED: ${(error as Error).message}`);
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
    console.log(`[DEBUG] action publishEstablishmentAction OK (published=${published})`);
    return { ok: true };
  } catch (error) {
    console.log(`[DEBUG] action publishEstablishmentAction FAILED: ${(error as Error).message}`);
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
    console.log("[DEBUG] action deleteEstablishmentAction OK");
    return { ok: true };
  } catch (error) {
    console.log(`[DEBUG] action deleteEstablishmentAction FAILED: ${(error as Error).message}`);
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
    console.log(`[DEBUG] action publishFormationAction OK (published=${published})`);
    return { ok: true };
  } catch (error) {
    console.log(`[DEBUG] action publishFormationAction FAILED: ${(error as Error).message}`);
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
    console.log("[DEBUG] action deleteFormationAction OK");
    return { ok: true };
  } catch (error) {
    console.log(`[DEBUG] action deleteFormationAction FAILED: ${(error as Error).message}`);
    return { ok: false, message: "La suppression a échoué." };
  }
}