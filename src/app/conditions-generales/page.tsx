import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Conditions générales",
  alternates: { canonical: "/conditions-generales" },
};

export default function ConditionsGeneralesPage() {
  console.log("[DEBUG] render page: /conditions-generales");
  return (
    <Container className="py-20 sm:py-28">
      <h1 className="text-3xl font-bold text-navy-900 sm:text-4xl">
        Conditions générales
      </h1>
      <p className="mt-6 max-w-2xl leading-relaxed text-navy-700/75">
        Les conditions générales de vente et d&apos;utilisation des services
        Campus Way seront publiées ici à une prochaine étape.
      </p>
    </Container>
  );
}