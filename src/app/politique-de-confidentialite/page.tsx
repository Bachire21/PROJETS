import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/politique-de-confidentialite" },
  description:
    "Politique de confidentialité de Campus Way : collecte, utilisation et protection de tes données personnelles.",
};

export default function PolitiqueConfidentialitePage() {
  console.log("[DEBUG] render page: /politique-de-confidentialite");
  return (
    <Container className="py-20 sm:py-28">
      <h1 className="text-3xl font-bold text-navy-900 sm:text-4xl">
        Politique de confidentialité
      </h1>
      <p className="mt-6 max-w-2xl leading-relaxed text-navy-700/75">
        La politique de confidentialité de Campus Way (données collectées,
        finalités, droits des utilisateurs) sera publiée ici à une prochaine
        étape.
      </p>
    </Container>
  );
}