"use client";

import { CloseIcon } from "@/components/icons";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Supprimer",
  cancelLabel = "Annuler",
  danger = true,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-admin-section text-navy-900">{title}</h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Fermer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-navy-500 transition-colors hover:bg-navy-50 hover:text-navy-900"
          >
            <CloseIcon className="h-4.5 w-4.5" />
          </button>
        </div>
        <p className="mt-3 text-admin-body leading-relaxed text-navy-700/75">
          {description}
        </p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 items-center justify-center rounded-full border border-navy-200 px-6 text-admin-button text-navy-900 transition-colors hover:border-navy-900"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`inline-flex h-10 items-center justify-center rounded-full px-6 text-admin-button text-white transition-colors ${
              danger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-navy-900 hover:bg-navy-700"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}