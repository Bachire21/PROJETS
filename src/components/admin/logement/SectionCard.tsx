import type { ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { StatusChip, Toggle } from "@/components/admin/logement/fields";

export function SectionCard({
  icon,
  title,
  subtitle,
  published,
  onTogglePublished,
  open,
  onToggleOpen,
  children,
  badge,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  published: boolean;
  onTogglePublished: (published: boolean) => void;
  open: boolean;
  onToggleOpen: () => void;
  children: ReactNode;
  badge?: string;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-navy-100">
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 sm:px-7">
        <button
          type="button"
          onClick={onToggleOpen}
          className="flex min-w-0 flex-1 items-center gap-4 text-left"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white">
            {icon}
          </span>
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-admin-section text-navy-900">
                {title}
              </span>
              {badge ? (
                <span className="rounded-full bg-magenta-500/10 px-2 py-0.5 text-admin-label uppercase tracking-wide text-magenta-600">
                  {badge}
                </span>
              ) : null}
            </span>
            <span className="mt-0.5 block truncate text-xs text-navy-600">
              {subtitle}
            </span>
          </span>
        </button>

        <div className="flex items-center gap-3">
          <StatusChip published={published} />
          <div className="flex items-center gap-2 rounded-full bg-cream px-3 py-1.5">
            <span className="text-xs font-semibold text-navy-600">
              {published ? "Visible" : "Masqué"}
            </span>
            <Toggle
              checked={published}
              onChange={onTogglePublished}
              label={`${published ? "Masquer" : "Publier"} la section ${title}`}
            />
          </div>
          <button
            type="button"
            onClick={onToggleOpen}
            aria-label={open ? "Replier la section" : "Déplier la section"}
            className="flex h-8 w-8 items-center justify-center rounded-full text-navy-500 transition-colors hover:bg-navy-50 hover:text-navy-900"
          >
            <ChevronDownIcon
              className={`h-4.5 w-4.5 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-navy-100 px-5 py-6 sm:px-7">{children}</div>
      ) : null}
    </section>
  );
}