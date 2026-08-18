"use client";

import type { StudentFormData } from "@/data/find-school";
import { needs, situationQuestions, yesNoOptions } from "@/data/find-school";
import { SelectionCard } from "./SelectionCard";
import { iconMap } from "@/components/icons";

type NeedsStepProps = {
  data: StudentFormData;
  onChange: (key: keyof StudentFormData) => (value: string) => void;
  onToggleNeed: (id: string) => void;
  errors: Record<string, string>;
};

export function NeedsStep({
  data,
  onChange,
  onToggleNeed,
  errors,
}: NeedsStepProps) {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-secondary font-semibold text-navy-900">
          De quel accompagnement as-tu besoin ?
          <span className="ml-0.5 text-magenta-500" aria-hidden="true">
            *
          </span>
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {needs.map((need) => {
            const Icon = iconMap[need.icon];
            return (
              <SelectionCard
                key={need.id}
                label={need.title}
                description={need.description}
                icon={<Icon className="h-5 w-5" />}
                selected={data.needs.includes(need.id)}
                onSelect={() => onToggleNeed(need.id)}
              />
            );
          })}
        </div>
        {errors.needs ? (
          <p role="alert" className="mt-2 text-small text-orange-600">
            {errors.needs}
          </p>
        ) : null}
      </div>

      {situationQuestions.map((question) => (
        <div key={question.key}>
          <p className="text-secondary font-semibold text-navy-900">
            {question.label}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:w-1/2">
            {yesNoOptions.map((option) => (
              <SelectionCard
                key={option}
                label={option}
                compact
                selected={data[question.key] === option}
                onSelect={() => onChange(question.key)(option)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}