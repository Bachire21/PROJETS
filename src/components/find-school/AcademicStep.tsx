"use client";

import type { StudentFormData } from "@/data/find-school";
import { desiredFields, educationLevels } from "@/data/find-school";
import { Field, SelectField } from "./fields";
import { SelectionCard } from "./SelectionCard";
import { GraduationIcon } from "@/components/icons";

type AcademicStepProps = {
  data: StudentFormData;
  onChange: (key: keyof StudentFormData) => (value: string) => void;
  errors: Record<string, string>;
};

export function AcademicStep({
  data,
  onChange,
  errors,
}: AcademicStepProps) {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-secondary font-semibold text-navy-900">
          Niveau d&apos;études
          <span className="ml-0.5 text-magenta-500" aria-hidden="true">
            *
          </span>
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {educationLevels.map((level) => (
            <SelectionCard
              key={level}
              label={level}
              compact
              selected={data.educationLevel === level}
              onSelect={() => onChange("educationLevel")(level)}
            />
          ))}
        </div>
        {errors.educationLevel ? (
          <p role="alert" className="mt-2 text-small text-orange-600">
            {errors.educationLevel}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="diploma"
          label="Diplôme (en cours ou obtenu)"
          placeholder="Ex. : Baccalauréat série C"
          value={data.diploma}
          onChange={onChange("diploma")}
          error={errors.diploma}
          valid={Boolean(data.diploma.trim())}
        />
        <SelectField
          id="desiredField"
          label="Filière souhaitée"
          required
          icon={<GraduationIcon className="h-4.5 w-4.5" />}
          value={data.desiredField}
          onChange={onChange("desiredField")}
          options={desiredFields}
          error={errors.desiredField}
        />
      </div>
    </div>
  );
}