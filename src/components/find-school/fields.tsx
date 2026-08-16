"use client";

import type { ReactNode } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
} from "@/components/icons";

type FieldProps = {
  id: string;
  label: string;
  icon?: ReactNode;
  error?: string;
  valid?: boolean;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
};

const errorStyles =
  "border-orange-500 focus:border-orange-500 focus:ring-orange-500/10";
const normalStyles =
  "border-navy-200 focus:border-navy-600 focus:ring-navy-500/10";
const validStyles = "border-navy-300 focus:border-navy-600 focus:ring-navy-500/10";

function stateStyles(hasError: boolean, valid: boolean | undefined) {
  if (hasError) return errorStyles;
  if (valid) return validStyles;
  return normalStyles;
}

export function Field({
  id,
  label,
  icon,
  error,
  valid,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
  inputMode,
}: FieldProps) {
  const hasError = Boolean(error);
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-secondary font-semibold text-navy-900"
      >
        {label}
        {required ? (
          <span className="ml-0.5 text-magenta-500" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <div className="relative mt-2">
        {icon ? (
          <span
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-navy-300"
            aria-hidden="true"
          >
            {icon}
          </span>
        ) : null}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={`h-12 w-full rounded-xl border bg-white text-body text-navy-900 transition-all duration-200 placeholder:text-navy-300 focus:outline-none focus:ring-4 ${
            icon ? "pl-11" : "px-4"
          } ${valid && !hasError ? "pr-10" : ""} ${stateStyles(hasError, valid)}`}
        />
        {valid && !hasError ? (
          <span
            className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-navy-500"
            aria-hidden="true"
          >
            <CheckIcon className="h-4.5 w-4.5" />
          </span>
        ) : null}
      </div>
      {hasError ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-small text-orange-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  icon?: ReactNode;
  error?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
};

export function SelectField({
  id,
  label,
  icon,
  error,
  required,
  value,
  onChange,
  options,
  placeholder = "Sélectionner…",
}: SelectFieldProps) {
  const hasError = Boolean(error);
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-secondary font-semibold text-navy-900"
      >
        {label}
        {required ? (
          <span className="ml-0.5 text-magenta-500" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <div className="relative mt-2">
        {icon ? (
          <span
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-navy-300"
            aria-hidden="true"
          >
            {icon}
          </span>
        ) : null}
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={`h-12 w-full appearance-none rounded-xl border bg-white text-[0.95rem] transition-all duration-200 focus:outline-none focus:ring-4 ${
            icon ? "pl-11" : "pl-4"
          } pr-11 ${
            value ? "text-navy-900" : "text-navy-300"
          } ${stateStyles(hasError, Boolean(value))}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-navy-900">
              {option}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-navy-300"
          aria-hidden="true"
        >
          <ChevronDownIcon className="h-4.5 w-4.5" />
        </span>
      </div>
      {hasError ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-small text-orange-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextAreaFieldProps = {
  id: string;
  label: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
};

export function TextAreaField({
  id,
  label,
  error,
  value,
  onChange,
  placeholder,
  rows = 4,
}: TextAreaFieldProps) {
  const hasError = Boolean(error);
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-secondary font-semibold text-navy-900"
      >
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={`mt-2 w-full resize-none rounded-xl border bg-white px-4 py-3 text-body leading-relaxed text-navy-900 transition-all duration-200 placeholder:text-navy-300 focus:outline-none focus:ring-4 ${
          stateStyles(hasError, Boolean(value.trim()))
        }`}
      />
      {hasError ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-small text-orange-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}