import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "./Container";

type Breadcrumb = {
  label: string;
  href: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div
        className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-magenta-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pb-24">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-secondary text-navy-300">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-navy-300/60">
                      /
                    </span>
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="font-medium text-cream" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-cream"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <p className="flex items-center gap-2.5 text-label tracking-[0.16em] text-magenta-400 uppercase">
          <span className="h-px w-6 bg-magenta-400/70" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl text-hero text-white sm:text-hero-lg">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-lead text-cream/80">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-9 flex flex-wrap gap-4">{children}</div> : null}
      </Container>
    </section>
  );
}