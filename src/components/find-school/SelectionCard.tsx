"use client";

import type { ReactNode } from "react";
import { CheckIcon } from "@/components/icons";

type SelectionCardProps = {
  label: string;
  description?: string;
  icon?: ReactNode;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
};

export function SelectionCard({
  label,
  description,
  icon,
  selected,
  onSelect,
  compact = false,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative flex w-full items-start gap-3 rounded-2xl border text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-500 active:scale-[0.99] ${
        selected
          ? "border-magenta-500 bg-magenta-500/[0.06] shadow-sm shadow-magenta-500/10"
          : "border-navy-100 bg-white hover:border-navy-300"
      } ${compact ? "p-4" : "p-4 sm:p-5"}`}
    >
      {icon ? (
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
            selected
              ? "bg-navy-900 text-white"
              : "bg-navy-50 text-navy-900 group-hover:bg-navy-100"
          }`}
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}
      <span className="min-w-0">
        <span
          className={`block text-secondary font-bold ${
            selected ? "text-navy-900" : "text-navy-900"
          }`}
        >
          {label}
        </span>
        {description ? (
          <span className="mt-0.5 block text-small leading-snug text-navy-700/70">
            {description}
          </span>
        ) : null}
      </span>
      <span
        className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
          selected
            ? "border-transparent bg-magenta-500 text-white"
            : "border-navy-200 bg-white text-transparent group-hover:border-navy-400"
        }`}
        aria-hidden="true"
      >
        <CheckIcon className="h-3 w-3" />
      </span>
    </button>
  );
}