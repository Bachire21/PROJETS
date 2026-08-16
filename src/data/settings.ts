import { site } from "@/lib/site";

export type SiteSettings = {
  name: string;
  tagline: string;
  description: string;
  city: string;
  email: string;
  whatsappUrl: string;
  phoneNumbers: string[];
  socials: { instagram: string; tiktok: string; linkedin: string };
  address: string;
  footerInfo: string;
  legalLinks: { label: string; href: string }[];
};

export const seedSettings: SiteSettings = {
  name: site.name,
  tagline: site.tagline,
  description: site.description,
  city: site.city,
  email: site.email,
  whatsappUrl: site.whatsappUrl,
  phoneNumbers: [...site.phoneNumbers],
  socials: { ...site.socials },
  address: `${site.city}, Maroc`,
  footerInfo:
    "Campus Way accompagne les étudiants africains francophones vers leurs études au Maroc.",
  legalLinks: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    { label: "Conditions générales", href: "/conditions-generales" },
  ],
};