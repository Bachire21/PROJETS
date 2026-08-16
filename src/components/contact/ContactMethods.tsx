import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  WhatsAppIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@/components/icons";
import { contactPage } from "@/data/contact";

export function ContactMethods() {
  const { methods } = contactPage;

  const cards = [
    {
      icon: WhatsAppIcon,
      iconClass: "bg-whatsapp/10 text-whatsapp-dark",
      label: methods.whatsapp.label,
      value: methods.whatsapp.value,
      hint: methods.whatsapp.hint,
      href: site.whatsappUrl,
      external: true,
    },
    {
      icon: MailIcon,
      iconClass: "bg-magenta-500/10 text-magenta-600",
      label: methods.email.label,
      value: methods.email.value,
      hint: methods.email.hint,
      href: `mailto:${site.email}`,
      external: false,
    },
    {
      icon: PhoneIcon,
      iconClass: "bg-violet-500/10 text-violet-600",
      label: methods.phone.label,
      value: site.phoneNumbers.join(" / "),
      hint: methods.phone.hint,
      href: `tel:${site.phoneNumbers[0].replace(/\s/g, "")}`,
      external: false,
    },
    {
      icon: MapPinIcon,
      iconClass: "bg-navy-900/10 text-navy-900",
      label: methods.location.label,
      value: methods.location.value,
      hint: methods.location.hint,
      href: undefined,
      external: false,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-label font-bold uppercase tracking-[0.18em] text-magenta-500 sm:text-sm">
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
              {methods.eyebrow}
            </p>
            <h2 className="mt-5 text-h2 text-navy-900 sm:text-h2-lg">
              {methods.title}
            </h2>
            <p className="mt-4 text-lead text-navy-700/75">
              {methods.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => {
            const Inner = (
              <>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${card.iconClass}`}
                >
                  <card.icon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-label font-bold uppercase tracking-[0.14em] text-navy-900/50">
                  {card.label}
                </p>
                <p className="mt-1.5 text-secondary font-bold text-navy-900">
                  {card.value}
                </p>
                <p className="mt-2 text-secondary leading-relaxed text-navy-700/70">
                  {card.hint}
                </p>
                {card.href && (
                  <span className="mt-5 inline-flex items-center gap-1.5 text-secondary font-bold text-magenta-600 uppercase">
                    {card.external ? "Ouvrir" : "Contacter"}
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                )}
              </>
            );

            const classes =
              "group relative flex flex-col rounded-[1.5rem] bg-cream p-7 ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10";

            return (
              <Reveal key={card.label} delay={index * 80}>
                {card.href ? (
                  <a
                    href={card.href}
                    {...(card.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={classes}
                  >
                    {Inner}
                  </a>
                ) : (
                  <div className={classes}>{Inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}