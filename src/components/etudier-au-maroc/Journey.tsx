import type { EtudesPageData } from "@/data/etudier-au-maroc";
import { sortByOrder } from "@/lib/logement-content-utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Journey({
  section,
}: {
  section: EtudesPageData["journeySection"];
}) {
  const steps = sortByOrder(section.steps).filter((step) => step.published);
  const last = steps.length - 1;
  const numberFor = (index: number) => String(index + 1).padStart(2, "0");

  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-magenta-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-[-10%] h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-400 sm:text-sm">
              <span className="h-px w-8 bg-magenta-400/70" aria-hidden="true" />
              {section.eyebrow}
            </p>
            <h2 className="mt-5 text-h2 text-white sm:text-h2-lg">
              {section.title}
            </h2>
            <p className="mt-5 max-w-xl text-lead text-cream/80">
              {section.description}
            </p>
          </div>
        </Reveal>

        <div className="relative mt-16 sm:mt-20">
          <div
            className="absolute top-[2.3rem] right-[8%] left-[8%] hidden h-0.5 bg-gradient-to-r from-navy-600 via-navy-500 to-magenta-500 lg:block"
            aria-hidden="true"
          />
          <div
            className="absolute top-[2.3rem] bottom-[2.3rem] left-[2.3rem] w-0.5 bg-gradient-to-b from-navy-600 via-navy-500 to-magenta-500 lg:hidden"
            aria-hidden="true"
          />

          <ol
            className="grid gap-12 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-8"
            style={{ "--steps": steps.length } as React.CSSProperties}
          >
            {steps.map((step, index) => (
              <Reveal key={step.id} delay={index * 110}>
                <li className="relative flex gap-6 lg:flex-col lg:gap-0 lg:text-center">
                  <span
                    className={`relative z-10 flex h-[4.6rem] w-[4.6rem] flex-none items-center justify-center rounded-full border font-display text-body font-bold transition-colors duration-300 ${
                      index === last
                        ? "border-transparent bg-magenta-500 text-white shadow-lg shadow-magenta-500/40"
                        : "border-navy-500/60 bg-navy-800 text-white"
                    }`}
                  >
                    {numberFor(index)}
                  </span>
                  <div className="flex-1 lg:mt-6">
                    <p className="font-display text-label font-bold uppercase tracking-[0.16em] text-navy-300">
                      Étape {numberFor(index)}
                    </p>
                    <p className="mt-2 max-w-xs text-lead font-medium text-cream/85 lg:mx-auto">
                      {step.title}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}