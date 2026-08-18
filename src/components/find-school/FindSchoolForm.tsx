"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import {
  initialFormData,
  reassurance,
  sidePanel,
  steps,
  type StudentFormData,
} from "@/data/find-school";
import { submitOrientationRequest } from "@/app/trouver-mon-ecole/actions";
import { Container } from "@/components/ui/Container";
import { FormProgress } from "./FormProgress";
import { FormNavigation } from "./FormNavigation";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { AcademicStep } from "./AcademicStep";
import { ProjectStep } from "./ProjectStep";
import { NeedsStep } from "./NeedsStep";
import { SuccessState } from "./SuccessState";
import { CheckIcon } from "@/components/icons";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9]{8,15}$/;

function validateStep(
  step: number,
  data: StudentFormData
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (step === 0) {
    if (!data.firstName.trim()) errors.firstName = "Ce champ est obligatoire.";
    if (!data.lastName.trim()) errors.lastName = "Ce champ est obligatoire.";
    if (!data.country) errors.country = "Ce champ est obligatoire.";
    if (!data.whatsapp.trim()) {
      errors.whatsapp = "Ce champ est obligatoire.";
    } else if (!PHONE_PATTERN.test(data.whatsapp.replace(/\s/g, ""))) {
      errors.whatsapp = "Veuillez saisir un numéro WhatsApp valide.";
    }
    if (!data.email.trim()) {
      errors.email = "Ce champ est obligatoire.";
    } else if (!EMAIL_PATTERN.test(data.email.trim())) {
      errors.email = "Veuillez saisir une adresse e-mail valide.";
    }
  }

  if (step === 1) {
    if (!data.educationLevel) errors.educationLevel = "Ce champ est obligatoire.";
    if (!data.desiredField) errors.desiredField = "Ce champ est obligatoire.";
  }

  if (step === 2) {
    if (!data.desiredCity) errors.desiredCity = "Ce champ est obligatoire.";
    if (!data.budget) errors.budget = "Ce champ est obligatoire.";
    if (!data.intake) errors.intake = "Ce champ est obligatoire.";
  }

  if (step === 3 && data.needs.length === 0) {
    errors.needs = "Sélectionne au moins un besoin.";
  }

  return errors;
}

export function FindSchoolForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<StudentFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isPending, startTransition] = useTransition();
  const sectionRef = useRef<HTMLDivElement>(null);

  const setField =
    (key: keyof StudentFormData) => (value: string) => {
      setData((current) => ({ ...current, [key]: value }));
      setErrors((current) => {
        if (!(key in current)) return current;
        const next = { ...current };
        delete next[key];
        return next;
      });
    };

  const toggleNeed = (id: string) => {
    setData((current) => ({
      ...current,
      needs: current.needs.includes(id)
        ? current.needs.filter((need) => need !== id)
        : [...current.needs, id],
    }));
    setErrors((current) => {
      if (!("needs" in current)) return current;
      const next = { ...current };
      delete next.needs;
      return next;
    });
  };

  const scrollToForm = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContinue = () => {
    const nextErrors = validateStep(step, data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      scrollToForm();
    } else {
      startTransition(async () => {
        try {
          const result = await submitOrientationRequest(data);
          if (result.ok) {
            setSubmitError("");
            setSubmitted(true);
            scrollToForm();
          } else {
            setSubmitError(result.message ?? "L'envoi de ta demande a échoué.");
          }
        } catch (error) {
          console.error("handleContinue : la Server Action a rejeté la requête.", error);
          setSubmitError(
            "L'envoi n'a pas abouti (réseau ou serveur indisponible). Réessaie dans quelques instants.",
          );
        }
      });
    }
  };

  const handleBack = () => {
    setStep((current) => Math.max(0, current - 1));
    scrollToForm();
  };

  const handleReset = () => {
    setData(initialFormData);
    setErrors({});
    setStep(0);
    setSubmitted(false);
  };

  return (
    <section className="bg-cream py-16 sm:py-24" ref={sectionRef}>
      <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
        <div>
          <FormProgress currentStep={step} />

          <div className="mt-8 rounded-[1.75rem] bg-white p-6 shadow-xl shadow-navy-900/5 ring-1 ring-navy-100 sm:p-10">
            {submitted ? (
              <SuccessState firstName={data.firstName} onReset={handleReset} />
            ) : (
              <>
                <header>
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-900 font-display text-body font-bold text-white">
                      {steps[step].number}
                    </span>
                    <div>
                      <p className="text-label uppercase tracking-[0.16em] text-magenta-500">
                        Étape {steps[step].number} sur {String(steps.length).padStart(2, "0")}
                      </p>
                      <h2 className="mt-1 text-h3 text-navy-900 sm:text-h3-lg">
                        {steps[step].title}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-5 text-lead text-navy-700/75">
                    {steps[step].subtitle}{" "}
                    <span className="text-navy-700/60">
                      {steps[step].hint}
                    </span>
                  </p>
                </header>

                <div key={step} className="step-enter mt-8">
                  {step === 0 ? (
                    <PersonalInfoStep
                      data={data}
                      onChange={setField}
                      errors={errors}
                    />
                  ) : null}
                  {step === 1 ? (
                    <AcademicStep
                      data={data}
                      onChange={setField}
                      errors={errors}
                    />
                  ) : null}
                  {step === 2 ? (
                    <ProjectStep
                      data={data}
                      onChange={setField}
                      errors={errors}
                    />
                  ) : null}
                  {step === 3 ? (
                    <NeedsStep
                      data={data}
                      onChange={setField}
                      onToggleNeed={toggleNeed}
                      errors={errors}
                    />
                  ) : null}
                </div>

                <FormNavigation
                  currentStep={step}
                  onBack={handleBack}
                  onContinue={handleContinue}
                  isLast={step === steps.length - 1}
                  isPending={isPending}
                />

                {submitError ? (
                  <p
                    role="alert"
                    className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-small font-semibold text-red-600"
                  >
                    {submitError}
                  </p>
                ) : null}
              </>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-white/80 p-5 text-sm ring-1 ring-navy-100 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-2">
            <p className="font-semibold text-navy-900">
              <span aria-hidden="true">🔒</span> {reassurance.privacy}
            </p>
            <ul className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-6">
              {reassurance.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-navy-700/75"
                >
                  <CheckIcon className="h-3.5 w-3.5 text-magenta-500" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href={reassurance.privacyHref}
              className="font-semibold text-navy-900 underline decoration-navy-300 underline-offset-4 transition-colors hover:text-magenta-600 hover:decoration-magenta-500/50"
            >
              {reassurance.privacyLabel}
            </Link>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-[1.75rem] bg-white p-8 shadow-lg shadow-navy-900/5 ring-1 ring-navy-100">
            <p className="font-display text-h4 font-bold text-navy-900">
              {sidePanel.eyebrow}
            </p>
            <ol className="mt-7 space-y-5">
              {steps.map((stepItem, index) => {
                const isCurrent = index === step;
                const isDone = index < step;
                return (
                  <li key={stepItem.number} className="flex items-center gap-4">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-secondary font-bold transition-colors duration-300 ${
                        isCurrent
                          ? "bg-magenta-500 text-white shadow-md shadow-magenta-500/30"
                          : isDone
                            ? "bg-navy-900 text-white"
                            : "bg-navy-50 text-navy-700/50"
                      }`}
                      aria-current={isCurrent ? "step" : undefined}
                    >
                      {stepItem.number}
                    </span>
                    <span
                      className={`text-secondary font-semibold ${
                        isCurrent ? "text-navy-900" : "text-navy-700/60"
                      }`}
                    >
                      {stepItem.sideLabel}
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-8 border-t border-navy-100 pt-6 text-secondary leading-relaxed text-navy-700/70">
              {sidePanel.phrase}
            </p>
          </div>
        </aside>
      </Container>
    </section>
  );
}