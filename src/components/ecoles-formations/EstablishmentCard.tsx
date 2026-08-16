import Link from "next/link";
import Image from "next/image";
import type { Establishment } from "@/data/ecoles-formations";
import { statutOptions } from "@/data/ecoles-formations";
import { ArrowUpRightIcon, MapPinIcon } from "@/components/icons";

type EstablishmentCardProps = {
  establishment: Establishment;
};

export function EstablishmentCard({ establishment }: EstablishmentCardProps) {
  const statut = statutOptions.find(
    (option) => option.value === establishment.status,
  );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/[0.07] hover:ring-magenta-500/40">
      <span
        className="absolute top-6 bottom-6 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-magenta-500 transition-transform duration-300 group-hover:scale-y-100"
        aria-hidden="true"
      />
      <div className="relative flex items-start justify-between gap-3">
        {establishment.logo ? (
          <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-navy-50">
            <Image
              src={establishment.logo}
              alt={`Logo de ${establishment.name}`}
              width={56}
              height={56}
              className="h-full w-full object-contain"
            />
          </span>
        ) : (
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-50 text-navy-300 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-white">
            <span className="font-display text-h4 font-bold">
              {establishment.name.charAt(0)}
            </span>
          </span>
        )}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label font-bold ${
            establishment.status === "partenaire"
              ? "bg-magenta-500/10 text-magenta-600"
              : "bg-navy-50 text-navy-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              establishment.status === "partenaire"
                ? "bg-magenta-500"
                : "bg-navy-300"
            }`}
            aria-hidden="true"
          />
          {statut?.label ?? establishment.status}
        </span>
      </div>
      <h3 className="relative mt-5 text-h4 text-navy-900">
        {establishment.name}
      </h3>
      <p className="relative mt-1.5 flex items-center gap-1.5 text-secondary font-semibold text-navy-600">
        <MapPinIcon className="h-4 w-4 text-magenta-500" />
        {establishment.city}
        {establishment.neighborhood ? ` · ${establishment.neighborhood}` : ""}
      </p>
      <div className="relative mt-4 flex flex-wrap gap-2">
        {establishment.fields.slice(0, 3).map((field) => (
          <span
            key={field}
            className="rounded-full bg-cream px-3 py-1 text-label font-semibold text-navy-700"
          >
            {field}
          </span>
        ))}
      </div>
      <div className="relative mt-4 flex flex-wrap gap-2">
        {establishment.levels.slice(0, 4).map((level) => (
          <span
            key={level}
            className="rounded-full bg-navy-50 px-3 py-1 text-label font-bold text-navy-700"
          >
            {level}
          </span>
        ))}
      </div>
      <p className="relative mt-4 line-clamp-3 text-secondary leading-relaxed text-navy-700/70">
        {establishment.description}
      </p>
      <div className="relative mt-auto pt-6">
        <Link
          href={`/ecoles-formations/${establishment.slug}`}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 text-secondary font-bold text-white transition-all duration-300 hover:bg-navy-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-500 active:scale-[0.98]"
        >
          Voir l&apos;établissement
          <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}