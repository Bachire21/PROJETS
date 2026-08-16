import Image from "next/image";
import type { Testimonial } from "@/data/temoignages";
import { QuoteIcon, MapPinIcon } from "@/components/icons";

function initialsOf(testimonial: Testimonial) {
  return `${testimonial.firstName.charAt(0)}${testimonial.lastName.charAt(0)}`.toUpperCase();
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const location = [testimonial.city, testimonial.country].filter(Boolean).join(" · ");

  return (
    <figure className="group relative flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy-900/[0.08] hover:ring-magenta-500/40 sm:p-9">
      <span
        className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-magenta-500/[0.07] blur-2xl transition-transform duration-500 group-hover:scale-125"
        aria-hidden="true"
      />
      <QuoteIcon className="h-9 w-9 text-magenta-500/80 transition-transform duration-300 group-hover:scale-110" />
      <blockquote className="mt-5 flex-1">
        <p className="text-lead leading-relaxed text-navy-900">
          «&nbsp;{testimonial.quote}&nbsp;»
        </p>
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-4 border-t border-navy-100 pt-6">
        {testimonial.image ? (
          <span className="relative h-13 w-13 shrink-0 overflow-hidden rounded-full ring-2 ring-magenta-500/40">
            <Image
              src={testimonial.image.url}
              alt={testimonial.image.alt}
              fill
              sizes="52px"
              className="object-cover"
            />
          </span>
        ) : (
          <span
            className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-body font-bold text-white transition-colors duration-300 group-hover:bg-magenta-500"
            aria-hidden="true"
          >
            {initialsOf(testimonial)}
          </span>
        )}
        <div className="min-w-0">
          <p className="text-secondary font-bold text-navy-900">
            {testimonial.firstName} {testimonial.lastName}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-small text-navy-700/70">
            {location ? (
              <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-magenta-500/70" />
            ) : null}
            <span className="truncate">
              {testimonial.formation}
              {location ? ` · ${location}` : ""}
            </span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}