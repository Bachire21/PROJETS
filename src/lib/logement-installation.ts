import { loadLogementContent } from "@/lib/content-store";
import type { LogementPageData } from "@/data/logement-installation";

export type LogementPageSource =
  | { status: "success"; data: LogementPageData }
  | { status: "error" };

// Source des données de la page publique /logement-installation.
// Aujourd'hui : contenu géré par l'Admin (/admin/logement), stocké en fichier.
// Demain : remplacer loadLogementContent par un appel à l'API connectée
// à la base de données (ADMIN → Logement & Installation).

export async function getLogementPageData(): Promise<LogementPageSource> {
  try {
    const data = await loadLogementContent();
    return { status: "success", data };
  } catch {
    return { status: "error" };
  }
}