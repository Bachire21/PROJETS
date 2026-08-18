"use client";

import type { StudentFormData } from "@/data/find-school";
import {
  desiredFields,
  diplomaYears,
  educationLevels,
  targetLevels,
} from "@/data/find-school";
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
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
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
        <SelectField
          id="diplomaYear"
          label="Année d'obtention"
          required
          icon={<GraduationIcon className="h-4.5 w-4.5" />}
          value={data.diplomaYear}
          onChange={onChange("diplomaYear")}
          options={diplomaYears}
          error={errors.diplomaYear}
        />
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
        <SelectField
          id="targetLevel"
          label="Niveau de formation recherché"
          required
          icon={<GraduationIcon className="h-4.5 w-4.5" />}
          value={data.targetLevel}
          onChange={onChange("targetLevel")}
          options={targetLevels}
          error={errors.targetLevel}
        />
      </div>

      <Field
        id="desiredFormation"
        label="Formation souhaitée"
        placeholder="Ex. : école de commerce, école d'ingénieurs, faculté…"
        value={data.desiredFormation}
        onChange={onChange("desiredFormation")}
        error={errors.desiredFormation}
        valid={Boolean(data.desiredFormation.trim())}
      />
    </div>
  );
}