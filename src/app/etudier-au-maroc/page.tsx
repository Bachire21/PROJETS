import type { Metadata } from "next";
import { loadEtudesContent } from "@/lib/content-store";
import { isPublished } from "@/lib/logement-content-utils";
import { Hero } from "@/components/etudier-au-maroc/Hero";
import { Advantages } from "@/components/etudier-au-maroc/Advantages";
import { VisualSection } from "@/components/etudier-au-maroc/VisualSection";
import { Cities } from "@/components/etudier-au-maroc/Cities";
import { Journey } from "@/components/etudier-au-maroc/Journey";
import { Transparency } from "@/components/etudier-au-maroc/Transparency";
import { FinalCta } from "@/components/etudier-au-maroc/FinalCta";

export const metadata: Metadata = {
  title: "Étudier au Maroc",
  alternates: { canonical: "/etudier-au-maroc" },
  description:
    "Étudier au Maroc pour les étudiants africains : formations variées, établissements privés, environnement francophone et villes étudiantes dynamiques comme Casablanca. Campus Way t'accompagne dans ton projet d'études au Maroc.",
};

// La page relit le contenu géré par l'Admin à chaque requête :
// une publication dans /admin/etudes est visible immédiatement.
export const dynamic = "force-dynamic";

export default async function EtudierAuMarocPage() {
  console.log("[DEBUG] render page: /etudier-au-maroc");
  const content = await loadEtudesContent();

  return (
    <>
      {isPublished(content.hero.published) ? <Hero hero={content.hero} /> : null}
      {isPublished(content.advantagesSection.published) ? (
        <Advantages section={content.advantagesSection} />
      ) : null}
      {isPublished(content.visualSection.published) ? (
        <VisualSection section={content.visualSection} />
      ) : null}
      {isPublished(content.citiesSection.published) ? (
        <Cities section={content.citiesSection} />
      ) : null}
      {isPublished(content.journeySection.published) ? (
        <Journey section={content.journeySection} />
      ) : null}
      {isPublished(content.transparency.published) ? (
        <Transparency section={content.transparency} />
      ) : null}
      {isPublished(content.finalCta.published) ? (
        <FinalCta cta={content.finalCta} />
      ) : null}
    </>
  );
}