import type { ServicesPageData } from "@/data/services";
import { sortByOrder } from "@/lib/logement-content-utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FlagIcon } from "@/components/icons";

export function ParcoursTimeline({
  parcours,
}: {
  parcours: ServicesPageData["parcours"];
}) {
  const steps = sortByOrder(parcours.steps).filter((step) => step.published);
  const numberFor = (index: number) => String(index + 1).padStart(2, "0");

  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-500 sm:text-sm">
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
              {parcours.eyebrow}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-12">
          <div className="hidden lg:block">
            <div className="relative">
              <div
                className="absolute top-7 right-[8%] left-[8%] h-0.5 bg-gradient-to-r from-magenta-500/50 via-navy-200 to-magenta-500/50"
                aria-hidden="true"
              />
              <div
                className="grid items-start lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))]"
                style={{ "--steps": steps.length + 1 } as React.CSSProperties}
              >
                {steps.map((step, index) => (
                  <Reveal key={step.id} delay={index * 90}>
                    <div className="group relative text-center">
                      <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 font-display text-secondary font-bold text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-magenta-500 group-hover:shadow-lg group-hover:shadow-magenta-500/40">
                        {numberFor(index)}
                      </span>
                      <p className="mt-4 text-h4 text-navy-900">
                        {step.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
                <Reveal delay={steps.length * 90}>
                  <div className="group relative text-center">
                    <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-magenta-500 ring-2 ring-magenta-500/60 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-magenta-500/40">
                      <FlagIcon className="h-6 w-6" />
                    </span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <ol className="relative">
              {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                return (
                  <li key={step.id} className="relative flex gap-5 pb-8 last:pb-0">
                    {!isLast ? (
                      <span
                        className="absolute top-12 left-7 -bottom-2 w-0.5 bg-gradient-to-b from-magenta-500/50 to-navy-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-secondary font-bold text-white ring-2 ring-magenta-500/60">
                      {numberFor(index)}
                    </span>
                    <p className="pt-4 text-h4 text-navy-900">
                      {step.label}
                    </p>
                  </li>
                );
              })}
              <li className="relative flex gap-5">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-magenta-500 ring-2 ring-magenta-500/60">
                  <FlagIcon className="h-6 w-6" />
                </span>
              </li>
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}