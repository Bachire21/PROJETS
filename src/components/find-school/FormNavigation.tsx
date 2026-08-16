"use client";

import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

type FormNavigationProps = {
  currentStep: number;
  onBack: () => void;
  onContinue: () => void;
  isLast: boolean;
  isPending?: boolean;
};

export function FormNavigation({
  currentStep,
  onBack,
  onContinue,
  isLast,
  isPending,
}: FormNavigationProps) {
  return (
    <div className="mt-10 flex items-center justify-between gap-4 border-t border-navy-100 pt-7">
      {currentStep > 0 ? (
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeftIcon className="h-4.5 w-4.5" />
          Retour
        </Button>
      ) : (
        <span aria-hidden="true" />
      )}
      <Button
        type="button"
        variant={isLast ? "accent" : "primary"}
        size="lg"
        onClick={onContinue}
        disabled={isPending}
      >
        {isPending
          ? "Envoi en cours…"
          : isLast
            ? "Envoyer ma demande"
            : "Continuer"}
        <ArrowRightIcon className="h-4.5 w-4.5" />
      </Button>
    </div>
  );
}