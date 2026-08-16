import Link from "next/link";
import {
  loadDemandesContent,
  loadEtudesContent,
  loadFaqContent,
  loadLogementContent,
  loadServicesContent,
  loadTemoignagesContent,
  loadEcolesContent,
  loadActivityContent,
} from "@/lib/content-store";
import { isPublished } from "@/lib/logement-content-utils";
import { AdminPageHeader } from "@/components/admin/ui/PageHeader";
import { StatusChip } from "@/components/admin/ui/fields";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  PencilIcon,
} from "@/components/icons";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
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

type ContentRow = {
  label: string;
  page: string;
  type: string;
  adminHref: string;
  published: boolean;
  publicHref: string;
  activityTarget: string;
};

export default async function AdminContenusPage() {
  const [
    etudes,
    services,
    logement,
    faq,
    temoignages,
    ecoles,
    demandes,
    activity,
  ] = await Promise.all([
    loadEtudesContent(),
    loadServicesContent(),
    loadLogementContent(),
    loadFaqContent(),
    loadTemoignagesContent(),
    loadEcolesContent(),
    loadDemandesContent(),
    loadActivityContent(),
  ]);

  const lastActivityByTarget = new Map<string, string>();
  for (const entry of activity.entries) {
    const key = entry.target.toLowerCase();
    if (!lastActivityByTarget.has(key)) {
      lastActivityByTarget.set(key, entry.date);
    }
  }

  const lastModified = (target: string) => {
    const date = lastActivityByTarget.get(target.toLowerCase());
    return date ? formatDate(date) : "—";
  };

  const rows: ContentRow[] = [
    ...[
      {
        label: "Hero",
        type: "Hero",
        adminHref: "/admin/etudes",
        publicHref: "/etudier-au-maroc",
        activityTarget: "Étudier au Maroc",
        published: etudes.hero.published,
      },
      {
        label: "Avantages",
        type: "Section",
        adminHref: "/admin/etudes",
        publicHref: "/etudier-au-maroc",
        activityTarget: "Étudier au Maroc",
        published: etudes.advantagesSection.published,
      },
      {
        label: "Section information",
        type: "Section",
        adminHref: "/admin/etudes",
        publicHref: "/etudier-au-maroc",
        activityTarget: "Étudier au Maroc",
        published: etudes.visualSection.published,
      },
      {
        label: "Villes",
        type: "Section",
        adminHref: "/admin/etudes",
        publicHref: "/etudier-au-maroc",
        activityTarget: "Étudier au Maroc",
        published: etudes.citiesSection.published,
      },
      {
        label: "Parcours",
        type: "Section",
        adminHref: "/admin/etudes",
        publicHref: "/etudier-au-maroc",
        activityTarget: "Étudier au Maroc",
        published: etudes.journeySection.published,
      },
      {
        label: "Information importante",
        type: "Section",
        adminHref: "/admin/etudes",
        publicHref: "/etudier-au-maroc",
        activityTarget: "Étudier au Maroc",
        published: etudes.transparency.published,
      },
      {
        label: "CTA final",
        type: "Section",
        adminHref: "/admin/etudes",
        publicHref: "/etudier-au-maroc",
        activityTarget: "Étudier au Maroc",
        published: etudes.finalCta.published,
      },
    ].map((row) => ({ ...row, page: "/etudier-au-maroc" })),
    ...[
      {
        label: "Hero",
        type: "Hero",
        adminHref: "/admin/services",
        publicHref: "/nos-services",
        activityTarget: "Nos services",
        published: services.hero.published,
      },
      {
        label: "Nos services",
        type: "Section",
        adminHref: "/admin/services",
        publicHref: "/nos-services",
        activityTarget: "Nos services",
        published: services.servicesSection.published,
      },
      {
        label: "Parcours",
        type: "Section",
        adminHref: "/admin/services",
        publicHref: "/nos-services",
        activityTarget: "Nos services",
        published: services.parcours.published,
      },
      {
        label: "Section immersive",
        type: "Section",
        adminHref: "/admin/services",
        publicHref: "/nos-services",
        activityTarget: "Nos services",
        published: services.immersive.published,
      },
      {
        label: "CTA final",
        type: "Section",
        adminHref: "/admin/services",
        publicHref: "/nos-services",
        activityTarget: "Nos services",
        published: services.cta.published,
      },
    ].map((row) => ({ ...row, page: "/nos-services" })),
    ...[
      {
        label: "Hero",
        type: "Hero",
        adminHref: "/admin/logement",
        publicHref: "/logement-installation",
        activityTarget: "Logement & Installation",
        published: logement.hero.published,
      },
      {
        label: "Parcours d'installation",
        type: "Section",
        adminHref: "/admin/logement",
        publicHref: "/logement-installation",
        activityTarget: "Logement & Installation",
        published: logement.stepsSection.published,
      },
      {
        label: "Prestations",
        type: "Section",
        adminHref: "/admin/logement",
        publicHref: "/logement-installation",
        activityTarget: "Logement & Installation",
        published: logement.supportSection.published,
      },
      {
        label: "Section visuelle",
        type: "Section",
        adminHref: "/admin/logement",
        publicHref: "/logement-installation",
        activityTarget: "Logement & Installation",
        published: logement.visualSection.published,
      },
      {
        label: "Information importante",
        type: "Section",
        adminHref: "/admin/logement",
        publicHref: "/logement-installation",
        activityTarget: "Logement & Installation",
        published: logement.information.published,
      },
      {
        label: "CTA final",
        type: "Section",
        adminHref: "/admin/logement",
        publicHref: "/logement-installation",
        activityTarget: "Logement & Installation",
        published: logement.cta.published,
      },
    ].map((row) => ({ ...row, page: "/logement-installation" })),
    ...faq.faqItems.map<ContentRow>((item) => ({
      label: item.question,
      type: "FAQ",
      page: "/faq",
      adminHref: "/admin/faq",
      publicHref: "/faq",
      published: item.published,
      activityTarget: item.question,
    })),
    ...temoignages.testimonials.map<ContentRow>((item) => ({
      label: `${item.firstName} ${item.lastName}`.trim() || "Témoignage",
      type: "Témoignage",
      page: "/temoignages",
      adminHref: "/admin/temoignages",
      publicHref: "/temoignages",
      published: item.published,
      activityTarget: `${item.firstName} ${item.lastName}`.trim(),
    })),
    ...ecoles.establishments.map<ContentRow>((item) => ({
      label: item.name,
      type: "Établissement",
      page: "/ecoles-formations",
      adminHref: "/admin/etablissements",
      publicHref: `/ecoles-formations/${item.slug}`,
      published: item.published,
      activityTarget: item.name,
    })),
    ...ecoles.formations.map<ContentRow>((item) => ({
      label: item.name,
      type: "Formation",
      page: "/ecoles-formations",
      adminHref: "/admin/formations",
      publicHref: "/ecoles-formations",
      published: item.published,
      activityTarget: item.name,
    })),
  ];

  const publishedCount = rows.filter((row) => isPublished(row.published)).length;
  const draftCount = rows.length - publishedCount;

  return (
    <div className="mx-auto max-w-6xl">
      <AdminPageHeader
        title="Contenus du site"
        description="Vue globale de tous les contenus administrables et de leur statut"
        destination="/"
      />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-navy-900 ring-1 ring-navy-100">
          <span className="h-2 w-2 rounded-full bg-whatsapp" />
          {publishedCount} publié{publishedCount > 1 ? "s" : ""}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-navy-900 ring-1 ring-navy-100">
          <span className="h-2 w-2 rounded-full bg-navy-300" />
          {draftCount} brouillon{draftCount > 1 ? "s" : ""}
        </span>
        <p className="ml-auto text-xs text-navy-500">
          {demandes.requests.length} demande
          {demandes.requests.length > 1 ? "s" : ""} d&apos;orientation reçue
          {demandes.requests.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl bg-white ring-1 ring-navy-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] text-left text-sm">
            <thead>
              <tr className="border-b border-navy-100 bg-cream/60 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-navy-500">
                <th className="px-6 py-4">Contenu</th>
                <th className="px-6 py-4">Page</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Dernière modification</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={`${row.type}-${row.label}-${index}`}
                  className="border-b border-navy-50 transition-colors last:border-0 hover:bg-cream/50"
                >
                  <td className="max-w-xs px-6 py-4">
                    <p className="truncate font-bold text-navy-900">
                      {row.label}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={row.publicHref}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-navy-600 underline decoration-navy-200 underline-offset-2 hover:text-magenta-600"
                    >
                      {row.publicHref}
                      <ExternalLinkIcon className="h-3 w-3" />
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-navy-50 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-navy-600">
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusChip published={row.published} />
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-navy-500">
                    {lastModified(row.activityTarget)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={row.adminHref}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full bg-navy-900 px-4 text-xs font-bold text-white transition-colors hover:bg-magenta-500"
                      >
                        <PencilIcon className="h-3.5 w-3.5" />
                        Modifier
                      </Link>
                      {isPublished(row.published) ? (
                        <Link
                          href={row.publicHref}
                          target="_blank"
                          aria-label={`Voir ${row.label} sur le site public`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition-colors hover:border-navy-900"
                        >
                          <ArrowRightIcon className="h-3.5 w-3.5" />
                        </Link>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-navy-600">
            Aucun contenu pour le moment.
          </p>
        ) : null}
      </div>
    </div>
  );
}