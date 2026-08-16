"use client";

import { useState } from "react";
import type { Establishment } from "@/data/ecoles-formations";
import {
  filiereOptions,
  niveauOptions,
  statutOptions,
  villeOptions,
} from "@/data/ecoles-formations";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { EstablishmentCard } from "@/components/ecoles-formations/EstablishmentCard";
import { GraduationIcon, SearchIcon } from "@/components/icons";

const filterGroups = [
  { label: "Filière", options: filiereOptions },
  { label: "Niveau", options: niveauOptions },
  { label: "Ville", options: villeOptions },
  { label: "Statut", options: statutOptions.map((option) => option.label) },
] as const;

export function CatalogSection({
  establishments,
}: {
  establishments: Establishment[];
}) {
  const [query, setQuery] = useState("");
  const [filiere, setFiliere] = useState("Toutes");
  const [niveau, setNiveau] = useState("Tous");
  const [ville, setVille] = useState("Toutes");
  const [statut, setStatut] = useState("Tous");

  const activeFilter =
    filiere !== "Toutes" || niveau !== "Tous" || ville !== "Toutes" || statut !== "Tous";

  const filtered = establishments.filter((establishment) => {
    const matchesQuery =
      query.trim().length === 0 ||
      [establishment.name, establishment.city, establishment.description]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase());
    const matchesFiliere =
      filiere === "Toutes" || establishment.fields.includes(filiere);
    const matchesNiveau =
      niveau === "Tous" || establishment.levels.includes(niveau);
    const matchesVille =
      ville === "Toutes" || establishment.city === ville;
    const matchesStatut =
      statut === "Tous" ||
      (statut === "Partenaire" && establishment.status === "partenaire") ||
      (statut === "Référencé" && establishment.status === "reference");
    return matchesQuery && matchesFiliere && matchesNiveau && matchesVille && matchesStatut;
  });

  const resetFilters = () => {
    setQuery("");
    setFiliere("Toutes");
    setNiveau("Tous");
    setVille("Toutes");
    setStatut("Tous");
  };

  const chips = (options: readonly string[], value: string, setValue: (v: string) => void) =>
    options.map((option) => (
      <button
        key={option}
        type="button"
        onClick={() => setValue(value === option ? "Toutes" : option)}
        aria-pressed={value === option}
        className={`h-10 rounded-full px-4.5 text-secondary font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-500 ${
          value === option
            ? "bg-navy-900 text-white shadow-sm"
            : "bg-navy-50 text-navy-700 hover:bg-navy-100"
        }`}
      >
        {option}
      </button>
    ));

  return (
    <section id="catalogue" className="scroll-mt-20 bg-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-500 sm:text-sm">
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
              Catalogue
            </p>
            <h2 className="mt-5 text-h2 text-navy-900 sm:text-h2-lg">
              Quelle formation recherches-tu ?
            </h2>
            <p className="mt-5 text-lead text-navy-700/75">
              Parcours le catalogue Campus Way par filière, niveau, ville ou
              statut d&apos;établissement.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12">
            <form
              role="search"
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="catalogue-search" className="sr-only">
                Rechercher une école ou une formation
              </label>
              <div className="relative flex-1">
                <span
                  className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-navy-400"
                  aria-hidden="true"
                >
                  <SearchIcon className="h-5 w-5" />
                </span>
                <input
                  id="catalogue-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher une école ou une formation..."
                  className="h-13 w-full rounded-2xl border border-navy-200 bg-cream/60 pr-5 pl-13 text-body text-navy-900 transition-all duration-300 placeholder:text-navy-400 focus:border-magenta-500 focus:bg-white focus:ring-2 focus:ring-magenta-500/25 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-2xl bg-navy-900 px-8 text-secondary font-bold tracking-wide text-white uppercase shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-500 active:scale-[0.98]"
              >
                Rechercher
                <SearchIcon className="h-4.5 w-4.5" />
              </button>
            </form>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-8 grid gap-7 lg:grid-cols-2">
            {filterGroups.map((group) => (
              <fieldset key={group.label}>
                <legend className="mb-3 text-secondary font-bold uppercase tracking-[0.14em] text-navy-500">
                  {group.label}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {group.label === "Filière" &&
                    chips(["Toutes", ...filiereOptions], filiere, setFiliere)}
                  {group.label === "Niveau" &&
                    chips(["Tous", ...niveauOptions], niveau, setNiveau)}
                  {group.label === "Ville" &&
                    chips(["Toutes", ...villeOptions], ville, setVille)}
                  {group.label === "Statut" &&
                    chips(
                      ["Tous", ...statutOptions.map((option) => option.label)],
                      statut,
                      setStatut,
                    )}
                </div>
              </fieldset>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-navy-100 py-4">
            <p className="text-body font-semibold text-navy-600" aria-live="polite">
              {filtered.length} établissement{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
            </p>
            {activeFilter ? (
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full px-3 py-1.5 text-secondary font-bold text-magenta-600 underline-offset-4 transition-colors hover:bg-magenta-500/10 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-500"
              >
                Effacer les filtres
              </button>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-6">
          {establishments.length === 0 ? (
            <div
              role="status"
              className="relative overflow-hidden rounded-3xl border border-dashed border-navy-200 bg-cream px-6 py-14 text-center sm:py-18"
            >
              <div
                className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-magenta-500/10 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl"
                aria-hidden="true"
              />
              <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-900 text-white shadow-lg shadow-navy-900/20">
                <GraduationIcon className="h-7 w-7" />
              </span>
              <h3 className="relative mt-6 font-display text-h3 font-bold text-navy-900">
                Aucun établissement disponible pour le moment.
              </h3>
              <p className="relative mx-auto mt-3 max-w-xl text-lead leading-relaxed text-navy-700/75">
                Le catalogue Campus Way est actuellement en préparation. De
                nouveaux établissements et formations seront ajoutés
                progressivement.
              </p>
              <div className="relative mt-8 flex justify-center">
                <Button href="/trouver-mon-ecole" size="lg">
                  Trouver mon école
                </Button>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div
              role="status"
              className="rounded-3xl border border-dashed border-navy-200 bg-navy-50/60 px-6 py-14 text-center sm:py-16"
            >
              <p className="mx-auto max-w-xl text-lead leading-relaxed text-navy-700/75">
                Aucun établissement ne correspond à tes critères.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 text-secondary font-bold text-magenta-600 underline-offset-4 transition-colors hover:text-magenta-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-500"
              >
                Effacer les filtres
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-4 pb-6">
                {statutOptions.map((option) => (
                  <p
                    key={option.value}
                    className="flex items-center gap-2 text-secondary text-navy-600"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        option.value === "partenaire"
                          ? "bg-magenta-500"
                          : "bg-navy-300"
                      }`}
                      aria-hidden="true"
                    />
                    <strong className="font-bold text-navy-800">
                      {option.label}
                    </strong>
                    <span className="hidden sm:inline">— {option.description}</span>
                  </p>
                ))}
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((establishment) => (
                  <EstablishmentCard
                    key={establishment.id}
                    establishment={establishment}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}