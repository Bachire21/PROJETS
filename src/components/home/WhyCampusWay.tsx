import { whySection } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function WhyCampusWay() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-500 sm:text-sm">
                <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
                {whySection.eyebrow}
              </p>
              <h2 className="mt-5 text-h2 text-navy-900 sm:text-h2-lg">
                {whySection.title}
              </h2>
              <p className="mt-6 text-lead text-navy-700/75">
                {whySection.description}
              </p>
              <div
                className="mt-10 hidden h-px w-full bg-gradient-to-r from-magenta-500/50 to-transparent lg:block"
                aria-hidden="true"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ol>
              {whySection.blocks.map((block, index) => (
                <Reveal key={block.number} delay={index * 80}>
                  <li
                    className="group flex items-start gap-5 border-b border-navy-100 py-7 transition-colors duration-300 hover:bg-cream sm:gap-8 sm:rounded-2xl sm:border-b-0 sm:px-5 sm:py-6 sm:-mx-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy-100 bg-white font-display text-secondary font-bold tracking-wide text-magenta-500 transition-all duration-300 group-hover:border-transparent group-hover:bg-navy-900 group-hover:text-white">
                      {block.number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-h4 text-navy-900 transition-colors duration-300 group-hover:text-magenta-600">
                        {block.title}
                      </h3>
                      <p className="mt-1.5 max-w-xl text-secondary leading-relaxed text-navy-700/70">
                        {block.description}
                      </p>
                    </div>
                    <span
                      className="mt-3 ml-auto hidden h-1.5 w-1.5 shrink-0 rounded-full bg-navy-200 transition-colors duration-300 group-hover:bg-magenta-500 sm:block"
                      aria-hidden="true"
                    />
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
