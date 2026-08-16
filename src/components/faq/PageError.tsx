import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { InfoIcon, WhatsAppIcon } from "@/components/icons";

export function PageError() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-navy-100 sm:p-14">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-magenta-500/10 text-magenta-600">
            <InfoIcon className="h-8 w-8" />
          </span>
          <h1 className="mt-7 text-h3 text-navy-900 sm:text-h3-lg">
            Les réponses sont momentanément indisponibles
          </h1>
          <p className="mt-4 text-lead text-navy-700/75">
            Tu peux contacter Campus Way directement.
          </p>
          <Button
            href={site.whatsappUrl}
            external
            variant="whatsapp"
            size="lg"
            className="mt-8 uppercase"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Parler à Campus Way
          </Button>
        </div>
      </Container>
    </section>
  );
}