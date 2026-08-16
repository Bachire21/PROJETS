import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ShieldCheckIcon } from "@/components/icons";

export function TransparencyBanner() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border-2 border-dashed border-orange-500/50 bg-orange-100/50 p-7 sm:p-10 lg:p-12">
            <div
              className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-md shadow-orange-500/30">
                <ShieldCheckIcon className="h-6 w-6" />
              </span>
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3.5 py-1.5 text-label font-bold uppercase tracking-[0.14em] text-orange-600">
                  À vérifier
                </p>
                <h2 className="mt-4 text-h3 text-navy-900 sm:text-h3-lg">
                  Vérifie toujours les informations auprès des établissements.
                </h2>
                <p className="mt-3.5 text-body leading-relaxed text-navy-800/80">
                  Chaque information publiée sur une formation, une admission
                  ou un tarif est à vérifier auprès de l&apos;établissement
                  concerné avant toute décision.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}