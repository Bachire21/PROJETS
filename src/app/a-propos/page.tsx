import type { Metadata } from "next";
import { Hero } from "@/components/a-propos/Hero";
import { Identity } from "@/components/a-propos/Identity";
import { Vision } from "@/components/a-propos/Vision";
import { Steps } from "@/components/a-propos/Steps";
import { FinalCta } from "@/components/a-propos/FinalCta";

export const metadata: Metadata = {
  title: "À propos",
  alternates: { canonical: "/a-propos" },
  description:
    "Campus Way accompagne les étudiants africains francophones dans leur projet d'études au Maroc : orientation, information et accompagnement de proximité, de la réflexion à l'installation.",
};

export default function AProposPage() {
  console.log("[DEBUG] render page: /a-propos");
  return (
    <>
      <Hero />
      <Identity />
      <Vision />
      <Steps />
      <FinalCta />
    </>
  );
}