import type { LogementPageData } from "@/data/logement-installation";
import { isPublished, sortByOrder } from "@/lib/logement-content-utils";
import { Hero } from "@/components/logement-installation/Hero";
import { Steps } from "@/components/logement-installation/Steps";
import { Support } from "@/components/logement-installation/Support";
import { VisualSection } from "@/components/logement-installation/VisualSection";
import { Transparency } from "@/components/logement-installation/Transparency";
import { FinalCta } from "@/components/logement-installation/FinalCta";
import { CloseIcon } from "@/components/icons";

export function PreviewModal({
  data,
  onClose,
}: {
  data: LogementPageData;
  onClose: () => void;
}) {
  const steps = sortByOrder(
    data.stepsSection.steps.filter((step) => isPublished(step.published)),
  );
  const items = sortByOrder(
    data.supportSection.items.filter((item) => isPublished(item.published)),
  );

  const hasAnySection =
    isPublished(data.hero.published) ||
    isPublished(data.stepsSection.published) ||
    isPublished(data.supportSection.published) ||
    isPublished(data.visualSection.published) ||
    isPublished(data.information.published) ||
    isPublished(data.cta.published);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="Aperçu de la page publique"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy-100 bg-white/95 px-5 py-3 backdrop-blur">
        <p className="text-sm font-bold text-navy-900">
          Aperçu — /logement-installation
          <span className="ml-3 text-xs font-semibold text-navy-500">
            L&apos;aperçu reflète les modifications non enregistrées.
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 items-center gap-2 rounded-full bg-navy-900 px-4 text-xs font-bold text-white transition-colors hover:bg-navy-700"
        >
          <CloseIcon className="h-4 w-4" />
          Fermer
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {hasAnySection ? (
          <>
            {isPublished(data.hero.published) ? <Hero data={data.hero} /> : null}
            {isPublished(data.stepsSection.published) ? (
              <Steps data={{ ...data.stepsSection, steps }} />
            ) : null}
            {isPublished(data.supportSection.published) ? (
              <Support data={{ ...data.supportSection, items }} />
            ) : null}
            {isPublished(data.visualSection.published) ? (
              <VisualSection data={data.visualSection} />
            ) : null}
            {isPublished(data.information.published) ? (
              <Transparency data={data.information} />
            ) : null}
            {isPublished(data.cta.published) ? <FinalCta data={data.cta} /> : null}
          </>
        ) : (
          <div className="flex min-h-[50vh] items-center justify-center bg-cream px-6 py-16 text-center">
            <div className="max-w-md rounded-3xl bg-white p-10 ring-1 ring-navy-100">
              <h2 className="text-admin-section text-navy-900">
                Aucune section publiée
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-600">
                Les informations concernant l&apos;accompagnement logement et
                installation seront bientôt disponibles.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}