import Image from "next/image";
import { homeHero } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons";

export function Hero() {
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
              {homeHero.eyebrow}
            </p>
            <h1 className="mt-6 text-hero tracking-tight text-navy-900 sm:text-hero-lg">
              {homeHero.titleStart}{" "}
              <span className="relative inline-block text-magenta-500">
                {homeHero.titleHighlight}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-magenta-500/50 sm:-bottom-2"
                  viewBox="0 0 220 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9c40-7 130-8 214-4"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-lead text-navy-700/75">
              {homeHero.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={homeHero.primaryCta.href} size="lg">
                {homeHero.primaryCta.label}
                <ArrowRightIcon className="h-4.5 w-4.5" />
              </Button>
              <Button
                href={homeHero.secondaryCta.href}
                size="lg"
                variant="outline"
              >
                {homeHero.secondaryCta.label}
                <ArrowRightIcon className="h-4.5 w-4.5" />
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={150}>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div
              className="pointer-events-none absolute -top-8 -right-4 h-40 w-40 rounded-full border-2 border-dashed border-magenta-500/30 sm:-right-8 sm:h-48 sm:w-48"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="group relative overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/15 ring-1 ring-navy-900/5">
              <Image
                src={homeHero.image.src}
                alt={homeHero.image.alt}
                width={904}
                height={1280}
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="aspect-[3/4.25] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority
              />
            </div>

            <div className="absolute -bottom-7 left-4 flex items-center gap-4 rounded-2xl bg-white/95 p-4 pr-6 shadow-xl shadow-navy-900/15 backdrop-blur sm:left-8 sm:p-5 sm:pr-7">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xl"
                aria-hidden="true"
              >
                {homeHero.card.icon}
              </span>
              <div>
                <p className="font-display text-secondary font-bold text-navy-900 sm:text-base">
                  {homeHero.card.title}
                </p>
                <p className="mt-0.5 text-secondary text-navy-700/70">
                  {homeHero.card.description}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
