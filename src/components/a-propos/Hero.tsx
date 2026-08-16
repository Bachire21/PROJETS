import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MapPinIcon } from "@/components/icons";
import { aProposPage } from "@/data/a-propos";

export function Hero() {
  const { hero } = aProposPage;

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-cream blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 right-[-12%] h-[26rem] w-[26rem] rounded-full bg-violet-500/[0.06] blur-3xl"
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
              <div className="relative flex flex-col items-center gap-6 px-10 py-16 sm:py-20">
                <span className="flex h-24 w-24 items-center justify-center rounded-3xl bg-navy-900 text-white shadow-xl shadow-navy-900/20">
                  <span className="font-display text-5xl font-bold">C</span>
                </span>
                <div className="w-full max-w-xs space-y-3">
                  <div className="h-3.5 w-11/12 rounded-full bg-navy-900/10" />
                  <div className="h-3.5 w-9/12 rounded-full bg-navy-900/10" />
                </div>
                <div className="w-full max-w-xs rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
                  <p className="text-label font-bold uppercase tracking-[0.14em] text-navy-900/50">
                    Campus Way
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-secondary font-bold text-navy-900">
                    <MapPinIcon className="h-4 w-4 text-magenta-500" />
                    Casablanca, Maroc
                  </p>
                </div>
              </div>
            </div>

            <span className="absolute -bottom-5 left-6 inline-flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-2.5 text-secondary font-bold text-navy-900 shadow-xl shadow-navy-900/15 backdrop-blur float-soft">
              Orientation
            </span>
            <span className="absolute -top-5 -right-2 inline-flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-2.5 text-secondary font-bold text-navy-900 shadow-xl shadow-navy-900/15 backdrop-blur float-soft float-soft-delay sm:-right-4">
              Installation
            </span>
            <div
              className="pointer-events-none absolute -top-7 -left-5 h-24 w-24 rounded-full border-2 border-dashed border-magenta-500/30 sm:-left-7"
              aria-hidden="true"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}