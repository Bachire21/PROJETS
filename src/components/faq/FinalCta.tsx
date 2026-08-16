import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import type { FaqPage } from "@/lib/faq";

export function FinalCta({ cta }: { cta: FaqPage["cta"] }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-magenta-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-30%] left-[-10%] h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-label font-bold uppercase tracking-[0.18em] text-magenta-400 sm:text-sm">
              {cta.eyebrow}
            </p>
            <h2 className="mt-5 text-h2 text-white sm:text-h2-lg">
              {cta.title}
            </h2>
            <p className="mt-4 text-lead text-white/70">{cta.description}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href={cta.primaryButton.href}
                size="lg"
                className="group w-full uppercase hover:-translate-y-0.5 focus-visible:outline-magenta-400 sm:w-auto"
              >
                {cta.primaryButton.label}
                <ArrowRightIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                href={site.whatsappUrl}
                external
                variant="whatsapp"
                size="lg"
                className="w-full uppercase hover:-translate-y-0.5 sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {cta.secondaryButton.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}