import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FindSchoolForm } from "@/components/find-school/FindSchoolForm";
import { hero } from "@/data/find-school";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Trouver mon école",
  alternates: { canonical: "/trouver-mon-ecole" },
  description:
    "Raconte-nous ton profil et ton projet : Campus Way t'aide à trouver l'école et la formation qui te correspondent au Maroc.",
};

export default function TrouverMonEcolePage() {
  console.log("[DEBUG] render page: /trouver-mon-ecole");
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute -top-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-cream blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/4 right-[-12%] h-[24rem] w-[24rem] rounded-full bg-magenta-500/[0.05] blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <Reveal>
            <div className="max-w-xl">
              <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-magenta-500 sm:text-sm">
                <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
                {hero.eyebrow}
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl lg:text-[3.25rem]">
                {hero.title}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-navy-700/75 sm:text-xl">
                {hero.description}
              </p>
              <ul className="mt-9 space-y-3.5">
                {hero.checks.map((check) => (
                  <li key={check} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-magenta-500/10 text-magenta-600">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium text-navy-900">{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div
                className="pointer-events-none absolute -top-8 -right-4 h-40 w-40 rounded-full border-2 border-dashed border-magenta-500/30 sm:-right-8 sm:h-48 sm:w-48"
                aria-hidden="true"
              />
              <div className="group relative overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/15 ring-1 ring-navy-900/5">
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  width={1400}
                  height={933}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 left-5 flex items-center gap-4 rounded-2xl bg-white/95 p-4 pr-6 shadow-xl shadow-navy-900/15 backdrop-blur sm:left-8">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xl"
                  aria-hidden="true"
                >
                  {hero.card.icon}
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-navy-900 sm:text-base">
                    {hero.card.title}
                  </p>
                  <p className="mt-0.5 text-sm text-navy-700/70">
                    {hero.card.description}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <FindSchoolForm />
    </>
  );
}