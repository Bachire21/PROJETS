import type { LogementPageData } from "@/data/logement-installation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { InfoIcon } from "@/components/icons";

type TransparencyProps = {
  data: LogementPageData["information"];
};

export function Transparency({ data }: TransparencyProps) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-navy-900 p-8 sm:p-12 lg:p-14">
            <div
              className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-magenta-500/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-9">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                <InfoIcon className="h-7 w-7" />
              </span>
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-label font-bold uppercase tracking-[0.14em] text-cream/80">
                  {data.badge}
                </p>
                <h2 className="mt-5 text-h3 text-white sm:text-h3-lg">
                  {data.title}
                </h2>
                <p className="mt-4 text-lead text-cream/80">
                  {data.description}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}