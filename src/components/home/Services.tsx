import Link from "next/link";
import { servicesSection } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, ArrowUpRightIcon, iconMap } from "@/components/icons";

const spans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-7",
  "lg:col-span-5",
];

export function Services() {
  const { services, allCta } = servicesSection;

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-500 sm:text-sm">
                <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
                {servicesSection.eyebrow}
              </p>
              <h2 className="mt-5 text-h2 text-navy-900 sm:text-h2-lg">
                {servicesSection.title}
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-12">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Reveal
                key={service.number}
                delay={index * 70}
                className={spans[index]}
              >
                <Link
                  href={allCta.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-magenta-500/30 hover:shadow-xl hover:shadow-navy-900/5 sm:p-9"
                >
                  <span
                    className="pointer-events-none absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-magenta-500/[0.06] blur-2xl transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-4"
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start justify-between">
                    <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-navy-50 text-navy-900 transition-all duration-300 group-hover:bg-navy-900 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-h4 font-bold tracking-tight text-navy-200 transition-colors duration-300 group-hover:text-magenta-500">
                      {service.number}
                    </span>
                  </div>
                  <h3 className="relative mt-7 text-h4 text-navy-900">
                    {service.title}
                  </h3>
                  <p className="relative mt-2.5 flex-1 text-secondary leading-relaxed text-navy-700/70">
                    {service.description}
                  </p>
                  <span className="relative mt-7 inline-flex items-center gap-2 text-secondary font-semibold text-navy-900/30 transition-colors duration-300 group-hover:text-magenta-600">
                    Découvrir
                    <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}

          <Reveal delay={services.length * 70} className={spans[5]}>
            <Link
              href={allCta.href}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-navy-900 p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9"
            >
              <div
                className="pointer-events-none absolute -top-16 -right-10 h-52 w-52 rounded-full bg-magenta-500/25 blur-3xl"
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-violet-500/20 blur-3xl" aria-hidden="true" />
              <div className="relative">
                <p className="text-label font-bold uppercase tracking-[0.16em] text-magenta-400">
                  Tout notre accompagnement
                </p>
                <h3 className="mt-3 text-h3 leading-snug text-white sm:text-h3-lg">
                  Un service pour chaque étape, un interlocuteur pour tout le
                  parcours.
                </h3>
              </div>
              <span className="relative mt-8 inline-flex items-center gap-2 font-semibold text-white">
                {allCta.label}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-magenta-500">
                  <ArrowRightIcon className="h-4.5 w-4.5" />
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}