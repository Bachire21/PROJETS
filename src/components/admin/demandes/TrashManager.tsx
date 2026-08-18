"use client";

import { useState } from "react";
import type { OrientationRequest } from "@/data/demandes";
import type { DemandesContent } from "@/lib/content-store";
import { AdminPageHeader } from "@/components/admin/ui/PageHeader";
import { AdminEmptyState } from "@/components/admin/ui/EmptyState";
import {
  purgeRequestAction,
  restoreRequestAction,
} from "@/app/admin/demandes/actions";
import { actionErrorMessage } from "@/lib/client-action-error";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";
import { Toast, type ToastData } from "@/components/admin/ui/Toast";
import {
  RequestStatusBadge,
  formatDemandeDate,
} from "@/components/admin/demandes/DemandesManager";
import {
  ArchiveIcon,
  MailIcon,
  TrashIcon,
  UndoIcon,
  WhatsAppIcon,
} from "@/components/icons";

export function TrashManager({
  initialContent,
}: {
  initialContent: DemandesContent;
}) {
  const [requests, setRequests] = useState(
    initialContent.requests.filter((request) => request.deletedAt),
  );
  const [busyId, setBusyId] = useState<string | null>(null);
  const [purgeTarget, setPurgeTarget] = useState<OrientationRequest | null>(null);
  const [toast, setToast] = useState<ToastData>(null);

  const notify = (message: string, kind: "success" | "error" = "success") =>
    setToast({ kind, message });

  const run = async (
    id: string,
    action: (id: string) => Promise<{ ok: boolean; message?: string }>,
    successMessage: string,
    remove: boolean,
  ) => {
    setBusyId(id);
    try {
      const result = await action(id);
      if (result.ok) {
        setRequests((current) =>
          remove ? current.filter((item) => item.id !== id) : current,
        );
        notify(successMessage);
      } else {
        notify(result.message ?? "L'opération a échoué.", "error");
      }
    } catch (error) {
      console.error("action corbeille : la Server Action a rejeté la requête.", error);
      notify(
        actionErrorMessage(
          error,
          "L'opération n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
        ),
        "error",
      );
    } finally {
      setBusyId(null);
    }
  };

  const restore = (request: OrientationRequest) =>
    run(
      request.id,
      restoreRequestAction,
      `Demande ${request.number} restaurée.`,
      false,
    );

  const confirmPurge = async () => {
    if (!purgeTarget) return;
    await run(
      purgeTarget.id,
      purgeRequestAction,
      `Demande ${purgeTarget.number} supprimée définitivement.`,
      true,
    );
    setPurgeTarget(null);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        title="Corbeille"
        description="Les demandes supprimées. Elles peuvent être restaurées ou supprimées définitivement."
        destination="/admin/demandes"
      />

      <p className="mt-6 text-sm font-semibold text-navy-600" aria-live="polite">
        {requests.length} demande{requests.length > 1 ? "s" : ""} dans la
        corbeille
      </p>

      {requests.length === 0 ? (
        <div className="mt-6">
          <AdminEmptyState
            icon={<ArchiveIcon className="h-6 w-6" />}
            title="La corbeille est vide."
            description="Les demandes supprimées apparaîtront ici pendant 30 jours avant suppression automatique."
          />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {requests.map((request) => (
            <li
              key={request.id}
              className="rounded-3xl bg-white p-5 ring-1 ring-navy-100"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs font-bold text-navy-500">
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
                <button
                  type="button"
                  onClick={() => restore(request)}
                  disabled={busyId === request.id}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-navy-300 bg-white px-5 text-admin-button text-navy-900 transition-colors hover:border-navy-900 disabled:pointer-events-none disabled:opacity-40"
                >
                  <UndoIcon className="h-4 w-4" />
                  Restaurer
                </button>
                <button
                  type="button"
                  onClick={() => setPurgeTarget(request)}
                  disabled={busyId === request.id}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-red-300 bg-white px-5 text-admin-button text-red-600 transition-colors hover:bg-red-600 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                >
                  <TrashIcon className="h-4 w-4" />
                  Supprimer
                </button>
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
                <span className="ml-auto text-navy-400">
                  Supprimée le {formatDemandeDate(request.deletedAt ?? "")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={purgeTarget !== null}
        title="Supprimer définitivement ?"
        description={`La demande ${purgeTarget?.number ?? ""} sera définitivement supprimée. Cette action est irréversible.`}
        confirmLabel="Supprimer définitivement"
        onConfirm={confirmPurge}
        onCancel={() => setPurgeTarget(null)}
      />

      <Toast toast={toast} />
    </div>
  );
}