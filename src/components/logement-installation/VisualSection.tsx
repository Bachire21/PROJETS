import type { LogementPageData } from "@/data/logement-installation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageImage } from "@/components/logement-installation/PageImage";
import { BedIcon } from "@/components/icons";

type VisualSectionProps = {
  data: LogementPageData["visualSection"];
};

export function VisualSection({ data }: VisualSectionProps) {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="left">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div
              className="pointer-events-none absolute -bottom-6 -left-6 h-40 w-40 rounded-full border-2 border-dashed border-violet-500/30"
              aria-hidden="true"
            />
            <div className="group relative overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/20 ring-1 ring-navy-900/10">
              <PageImage
                image={data.image}
                sizes="(min-width: 1024px) 44vw, 100vw"
                imgClassName="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={120}>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-magenta-500/10 px-4 py-2 text-secondary font-bold text-magenta-600">
              <BedIcon className="h-4 w-4" />
              {data.badge}
            </span>
            <h3 className="mt-7 text-label uppercase tracking-[0.16em] text-navy-500">
              {data.eyebrow}
            </h3>
            <h2 className="mt-4 text-h2 text-navy-900 sm:text-h2-lg">
              {data.title}
            </h2>
            <p className="mt-6 text-lead text-navy-700/75">
              {data.description}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}