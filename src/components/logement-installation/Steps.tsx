"use client";

import { useEffect, useRef, useState } from "react";
import type { LogementPageData } from "@/data/logement-installation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  BedIcon,
  FlagIcon,
  MapPinIcon,
  SearchIcon,
} from "@/components/icons";

type StepsProps = {
  data: LogementPageData["stepsSection"];
};

const iconMap = {
  search: SearchIcon,
  pin: MapPinIcon,
  flag: FlagIcon,
  bed: BedIcon,
} as const;

export function Steps({ data }: StepsProps) {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((element, index) => {
      if (!element) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(index);
          });
        },
        { rootMargin: "-40% 0px -50% 0px" },
      );
      observer.observe(element);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, [data.steps.length]);

  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-h2 text-navy-900 sm:text-h2-lg">
              {data.title}
            </h2>
            <p className="mt-4 text-secondary font-semibold text-navy-600">
              {data.subtitle}
            </p>
            <p className="mt-4 max-w-xl text-lead text-navy-700/75">
              {data.description}
            </p>
          </div>
        </Reveal>

        {data.steps.length > 0 ? (
          <>
            <div className="hidden lg:block">
              <div className="relative mt-20">
                <div
                  className="absolute top-6 right-10 left-10 h-0.5 bg-gradient-to-r from-navy-200 via-navy-200 to-navy-200"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-4 gap-6">
                  {data.steps.map((step, index) => {
                    const Icon = iconMap[step.icon] ?? SearchIcon;
                    const isActive = active === index;
                    return (
                      <div
                        key={step.id}
                        ref={(element) => {
                          cardRefs.current[index] = element;
                        }}
                        className="group relative"
                      >
                        <div className="relative z-10 flex justify-center">
                          <span
                            className={`flex h-12 w-12 items-center justify-center rounded-full shadow-md transition-all duration-500 ${
                              isActive
                                ? "bg-magenta-500 text-white shadow-magenta-500/40 scale-110"
                                : "bg-white text-navy-900 ring-1 ring-navy-200 group-hover:bg-magenta-500 group-hover:text-white group-hover:shadow-magenta-500/40 group-hover:scale-110"
                            }`}
                            aria-hidden="true"
                          >
                            <Icon className="h-5.5 w-5.5" />
                          </span>
                        </div>
                        <div
                          className={`mt-6 rounded-3xl p-7 transition-all duration-500 ${
                            isActive
                              ? "bg-white shadow-lg shadow-navy-900/[0.08] ring-1 ring-magenta-500/50"
                              : "bg-white/60 ring-1 ring-navy-100 group-hover:bg-white group-hover:shadow-lg group-hover:shadow-navy-900/[0.08] group-hover:ring-magenta-500/50"
                          }`}
                        >
                          <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-navy-900 px-3 text-secondary font-bold text-white transition-colors duration-300 group-hover:bg-magenta-500">
                            {step.number}
                          </span>
                          <h3 className="mt-4 text-h4 text-navy-900">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-secondary leading-relaxed text-navy-700/70">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-14 lg:hidden">
              <ol className="relative space-y-0">
                {data.steps.map((step, index) => {
                  const Icon = iconMap[step.icon] ?? SearchIcon;
                  const isActive = active === index;
                  const isLast = index === data.steps.length - 1;
                  return (
                    <li
                      key={step.id}
                      ref={(element) => {
                        cardRefs.current[index] = element;
                      }}
                      className="relative flex gap-5 pb-9 last:pb-0"
                    >
                      {!isLast ? (
                        <span
                          className="absolute top-12 left-6 -bottom-1 w-0.5 bg-navy-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <span
                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-md transition-all duration-500 ${
                          isActive
                            ? "bg-magenta-500 text-white shadow-magenta-500/40 scale-110"
                            : "bg-white text-navy-900 ring-1 ring-navy-200"
                        }`}
                        aria-hidden="true"
                      >
                        <Icon className="h-5.5 w-5.5" />
                      </span>
                      <div
                        className={`flex-1 rounded-3xl p-6 transition-all duration-500 ${
                          isActive
                            ? "bg-white shadow-lg shadow-navy-900/[0.08] ring-1 ring-magenta-500/50"
                            : "bg-white/60 ring-1 ring-navy-100"
                        }`}
                      >
                        <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-navy-900 px-3 text-secondary font-bold text-white">
                          {step.number}
                        </span>
                        <h3 className="mt-3 font-display text-h4 font-bold text-navy-900">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-secondary leading-relaxed text-navy-700/70">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </>
        ) : (
          <p className="mt-12 max-w-xl text-lead text-navy-700/70">
            Les étapes de préparation seront bientôt disponibles.
          </p>
        )}
      </Container>
    </section>
  );
}