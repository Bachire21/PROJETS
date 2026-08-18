import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { JourneySteps } from "@/components/home/JourneySteps";
import { WhyCampusWay } from "@/components/home/WhyCampusWay";
import { Mission } from "@/components/home/Mission";
import { Services } from "@/components/home/Services";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FinalCta } from "@/components/home/FinalCta";
import { FloatingCta } from "@/components/home/FloatingCta";

export const metadata: Metadata = {
  title: "Étudier au Maroc : orientation et accompagnement | Campus Way",
  description:
    "Campus Way accompagne les étudiants africains francophones dans leur projet d'études au Maroc : orientation, choix de formation, candidature, logement et installation.",
};

export default function Home() {
  console.log("[DEBUG] render page: /");
  return (
    <>
      <Hero />
      <JourneySteps />
      <WhyCampusWay />
      <Mission />
      <Services />
      <HowItWorks />
      <FinalCta />
      <FloatingCta />
    </>
  );
}