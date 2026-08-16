import type { Metadata } from "next";
import { loadEcolesContent } from "@/lib/content-store";
import { isPublished } from "@/lib/logement-content-utils";
import { Hero } from "@/components/ecoles-formations/Hero";
import { CatalogSection } from "@/components/ecoles-formations/CatalogSection";
import { TransparencyBanner } from "@/components/ecoles-formations/TransparencyBanner";
import { CatalogCta } from "@/components/ecoles-formations/CatalogCta";

export const metadata: Metadata = {
  title: "Écoles & Formations au Maroc | Campus Way",
  alternates: { canonical: "/ecoles-formations" },
  description:
    "Découvrez les établissements et les formations au Maroc : universités publiques, grandes écoles, licences et masters, classés par filière, niveau et ville.",
};

// La page relit le contenu géré par l'Admin à chaque requête :
// une publication dans /admin/etablissements est visible immédiatement.
export const dynamic = "force-dynamic";

export default async function EcolesFormationsPage() {
  const content = await loadEcolesContent();
  const establishments = content.establishments.filter((establishment) =>
    isPublished(establishment.published),
  );

  return (
    <>
      <Hero />
      <CatalogSection establishments={establishments} />
      <TransparencyBanner />
      <CatalogCta />
    </>
  );
}