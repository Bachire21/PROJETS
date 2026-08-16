import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SparkleIcon } from "@/components/icons";
import type { TemoignagesPage } from "@/lib/temoignages";

export function EmptyState({
  emptyState,
}: {
  emptyState: TemoignagesPage["emptyState"];
}) {

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] bg-cream px-8 py-16 text-center ring-1 ring-navy-100 sm:px-14 sm:py-20">
            <div
              className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-magenta-500/10 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-navy-900 text-white shadow-xl shadow-navy-900/20">
                <SparkleIcon className="h-8 w-8" />
              </span>
              <p className="mx-auto mt-8 max-w-md text-lead text-navy-700/75">
                {emptyState.description}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}