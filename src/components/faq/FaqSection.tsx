"use client";

import { useMemo, useState } from "react";
import type { FAQItem } from "@/data/faq";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/faq/EmptyState";
import { SearchIcon, PlusIcon } from "@/components/icons";
import type { FaqPage } from "@/lib/faq";

function FaqAccordion({ items }: { items: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3.5">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const number = String(index + 1).padStart(2, "0");
        return (
          <div
            key={item.id}
            className={`overflow-hidden rounded-2xl bg-white ring-1 transition-all duration-300 ${
              isOpen
                ? "shadow-lg shadow-navy-900/[0.06] ring-magenta-500/40"
                : "ring-navy-100 hover:ring-navy-200"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 px-6 py-5 text-left sm:gap-5 sm:px-8"
            >
              <span
                className={`hidden shrink-0 font-display text-secondary font-bold tracking-tight sm:block ${
                  isOpen ? "text-magenta-500" : "text-navy-300"
                }`}
                aria-hidden="true"
              >
                {number}
              </span>
              <span className="flex-1 text-h4 text-navy-900">
                {item.question}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 bg-magenta-500 text-white"
                    : "bg-cream text-navy-900"
                }`}
                aria-hidden="true"
              >
                <PlusIcon className="h-4 w-4" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 leading-relaxed text-navy-700/80 sm:px-8 sm:pl-20">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FaqSection({
  items,
  page,
}: {
  items: FAQItem[];
  page: FaqPage;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Toutes");

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const item of items) {
      if (item.category && !seen.has(item.category)) {
        seen.add(item.category);
        result.push(item.category);
      }
    }
    return result;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "Toutes" || item.category === category;
      const matchesQuery =
        q.length === 0 ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, query, category]);

  if (items.length === 0) {
    return <EmptyState emptyState={page.emptyState} />;
  }

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container className="max-w-3xl">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-navy-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une question..."
            aria-label="Rechercher une question"
            className="h-14 w-full rounded-full bg-cream pr-6 pl-14 text-body text-navy-900 shadow-sm ring-1 ring-navy-100 transition-all duration-300 placeholder:text-navy-400 focus:bg-white focus:ring-2 focus:ring-magenta-500/50 focus:outline-none sm:h-15"
          />
        </div>

        {categories.length > 0 ? (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setCategory("Toutes")}
              className={`rounded-full px-4 py-2 text-secondary font-bold transition-all duration-300 ${
                category === "Toutes"
                  ? "bg-navy-900 text-white shadow-sm"
                  : "bg-cream text-navy-700 ring-1 ring-navy-100 hover:bg-navy-50"
              }`}
            >
              Toutes
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(category === cat ? "Toutes" : cat)}
                className={`rounded-full px-4 py-2 text-secondary font-bold transition-all duration-300 ${
                  category === cat
                    ? "bg-navy-900 text-white shadow-sm"
                    : "bg-cream text-navy-700 ring-1 ring-navy-100 hover:bg-navy-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-10">
          {filtered.length > 0 ? (
            <FaqAccordion items={filtered} />
          ) : (
            <div className="rounded-2xl bg-cream px-6 py-12 text-center ring-1 ring-navy-100">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy-400 shadow-sm ring-1 ring-navy-100">
                <SearchIcon className="h-5 w-5" />
              </span>
              <p className="mt-5 text-body font-bold text-navy-900 sm:text-lg">
                {page.noResults.message}
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}