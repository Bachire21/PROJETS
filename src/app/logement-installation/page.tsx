import type { Metadata } from "next";
import { getLogementPageData } from "@/lib/logement-installation";
import { isPublished, sortByOrder } from "@/lib/logement-content-utils";
import { Hero } from "@/components/logement-installation/Hero";
import { Steps } from "@/components/logement-installation/Steps";
import { Support } from "@/components/logement-installation/Support";
import { VisualSection } from "@/components/logement-installation/VisualSection";
import { Transparency } from "@/components/logement-installation/Transparency";
import { FinalCta } from "@/components/logement-installation/FinalCta";
import { PageSkeleton } from "@/components/logement-installation/PageSkeleton";
import { PageEmpty } from "@/components/logement-installation/PageEmpty";
import { PageError } from "@/components/logement-installation/PageError";

export const metadata: Metadata = {
  title: "Logement & Installation au Maroc | Campus Way",
  alternates: { canonical: "/logement-installation" },
  description:
    "Prépare ton installation au Maroc : logement, zones, arrivée et premières démarches. Campus Way t'accompagne dans la préparation de ton arrivée.",
};

// La page relit le contenu géré par l'Admin à chaque requête :
// une publication dans /admin/logement est visible immédiatement.
export const dynamic = "force-dynamic";

export default async function LogementInstallationPage() {
  console.log("[DEBUG] render page: /logement-installation");
  const source = await getLogementPageData();

  if (source.status === "error") {
    return <PageError />;
  }

  if (!source.data) {
    return <PageSkeleton />;
  }

  const { data } = source;

  const hasAnySection =
    isPublished(data.hero.published) ||
    isPublished(data.stepsSection.published) ||
    isPublished(data.supportSection.published) ||
    isPublished(data.visualSection.published) ||
    isPublished(data.information.published) ||
    isPublished(data.cta.published);

  if (!hasAnySection) {
    return <PageEmpty />;
  }

  const steps = sortByOrder(
    data.stepsSection.steps.filter((step) => isPublished(step.published)),
  );
  const items = sortByOrder(
    data.supportSection.items.filter((item) => isPublished(item.published)),
  );

  return (
    <>
      {isPublished(data.hero.published) ? <Hero data={data.hero} /> : null}
      {isPublished(data.stepsSection.published) ? (
        <Steps data={{ ...data.stepsSection, steps }} />
      ) : null}
      {isPublished(data.supportSection.published) ? (
        <Support data={{ ...data.supportSection, items }} />
      ) : null}
      {isPublished(data.visualSection.published) ? (
        <VisualSection data={data.visualSection} />
      ) : null}
      {isPublished(data.information.published) ? (
        <Transparency data={data.information} />
      ) : null}
      {isPublished(data.cta.published) ? <FinalCta data={data.cta} /> : null}
    </>
  );
}