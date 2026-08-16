import Image from "next/image";
import type { ServicesPageData } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function ImmersiveSection({
  immersive,
}: {
  immersive: ServicesPageData["immersive"];
}) {

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="group relative overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/20 ring-1 ring-navy-900/10">
              <Image
                src={immersive.image.url}
                alt={immersive.image.alt}
                width={1400}
                height={933}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="aspect-[16/11] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/25 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <Reveal direction="right" delay={120} className="lg:col-span-5">
            <div>
              <p className="flex items-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-500 sm:text-sm">
                <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
                {immersive.eyebrow}
              </p>
              <h2 className="mt-5 text-h2 text-navy-900 sm:text-h2-lg">
                {immersive.title}
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-navy-700/75">
                {immersive.description}
              </p>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {immersive.pills.map((pill) => (
                  <li
                    key={pill}
                    className="rounded-full bg-cream px-4 py-2 text-label font-bold uppercase tracking-wide text-navy-900 ring-1 ring-navy-100 transition-colors duration-300 hover:bg-magenta-500 hover:text-white"
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}