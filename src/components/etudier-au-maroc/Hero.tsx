import Image from "next/image";
import type { EtudesPageData } from "@/data/etudier-au-maroc";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons";

export function Hero({ hero }: { hero: EtudesPageData["hero"] }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-cream blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 right-[-12%] h-[26rem] w-[26rem] rounded-full bg-magenta-500/[0.05] blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-16 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <Reveal>
          <div className="max-w-xl">
            <p className="flex items-center gap-2.5 text-label uppercase tracking-[0.16em] text-magenta-500">
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
              {hero.eyebrow}
            </p>
            <h1 className="mt-6 text-hero tracking-tight text-navy-900 sm:text-hero-lg">
              {hero.title}
            </h1>
            <p className="mt-7 max-w-lg text-lead text-navy-700/75">
              {hero.description}
            </p>
            <div className="mt-10">
              <Button
                href={hero.primaryCta.href}
                size="lg"
                className="group rounded-xl! shadow-lg! shadow-navy-900/25 hover:-translate-y-0.5 focus-visible:outline-magenta-500"
              >
                {hero.primaryCta.label}
                <ArrowRightIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <p className="mt-5 flex items-center gap-2 text-secondary font-semibold text-navy-700/60">
                {hero.reassurance.split("·").map((part, index) => (
                  <span key={part} className="flex items-center gap-2">
                    {index > 0 ? (
                      <span
                        className="h-1 w-1 rounded-full bg-magenta-500/60"
                        aria-hidden="true"
                      />
                    ) : null}
                    {part.trim()}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={150}>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div
              className="pointer-events-none absolute -top-8 -right-4 h-44 w-44 rounded-full border-2 border-dashed border-magenta-500/30 sm:-right-8 sm:h-52 sm:w-52"
              aria-hidden="true"
            />
            <div className="group relative overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/20 ring-1 ring-navy-900/10 transition-shadow duration-500 hover:shadow-navy-900/25">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                width={1400}
                height={1750}
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority
              />
            </div>

            {hero.cards.map((card, index) => (
              <div
                key={card.title}
                className={`absolute flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 pr-5 shadow-xl shadow-navy-900/15 backdrop-blur ${
                  index === 0
                    ? "-bottom-7 left-4 sm:left-8 float-soft"
                    : "top-6 -right-2 sm:top-8 sm:-right-4 float-soft float-soft-delay"
                }`}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-lg"
                  aria-hidden="true"
                >
                  {card.icon}
                </span>
                <div>
                  <p className="font-display text-secondary font-bold text-navy-900">
                    {card.title}
                  </p>
                  <p className="text-secondary text-navy-700/70">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}