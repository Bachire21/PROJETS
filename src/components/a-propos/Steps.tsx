import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons";
import { aProposPage } from "@/data/a-propos";

export function Steps() {
  const { steps } = aProposPage;

  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div
        className="pointer-events-none absolute -top-32 left-[-10%] h-96 w-96 rounded-full bg-magenta-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-30%] right-[-10%] h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-500 sm:text-sm">
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
              {steps.eyebrow}
            </p>
            <h2 className="mt-5 text-h2 text-navy-900 sm:text-h2-lg">
              {steps.title}
            </h2>
            <p className="mt-4 text-lead text-navy-700/75">
              {steps.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 80}>
              <Link
                href={step.href}
                className="group relative flex h-full flex-col rounded-[1.5rem] bg-white p-7 ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10"
              >
                <span className="text-label font-bold tracking-[0.18em] text-magenta-500">
                  {step.number}
                </span>
                <p className="mt-4 text-h4 text-navy-900">
                  {step.label}
                </p>
                <p className="mt-2 text-secondary leading-relaxed text-navy-700/70">
                  {step.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-secondary font-bold uppercase text-magenta-600">
                  {step.ctaLabel}
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}