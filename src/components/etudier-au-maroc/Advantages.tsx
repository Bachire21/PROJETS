import type { EtudesPageData } from "@/data/etudier-au-maroc";
import { sortByOrder } from "@/lib/logement-content-utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  BuildingIcon,
  ChatIcon,
  GlobeIcon,
  GraduationIcon,
  MapPinIcon,
} from "@/components/icons";

const iconMap = {
  graduation: GraduationIcon,
  building: BuildingIcon,
  chat: ChatIcon,
  globe: GlobeIcon,
  pin: MapPinIcon,
} as const;

const secondarySpans = [
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-7",
];

export function Advantages({
  section,
}: {
  section: EtudesPageData["advantagesSection"];
}) {
  const advantages = sortByOrder(section.advantages).filter(
    (advantage) => advantage.published,
  );
  const [main, ...secondary] = advantages;
  const numberFor = (index: number) => String(index + 1).padStart(2, "0");
  const MainIcon = iconMap[main.icon as keyof typeof iconMap];

  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div
        className="pointer-events-none absolute top-44 right-[-6%] hidden h-40 w-40 rounded-full border-2 border-dashed border-magenta-500/25 lg:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-28 left-[-2%] hidden h-6 w-6 rounded-full bg-violet-500/25 lg:block"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-500 sm:text-sm">
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
              {section.eyebrow}
            </p>
            <h2 className="mt-5 text-h2 text-navy-900 sm:text-h2-lg">
              {section.title}
            </h2>
            <p className="mt-5 text-lead text-navy-700/75">
              {section.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-12">
            <div className="group relative overflow-hidden rounded-3xl bg-navy-900 p-8 sm:p-10 lg:p-14">
              <span
                className="pointer-events-none absolute -right-6 -bottom-8 hidden text-white/[0.06] sm:block"
                aria-hidden="true"
              >
                <GraduationIcon className="h-64 w-64" />
              </span>
              <span
                className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-magenta-500/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white transition-transform duration-300 group-hover:scale-105">
                  <MainIcon className="h-8 w-8" />
                </span>
                <div className="max-w-3xl">
                  <p className="font-display text-secondary font-bold tracking-[0.14em] text-magenta-400">
                    {numberFor(0)}
                  </p>
                  <h3 className="mt-2 text-h3 text-white sm:text-h3-lg">
                    {main.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-body leading-relaxed text-cream/80">
                    {main.description}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {secondary.map((advantage, index) => {
            const Icon = iconMap[advantage.icon as keyof typeof iconMap];
            return (
              <Reveal
                key={advantage.id}
                delay={index * 80}
                className={secondarySpans[index]}
              >
                <div className="group relative h-full overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/[0.06] hover:ring-magenta-500/40 sm:p-8">
                  <span
                    className="absolute top-6 bottom-6 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-magenta-500 transition-transform duration-300 group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-magenta-500/[0.05] blur-2xl"
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 text-navy-900 transition-all duration-300 group-hover:bg-navy-900 group-hover:text-white">
                      <Icon className="h-5.5 w-5.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    </span>
                    <span className="font-display text-body font-bold text-navy-200 transition-colors duration-300 group-hover:text-magenta-500">
                      {numberFor(index + 1)}
                    </span>
                  </div>
                  <h3 className="relative mt-6 text-h4 text-navy-900">
                    {advantage.title}
                  </h3>
                  <p className="relative mt-2 text-secondary leading-relaxed text-navy-700/70">
                    {advantage.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}