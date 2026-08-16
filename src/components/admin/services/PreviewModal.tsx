import type { ServicesPageData } from "@/data/services";
import { isPublished } from "@/lib/logement-content-utils";
import { Hero } from "@/components/services/Hero";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { ParcoursTimeline } from "@/components/services/ParcoursTimeline";
import { ImmersiveSection } from "@/components/services/ImmersiveSection";
import { Strengths } from "@/components/services/Strengths";
import { FinalCta } from "@/components/services/FinalCta";
import { CloseIcon } from "@/components/icons";

export function PreviewModal({
  content,
  onClose,
}: {
  content: ServicesPageData;
  onClose: () => void;
}) {
  const hasAnySection = [
    content.hero,
    content.servicesSection,
    content.parcours,
    content.immersive,
    content.cta,
  ].some((section) => isPublished(section.published));

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="Aperçu de la page publique Nos services"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy-100 bg-white/95 px-5 py-3 backdrop-blur">
        <p className="text-sm font-bold text-navy-900">
          Aperçu — /nos-services
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
            {isPublished(content.hero.published) ? (
              <Hero hero={content.hero} />
            ) : null}
            {isPublished(content.servicesSection.published) ? (
              <ServicesGrid servicesSection={content.servicesSection} />
            ) : null}
            {isPublished(content.parcours.published) ? (
              <ParcoursTimeline parcours={content.parcours} />
            ) : null}
            {isPublished(content.immersive.published) ? (
              <ImmersiveSection immersive={content.immersive} />
            ) : null}
            <Strengths strengths={content.strengths} />
            {isPublished(content.cta.published) ? (
              <FinalCta cta={content.cta} />
            ) : null}
          </>
        ) : (
          <div className="flex min-h-[50vh] items-center justify-center bg-cream px-6 py-16 text-center">
            <div className="max-w-md rounded-3xl bg-white p-10 ring-1 ring-navy-100">
              <h2 className="text-admin-section text-navy-900">
                Aucune section publiée
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-600">
                Publie au moins une section pour la voir apparaître ici et sur
                le site public.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}