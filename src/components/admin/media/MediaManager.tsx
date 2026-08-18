"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@/data/media";
import type { MediaContent } from "@/lib/content-store";
import {
  addMediaAction,
  deleteMediaAction,
  uploadMediaAction,
} from "@/app/admin/media/actions";
import { actionErrorMessage } from "@/lib/client-action-error";
import { knownImages } from "@/lib/known-images";
import { pageLabel } from "@/lib/media-page-labels";
import { AdminPageHeader } from "@/components/admin/ui/PageHeader";
import { AdminSearch } from "@/components/admin/ui/Search";
import { AdminEmptyState } from "@/components/admin/ui/EmptyState";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";
import { Toast, type ToastData } from "@/components/admin/ui/Toast";
import {
  Field,
  SelectInput,
  TextInput,
} from "@/components/admin/ui/fields";
import {
  CopyIcon,
  EyeIcon,
  FileTextIcon,
  ImageIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/icons";

function formatSize(bytes: number) {
  if (!bytes) return "Taille inconnue";
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

const typeLabels: Record<MediaItem["type"], string> = {
  image: "Image",
  document: "Document",
  video: "Vidéo",
};

const emptyItem = {
  name: "",
  type: "image" as MediaItem["type"],
  size: 0,
  url: "",
  usage: [] as string[],
};

const fileAccept =
  "image/jpeg,image/png,image/webp,image/gif,image/avif,image/svg+xml," +
  ".pdf,.doc,.docx,video/mp4,video/webm,video/quicktime";

export function MediaManager({
  initialContent,
  usageByMedia,
}: {
  initialContent: MediaContent;
  usageByMedia: Record<string, string[]>;
}) {
  const [content, setContent] = useState(initialContent);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [adding, setAdding] = useState(false);
  const [mode, setMode] = useState<"upload" | "manual">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [draft, setDraft] = useState(emptyItem);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<MediaItem | null>(null);
  const [toast, setToast] = useState<ToastData>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const closeModal = () => {
    setAdding(false);
    setFile(null);
    setPreviewUrl(null);
  };

  const items = useMemo(
    () =>
      [...content.items].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [content.items],
  );

  const filtered = items.filter((item) => {
    const matchesQuery =
      query.trim().length === 0 ||
      [item.name, item.url].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesType =
      typeFilter === "Tous" || item.type === typeFilter;
    return matchesQuery && matchesType;
  });

  const notify = (message: string, kind: "success" | "error" = "success") =>
    setToast({ kind, message });

  const addItem = async () => {
    if (!draft.name.trim() || !draft.url.trim()) {
      notify("Le nom et le chemin du média sont obligatoires.", "error");
      return;
    }
    setSaving(true);
    try {
      const result = await addMediaAction(draft);
      if (result.ok) {
        const media: MediaItem = {
          ...draft,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          custom: true,
        };
        setContent({ items: [media, ...content.items] });
        closeModal();
        setDraft(emptyItem);
        notify("Média ajouté avec succès.");
      } else {
        notify(result.message ?? "L'ajout a échoué.", "error");
      }
    } catch (error) {
      console.error("addItem : la Server Action a rejeté la requête.", error);
      notify(
        actionErrorMessage(
          error,
          "L'ajout n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
        ),
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const pickFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
    setPreviewUrl(null);
    if (
      selected &&
      (selected.type.startsWith("image/") || selected.type.startsWith("video/"))
    ) {
      setPreviewUrl(URL.createObjectURL(selected));
    }
    event.target.value = "";
  };

  const uploadFile = async () => {
    if (!file) {
      notify("Choisis d'abord un fichier à importer.", "error");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadMediaAction(formData);
      if (result.ok && result.media) {
        setContent({ items: [result.media as MediaItem, ...content.items] });
        closeModal();
        notify("Média ajouté avec succès.");
      } else {
        notify(
          result.message ?? "L'import du média a échoué. Vérifie le fichier et réessaie.",
          "error",
        );
      }
    } catch (error) {
      console.error("uploadFile : la Server Action a rejeté la requête.", error);
      notify(
        actionErrorMessage(
          error,
          "L'import n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
        ),
        "error",
      );
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = async (item: MediaItem) => {
    try {
      await navigator.clipboard.writeText(item.url);
      notify(`Chemin copié : ${item.url}`);
    } catch {
      notify("Impossible de copier le chemin.", "error");
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      const result = await deleteMediaAction(deleting);
      if (result.ok) {
        setContent({
          items: content.items.filter((item) => item.id !== deleting.id),
        });
        notify("Média supprimé avec succès.");
      } else {
        notify(result.message ?? "La suppression a échoué.", "error");
      }
    } catch (error) {
      console.error("confirmDelete : la Server Action a rejeté la requête.", error);
      notify(
        actionErrorMessage(
          error,
          "La suppression n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
        ),
        "error",
      );
    } finally {
      setDeleting(null);
    }
  };

  const usedPages = (item: MediaItem) =>
    [...new Set([...(usageByMedia[item.id] ?? []), ...item.usage])].map(
      pageLabel,
    );

  const isPublicImage = (item: MediaItem) =>
    knownImages.includes(item.url) ||
    item.usage.length > 0 ||
    (usageByMedia[item.id]?.length ?? 0) > 0;

  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        title="Médiathèque"
        description="Les images, documents et vidéos disponibles pour les contenus du site"
        destination="/"
        actions={
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-magenta-500 px-6 text-admin-button text-white transition-colors hover:bg-magenta-600"
          >
            <PlusIcon className="h-4 w-4" />
            Ajouter un média
          </button>
        }
      />

      <p className="mt-6 rounded-2xl bg-white px-5 py-4 text-xs leading-relaxed text-navy-600 ring-1 ring-navy-100">
        Un média utilisé par le site public (badge « utilisé ») ne peut pas être
        supprimé : cela éviterait de casser les images affichées publiquement.
        L&apos;usage est détecté automatiquement dans les contenus du site.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <AdminSearch
          value={query}
          onChange={setQuery}
          placeholder="Rechercher un média..."
        />
        <SelectInput
          value={typeFilter}
          onChange={setTypeFilter}
          options={[
            { value: "Tous", label: "Tous les types" },
            { value: "image", label: "Images" },
            { value: "document", label: "Documents" },
            { value: "video", label: "Vidéos" },
          ]}
        />
      </div>

      <p className="mt-6 text-sm font-semibold text-navy-600" aria-live="polite">
        {filtered.length} média{filtered.length > 1 ? "s" : ""}
        {filtered.length !== items.length ? ` sur ${items.length}` : ""}
      </p>

      {items.length === 0 ? (
        <div className="mt-6">
          <AdminEmptyState
            icon={<ImageIcon className="h-6 w-6" />}
            title="Aucun média pour le moment."
            description="Ajoute ici les images, documents et vidéos utilisés par les contenus du site."
            actionLabel="Ajouter un média"
            onAction={() => setAdding(true)}
          />
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-navy-200 bg-white px-6 py-12 text-center">
          <p className="text-sm text-navy-600">
            Aucun média ne correspond à ta recherche.
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="overflow-hidden rounded-3xl bg-white ring-1 ring-navy-100"
            >
              <div className="flex h-36 items-center justify-center bg-navy-50">
                {item.type === "image" && item.url ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={item.url}
                      alt={item.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : item.type === "video" && item.url ? (
                  <video
                    src={item.url}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-navy-400 ring-1 ring-navy-100">
                    <FileTextIcon className="h-6 w-6" />
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-navy-900">
                      {item.name}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-xs text-navy-500">
                      {item.url}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-navy-50 px-2.5 py-1 text-admin-label uppercase tracking-wide text-navy-600">
                    {typeLabels[item.type]}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {isPublicImage(item) ? (
                    <span
                      title={usedPages(item).join(", ")}
                      className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp/10 px-2.5 py-1 text-admin-label uppercase tracking-wide text-whatsapp-dark"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" />
                      Utilisé par le site public
                    </span>
                  ) : (
                    <span className="rounded-full bg-navy-50 px-2.5 py-1 text-admin-label uppercase tracking-wide text-navy-600">
                      Non utilisé
                    </span>
                  )}
                  <span className="text-xs text-navy-500">
                    {formatSize(item.size)} · {formatDate(item.createdAt)}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border border-navy-200 text-xs font-bold text-navy-700 transition-colors hover:border-navy-900"
                  >
                    <EyeIcon className="h-3.5 w-3.5" />
                    Voir
                  </a>
                  <button
                    type="button"
                    onClick={() => copyUrl(item)}
                    className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-navy-900 text-xs font-bold text-white transition-colors hover:bg-magenta-500"
                  >
                    <CopyIcon className="h-3.5 w-3.5" />
                    Copier le chemin
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleting(item)}
                    disabled={isPublicImage(item)}
                    aria-label="Supprimer ce média"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-200 text-navy-600 transition-colors hover:border-red-500 hover:text-red-600 disabled:pointer-events-none disabled:opacity-30"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {adding ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Ajouter un média"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-admin-section text-navy-900">
              Ajouter un média
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-navy-600">
              Téléverse un fichier depuis ton ordinateur ou référence un chemin
              déjà présent sur le site.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-1 rounded-2xl bg-navy-50 p-1">
              <button
                type="button"
                onClick={() => setMode("upload")}
                className={`rounded-xl px-4 py-2 text-admin-label uppercase tracking-wide transition-colors ${
                  mode === "upload"
                    ? "bg-white text-navy-900 shadow-sm"
                    : "text-navy-500 hover:text-navy-700"
                }`}
              >
                Téléverser un fichier
              </button>
              <button
                type="button"
                onClick={() => setMode("manual")}
                className={`rounded-xl px-4 py-2 text-admin-label uppercase tracking-wide transition-colors ${
                  mode === "manual"
                    ? "bg-white text-navy-900 shadow-sm"
                    : "text-navy-500 hover:text-navy-700"
                }`}
              >
                Chemin existant
              </button>
            </div>

            {mode === "upload" ? (
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-dashed border-navy-200 p-6 text-center">
                  {file ? (
                    <div>
                      {previewUrl ? (
                        file.type.startsWith("image/") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={previewUrl}
                            alt="Aperçu du fichier sélectionné"
                            className="mx-auto max-h-40 rounded-xl object-contain"
                          />
                        ) : (
                          <video
                            src={previewUrl}
                            controls
                            className="mx-auto max-h-40 rounded-xl"
                          />
                        )
                      ) : (
                        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-400 ring-1 ring-navy-100">
                          <FileTextIcon className="h-6 w-6" />
                        </span>
                      )}
                      <p className="mt-3 truncate text-sm font-bold text-navy-900">
                        {file.name}
                      </p>
                      <p className="mt-1 text-xs text-navy-500">
                        {formatSize(file.size)}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setPreviewUrl(null);
                        }}
                        className="mt-3 text-xs font-bold text-magenta-500 hover:underline"
                      >
                        Choisir un autre fichier
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-admin-button text-white transition-colors hover:bg-magenta-500"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Choisir un fichier…
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={fileAccept}
                    className="hidden"
                    onChange={pickFile}
                  />
                </div>
                <p className="text-xs leading-relaxed text-navy-500">
                  Formats acceptés : images JPG, PNG, WEBP, GIF, AVIF, SVG
                  (4 Mo max) ; documents PDF, DOC, DOCX (10 Mo max) ; vidéos
                  MP4, WEBM, MOV (15 Mo max). Le type et le dossier sont
                  détectés automatiquement.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-5">
                <Field label="Nom">
                  <TextInput
                    value={draft.name}
                    onChange={(value) => setDraft({ ...draft, name: value })}
                    placeholder="Ex. Photo campus"
                  />
                </Field>
                <Field label="Type">
                  <SelectInput
                    value={draft.type}
                    onChange={(value) =>
                      setDraft({ ...draft, type: value as MediaItem["type"] })
                    }
                    options={[
                      { value: "image", label: "Image" },
                      { value: "document", label: "Document" },
                      { value: "video", label: "Vidéo" },
                    ]}
                  />
                </Field>
                <Field
                  label="URL / Chemin"
                  hint="Ex. /images/etudier-hero.jpg"
                >
                  <TextInput
                    value={draft.url}
                    onChange={(value) => setDraft({ ...draft, url: value })}
                    placeholder="/images/..."
                  />
                </Field>
                <Field
                  label="Taille (octets, facultatif)"
                  hint="Laisse vide si la taille est inconnue."
                >
                  <TextInput
                    value={draft.size ? String(draft.size) : ""}
                    onChange={(value) =>
                      setDraft({
                        ...draft,
                        size: parseInt(value.replace(/\D/g, ""), 10) || 0,
                      })
                    }
                    placeholder="Ex. 245760"
                  />
                </Field>
              </div>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-10 items-center justify-center rounded-full border border-navy-200 px-6 text-admin-button text-navy-900 transition-colors hover:border-navy-900"
              >
                Annuler
              </button>
              {mode === "upload" ? (
                <button
                  type="button"
                  onClick={uploadFile}
                  disabled={uploading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-magenta-500 px-6 text-admin-button text-white transition-colors hover:bg-magenta-600 disabled:opacity-60"
                >
                  <PlusIcon className="h-4 w-4" />
                  {uploading ? "Import…" : "Importer le fichier"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={addItem}
                  disabled={saving}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-magenta-500 px-6 text-admin-button text-white transition-colors hover:bg-magenta-600 disabled:opacity-60"
                >
                  <PlusIcon className="h-4 w-4" />
                  {saving ? "Ajout…" : "Ajouter"}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <ConfirmDialog
        open={deleting !== null}
        title="Supprimer ce média ?"
        description="Le média sera retiré de la médiathèque et le fichier supprimé de Supabase Storage."
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />

      <Toast toast={toast} />
    </div>
  );
}