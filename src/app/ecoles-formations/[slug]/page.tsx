import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadEcolesContent } from "@/lib/content-store";
import { isPublished } from "@/lib/logement-content-utils";
import { EstablishmentDetail } from "@/components/ecoles-formations/EstablishmentDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await loadEcolesContent();
  const establishment = content.establishments.find(
    (item) => item.slug === slug && isPublished(item.published),
  );
  if (!establishment) {
    return { title: "Établissement introuvable | Campus Way" };
  }
  return {
    title: `${establishment.name} | Campus Way`,
    description: establishment.description,
  };
}

export default async function EstablishmentPage({ params }: Props) {
  const { slug } = await params;
  console.log(`[DEBUG] render page: /ecoles-formations/${slug}`);
  const content = await loadEcolesContent();
  const establishment = content.establishments.find(
    (item) => item.slug === slug && isPublished(item.published),
  );
  if (!establishment) {
    notFound();
  }
  const formations = content.formations.filter((formation) =>
    isPublished(formation.published),
  );
  return (
    <EstablishmentDetail establishment={establishment} formations={formations} />
  );
}