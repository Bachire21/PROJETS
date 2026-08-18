"use client";

import Image from "next/image";
import { useState } from "react";
import { CloseIcon, ImageIcon } from "@/components/icons";
import { TextInput } from "@/components/admin/ui/fields";
import { MediaPickerModal } from "@/components/admin/media/MediaPickerModal";
import type { MediaItem } from "@/data/media";

export type PickedImage = { id?: string; src: string; alt: string };

export function MediaPickerField({
  value,
  onChange,
  defaultSrc,
}: {
  value: PickedImage;
  onChange: (image: PickedImage) => void;
  defaultSrc: string;
}) {
  const [open, setOpen] = useState(false);

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
              onClick={() => setOpen(true)}
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
        <MediaPickerModal
          onClose={() => setOpen(false)}
          onSelect={(item: MediaItem) => {
            onChange({ id: item.id, src: item.url, alt: value.alt });
          }}
          title="Médiathèque"
          description="Sélectionnez une image pour le hero."
          filter="image"
        />
      ) : null}
    </div>
  );
}