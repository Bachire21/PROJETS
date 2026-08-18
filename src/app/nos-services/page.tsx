import type { Metadata } from "next";
import { loadServicesContent } from "@/lib/content-store";
import { isPublished } from "@/lib/logement-content-utils";
import { Hero } from "@/components/services/Hero";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { ParcoursTimeline } from "@/components/services/ParcoursTimeline";
import { ImmersiveSection } from "@/components/services/ImmersiveSection";
import { Strengths } from "@/components/services/Strengths";
import { FinalCta } from "@/components/services/FinalCta";

export const metadata: Metadata = {
  title: "Nos services",
  alternates: { canonical: "/nos-services" },
  description:
    "Orientation études au Maroc, admission, logement étudiant, accueil et installation : des services d'accompagnement pour les étudiants africains francophones.",
};

// La page relit le contenu géré par l'Admin à chaque requête :
// une publication dans /admin/services est visible immédiatement.
export const dynamic = "force-dynamic";

export default async function NosServicesPage() {
  console.log("[DEBUG] render page: /nos-services");
  const content = await loadServicesContent();

  return (
    <>
      {isPublished(content.hero.published) ? <Hero hero={content.hero} /> : null}
      {isPublished(content.servicesSection.published) ? (
        <ServicesGrid servicesSection={content.servicesSection} />
      ) : null}
      {isPublished(content.parcours.published) ? (
        <ParcoursTimeline parcours={content.parcours} />
      ) : null}
      {isPublished(content.immersive.published) ? (
        <ImmersiveSection immersive={content.immersive} />
      ) : null}
      <Strengths strengths={content.strengths} />
      {isPublished(content.cta.published) ? (
        <FinalCta cta={content.cta} />
      ) : null}
    </>
  );
}