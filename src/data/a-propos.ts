import { site } from "@/lib/site";
import { servicesPage } from "@/data/services";

export const aProposPage = {
  hero: {
    eyebrow: "À propos",
    title: site.tagline,
    description:
      "Campus Way est née d'une réalité simple : de nombreux jeunes africains souhaitent étudier au Maroc, mais se retrouvent face à des informations dispersées, des choix d'écoles difficiles à comparer et des démarches parfois complexes à préparer depuis l'étranger. La marque transforme cette demande en un service structuré d'orientation, d'information et d'accompagnement.",
  },
  identity: {
    eyebrow: "L'identité Campus Way",
    title: "L'identité Campus Way",
    description:
      "Campus Way s'appuie sur une communauté digitale de plus de 50 000 abonnés et développe des contenus pratiques pour informer, orienter et rassurer les étudiants africains francophones. La marque associe information, orientation et accompagnement pratique afin de proposer une expérience cohérente, depuis la réflexion sur le projet d'études jusqu'aux premières étapes d'installation au Maroc. Campus Way a pour ambition de devenir un interlocuteur de confiance pour les étudiants africains francophones qui souhaitent construire leur parcours d'études au Maroc.",
    strengths: servicesPage.strengths,
  },
  vision: {
    eyebrow: "Notre vision",
    title: "Notre vision",
    description:
      "Devenir une référence de confiance pour les étudiants africains francophones qui choisissent le Maroc comme destination d'études.",
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