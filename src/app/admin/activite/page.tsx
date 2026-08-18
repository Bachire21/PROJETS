import { loadActivityContent } from "@/lib/content-store";
import { AdminPageHeader } from "@/components/admin/ui/PageHeader";
import { ActivityIcon } from "@/components/icons";

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

function statusTone(status: string) {
  if (status === "Publié") return "bg-whatsapp/10 text-whatsapp-dark";
  if (status === "Supprimé") return "bg-red-500/10 text-red-600";
  if (status === "Nouvelle") return "bg-magenta-500/10 text-magenta-600";
  return "bg-navy-50 text-navy-600";
}

export default async function AdminActivitePage() {
  console.log("[DEBUG] render page: /admin/activite");
  const content = await loadActivityContent();
  const entries = [...content.entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        title="Journal d'activité"
        description="Les actions importantes effectuées dans l'espace admin"
        destination="/"
      />

      <div className="mt-8 overflow-hidden rounded-3xl bg-white ring-1 ring-navy-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead>
              <tr className="border-b border-navy-100 bg-cream/60 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-navy-500">
                <th className="px-6 py-4">Utilisateur</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Contenu</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-navy-50 transition-colors last:border-0 hover:bg-cream/50"
                >
                  <td className="px-6 py-4 font-bold text-navy-900">
                    {entry.user}
                  </td>
                  <td className="px-6 py-4 font-semibold text-navy-800">
                    {entry.action}
                  </td>
                  <td className="max-w-xs px-6 py-4">
                    <p className="truncate text-navy-600">{entry.target}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide ${statusTone(entry.status)}`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-navy-500">
                    {formatDate(entry.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {entries.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-white">
              <ActivityIcon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-navy-900">
              Aucune activité pour le moment.
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy-600">
              Les actions effectuées depuis l&apos;Admin (publications,
              modifications, suppressions…) apparaîtront ici.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}