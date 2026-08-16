import { Hero } from "@/components/home/Hero";
import { JourneySteps } from "@/components/home/JourneySteps";
import { WhyCampusWay } from "@/components/home/WhyCampusWay";
import { Mission } from "@/components/home/Mission";
import { Services } from "@/components/home/Services";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FinalCta } from "@/components/home/FinalCta";
import { FloatingCta } from "@/components/home/FloatingCta";

export default function Home() {
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