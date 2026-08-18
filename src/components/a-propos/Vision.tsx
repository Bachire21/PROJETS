import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CompassIcon } from "@/components/icons";
import { aProposPage } from "@/data/a-propos";

export function Vision() {
  const { vision } = aProposPage;

  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-magenta-500/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="flex items-center justify-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-500 sm:text-sm">
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
              {vision.eyebrow}
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
            </p>
            <h2 className="mt-5 text-h2 text-navy-900 sm:text-h2-lg">
              {vision.title}
            </h2>
            <div className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-6 rounded-[1.5rem] bg-white p-8 ring-1 ring-navy-100">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-magenta-500 text-white shadow-lg shadow-magenta-500/30">
                <CompassIcon className="h-7 w-7" />
              </span>
              <p className="text-body font-medium text-navy-700/80">
                {vision.description}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}