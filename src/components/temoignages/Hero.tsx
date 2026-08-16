import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteIcon, UserIcon } from "@/components/icons";
import type { TemoignagesPage } from "@/lib/temoignages";

export function Hero({ hero }: { hero: TemoignagesPage["hero"] }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-cream blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[24rem] w-[24rem] rounded-full bg-violet-500/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-16 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <Reveal>
          <div className="max-w-xl">
            <p className="flex items-center gap-2.5 text-label uppercase tracking-[0.16em] text-magenta-500">
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
              {hero.eyebrow}
            </p>
            <h1 className="mt-6 text-hero tracking-tight text-navy-900 sm:text-hero-lg">
              {hero.title}
            </h1>
            <p className="mt-7 max-w-md text-lead text-navy-700/75">
              {hero.description}
            </p>
          </div>
        </Reveal>

        <Reveal direction="right" delay={150}>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] bg-cream ring-1 ring-navy-100">
              <div
                className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-magenta-500/10 blur-2xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-violet-500/10 blur-2xl"
                aria-hidden="true"
              />
              <QuoteIcon className="pointer-events-none absolute top-8 left-8 h-16 w-16 text-magenta-500/20" />

              <div className="relative flex flex-col items-center gap-4 px-10 py-16 sm:py-20">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-900 text-white shadow-lg shadow-navy-900/20">
                  <UserIcon className="h-7 w-7" />
                </span>
                <div className="w-full max-w-xs space-y-3">
                  <div className="h-2.5 w-11/12 rounded-full bg-navy-900/10" />
                  <div className="h-2.5 w-9/12 rounded-full bg-navy-900/10" />
                  <div className="h-2.5 w-10/12 rounded-full bg-navy-900/10" />
                </div>
                <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-label font-bold text-navy-900 shadow-sm">
                  <QuoteIcon className="h-3.5 w-3.5 text-magenta-500" />
                  Parcours accompagné
                </span>
              </div>
            </div>

            <div
              className="pointer-events-none absolute -top-6 -left-4 h-24 w-24 rounded-full border-2 border-dashed border-magenta-500/30 sm:-left-6"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-5 -bottom-6 h-28 w-28 rounded-full border-2 border-dashed border-violet-500/30 sm:-right-7"
              aria-hidden="true"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}