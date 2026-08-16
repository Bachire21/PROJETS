import Link from "next/link";
import {
  loadDemandesContent,
  loadFaqContent,
  loadTemoignagesContent,
  loadEcolesContent,
  loadLogementContent,
  loadEtudesContent,
  loadServicesContent,
  loadActivityContent,
} from "@/lib/content-store";
import { isPublished } from "@/lib/logement-content-utils";
import { AdminPageHeader } from "@/components/admin/ui/PageHeader";
import {
  ArrowRightIcon,
  BedIcon,
  BuildingIcon,
  ClockIcon,
  CompassIcon,
  FileTextIcon,
  GridIcon,
  ListIcon,
  MapPinIcon,
  QuestionIcon,
  QuoteIcon,
} from "@/components/icons";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function formatDate(iso: string) {
  try {
    return dateFormatter.format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function AdminDashboardPage() {
  const [demandes, faq, temoignages, ecoles, logement, etudes, services, activity] =
    await Promise.all([
      loadDemandesContent(),
      loadFaqContent(),
      loadTemoignagesContent(),
      loadEcolesContent(),
      loadLogementContent(),
      loadEtudesContent(),
      loadServicesContent(),
      loadActivityContent(),
    ]);

  const publishedTestimonials = temoignages.testimonials.filter((item) =>
    isPublished(item.published),
  ).length;
  const publishedFaq = faq.faqItems.filter((item) =>
    isPublished(item.published),
  ).length;
  const publishedEstablishments = ecoles.establishments.filter((item) =>
    isPublished(item.published),
  ).length;
  const publishedFormations = ecoles.formations.filter((item) =>
    isPublished(item.published),
  ).length;

  const pendingRequests = demandes.requests.filter(
    (request) => request.status !== "archivee",
  ).length;
  const draftsTestimonials =
    temoignages.testimonials.length - publishedTestimonials;
  const draftsFaq = faq.faqItems.length - publishedFaq;
  const draftsEtablissements =
    ecoles.establishments.length - publishedEstablishments;
  const draftsFormations = ecoles.formations.length - publishedFormations;

  const sectionDrafts = [
    logement.hero,
    logement.stepsSection,
    logement.supportSection,
    logement.visualSection,
    logement.information,
    logement.cta,
    etudes.hero,
    etudes.advantagesSection,
    etudes.visualSection,
    etudes.citiesSection,
    etudes.journeySection,
    etudes.transparency,
    etudes.finalCta,
    services.hero,
    services.servicesSection,
    services.parcours,
    services.immersive,
    services.cta,
  ].filter((section) => !isPublished(section.published)).length;

  const contentsToPublish =
    sectionDrafts +
    draftsTestimonials +
    draftsFaq +
    draftsEtablissements +
    draftsFormations;

  const stats = [
    {
      label: "Demandes d'orientation",
      value: demandes.requests.length,
      href: "/admin/demandes",
      icon: MapPinIcon,
    },
    {
      label: "Témoignages",
      value: temoignages.testimonials.length,
      href: "/admin/temoignages",
      icon: QuoteIcon,
    },
    {
      label: "FAQ",
      value: faq.faqItems.length,
      href: "/admin/faq",
      icon: QuestionIcon,
    },
    {
      label: "Établissements",
      value: ecoles.establishments.length,
      href: "/admin/etablissements",
      icon: BuildingIcon,
    },
    {
      label: "Formations",
      value: ecoles.formations.length,
      href: "/admin/formations",
      icon: FileTextIcon,
    },
    {
      label: "Contenus en brouillon",
      value: contentsToPublish,
      href: "/admin/contenus",
      icon: ClockIcon,
    },
  ];

  const toTreat = [
    {
      label: "Demandes en attente",
      value: pendingRequests,
      href: "/admin/demandes",
      tone: pendingRequests > 0 ? "magenta" : "neutral",
    },
    {
      label: "Contenus en brouillon",
      value: contentsToPublish,
      href: "/admin/contenus",
      tone: contentsToPublish > 0 ? "orange" : "neutral",
    },
    {
      label: "Témoignages à vérifier",
      value: draftsTestimonials,
      href: "/admin/temoignages",
      tone: draftsTestimonials > 0 ? "orange" : "neutral",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        title="Tableau de bord"
        description="Vue d'ensemble de Campus Way. Toutes les valeurs proviennent des données réelles gérées dans cet espace."
        destination="/"
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-3xl bg-white p-6 ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy-900/[0.07]"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-white">
                <stat.icon className="h-4.5 w-4.5" />
              </span>
              <ArrowRightIcon className="h-4 w-4 text-navy-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-magenta-500" />
            </div>
            <p className="mt-5 font-display text-3xl font-bold text-navy-900">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-semibold text-navy-600">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl bg-white p-7 ring-1 ring-navy-100">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-magenta-500/10 text-magenta-600">
              <GridIcon className="h-4.5 w-4.5" />
            </span>
            <h2 className="font-display text-lg font-bold text-navy-900">
              Activité récente
            </h2>
          </div>
          {activity.entries.length === 0 ? (
            <p className="mt-5 rounded-2xl bg-cream px-5 py-6 text-sm leading-relaxed text-navy-600">
              Aucune activité récente.
            </p>
          ) : (
            <ul className="mt-5 space-y-1">
              {activity.entries.slice(0, 7).map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm transition-colors hover:bg-cream"
                >
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      entry.status === "Publié"
                        ? "bg-whatsapp"
                        : entry.status === "Supprimé"
                          ? "bg-red-500"
                          : "bg-magenta-500"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1 truncate font-semibold text-navy-800">
                    {entry.action}
                  </span>
                  <span className="truncate text-xs text-navy-500">
                    {entry.target}
                  </span>
                  <span className="shrink-0 text-xs text-navy-400">
                    {formatDate(entry.date)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-3xl bg-white p-7 ring-1 ring-navy-100">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
              <ClockIcon className="h-4.5 w-4.5" />
            </span>
            <h2 className="font-display text-lg font-bold text-navy-900">
              À traiter
            </h2>
          </div>
          <div className="mt-5 space-y-3">
            {toTreat.every((item) => item.value === 0) ? (
              <p className="rounded-2xl bg-cream px-5 py-6 text-sm leading-relaxed text-navy-600">
                Rien à traiter pour le moment.
              </p>
            ) : (
              toTreat.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-cream px-5 py-4 transition-all duration-300 hover:bg-navy-900 hover:text-white"
                >
                  <span className="text-sm font-bold text-navy-900 group-hover:text-white">
                    {item.label}
                  </span>
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-sm font-bold ${
                        item.tone === "magenta"
                          ? "bg-magenta-500 text-white"
                          : item.tone === "orange"
                            ? "bg-orange-500 text-white"
                            : "bg-navy-100 text-navy-600"
                      }`}
                    >
                      {item.value}
                    </span>
                    <ArrowRightIcon className="h-4 w-4 text-navy-400 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              ))
            )}
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-navy-500">
            <BedIcon className="h-3.5 w-3.5" />
            Les liens s&apos;ouvrent sur les pages concernées.
          </p>
        </section>
      </div>

      <section className="mt-10 rounded-3xl bg-navy-900 p-7 text-white sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-bold">
              Pages publiques gérées ici
            </h2>
            <p className="mt-1 text-sm text-cream/70">
              Chaque contenu administrable a une destination publique précise.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Étudier au Maroc", href: "/admin/etudes", icon: CompassIcon },
              { label: "Parcours & services", href: "/admin/services", icon: ListIcon },
              { label: "Logement", href: "/admin/logement", icon: BedIcon },
              { label: "Catalogue", href: "/admin/etablissements", icon: BuildingIcon },
            ].map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-magenta-500"
              >
                <page.icon className="h-3.5 w-3.5" />
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}