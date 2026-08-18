"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { OrientationRequest } from "@/data/demandes";
import type { DemandesContent } from "@/lib/content-store";
import { AdminPageHeader } from "@/components/admin/ui/PageHeader";
import { AdminSearch } from "@/components/admin/ui/Search";
import { AdminEmptyState } from "@/components/admin/ui/EmptyState";
import { SelectInput } from "@/components/admin/ui/fields";
import {
  ArrowRightIcon,
  MapPinIcon,
  WhatsAppIcon,
  MailIcon,
} from "@/components/icons";

export function RequestStatusBadge({
  status,
}: {
  status: OrientationRequest["status"];
}) {
  const tones: Record<
    OrientationRequest["status"],
    { label: string; classes: string }
  > = {
    nouvelle: { label: "NOUVELLE", classes: "bg-magenta-500 text-white" },
    en_cours: {
      label: "EN COURS",
      classes: "bg-blue-600 text-white",
    },
    contactee: {
      label: "CONTACTÉE",
      classes: "bg-orange-500 text-white",
    },
    traitee: {
      label: "TRAITÉE",
      classes: "bg-whatsapp text-white",
    },
    archivee: {
      label: "ARCHIVÉE",
      classes: "bg-navy-200 text-navy-600",
    },
  };
  const tone = tones[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-admin-label uppercase tracking-wide ${tone.classes}`}
    >
      {tone.label}
    </span>
  );
}

export function formatDemandeDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function DemandesManager({
  initialContent,
}: {
  initialContent: DemandesContent;
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [dateFilter, setDateFilter] = useState("Toutes");
  const [dateThreshold, setDateThreshold] = useState(0);

  const changeDateFilter = (value: string) => {
    setDateFilter(value);
    const now = Date.now();
    if (value === "Aujourd'hui") {
      setDateThreshold(new Date(now).setHours(0, 0, 0, 0));
    } else if (value === "7 jours") {
      setDateThreshold(now - 7 * 24 * 60 * 60 * 1000);
    } else if (value === "30 jours") {
      setDateThreshold(now - 30 * 24 * 60 * 60 * 1000);
    } else {
      setDateThreshold(0);
    }
  };

  const items = useMemo(
    () =>
      [...initialContent.requests]
        .filter((request) => !request.deletedAt)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
    [initialContent.requests],
  );

  const filtered = items.filter((request) => {
    const matchesQuery =
      query.trim().length === 0 ||
      [
        request.number,
        request.firstName,
        request.lastName,
        request.country,
        request.city,
        request.field,
        request.email,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase());
    const matchesStatus =
      statusFilter === "Tous" || request.status === statusFilter;
    const matchesDate =
      dateThreshold === 0 || new Date(request.createdAt).getTime() >= dateThreshold;
    return matchesQuery && matchesStatus && matchesDate;
  });

  const needsLabel = (request: OrientationRequest) => {
    const labels: [boolean, string][] = [
      [request.needs.orientation, "Orientation"],
      [request.needs.admission, "Admission"],
      [request.needs.housing, "Logement"],
      [request.needs.welcome ?? false, "Accueil"],
      [request.needs.installation, "Installation"],
      [request.needs.administrative ?? false, "Admin"],
    ];
    return labels.filter(([active]) => active).map(([, label]) => label);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        title="Demandes d'orientation"
        description="Les demandes envoyées depuis le formulaire public"
        destination="/trouver-mon-ecole"
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <AdminSearch
          value={query}
          onChange={setQuery}
          placeholder="Rechercher une demande..."
        />
        <SelectInput
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: "Tous", label: "Tous les statuts" },
            { value: "nouvelle", label: "NOUVELLE" },
            { value: "en_cours", label: "EN COURS" },
            { value: "contactee", label: "CONTACTÉE" },
            { value: "traitee", label: "TRAITÉE" },
            { value: "archivee", label: "ARCHIVÉE" },
          ]}
        />
        <SelectInput
          value={dateFilter}
          onChange={changeDateFilter}
          options={[
            { value: "Toutes", label: "Toutes les dates" },
            { value: "Aujourd'hui", label: "Aujourd'hui" },
            { value: "7 jours", label: "7 derniers jours" },
            { value: "30 jours", label: "30 derniers jours" },
          ]}
        />
      </div>

      <p className="mt-6 text-sm font-semibold text-navy-600" aria-live="polite">
        {filtered.length} demande{filtered.length > 1 ? "s" : ""}
        {filtered.length !== items.length ? ` sur ${items.length}` : ""}
      </p>

      {items.length === 0 ? (
        <div className="mt-6">
          <AdminEmptyState
            icon={<MapPinIcon className="h-6 w-6" />}
            title="Aucune demande pour le moment."
            description="Les demandes envoyées depuis le formulaire « Trouver mon école » apparaîtront ici, sans aucune donnée fictive."
          />
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-navy-200 bg-white px-6 py-12 text-center">
          <p className="text-sm text-navy-600">
            Aucune demande ne correspond à ta recherche.
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((request) => (
            <li
              key={request.id}
              className="rounded-3xl bg-white p-5 ring-1 ring-navy-100"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                  {(request.firstName[0] ?? "") + (request.lastName[0] ?? "")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-navy-900">
                    {request.firstName} {request.lastName}
                    <span className="ml-2 font-mono text-xs font-semibold text-navy-400">
                      #{request.number}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-navy-500">
                    {[request.country, request.city, request.field]
                      .filter(Boolean)
                      .join(" · ") || "Projet non précisé"}
                  </span>
                </span>
                <RequestStatusBadge status={request.status} />
                <Link
                  href={`/admin/demandes/${request.id}`}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-navy-900 px-5 text-admin-button text-white transition-colors hover:bg-magenta-500"
                >
                  Ouvrir
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-navy-50 pt-4 text-xs text-navy-600">
                <span className="inline-flex items-center gap-1.5">
                  <WhatsAppIcon className="h-3.5 w-3.5 text-whatsapp-dark" />
                  {request.whatsapp}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MailIcon className="h-3.5 w-3.5 text-navy-400" />
                  {request.email}
                </span>
                <span className="font-semibold text-navy-700">
                  {needsLabel(request).join(" · ") || "Aucun besoin précisé"}
                </span>
                <span className="ml-auto text-navy-400">
                  {formatDemandeDate(request.createdAt)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}