"use client";

import Link from "next/link";
import type { StudentFormData } from "@/data/find-school";
import { consent } from "@/data/find-school";
import { TextAreaField } from "./fields";

type FinalStepProps = {
  data: StudentFormData;
  onChange: (key: keyof StudentFormData) => (value: string) => void;
  errors: Record<string, string>;
};

export function FinalStep({ data, onChange, errors }: FinalStepProps) {
  return (
    <div className="space-y-7">
      <TextAreaField
        id="message"
        label="Message / informations complémentaires"
        placeholder="Parle-nous de ton projet, de tes questions, de ta situation…"
        rows={4}
        value={data.message}
        onChange={onChange("message")}
        error={errors.message}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-3.5">
          <input
            type="checkbox"
            checked={data.consent === "accepted"}
            onChange={(event) =>
              onChange("consent")(event.target.checked ? "accepted" : "")
            }
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-navy-200 text-magenta-500 focus:ring-magenta-500/20"
          />
          <span className="text-secondary leading-relaxed text-navy-700/80">
            {consent.label}{" "}
            <Link
              href={consent.privacyHref}
              className="font-semibold text-navy-900 underline decoration-navy-300 underline-offset-4 transition-colors hover:text-magenta-600 hover:decoration-magenta-500/50"
            >
              Politique de confidentialité
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p role="alert" className="mt-2 text-small text-orange-600">
            {errors.consent}
          </p>
        ) : null}
      </div>
    </div>
  );
}