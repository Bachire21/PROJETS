"use client";

import { successMessages } from "@/data/find-school";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/icons";

type SuccessStateProps = {
  firstName: string;
  onReset: () => void;
};

export function SuccessState({ firstName, onReset }: SuccessStateProps) {
  return (
    <div className="py-8 text-center sm:py-10">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-magenta-500/10 text-magenta-600">
        <CheckIcon className="h-8 w-8" />
      </span>
      <h2 className="mt-6 text-h3 text-navy-900 sm:text-h3-lg">
        {successMessages.titlePrefix} {firstName}.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-lead text-navy-700/75">
        {successMessages.description}
      </p>
      <p className="mx-auto mt-5 max-w-lg rounded-xl bg-navy-50 px-4 py-3 text-secondary leading-relaxed text-navy-700/80">
        {successMessages.pendingNote}
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Button type="button" variant="outline" onClick={onReset}>
          Recommencer
        </Button>
        <Button href="/">Retour à l&apos;accueil</Button>
      </div>
    </div>
  );
}