import Image from "next/image";
import Link from "next/link";
import type { ServicesPageData } from "@/data/services";
import { sortByOrder } from "@/lib/logement-content-utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons";

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-12"];

function spanFor(index: number) {
  return spans[index % spans.length];
}

function numberFor(index: number) {
  return String(index + 1).padStart(2, "0");
}

function CardCta({ service }: { service: ServicesPageData["servicesSection"]["services"][number] }) {
  return (
    <span className="mt-7 inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-label font-bold uppercase tracking-wide text-navy-900 shadow-sm transition-all duration-300 group-hover:gap-3 group-hover:bg-magenta-500 group-hover:text-white">
      {service.ctaLabel}
      <ArrowRightIcon className="h-3.5 w-3.5" />
    </span>
  );
}

function ImageCard({ service, number }: { service: ServicesPageData["servicesSection"]["services"][number]; number: string }) {
  return (
    <Link
      href={service.href}
      className="group relative flex h-full min-h-72 flex-col justify-end overflow-hidden rounded-3xl p-7 ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/20 sm:p-9"
    >
      <Image
        src={service.image!.url}
        alt={service.image!.alt}
        fill
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/45 to-navy-900/5 transition-opacity duration-300"
        aria-hidden="true"
      />
      <span
        className="absolute top-6 right-7 font-display text-2xl font-bold tracking-tight text-white/50 transition-colors duration-300 group-hover:text-magenta-400 sm:right-9"
        aria-hidden="true"
      >
        {number}
      </span>
      <div className="relative">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-xl backdrop-blur">
          <span aria-hidden="true">{service.icon}</span>
        </span>
        <h3 className="mt-4 text-h3 text-white sm:text-h3-lg">
          {service.title}
        </h3>
        <p className="mt-2 max-w-md text-secondary leading-relaxed text-white/75">
          {service.description}
        </p>
        <span className="mt-6 inline-flex h-10 translate-y-0 items-center gap-2 rounded-full bg-white px-5 text-label font-bold uppercase tracking-wide text-navy-900 opacity-100 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:gap-3 group-hover:bg-magenta-500 group-hover:text-white lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
          {service.ctaLabel}
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

function CleanCard({ service, number }: { service: ServicesPageData["servicesSection"]["services"][number]; number: string }) {
  return (
    <Link
      href={service.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-cream p-7 ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-navy-900/[0.08] hover:ring-magenta-500/40 sm:p-9"
    >
      <span
        className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-magenta-500/[0.07] blur-2xl transition-transform duration-500 group-hover:scale-125"
        aria-hidden="true"
      />
      <div className="relative flex items-start justify-between">
        <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white text-xl shadow-sm ring-1 ring-navy-100 transition-transform duration-300 group-hover:scale-110">
          <span aria-hidden="true">{service.icon}</span>
        </span>
        <span
          className="font-display text-2xl font-bold tracking-tight text-navy-200 transition-colors duration-300 group-hover:text-magenta-500"
          aria-hidden="true"
        >
          {number}
        </span>
      </div>
      <div className="relative mt-5 flex-1">
        <h3 className="text-h3 text-navy-900">
          {service.title}
        </h3>
        <p className="mt-2 text-secondary leading-relaxed text-navy-700/70">
          {service.description}
        </p>
      </div>
      <CardCta service={service} />
    </Link>
  );
}

export function ServicesGrid({
  servicesSection,
}: {
  servicesSection: ServicesPageData["servicesSection"];
}) {
  const services = sortByOrder(servicesSection.services).filter(
    (service) => service.published,
  );

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-label uppercase tracking-[0.16em] text-magenta-500">
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
              {servicesSection.eyebrow}
            </p>
            <h2 className="mt-5 text-h2 text-navy-900 sm:text-h2-lg">
              {servicesSection.title}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-12">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              delay={(index % 3) * 80}
              className={spanFor(index)}
            >
              {service.image ? (
                <ImageCard service={service} number={numberFor(index)} />
              ) : (
                <CleanCard service={service} number={numberFor(index)} />
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}