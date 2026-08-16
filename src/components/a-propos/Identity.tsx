import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/icons";
import { aProposPage } from "@/data/a-propos";

export function Identity() {
  const { identity } = aProposPage;

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="flex items-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-500 sm:text-sm">
                <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
                {identity.eyebrow}
              </p>
              <h2 className="mt-5 text-h2 text-navy-900 sm:text-h2-lg">
                {identity.title}
              </h2>
              <p className="mt-5 max-w-xl text-lead text-navy-700/75">
                {identity.description}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {identity.strengths.map((strength, index) => (
              <Reveal key={strength.label} delay={index * 80}>
                <div className="group flex h-full items-center gap-4 rounded-[1.5rem] bg-cream p-6 ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white shadow-md shadow-navy-900/20 transition-colors duration-300 group-hover:bg-magenta-500">
                    <CheckIcon className="h-5 w-5" />
                  </span>
                  <p className="text-body font-bold text-navy-900">
                    {strength.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}