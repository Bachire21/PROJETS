import { processSection } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FlagIcon } from "@/components/icons";

export function HowItWorks() {
  const { steps } = processSection;
  const last = steps.length - 1;

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
          <div className="text-center">
            <p className="flex items-center justify-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-400 sm:text-sm">
              <span className="h-px w-8 bg-magenta-400/70" aria-hidden="true" />
              {processSection.eyebrow}
              <span className="h-px w-8 bg-magenta-400/70" aria-hidden="true" />
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-h2 text-white sm:text-h2-lg">
              {processSection.title}
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-16 sm:mt-20">
          <div
            className="absolute top-[2.15rem] right-[10%] left-[10%] hidden h-0.5 bg-gradient-to-r from-navy-600 via-navy-500 to-magenta-500 lg:block"
            aria-hidden="true"
          />
          <div
            className="absolute top-[2.3rem] bottom-[2.3rem] left-[2.15rem] w-0.5 bg-gradient-to-b from-navy-600 via-navy-500 to-magenta-500 lg:hidden"
            aria-hidden="true"
          />

          <ol className="grid gap-12 lg:grid-cols-5 lg:gap-8">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 110}>
                <li className="relative flex gap-6 lg:flex-col lg:gap-0 lg:text-center">
                  <span className="relative z-10 flex flex-none items-center justify-center">
                    <span
                      className={`flex h-[4.3rem] w-[4.3rem] items-center justify-center rounded-full border font-display text-body font-bold transition-colors duration-300 ${
                        index === last
                          ? "border-transparent bg-magenta-500 text-white shadow-lg shadow-magenta-500/40"
                          : "border-navy-500/60 bg-navy-800 text-white"
                      }`}
                    >
                      {step.number}
                    </span>
                    {index === last ? (
                      <span
                        className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-navy-900 shadow-md"
                        aria-hidden="true"
                      >
                        <FlagIcon className="h-3.5 w-3.5" />
                      </span>
                    ) : null}
                  </span>

                  <div className="flex-1 lg:mt-6">
                    <p className="font-display text-label font-bold uppercase tracking-[0.16em] text-navy-300">
                      Étape {step.number}
                    </p>
                    <p className="mt-2 max-w-xs text-lead font-medium text-cream/85 lg:mx-auto">
                      {step.title}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={steps.length * 110}>
            <p className="mt-14 text-center text-label font-bold uppercase tracking-[0.22em] text-magenta-400 sm:text-sm">
              Direction : ton arrivée au Maroc
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}