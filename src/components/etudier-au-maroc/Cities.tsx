import Link from "next/link";
import type { EtudesPageData } from "@/data/etudier-au-maroc";
import { sortByOrder } from "@/lib/logement-content-utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, MapPinIcon } from "@/components/icons";

export function Cities({
  section,
}: {
  section: EtudesPageData["citiesSection"];
}) {
  const cities = sortByOrder(section.cities).filter((city) => city.published);

  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
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

        <div className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city, index) => (
            <Reveal key={city.id} delay={index * 70}>
              <Link
                href="/trouver-mon-ecole"
                className="group relative flex items-center gap-4 overflow-hidden rounded-3xl bg-white p-6 shadow-sm shadow-navy-900/[0.04] ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/10 sm:p-7"
              >
                <span
                  className="pointer-events-none absolute top-0 right-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-magenta-500/[0.07] blur-2xl transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-3"
                  aria-hidden="true"
                />
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-900 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-white">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-h4 text-navy-900">
                    {city.name}
                  </span>
                  <span className="mt-0.5 block text-secondary text-navy-700/60">
                    Destination d&apos;études
                  </span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy-100 text-navy-900/40 transition-all duration-300 group-hover:border-transparent group-hover:bg-magenta-500 group-hover:text-white">
                  <ArrowRightIcon className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}