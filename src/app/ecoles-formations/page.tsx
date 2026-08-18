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
    "Écoles privées au Maroc, formations, niveaux accessibles et frais : découvre les établissements vers lesquels Campus Way peut t'orienter pour tes études au Maroc.",
};

// La page relit le contenu géré par l'Admin à chaque requête :
// une publication dans /admin/etablissements est visible immédiatement.
export const dynamic = "force-dynamic";

export default async function EcolesFormationsPage() {
  console.log("[DEBUG] render page: /ecoles-formations");
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