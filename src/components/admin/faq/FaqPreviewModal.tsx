import type { FaqContent } from "@/lib/content-store";
import { isPublished, sortByOrder } from "@/lib/logement-content-utils";
import { Hero } from "@/components/faq/Hero";
import { FaqSection } from "@/components/faq/FaqSection";
import { FinalCta } from "@/components/faq/FinalCta";
import { CloseIcon } from "@/components/icons";

export function FaqPreviewModal({
  content,
  onClose,
}: {
  content: FaqContent;
  onClose: () => void;
}) {
  const items = sortByOrder(
    content.faqItems.filter((item) => isPublished(item.published)),
  );

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="Aperçu de la page publique FAQ"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy-100 bg-white/95 px-5 py-3 backdrop-blur">
        <p className="text-sm font-bold text-navy-900">
          Aperçu — /faq
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
        <Hero hero={content.page.hero} />
        <FaqSection items={items} page={content.page} />
        <FinalCta cta={content.page.cta} />
      </div>
    </div>
  );
}