import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, CompassIcon } from "@/components/icons";

export function CatalogCta() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-magenta-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
              <CompassIcon className="h-7 w-7" />
            </span>
            <h2 className="mt-6 text-h2 text-white sm:text-h2-lg">
              Tu ne trouves pas encore ce que tu cherches ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lead text-cream/80">
              Parle-nous de ton projet et Campus Way pourra t&apos;orienter vers
              les options correspondant à ton profil.
            </p>
            <div className="mt-10 flex justify-center">
              <Button
                href="/trouver-mon-ecole"
                size="lg"
                variant="accent"
                className="group hover:-translate-y-0.5 focus-visible:outline-white"
              >
                Trouver mon école
                <ArrowRightIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}