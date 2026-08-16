import type { ReactNode } from "react";
import Image from "next/image";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-admin-label uppercase tracking-[0.12em] text-navy-600">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint ? (
        <span className="mt-1 block text-xs text-navy-500">{hint}</span>
      ) : null}
    </label>
  );
}

const inputClasses =
  "w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-admin-body text-navy-900 placeholder:text-navy-300 focus:border-magenta-500 focus:outline-none focus:ring-2 focus:ring-magenta-500/20";

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={inputClasses}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 4,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(event) => onChange(event.target.value)}
      className={`${inputClasses} resize-y leading-relaxed`}
    />
  );
}

export function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={inputClasses}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label ?? "Activer ou désactiver"}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-whatsapp" : "bg-navy-200"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-[1.375rem]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export function StatusChip({ published }: { published: boolean }) {
  return published ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp/10 px-2.5 py-1 text-admin-label uppercase tracking-wide text-whatsapp-dark">
      <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" />
      Publié
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-2.5 py-1 text-admin-label uppercase tracking-wide text-navy-600">
      <span className="h-1.5 w-1.5 rounded-full bg-navy-300" />
      Brouillon
    </span>
  );
}

export const knownImages = [
  "/images/accueil.jpg",
  "/images/logement-hero.jpg",
  "/images/logement-visuel.jpg",
  "/images/catalogue-hero.jpg",
  "/images/etudier-hero.jpg",
  "/images/etudier-visuel.jpg",
  "/images/find-school-hero.jpg",
  "/images/hero-accueil.jpg",
  "/images/students.jpg",
];

export function ImageField({
  url,
  alt,
  onChangeUrl,
  onChangeAlt,
}: {
  url: string;
  alt: string;
  onChangeUrl: (value: string) => void;
  onChangeAlt: (value: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
      <div>
        {url ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-navy-200">
            <Image
              src={url}
              alt="Aperçu de l'image choisie"
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
        <div>
          <input
            type="text"
            list="known-images"
            value={url}
            placeholder="/images/logement-hero.jpg"
            onChange={(event) => onChangeUrl(event.target.value)}
            className={inputClasses}
          />
          <datalist id="known-images">
            {knownImages.map((image) => (
              <option key={image} value={image} />
            ))}
          </datalist>
        </div>
        <input
          type="text"
          value={alt}
          placeholder="Texte alternatif (accessibilité)"
          onChange={(event) => onChangeAlt(event.target.value)}
          className={inputClasses}
        />
      </div>
    </div>
  );
}
