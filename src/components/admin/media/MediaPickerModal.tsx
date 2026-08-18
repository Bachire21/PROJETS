"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MediaItem } from "@/data/media";
import {
  listMediaAction,
  uploadMediaAction,
} from "@/app/admin/media/actions";
import { actionErrorMessage } from "@/lib/client-action-error";
import {
  CheckIcon,
  CloseIcon,
  FileTextIcon,
  ImageIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/icons";

export type MediaFilter = "image" | "document" | "video" | "all";

const ACCEPT_BY_TYPE: Record<Exclude<MediaFilter, "all">, string> = {
  image: "image/jpeg,image/png,image/webp,image/gif,image/avif,image/svg+xml",
  document: ".pdf,.doc,.docx",
  video: "video/mp4,video/webm,video/quicktime",
};

const TABS: { value: MediaFilter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "image", label: "Images" },
  { value: "document", label: "Documents" },
  { value: "video", label: "Vidéos" },
];

// Modale montée uniquement quand elle est ouverte (parents conditionnels) :
// son état est réinitialisé à chaque ouverture.
export function MediaPickerModal({
  onClose,
  onSelect,
  title,
  description,
  filter = "all",
}: {
  onClose: () => void;
  onSelect: (item: MediaItem) => void;
  title: string;
  description?: string;
  filter?: MediaFilter;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<MediaFilter>(filter);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const items = await listMediaAction();
        if (!cancelled) setItems(items);
      } catch (error) {
        console.error("listMediaAction : la Server Action a rejeté la requête.", error);
        if (!cancelled) {
          setError(
            actionErrorMessage(
              error,
              "Impossible de charger la médiathèque (réseau ou serveur indisponible). Réessaie.",
            ),
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleItems = useMemo(
    () =>
      items
        .filter((item) => tab === "all" || item.type === tab)
        .filter(
          (item) =>
            query.trim().length === 0 ||
            [item.name, item.url]
              .join(" ")
              .toLowerCase()
              .includes(query.trim().toLowerCase()),
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
    [items, tab, query],
  );

  const upload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadMediaAction(formData);
      if (result.ok && result.media) {
        setItems((current) => [result.media as MediaItem, ...current]);
        setSelectedId((result.media as MediaItem).id);
      } else {
        setError(
          result.message ?? "L'import du média a échoué. Vérifie le fichier et réessaie.",
        );
      }
    } catch (error) {
      console.error("upload : la Server Action a rejeté la requête.", error);
      setError(
        actionErrorMessage(
          error,
          "L'import n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
        ),
      );
    } finally {
      setUploading(false);
    }
  };

  const accept =
    tab === "all" ? Object.values(ACCEPT_BY_TYPE).join(",") : ACCEPT_BY_TYPE[tab];
  const selected = items.find((item) => item.id === selectedId) ?? null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-navy-100 px-6 py-4">
          <div>
            <h2 className="text-admin-section text-navy-900">{title}</h2>
            {description ? (
              <p className="mt-0.5 text-xs text-navy-500">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-navy-600 hover:bg-cream"
          >
            <CloseIcon className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b border-navy-100 px-6 py-4">
          <div className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-navy-400">
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un média…"
              className="w-full rounded-xl border border-navy-200 bg-white py-2.5 pr-3.5 pl-10 text-sm text-navy-900 placeholder:text-navy-300 focus:border-magenta-500 focus:outline-none focus:ring-2 focus:ring-magenta-500/20"
            />
          </div>
          <input
            ref={fileRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
              event.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-magenta-500 px-5 text-admin-button text-white transition-colors hover:bg-magenta-600 disabled:opacity-60"
          >
            <PlusIcon className="h-4 w-4" />
            {uploading ? "Import…" : "Ajouter un média"}
          </button>
        </div>

        {filter === "all" ? (
          <div className="flex flex-wrap gap-2 border-b border-navy-100 px-6 pt-4 pb-3">
            {TABS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setTab(option.value);
                  setSelectedId(null);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                  tab === option.value
                    ? "bg-navy-900 text-white"
                    : "bg-navy-50 text-navy-600 hover:bg-navy-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}

        {error ? (
          <p className="border-b border-navy-100 bg-red-50 px-6 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {loading ? (
            <p className="py-12 text-center text-sm text-navy-500">
              Chargement de la médiathèque…
            </p>
          ) : visibleItems.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-navy-200 px-6 py-12 text-center">
              <ImageIcon className="mx-auto h-8 w-8 text-navy-300" />
              <p className="mt-3 text-sm font-bold text-navy-900">
                {query.trim() || tab !== "all"
                  ? "Aucun média ne correspond."
                  : "Aucun média dans la médiathèque."}
              </p>
              <p className="mt-1 text-xs text-navy-500">
                {query.trim() || tab !== "all"
                  ? "Modifie la recherche ou le filtre."
                  : "Utilisez « Ajouter un média » pour importer un fichier depuis votre ordinateur."}
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {visibleItems.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      aria-pressed={isSelected}
                      className={`group relative w-full overflow-hidden rounded-2xl text-left ring-2 transition-colors ${
                        isSelected
                          ? "ring-magenta-500"
                          : "ring-navy-100 hover:ring-navy-300"
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full bg-navy-50">
                        {item.type === "image" && item.url ? (
                          <Image
                            src={item.url}
                            alt={item.name}
                            fill
                            sizes="(min-width: 768px) 25vw, 50vw"
                            className="object-cover"
                          />
                        ) : item.type === "video" && item.url ? (
                          <video
                            src={item.url}
                            muted
                            playsInline
                            preload="metadata"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center">
                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-navy-400 ring-1 ring-navy-100">
                              <FileTextIcon className="h-6 w-6" />
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="bg-white px-3 py-2">
                        <p className="truncate text-xs font-bold text-navy-900">
                          {item.name}
                        </p>
                        <p className="truncate font-mono text-[0.65rem] text-navy-500">
                          {item.url}
                        </p>
                      </div>
                      {isSelected ? (
                        <span className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-magenta-500 text-white shadow">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-navy-100 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-full border border-navy-200 px-6 text-admin-button text-navy-900 transition-colors hover:border-navy-900"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={() => {
              if (selected) onSelect(selected);
              onClose();
            }}
            disabled={!selected}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-magenta-500 px-6 text-admin-button text-white transition-colors hover:bg-magenta-600 disabled:opacity-40"
          >
            <CheckIcon className="h-4 w-4" />
            Choisir
          </button>
        </div>
      </div>
    </div>
  );
}