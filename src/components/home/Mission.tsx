import Image from "next/image";
import { missionSection } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons";

export function Mission() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal direction="left">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div
              className="absolute inset-0 -translate-x-4 translate-y-4 rounded-[2rem] border border-navy-900/10 sm:-translate-x-6 sm:translate-y-6"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/10 ring-1 ring-navy-900/5">
              <Image
                src={missionSection.image.src}
                alt={missionSection.image.alt}
                width={1400}
                height={1050}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
            </div>
            <div className="absolute -bottom-5 left-6 flex items-center gap-2.5 rounded-full bg-navy-900 px-5 py-3 shadow-lg shadow-navy-900/25 sm:left-10">
              <span className="h-2 w-2 rounded-full bg-magenta-500" aria-hidden="true" />
              <p className="text-secondary font-semibold text-white">
                {missionSection.badge}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={120}>
          <div className="max-w-xl">
            <p className="flex items-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-500 sm:text-sm">
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
              {missionSection.eyebrow}
            </p>
            <h2 className="mt-5 text-h2 text-navy-900 sm:text-h2-lg">
              {missionSection.title}
            </h2>
            <p className="mt-6 text-lead text-navy-700/75">
              {missionSection.description}
            </p>
            <div className="mt-10">
              <Button href={missionSection.cta.href} size="lg">
                {missionSection.cta.label}
                <ArrowRightIcon className="h-4.5 w-4.5" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
