"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { MediaItem } from "@/data/media";
import { uploadMediaAction } from "@/app/admin/media/actions";
import { actionErrorMessage } from "@/lib/client-action-error";
import {
  CheckIcon,
  CloseIcon,
  ImageIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/icons";
import { TextInput } from "@/components/admin/ui/fields";

export type PickedImage = { id?: string; src: string; alt: string };

export function MediaPickerField({
  value,
  onChange,
  initialMedia,
  defaultSrc,
}: {
  value: PickedImage;
  onChange: (image: PickedImage) => void;
  initialMedia: MediaItem[];
  defaultSrc: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState(initialMedia);
  const fileRef = useRef<HTMLInputElement>(null);

  const images = useMemo(
    () =>
      items
        .filter((item) => item.type === "image")
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
    [items],
  );

  const filtered = images.filter(
    (item) =>
      query.trim().length === 0 ||
      [item.name, item.url]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );

  const openModal = () => {
    setQuery("");
    setError("");
    setSelectedId(value.id ?? null);
    setOpen(true);
  };

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
        setError(result.message ?? "L'import de l'image a échoué.");
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

  const confirm = () => {
    const chosen = images.find((item) => item.id === selectedId);
    if (chosen) {
      onChange({ id: chosen.id, src: chosen.url, alt: value.alt });
    }
    setOpen(false);
  };

  const isCustomSelection = value.src !== defaultSrc;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
        <div>
          {value.src ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-navy-200">
              <Image
                src={value.src}
                alt={value.alt || "Aperçu de l'image choisie"}
                fill
                sizes="10rem"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-navy-50 text-xs font-semibold text-navy-400 ring-1 ring-navy-100">
              Aucune image
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={openModal}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-navy-900 px-5 text-admin-button text-white transition-colors hover:bg-magenta-500"
            >
              <ImageIcon className="h-4 w-4" />
              Choisir dans la médiathèque
            </button>
            {isCustomSelection ? (
              <button
                type="button"
                onClick={() => onChange({ id: undefined, src: defaultSrc, alt: value.alt })}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-navy-200 px-5 text-sm font-semibold text-navy-700 transition-colors hover:border-red-500 hover:text-red-600"
              >
                <CloseIcon className="h-4 w-4" />
                Retirer la sélection
              </button>
            ) : null}
          </div>
          <p className="text-xs leading-relaxed text-navy-500">
            L&apos;image est choisie dans la médiathèque du site : elle est
            réutilisable et référencée proprement.
          </p>
          <TextInput
            value={value.alt}
            placeholder="Texte alternatif (accessibilité)"
            onChange={(alt) => onChange({ ...value, alt })}
          />
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Choisir une image dans la médiathèque"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-navy-100 px-6 py-4">
              <div>
                <h2 className="text-admin-section text-navy-900">
                  Médiathèque
                </h2>
                <p className="mt-0.5 text-xs text-navy-500">
                  Sélectionnez une image pour le hero.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
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
                  placeholder="Rechercher une image…"
                  className="w-full rounded-xl border border-navy-200 bg-white py-2.5 pr-3.5 pl-10 text-sm text-navy-900 placeholder:text-navy-300 focus:border-magenta-500 focus:outline-none focus:ring-2 focus:ring-magenta-500/20"
                />
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif,image/svg+xml"
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
                {uploading ? "Import…" : "Ajouter une image"}
              </button>
            </div>

            {error ? (
              <p className="border-b border-navy-100 bg-red-50 px-6 py-3 text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}

            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              {images.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-navy-200 px-6 py-12 text-center">
                  <ImageIcon className="mx-auto h-8 w-8 text-navy-300" />
                  <p className="mt-3 text-sm font-bold text-navy-900">
                    Aucune image dans la médiathèque.
                  </p>
                  <p className="mt-1 text-xs text-navy-500">
                    Utilisez « Ajouter une image » pour importer une image
                    depuis votre ordinateur.
                  </p>
                </div>
              ) : filtered.length === 0 ? (
                <p className="rounded-3xl border border-dashed border-navy-200 px-6 py-12 text-center text-sm text-navy-600">
                  Aucune image ne correspond à la recherche.
                </p>
              ) : (
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {filtered.map((item) => {
                    const selected = item.id === selectedId;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(item.id)}
                          aria-pressed={selected}
                          className={`group relative w-full overflow-hidden rounded-2xl text-left ring-2 transition-colors ${
                            selected
                              ? "ring-magenta-500"
                              : "ring-navy-100 hover:ring-navy-300"
                          }`}
                        >
                          <div className="relative aspect-[4/3] w-full bg-navy-50">
                            <Image
                              src={item.url}
                              alt={item.name}
                              fill
                              sizes="(min-width: 768px) 25vw, 50vw"
                              className="object-cover"
                            />
                          </div>
                          <div className="bg-white px-3 py-2">
                            <p className="truncate text-xs font-bold text-navy-900">
                              {item.name}
                            </p>
                            <p className="truncate font-mono text-[0.65rem] text-navy-500">
                              {item.url}
                            </p>
                          </div>
                          {selected ? (
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
                onClick={() => setOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-full border border-navy-200 px-6 text-admin-button text-navy-900 transition-colors hover:border-navy-900"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={confirm}
                disabled={!selectedId}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-magenta-500 px-6 text-admin-button text-white transition-colors hover:bg-magenta-600 disabled:opacity-40"
              >
                <CheckIcon className="h-4 w-4" />
                Choisir
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}