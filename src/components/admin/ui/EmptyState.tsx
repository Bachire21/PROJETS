import type { ReactNode } from "react";
import { PlusIcon } from "@/components/icons";

export function AdminEmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-navy-200 bg-white px-6 py-14 text-center sm:py-16">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-white">
        {icon}
      </span>
      <h3 className="mt-5 text-admin-section text-navy-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-admin-body leading-relaxed text-navy-600">
        {description}
      </p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-7 inline-flex h-10 items-center gap-2 rounded-full bg-magenta-500 px-6 text-admin-button text-white transition-colors hover:bg-magenta-600"
        >
          <PlusIcon className="h-4 w-4" />
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}