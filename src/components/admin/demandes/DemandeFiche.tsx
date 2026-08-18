"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import type {
  OrientationRequest,
  OrientationRequestStatus,
} from "@/data/demandes";
import { orientationRequestStatuses } from "@/data/demandes";
import {
  addRequestNoteAction,
  archiveRequestAction,
  updateRequestStatusAction,
} from "@/app/admin/demandes/actions";
import { actionErrorMessage } from "@/lib/client-action-error";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";
import { Toast, type ToastData } from "@/components/admin/ui/Toast";
import { SelectInput, TextArea } from "@/components/admin/ui/fields";
import {
  RequestStatusBadge,
  formatDemandeDate,
} from "@/components/admin/demandes/DemandesManager";
import {
  ArrowLeftIcon,
  ArchiveIcon,
  ClockIcon,
  MailIcon,
  PlusIcon,
  UserIcon,
  WhatsAppIcon,
} from "@/components/icons";

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-admin-label uppercase tracking-[0.12em] text-navy-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold text-navy-900">
        {value || "—"}
      </p>
    </div>
  );
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl bg-white p-6 ring-1 ring-navy-100 sm:p-7">
      <h2 className="text-admin-section font-bold text-navy-900">{title}</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

const needLabels: { key: keyof OrientationRequest["needs"]; label: string }[] = [
  { key: "orientation", label: "Orientation" },
  { key: "admission", label: "Admission" },
  { key: "housing", label: "Logement" },
  { key: "installation", label: "Installation" },
];

export function DemandeFiche({
  initialRequest,
}: {
  initialRequest: OrientationRequest;
}) {
  const [request, setRequest] = useState(initialRequest);
  const [note, setNote] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [toast, setToast] = useState<ToastData>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const notify = (message: string, kind: "success" | "error" = "success") =>
    setToast({ kind, message });

  const changeStatus = async (status: OrientationRequestStatus) => {
    setSavingStatus(true);
    try {
      const result = await updateRequestStatusAction(request.id, status);
      if (result.ok) {
        setRequest({ ...request, status, updatedAt: new Date().toISOString() });
        notify("Statut mis à jour.");
      } else {
        notify(result.message ?? "La mise à jour a échoué.", "error");
      }
    } catch (error) {
      console.error("changeStatus : la Server Action a rejeté la requête.", error);
      notify(
        actionErrorMessage(
          error,
          "La mise à jour n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
        ),
        "error",
      );
    } finally {
      setSavingStatus(false);
    }
  };

  const addNote = async () => {
    if (!note.trim()) {
      notify("La note est vide.", "error");
      return;
    }
    setAddingNote(true);
    try {
      const result = await addRequestNoteAction(request.id, note);
      if (result.ok) {
        setRequest({
          ...request,
          notes: [
            ...request.notes,
            { id: crypto.randomUUID(), text: note.trim(), createdAt: new Date().toISOString() },
          ],
          updatedAt: new Date().toISOString(),
        });
        setNote("");
        notify("Note interne ajoutée. Elle n'est visible que dans l'Admin.");
      } else {
        notify(result.message ?? "L'ajout de la note a échoué.", "error");
      }
    } catch (error) {
      console.error("addNote : la Server Action a rejeté la requête.", error);
      notify(
        actionErrorMessage(
          error,
          "L'ajout de la note n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
        ),
        "error",
      );
    } finally {
      setAddingNote(false);
    }
  };

  const confirmArchive = async () => {
    setArchiving(true);
    try {
      const result = await archiveRequestAction(request.id);
      if (result.ok) {
        setRequest({ ...request, status: "archivee", updatedAt: new Date().toISOString() });
        notify("Demande archivée.");
      } else {
        notify(result.message ?? "L'archivage a échoué.", "error");
      }
    } catch (error) {
      console.error("confirmArchive : la Server Action a rejeté la requête.", error);
      notify(
        actionErrorMessage(
          error,
          "L'archivage n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
        ),
        "error",
      );
    } finally {
      setArchiving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/admin/demandes"
        className="inline-flex items-center gap-2 text-sm font-bold text-navy-700 transition-colors hover:text-magenta-600"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Retour aux demandes
      </Link>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-admin-title tracking-tight text-navy-900">
            Demande <span className="font-mono">#{request.number}</span>
          </h1>
          <RequestStatusBadge status={request.status} />
        </div>
        <button
          type="button"
          onClick={() => setArchiving(true)}
          disabled={request.status === "archivee"}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-navy-300 bg-white px-5 text-admin-button text-navy-900 transition-colors hover:border-red-500 hover:text-red-600 disabled:pointer-events-none disabled:opacity-40"
        >
          <ArchiveIcon className="h-4 w-4" />
          Archiver
        </button>
      </div>

      <div className="mt-8 space-y-5">
        <InfoBlock title="Informations personnelles">
          <InfoLine label="Prénom" value={request.firstName} />
          <InfoLine label="Nom" value={request.lastName} />
          <InfoLine label="Pays" value={request.country} />
          <div>
            <p className="text-admin-label uppercase tracking-[0.12em] text-navy-500">
              WhatsApp
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
              <WhatsAppIcon className="h-4 w-4 text-whatsapp-dark" />
              {request.whatsapp || "—"}
            </p>
          </div>
          <div>
            <p className="text-admin-label uppercase tracking-[0.12em] text-navy-500">
              Email
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
              <MailIcon className="h-4 w-4 text-navy-400" />
              {request.email || "—"}
            </p>
          </div>
        </InfoBlock>

        <InfoBlock title="Parcours">
          <InfoLine label="Diplôme" value={request.diploma} />
          <InfoLine label="Niveau" value={request.level} />
          <InfoLine label="Filière souhaitée" value={request.field} />
        </InfoBlock>

        <InfoBlock title="Projet">
          <InfoLine label="Ville" value={request.city} />
          <InfoLine label="Budget" value={request.budget} />
          <InfoLine label="Rentrée" value={request.intake} />
        </InfoBlock>

        <InfoBlock title="Besoins">
          {needLabels.map((need) => (
            <div key={need.key}>
              <p className="text-admin-label uppercase tracking-[0.12em] text-navy-500">
                {need.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-navy-900">
                {request.needs[need.key] ? "Demandé" : "Non demandé"}
              </p>
            </div>
          ))}
        </InfoBlock>

        <section className="rounded-3xl bg-white p-6 ring-1 ring-navy-100 sm:p-7">
          <h2 className="text-admin-section font-bold text-navy-900">
            Message complémentaire
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-navy-800/80">
            {request.message || "Aucun message complémentaire."}
          </p>
        </section>

        <section className="rounded-3xl bg-white p-6 ring-1 ring-navy-100 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="flex items-center gap-2.5 text-admin-section font-bold text-navy-900">
              <UserIcon className="h-4.5 w-4.5 text-magenta-500" />
              Suivi
            </h2>
            <div className="flex items-center gap-2 text-xs text-navy-500">
              <ClockIcon className="h-3.5 w-3.5" />
              Créée le {formatDemandeDate(request.createdAt)} · Modifiée le{" "}
              {formatDemandeDate(request.updatedAt)}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-admin-label uppercase tracking-[0.12em] text-navy-600">
                Statut
              </p>
              <div className="mt-2">
                <SelectInput
                  value={request.status}
                  onChange={(value) =>
                    changeStatus(value as OrientationRequestStatus)
                  }
                  options={orientationRequestStatuses.map((item) => ({
                    value: item.value,
                    label: item.label,
                  }))}
                />
              </div>
              {savingStatus ? (
                <p className="mt-2 text-xs font-semibold text-navy-500">
                  Mise à jour…
                </p>
              ) : null}
            </div>

            <div>
              <p className="text-admin-label uppercase tracking-[0.12em] text-navy-600">
                Notes internes
              </p>
              <p className="mt-1 text-xs text-navy-500">
                Visibles uniquement dans l&apos;Admin. Jamais sur le site
                public.
              </p>
              {request.notes.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {request.notes.map((noteItem) => (
                    <li
                      key={noteItem.id}
                      className="rounded-2xl bg-cream px-4 py-3 text-sm leading-relaxed text-navy-800"
                    >
                      {noteItem.text}
                      <span className="mt-1 block text-xs text-navy-400">
                        {formatDemandeDate(noteItem.createdAt)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 rounded-2xl bg-cream px-4 py-3 text-sm text-navy-600">
                  Aucune note interne pour le moment.
                </p>
              )}
              <div className="mt-4">
                <TextArea
                  value={note}
                  rows={2}
                  onChange={setNote}
                />
                <button
                  type="button"
                  onClick={addNote}
                  disabled={addingNote || !note.trim()}
                  className="mt-2 inline-flex h-10 items-center gap-2 rounded-full bg-navy-900 px-5 text-admin-button text-white transition-colors hover:bg-magenta-500 disabled:pointer-events-none disabled:opacity-40"
                >
                  <PlusIcon className="h-4 w-4" />
                  {addingNote ? "Ajout…" : "Ajouter une note"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ConfirmDialog
        open={archiving}
        title="Archiver cette demande ?"
        description="La demande passera au statut ARCHIVÉE. Elle restera consultable dans l'Admin, mais sera retirée des demandes actives."
        confirmLabel="Archiver"
        danger={false}
        onConfirm={confirmArchive}
        onCancel={() => setArchiving(false)}
      />

      <Toast toast={toast} />
    </div>
  );
}