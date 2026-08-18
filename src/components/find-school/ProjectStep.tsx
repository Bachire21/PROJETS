"use client";

import type { StudentFormData } from "@/data/find-school";
import { budgets, cities, intakes } from "@/data/find-school";
import { SelectionCard } from "./SelectionCard";

type ProjectStepProps = {
  data: StudentFormData;
  onChange: (key: keyof StudentFormData) => (value: string) => void;
  errors: Record<string, string>;
};

function GroupLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <p className="text-secondary font-semibold text-navy-900">
      {label}
      {required ? (
        <span className="ml-0.5 text-magenta-500" aria-hidden="true">
          *
        </span>
      ) : null}
    </p>
  );
}

export function ProjectStep({ data, onChange, errors }: ProjectStepProps) {
  return (
    <div className="space-y-7">
      <div>
        <GroupLabel label="Ville souhaitée" required />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {cities.map((city) => (
            <SelectionCard
              key={city}
              label={city}
              compact
              selected={data.desiredCity === city}
              onSelect={() => onChange("desiredCity")(city)}
            />
          ))}
        </div>
        {errors.desiredCity ? (
          <p role="alert" className="mt-2 text-small text-orange-600">
            {errors.desiredCity}
          </p>
        ) : null}
      </div>

      <div>
        <GroupLabel label="Budget" required />
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {budgets.map((budget) => (
            <SelectionCard
              key={budget.value}
              label={budget.label}
              description={budget.description}
              selected={data.budget === budget.value}
              onSelect={() => onChange("budget")(budget.value)}
            />
          ))}
        </div>
        {errors.budget ? (
          <p role="alert" className="mt-2 text-small text-orange-600">
            {errors.budget}
          </p>
        ) : null}
      </div>

      <div>
        <GroupLabel label="Budget logement mensuel" required />
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {budgets.map((budget) => (
            <SelectionCard
              key={budget.value}
              label={budget.label}
              description={budget.description}
              selected={data.housingBudget === budget.value}
              onSelect={() => onChange("housingBudget")(budget.value)}
            />
          ))}
        </div>
        {errors.housingBudget ? (
          <p role="alert" className="mt-2 text-small text-orange-600">
            {errors.housingBudget}
          </p>
        ) : null}
      </div>

      <div>
        <GroupLabel label="Rentrée souhaitée" required />
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {intakes.map((intake) => (
            <SelectionCard
              key={intake.value}
              label={intake.label}
              description={intake.description}
              selected={data.intake === intake.value}
              onSelect={() => onChange("intake")(intake.value)}
            />
          ))}
        </div>
        {errors.intake ? (
          <p role="alert" className="mt-2 text-small text-orange-600">
            {errors.intake}
          </p>
        ) : null}
      </div>
    </div>
  );
}