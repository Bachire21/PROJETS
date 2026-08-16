import type { LogementPageData } from "@/data/logement-installation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageImage } from "@/components/logement-installation/PageImage";
import { ArrowRightIcon } from "@/components/icons";

type HeroProps = {
  data: LogementPageData["hero"];
};

export function Hero({ data }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-cream blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 right-[-12%] h-[26rem] w-[26rem] rounded-full bg-violet-500/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-16 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <Reveal>
          <div className="max-w-xl">
            <p className="flex items-center gap-2.5 text-label uppercase tracking-[0.16em] text-magenta-500">
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
              {data.eyebrow}
            </p>
            <h1 className="mt-6 text-hero tracking-tight text-navy-900 sm:text-hero-lg">
              {data.title}
            </h1>
            <p className="mt-7 max-w-lg text-lead text-navy-700/75">
              {data.description}
            </p>
            {data.primaryButton ? (
              <div className="mt-10">
                <Button
                  href={data.primaryButton.href}
                  external={data.primaryButton.type === "external"}
                  size="lg"
                  className="group hover:-translate-y-0.5 focus-visible:outline-magenta-500"
                >
                  {data.primaryButton.label}
                  <ArrowRightIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            ) : null}
          </div>
        </Reveal>

        <Reveal direction="right" delay={150}>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div
              className="pointer-events-none absolute -top-8 -right-4 h-44 w-44 rounded-full border-2 border-dashed border-magenta-500/30 sm:-right-8 sm:h-52 sm:w-52"
              aria-hidden="true"
            />
            <div className="group relative overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/20 ring-1 ring-navy-900/10">
              <PageImage
                image={data.image}
                sizes="(min-width: 1024px) 44vw, 100vw"
                imgClassName="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}