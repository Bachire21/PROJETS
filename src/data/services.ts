export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  ctaLabel: string;
  image?: { url: string; alt: string } | null;
  order: number;
  published: boolean;
};

export type ParcoursStep = {
  id: string;
  label: string;
  order: number;
  published: boolean;
};

export type ServicesPageData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: { url: string; alt: string };
    primaryCta: { label: string; href: string };
    published: boolean;
  };
  servicesSection: {
    eyebrow: string;
    title: string;
    services: Service[];
    published: boolean;
  };
  parcours: {
    eyebrow: string;
    steps: ParcoursStep[];
    published: boolean;
  };
  immersive: {
    eyebrow: string;
    title: string;
    description: string;
    pills: string[];
    image: { url: string; alt: string };
    published: boolean;
  };
  strengths: { label: string }[];
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryButton: { label: string; href: string };
    secondaryButton: { label: string };
    published: boolean;
  };
};

export const servicesPage: ServicesPageData = {
  hero: {
    eyebrow: "Nos services",
    title: "Un accompagnement pensé pour chaque étape de ton parcours.",
    description:
      "De l'orientation à l'installation, Campus Way t'accompagne au Maroc.",
    primaryCta: { label: "Trouver mon école", href: "/trouver-mon-ecole" },
    image: {
      url: "/images/accueil.jpg",
      alt: "Étudiante africaine souriante avec une tablette, dans un contexte d'études supérieures",
    },
    published: true,
  },

  servicesSection: {
    eyebrow: "Notre accompagnement",
    title: "Tout ce dont tu as besoin, au même endroit.",
    services: [
      {
        id: "service-1",
        title: "Orientation & choix de formation",
        description:
          "Trouver les formations et établissements adaptés à ton profil.",
        icon: "🎓",
        href: "/etudier-au-maroc",
        ctaLabel: "Découvrir",
        image: {
          url: "/images/etudier-hero.jpg",
          alt: "Jeune étudiante souriante sur un campus universitaire au Maroc",
        },
        order: 1,
        published: true,
      },
      {
        id: "service-2",
        title: "Admission & candidature",
        description: "Préparer et organiser ton dossier de candidature.",
        icon: "📄",
        href: "/trouver-mon-ecole",
        ctaLabel: "Commencer",
        image: null,
        order: 2,
        published: true,
      },
      {
        id: "service-3",
        title: "Logement",
        description: "Préparer ton logement avant ton arrivée.",
        icon: "🏠",
        href: "/logement-installation",
        ctaLabel: "Préparer",
        image: null,
        order: 3,
        published: true,
      },
      {
        id: "service-4",
        title: "Accueil & installation",
        description: "Organiser les premières étapes de ton arrivée au Maroc.",
        icon: "📍",
        href: "/logement-installation",
        ctaLabel: "Préparer",
        image: {
          url: "/images/logement-hero.jpg",
          alt: "Jeunes étudiants marchant sur une allée de campus universitaire",
        },
        order: 4,
        published: true,
      },
      {
        id: "service-5",
        title: "Accompagnement administratif",
        description:
          "Être orienté dans les démarches liées à la vie étudiante.",
        icon: "✓",
        href: "/faq",
        ctaLabel: "En savoir plus",
        image: {
          url: "/images/find-school-hero.jpg",
          alt: "Étudiante africaine accompagnée dans ses démarches d'études",
        },
        order: 5,
        published: true,
      },
    ],
    published: true,
  },

  parcours: {
    eyebrow: "Ton parcours",
    steps: [
      { id: "parcours-1", label: "Orientation", order: 1, published: true },
      { id: "parcours-2", label: "Admission", order: 2, published: true },
      { id: "parcours-3", label: "Logement", order: 3, published: true },
      { id: "parcours-4", label: "Installation", order: 4, published: true },
    ],
    published: true,
  },

  immersive: {
    eyebrow: "Campus Way",
    title: "Ton projet. Notre accompagnement.",
    description:
      "Campus Way t'aide à avancer étape par étape, de ton orientation à ton installation.",
    pills: ["Orientation", "Admission", "Logement", "Installation"],
    image: {
      url: "/images/catalogue-hero.jpg",
      alt: "Groupe de jeunes étudiants en environnement urbain au Maroc",
    },
    published: true,
  },

  strengths: [
    { label: "Orientation adaptée" },
    { label: "Informations claires" },
    { label: "Parcours structuré" },
    { label: "Accompagnement humain" },
  ],

  cta: {
    eyebrow: "Ton projet commence ici",
    title: "Ton projet commence ici.",
    description: "Parle-nous de ton projet d'études au Maroc.",
    primaryButton: { label: "Trouver mon école", href: "/trouver-mon-ecole" },
    secondaryButton: { label: "Parler à Campus Way" },
    published: true,
  },
};