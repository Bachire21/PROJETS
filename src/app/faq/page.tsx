import type { Metadata } from "next";
import { getFaqPageData } from "@/lib/faq";
import { sortByOrder } from "@/lib/logement-content-utils";
import { Hero } from "@/components/faq/Hero";
import { FaqSection } from "@/components/faq/FaqSection";
import { FinalCta } from "@/components/faq/FinalCta";
import { PageSkeleton } from "@/components/faq/PageSkeleton";
import { PageError } from "@/components/faq/PageError";

export const metadata: Metadata = {
  title: "FAQ",
  alternates: { canonical: "/faq" },
  description:
    "Les réponses aux questions fréquentes concernant ton projet d'études et ton installation au Maroc.",
};

// La page relit le contenu géré par l'Admin à chaque requête :
// une publication dans /admin/faq est visible immédiatement.
export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const source = await getFaqPageData();

  if (source.status === "error") {
    return <PageError />;
  }

  if (!source.faqItems) {
    return <PageSkeleton />;
  }

  const faqItems = sortByOrder(source.faqItems);

  return (
    <>
      <Hero hero={source.page.hero} />
      <FaqSection items={faqItems} page={source.page} />
      <FinalCta cta={source.page.cta} />
    </>
  );
}