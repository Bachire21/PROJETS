import Image from "next/image";
import Link from "next/link";
import type { EtudesPageData } from "@/data/etudier-au-maroc";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons";

export function VisualSection({
  section,
}: {
  section: EtudesPageData["visualSection"];
}) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <Reveal direction="left" className="lg:col-span-7">
          <div className="relative">
            <div
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-magenta-500/25 sm:translate-x-6 sm:translate-y-6"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/10 ring-1 ring-navy-900/5">
              <Image
                src={section.image.src}
                alt={section.image.alt}
                width={1400}
                height={2100}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="aspect-[2/3] w-full object-cover sm:aspect-[3/2.4] lg:aspect-[2/2.1]"
              />
            </div>
            <div className="absolute -bottom-5 right-6 flex items-center gap-2.5 rounded-full bg-navy-900 px-5 py-3 shadow-lg shadow-navy-900/25 sm:right-10">
              <span
                className="h-2 w-2 rounded-full bg-magenta-500"
                aria-hidden="true"
              />
              <p className="text-secondary font-semibold text-white">
                {section.badge}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={120} className="lg:col-span-5">
          <div className="max-w-xl">
            <p className="flex items-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-500 sm:text-sm">
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
              {section.eyebrow}
            </p>
            <h2 className="mt-5 text-h2 font-bold text-navy-900 sm:text-h2-lg">
              {section.title}
            </h2>
            <p className="mt-6 text-lead leading-relaxed text-navy-700/75 sm:text-xl">
              {section.description}
            </p>
            <Link
              href={section.cta.href}
              className="group mt-9 inline-flex items-center gap-2 font-semibold text-navy-900 transition-colors hover:text-magenta-600"
            >
              {section.cta.label}
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-200 transition-all duration-300 group-hover:border-transparent group-hover:bg-magenta-500 group-hover:text-white">
                <ArrowRightIcon className="h-4.5 w-4.5" />
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}