import Link from "next/link";
import Image from "next/image";
import {
  footerNavigation,
  legalNavigation,
  site,
} from "@/lib/site";
import { Container } from "@/components/ui/Container";
import {
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons";

const socialLinks = [
  { label: "Instagram", href: site.socials.instagram, icon: InstagramIcon },
  { label: "TikTok", href: site.socials.tiktok, icon: TikTokIcon },
  { label: "LinkedIn", href: site.socials.linkedin, icon: LinkedInIcon },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-100 bg-cream">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt=""
                width={44}
                height={44}
                className="h-10 w-auto rounded-full"
              />
              <span className="font-display text-h4 font-bold tracking-tight text-navy-900">
                Campus <span className="text-magenta-500">Way</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-base leading-relaxed text-navy-700/75">
              {site.tagline}
            </p>
            <p className="mt-3 flex items-center gap-2 text-secondary font-medium text-navy-700/60">
              <MapPinIcon className="h-4 w-4 text-magenta-500" />
              Casablanca, Maroc
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-navy-900 hover:shadow-md"
                  aria-label={`Campus Way sur ${label}`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <nav aria-label="Navigation du pied de page">
              <h2 className="text-label font-bold uppercase tracking-[0.16em] text-navy-900">
                Navigation
              </h2>
              <ul className="mt-5 space-y-3">
                {footerNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.95rem] text-navy-700/75 transition-colors hover:text-magenta-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-label font-bold uppercase tracking-[0.16em] text-navy-900">
                Contact
              </h2>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.95rem] text-navy-700/75 transition-colors hover:text-whatsapp-dark"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 text-[0.95rem] text-navy-700/75 transition-colors hover:text-magenta-600"
                  >
                    <MailIcon className="h-4 w-4" />
                    {site.email}
                  </a>
                </li>
                {site.phoneNumbers.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 text-[0.95rem] text-navy-700/75 transition-colors hover:text-magenta-600"
                    >
                      <PhoneIcon className="h-4 w-4" />
                      {phone}
                    </a>
                  </li>
                ))}
                <li>
                  <span className="inline-flex items-center gap-2 text-[0.95rem] text-navy-700/75">
                    <MapPinIcon className="h-4 w-4" />
                    {site.city}, Maroc
                  </span>
                </li>
              </ul>
              <h2 className="mt-9 text-label font-bold uppercase tracking-[0.16em] text-navy-900">
                Suivez-nous
              </h2>
              <ul className="mt-5 space-y-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[0.95rem] text-navy-700/75 transition-colors hover:text-magenta-600"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-label font-bold uppercase tracking-[0.16em] text-navy-900">
                Légal
              </h2>
              <ul className="mt-5 space-y-3">
                {legalNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.95rem] text-navy-700/75 transition-colors hover:text-magenta-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-navy-100">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-secondary text-navy-700/60">
            © {currentYear} {site.name} — {site.tagline}
          </p>
          <p className="text-secondary text-navy-700/60">
            Orientation & accompagnement à {site.city}
          </p>
        </Container>
      </div>
    </footer>
  );
}