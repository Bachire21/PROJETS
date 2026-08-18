import type { Metadata } from "next";
import { Hero } from "@/components/a-propos/Hero";
import { Identity } from "@/components/a-propos/Identity";
import { Steps } from "@/components/a-propos/Steps";
import { FinalCta } from "@/components/a-propos/FinalCta";

export const metadata: Metadata = {
  title: "À propos",
  alternates: { canonical: "/a-propos" },
  description:
    "Campus Way est une agence d'orientation et d'accompagnement pour les étudiants africains francophones qui souhaitent poursuivre leurs études au Maroc.",
};

export default function AProposPage() {
  console.log("[DEBUG] render page: /a-propos");
  return (
    <>
      <Hero />
      <Identity />
      <Steps />
      <FinalCta />
    </>
  );
}