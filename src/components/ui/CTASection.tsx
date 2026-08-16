import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

type CTASectionProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
};

export function CTASection({
  eyebrow,
  title,
  description,
  children,
}: CTASectionProps) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
            <div
              className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-magenta-500/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative max-w-2xl">
              {eyebrow ? (
                <p className="flex items-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-400">
                  <span className="h-px w-6 bg-magenta-400/70" aria-hidden="true" />
                  {eyebrow}
                </p>
              ) : null}
<h2 className="mt-4 text-h2 text-white sm:text-h2-lg">
                {title}
              </h2>
              {description ? (
                <p className="mt-5 text-lead text-cream/80">
                  {description}
                </p>
              ) : null}
              {children ? (
                <div className="mt-9 flex flex-wrap gap-4">{children}</div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}