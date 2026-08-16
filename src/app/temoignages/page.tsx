import type { Metadata } from "next";
import { getTemoignagesPageData } from "@/lib/temoignages";
import { sortByOrder } from "@/lib/logement-content-utils";
import { Hero } from "@/components/temoignages/Hero";
import { TestimonialsGrid } from "@/components/temoignages/TestimonialsGrid";
import { FinalCta } from "@/components/temoignages/FinalCta";
import { PageSkeleton } from "@/components/temoignages/PageSkeleton";
import { PageError } from "@/components/temoignages/PageError";

export const metadata: Metadata = {
  title: "Témoignages",
  alternates: { canonical: "/temoignages" },
  description:
    "Les histoires des étudiants accompagnés par Campus Way : de leur pays d'origine jusqu'à leur campus au Maroc.",
};

// La page relit le contenu géré par l'Admin à chaque requête :
// un témoignage publié dans /admin/temoignages est visible immédiatement.
export const dynamic = "force-dynamic";

export default async function TemoignagesPage() {
  const source = await getTemoignagesPageData();

  if (source.status === "error") {
    return <PageError />;
  }

  if (!source.testimonials) {
    return <PageSkeleton />;
  }

  const testimonials = sortByOrder(source.testimonials);

  return (
    <>
      <Hero hero={source.page.hero} />
      <TestimonialsGrid testimonials={testimonials} page={source.page} />
      <FinalCta cta={source.page.cta} />
    </>
  );
}