import type { LogementPageData } from "@/data/logement-installation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  CheckIcon,
  ChatIcon,
  FlagIcon,
  MapPinIcon,
  SearchIcon,
} from "@/components/icons";

type SupportProps = {
  data: LogementPageData["supportSection"];
};

const iconMap = {
  search: SearchIcon,
  pin: MapPinIcon,
  flag: FlagIcon,
  chat: ChatIcon,
  check: CheckIcon,
} as const;

export function Support({ data }: SupportProps) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-h2 font-bold text-navy-900 sm:text-h2-lg">
              {data.title}
            </h2>
            <p className="mt-4 text-h4 font-semibold text-navy-600">
              {data.subtitle}
            </p>
            <p className="mt-4 max-w-xl text-lead text-navy-700/75">
              {data.description}
            </p>
          </div>
        </Reveal>

        {data.items.length > 0 ? (
          <div className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item, index) => {
              const Icon = iconMap[item.icon] ?? CheckIcon;
              const displayNumber = String(index + 1).padStart(2, "0");
              const isCenteredRowStart =
                index === data.items.length - 2 && data.items.length % 3 === 2;
              return (
                <Reveal
                  key={item.id}
                  delay={(index % 3) * 80}
                  className={isCenteredRowStart ? "lg:col-start-2" : ""}
                >
                  <div className="group relative h-full overflow-hidden rounded-3xl bg-cream p-7 ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/[0.07] hover:ring-magenta-500/40 sm:p-8">
                    <span
                      className="absolute top-6 bottom-6 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-magenta-500 transition-transform duration-300 group-hover:scale-y-100"
                      aria-hidden="true"
                    />
                    <div className="relative flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-white transition-all duration-300 group-hover:bg-magenta-500 group-hover:scale-105">
                        <Icon className="h-5.5 w-5.5" />
                      </span>
                      <span className="font-display text-h3 font-bold text-navy-200 transition-colors duration-300 group-hover:text-magenta-500">
                        {displayNumber}
                      </span>
                    </div>
                    {item.image?.url ? (
                      <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-navy-100">
                        <Image
                          src={item.image.url}
                          alt={item.image.alt}
                          fill
                          sizes="(min-width: 1024px) 24vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <h3 className="relative mt-5 font-display text-h4 font-bold text-navy-900 sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="relative mt-2 text-secondary leading-relaxed text-navy-700/70">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <p className="mt-12 max-w-xl text-lead text-navy-700/70">
            Les prestations d&apos;accompagnement seront bientôt disponibles.
          </p>
        )}
      </Container>
    </section>
  );
}