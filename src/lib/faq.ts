import { loadFaqContent } from "@/lib/content-store";
import type { FAQItem } from "@/data/faq";

export type FaqPageSource =
  | { status: "success"; faqItems: FAQItem[]; page: FaqPage }
  | { status: "error" };

export type FaqPage = Awaited<ReturnType<typeof loadFaqContent>>["page"];

// Source des données de la page publique /faq.
// Aujourd'hui : contenu géré par fichier JSON sur le serveur (prêt pour
// /admin/faq). Les vraies questions/réponses publiées y seront ajoutées.
// Demain : remplacer loadFaqContent par un appel à l'API connectée
// à la base de données (ADMIN → FAQ).
// La page publique n'affiche que les questions publiées.

export async function getFaqPageData(): Promise<FaqPageSource> {
  try {
    const content = await loadFaqContent();
    const faqItems = content.faqItems.filter((item) => item.published);
    return { status: "success", faqItems, page: content.page };
  } catch {
    return { status: "error" };
  }
}