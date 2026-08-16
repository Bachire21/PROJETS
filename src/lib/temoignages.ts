import { loadTemoignagesContent } from "@/lib/content-store";
import type { Testimonial } from "@/data/temoignages";

export type TemoignagesPageSource =
  | { status: "success"; testimonials: Testimonial[]; page: TemoignagesPage }
  | { status: "error" };

export type TemoignagesPage = Awaited<
  ReturnType<typeof loadTemoignagesContent>
>["page"];

// Source des données de la page publique /temoignages.
// Aujourd'hui : contenu géré par fichier JSON sur le serveur (prêt pour
// /admin/temoignages). Seuls de vrais témoignages y seront ajoutés.
// Demain : remplacer loadTemoignagesContent par un appel à l'API connectée
// à la base de données (ADMIN → Témoignages → page publique).
// La page publique n'affiche que les témoignages publiés.

export async function getTemoignagesPageData(): Promise<TemoignagesPageSource> {
  try {
    const content = await loadTemoignagesContent();
    const testimonials = content.testimonials.filter((item) => item.published);
    return { status: "success", testimonials, page: content.page };
  } catch {
    return { status: "error" };
  }
}