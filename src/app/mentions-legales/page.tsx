import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
  description:
    "Mentions légales du site Campus Way : éditeur, hébergement et conditions d'utilisation du site.",
};

export default function MentionsLegalesPage() {
  console.log("[DEBUG] render page: /mentions-legales");
  return (
    <Container className="py-20 sm:py-28">
      <h1 className="text-3xl font-bold text-navy-900 sm:text-4xl">
        Mentions légales
      </h1>
      <p className="mt-6 max-w-2xl leading-relaxed text-navy-700/75">
        Les mentions légales de Campus Way (éditeur, hébergeur, propriété
        intellectuelle) seront publiées ici à une prochaine étape.
      </p>
    </Container>
  );
}