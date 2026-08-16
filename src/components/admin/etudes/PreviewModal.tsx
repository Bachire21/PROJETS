import type { EtudesPageData } from "@/data/etudier-au-maroc";
import { isPublished } from "@/lib/logement-content-utils";
import { Hero } from "@/components/etudier-au-maroc/Hero";
import { Advantages } from "@/components/etudier-au-maroc/Advantages";
import { VisualSection } from "@/components/etudier-au-maroc/VisualSection";
import { Cities } from "@/components/etudier-au-maroc/Cities";
import { Journey } from "@/components/etudier-au-maroc/Journey";
import { Transparency } from "@/components/etudier-au-maroc/Transparency";
import { FinalCta } from "@/components/etudier-au-maroc/FinalCta";
import { CloseIcon } from "@/components/icons";

export function PreviewModal({
  content,
  onClose,
}: {
  content: EtudesPageData;
  onClose: () => void;
}) {
  const hasAnySection = [
    content.hero,
    content.advantagesSection,
    content.visualSection,
    content.citiesSection,
    content.journeySection,
    content.transparency,
    content.finalCta,
  ].some((section) => isPublished(section.published));

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="Aperçu de la page publique Étudier au Maroc"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy-100 bg-white/95 px-5 py-3 backdrop-blur">
        <p className="text-sm font-bold text-navy-900">
          Aperçu — /etudier-au-maroc
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
            {isPublished(content.advantagesSection.published) ? (
              <Advantages section={content.advantagesSection} />
            ) : null}
            {isPublished(content.visualSection.published) ? (
              <VisualSection section={content.visualSection} />
            ) : null}
            {isPublished(content.citiesSection.published) ? (
              <Cities section={content.citiesSection} />
            ) : null}
            {isPublished(content.journeySection.published) ? (
              <Journey section={content.journeySection} />
            ) : null}
            {isPublished(content.transparency.published) ? (
              <Transparency section={content.transparency} />
            ) : null}
            {isPublished(content.finalCta.published) ? (
              <FinalCta cta={content.finalCta} />
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