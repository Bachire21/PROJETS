import Link from "next/link";
import { journeySteps } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, iconMap } from "@/components/icons";

export function JourneySteps() {
  return (
    <section className="border-y border-navy-100/70 bg-cream">
      <Container className="py-14 sm:py-20">
        <div className="relative">
          <div
            className="absolute top-[2.4rem] bottom-[2.4rem] left-[2.4rem] w-px bg-gradient-to-b from-navy-200 via-magenta-500/40 to-magenta-500 lg:hidden"
            aria-hidden="true"
          />
          <div
            className="absolute top-[2.4rem] right-[9%] left-[9%] hidden h-px bg-gradient-to-r from-navy-200 via-magenta-500/40 to-magenta-500 lg:block"
            aria-hidden="true"
          />

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {journeySteps.map((step, index) => {
              const Icon = iconMap[step.icon];
              const isLast = index === journeySteps.length - 1;
              return (
                <Reveal key={step.number} delay={index * 100}>
                  <li className="relative flex gap-6 lg:flex-col lg:gap-0 lg:text-center">
                    <Link
                      href={step.href}
                      className="group relative z-10 flex flex-none flex-col items-center"
                      aria-label={`${step.title} — ${step.description}`}
                    >
                      <span
                        className={`flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-full bg-white shadow-md shadow-navy-900/5 ring-1 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-navy-900/10 ${
                          isLast
                            ? "ring-magenta-500/40"
                            : "ring-navy-100 group-hover:ring-magenta-500/40"
                        }`}
                      >
                        <Icon
                          className={`h-7 w-7 transition-colors duration-300 ${
                            isLast
                              ? "text-magenta-500"
                              : "text-navy-900 group-hover:text-magenta-500"
                          }`}
                        />
                        <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-navy-900 font-display text-small font-bold text-white shadow-sm">
                          {step.number}
                        </span>
                      </span>
                    </Link>

                    <div className="flex-1 lg:mt-5">
                      <p className="font-display text-label font-bold uppercase tracking-[0.16em] text-magenta-500">
                        Étape {step.number}
                      </p>
                      <h3 className="mt-1.5 text-h4 text-navy-900">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 max-w-[17rem] text-secondary leading-relaxed text-navy-700/70 lg:mx-auto">
                        {step.description}
                      </p>
                    </div>

                    {!isLast ? (
                      <span
                        className="absolute top-[1.75rem] -right-4 hidden text-navy-300 lg:block"
                        aria-hidden="true"
                      >
                        <ArrowRightIcon className="h-5 w-5" />
                      </span>
                    ) : null}
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
