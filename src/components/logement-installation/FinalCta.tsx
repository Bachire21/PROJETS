import type { LogementPageData } from "@/data/logement-installation";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";

type FinalCtaProps = {
  data: LogementPageData["cta"];
};

export function FinalCta({ data }: FinalCtaProps) {
  const secondaryHref =
    data.secondaryButton.type === "whatsapp" && data.secondaryButton.href === ""
      ? site.whatsappUrl
      : data.secondaryButton.href;

  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 sm:py-32">
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
            <h2 className="text-h2 text-white sm:text-h2-lg">
              {data.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lead text-cream/80">
              {data.description}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                href={data.primaryButton.href}
                external={data.primaryButton.type === "external"}
                size="lg"
                variant="accent"
                className="group hover:-translate-y-0.5 focus-visible:outline-white"
              >
                {data.primaryButton.label}
                <ArrowRightIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                href={secondaryHref}
                external={data.secondaryButton.type !== "internal"}
                size="lg"
                variant="whatsapp"
                className="group hover:-translate-y-0.5 focus-visible:outline-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {data.secondaryButton.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}