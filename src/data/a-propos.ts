import { site } from "@/lib/site";
import { servicesPage } from "@/data/services";

export const aProposPage = {
  hero: {
    eyebrow: "À propos",
    title: site.tagline,
    description: site.description,
  },
  identity: {
    eyebrow: "Qui sommes-nous ?",
    title: "Une agence d'orientation et d'accompagnement.",
    description:
      "Campus Way t'aide à avancer étape par étape, de ton orientation à ton installation. Notre mission : que ton projet d'études au Maroc devienne une réalité, avec des informations claires et un accompagnement humain.",
    strengths: servicesPage.strengths,
  },
  steps: {
    eyebrow: "Notre accompagnement",
    title: "Quatre étapes, un seul chemin.",
    description:
      "De l'orientation à l'installation, Campus Way t'accompagne au Maroc.",
    steps: [
      {
        number: "01",
        label: "Orientation",
        description:
          "Trouver les formations et établissements adaptés à ton profil.",
        href: "/nos-services",
        ctaLabel: "Découvrir",
      },
      {
        number: "02",
        label: "Admission",
        description: "Préparer et organiser ton dossier de candidature.",
        href: "/trouver-mon-ecole",
        ctaLabel: "Commencer",
      },
      {
        number: "03",
        label: "Logement",
        description: "Préparer ton logement avant ton arrivée.",
        href: "/logement-installation",
        ctaLabel: "Préparer",
      },
      {
        number: "04",
        label: "Installation",
        description: "Organiser les premières étapes de ton arrivée au Maroc.",
        href: "/logement-installation",
        ctaLabel: "Préparer",
      },
    ],
  },
  cta: servicesPage.cta,
} as const;