import { finalCta } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";

export function FinalCta() {
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
            <p className="flex items-center justify-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-400 sm:text-sm">
              <span className="h-px w-8 bg-magenta-400/70" aria-hidden="true" />
              {finalCta.eyebrow}
              <span className="h-px w-8 bg-magenta-400/70" aria-hidden="true" />
            </p>
            <h2 className="mt-5 text-h2 text-white sm:text-h2-lg">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lead text-cream/80">
              {finalCta.description}
            </p>
            <div className="mt-11 flex flex-wrap justify-center gap-4">
              <Button
                href={finalCta.primaryCta.href}
                size="lg"
                variant="accent"
              >
                {finalCta.primaryCta.label}
                <ArrowRightIcon className="h-4.5 w-4.5" />
              </Button>
              <Button
                href={site.whatsappUrl}
                external
                size="lg"
                variant="whatsapp"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {finalCta.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}