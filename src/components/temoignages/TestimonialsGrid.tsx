import Image from "next/image";
import type { Testimonial } from "@/data/temoignages";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialCard } from "@/components/temoignages/TestimonialCard";
import { EmptyState } from "@/components/temoignages/EmptyState";
import { QuoteIcon, MapPinIcon } from "@/components/icons";
import type { TemoignagesPage } from "@/lib/temoignages";

function FeaturedCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="group relative grid overflow-hidden rounded-[2rem] bg-navy-950 ring-1 ring-navy-800 lg:grid-cols-2">
      <div className="relative p-8 sm:p-12">
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-magenta-500/15 blur-3xl"
          aria-hidden="true"
        />
        <QuoteIcon className="h-11 w-11 text-magenta-400" />
        <blockquote className="mt-6">
          <p className="text-lead leading-relaxed text-white">
            «&nbsp;{testimonial.quote}&nbsp;»
          </p>
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-4">
          <span
            className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-magenta-500 font-display text-body font-bold text-white"
            aria-hidden="true"
          >
            {`${testimonial.firstName.charAt(0)}${testimonial.lastName.charAt(0)}`.toUpperCase()}
          </span>
          <div>
            <p className="text-secondary font-bold text-white">
              {testimonial.firstName} {testimonial.lastName}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-small text-white/60">
              <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-magenta-400/70" />
              <span className="truncate">
                {testimonial.formation} · {testimonial.city}
              </span>
            </p>
          </div>
        </figcaption>
      </div>
      {testimonial.image ? (
        <div className="relative min-h-64 lg:min-h-full">
          <Image
            src={testimonial.image.url}
            alt={testimonial.image.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div
          className="relative flex min-h-64 items-center justify-center bg-navy-900 lg:min-h-full"
          aria-hidden="true"
        >
          <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-magenta-500/50">
            <QuoteIcon className="h-10 w-10 text-magenta-400" />
          </span>
        </div>
      )}
    </figure>
  );
}

export function TestimonialsGrid({
  testimonials,
  page,
}: {
  testimonials: Testimonial[];
  page: TemoignagesPage;
}) {
  if (testimonials.length === 0) {
    return <EmptyState emptyState={page.emptyState} />;
  }

  const featured = testimonials.find((item) => item.featured);
  const rest = featured
    ? testimonials.filter((item) => item.id !== featured.id)
    : testimonials;

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        {featured ? (
          <Reveal>
            <FeaturedCard testimonial={featured} />
          </Reveal>
        ) : null}
        {rest.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={(index % 3) * 80}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}