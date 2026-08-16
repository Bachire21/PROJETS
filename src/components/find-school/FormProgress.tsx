"use client";

import { steps } from "@/data/find-school";
import { CheckIcon } from "@/components/icons";

type FormProgressProps = {
  currentStep: number;
};

export function FormProgress({ currentStep }: FormProgressProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
      <div className="hidden items-center md:flex" aria-hidden="false">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <div key={step.number} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2.5">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-secondary font-bold transition-colors duration-300 ${
                    isCurrent
                      ? "bg-magenta-500 text-white shadow-md shadow-magenta-500/30"
                      : isCompleted
                        ? "bg-navy-900 text-white"
                        : "border border-navy-200 bg-white text-navy-700/50"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    step.number
                  )}
                </span>
                <span
                  className={`hidden text-label font-semibold sm:block ${
                    isCurrent ? "text-navy-900" : "text-navy-700/55"
                  }`}
                >
                  {step.sideLabel}
                </span>
              </div>
              {index < steps.length - 1 ? (
                <div
                  className={`mx-3 mb-6 h-px flex-1 transition-colors duration-500 ${
                    index < currentStep ? "bg-navy-900" : "bg-navy-100"
                  }`}
                  aria-hidden="true"
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="md:hidden">
        <div className="flex items-baseline justify-between">
          <p className="text-secondary font-semibold text-navy-900">
            {steps[currentStep].sideLabel}
          </p>
          <p className="font-display text-secondary font-bold text-navy-700/60">
            {steps[currentStep].number} / {steps.length.toString().padStart(2, "0")}
          </p>
        </div>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy-100"
          role="progressbar"
          aria-valuenow={currentStep + 1}
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-label={`Étape ${currentStep + 1} sur ${steps.length}`}
        >
          <div
            className="h-full rounded-full bg-magenta-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </>
  );
}