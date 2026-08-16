export type PageImage = {
  url: string;
  alt: string;
};

export type PageButton = {
  label: string;
  href: string;
  type: "internal" | "whatsapp" | "external";
};

export type HeroCard = {
  icon: string;
  title: string;
  description: string;
};

export type PageStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: "search" | "pin" | "flag" | "bed";
  order: number;
  published: boolean;
};

export type SupportItem = {
  id: string;
  title: string;
  description: string;
  icon: "search" | "pin" | "flag" | "chat" | "check";
  image?: PageImage | null;
  order: number;
  published: boolean;
};

export type LogementPageData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: PageImage;
    primaryButton: PageButton;
    cards: HeroCard[];
    published: boolean;
  };
  stepsSection: {
    title: string;
    subtitle: string;
    description: string;
    steps: PageStep[];
    published: boolean;
  };
  supportSection: {
    title: string;
    subtitle: string;
    description: string;
    items: SupportItem[];
    published: boolean;
  };
  visualSection: {
    eyebrow: string;
    title: string;
    description: string;
    badge: string;
    image: PageImage;
    published: boolean;
  };
  information: {
    badge: string;
    title: string;
    description: string;
    published: boolean;
  };
  cta: {
    title: string;
    description: string;
    primaryButton: PageButton;
    secondaryButton: PageButton;
    published: boolean;
  };
};

export const logementPageData: LogementPageData = {
  hero: {
    eyebrow: "Logement & Installation",
    title: "Arrive au Maroc avec une installation mieux préparée.",
    description:
      "Trouver un logement à distance, comprendre les quartiers, préparer son arrivée et savoir quelles démarches effectuer en premier peut rapidement devenir stressant. Campus Way t'accompagne dans cette préparation pour que ton installation soit plus simple et plus sereine.",
    primaryButton: {
      label: "Préparer mon arrivée",
      href: "/trouver-mon-ecole",
      type: "internal",
    },
    image: {
      url: "/images/logement-hero.jpg",
      alt: "Groupe de jeunes étudiants avec sacs à dos marchant sur une allée de campus universitaire",
    },
    cards: [],
    published: true,
  },

  stepsSection: {
    title: "Ton arrivée, étape par étape",
    subtitle: "Un parcours d'installation progressif.",
    description:
      "Chaque étape compte : du logement à l'accueil, nous te préparons à arriver dans de bonnes conditions.",
    steps: [
      {
        id: "step-1",
        number: "01",
        title: "Rechercher un logement",
        description:
          "Comprendre les options de logement selon le campus, le budget et tes besoins.",
        icon: "search",
        order: 1,
        published: true,
      },
      {
        id: "step-2",
        number: "02",
        title: "Choisir la bonne zone",
        description:
          "Identifier les zones pertinentes autour de ton établissement, selon tes priorités.",
        icon: "pin",
        order: 2,
        published: true,
      },
      {
        id: "step-3",
        number: "03",
        title: "Préparer ton arrivée",
        description:
          "Organiser l'essentiel avant le départ : démarches, trajet et premiers repères.",
        icon: "flag",
        order: 3,
        published: true,
      },
      {
        id: "step-4",
        number: "04",
        title: "Accueil & premières étapes",
        description:
          "Être accueilli sur place et effectuer les premières démarches en confiance.",
        icon: "bed",
        order: 4,
        published: true,
      },
    ],
    published: true,
  },

  supportSection: {
    title: "Notre accompagnement",
    subtitle: "Ce que nous pouvons accompagner",
    description:
      "Un accompagnement concret et réaliste, selon la formule choisie et les disponibilités.",
    items: [
      {
        id: "support-1",
        title: "Recherche de solutions de logement",
        description:
          "Recherche de solutions de logement selon le campus, le budget et les besoins.",
        icon: "search",
        order: 1,
        published: true,
      },
      {
        id: "support-2",
        title: "Orientation sur les zones de logement",
        description:
          "Orientation sur les zones de logement pertinentes autour de l'établissement.",
        icon: "pin",
        order: 2,
        published: true,
      },
      {
        id: "support-3",
        title: "Préparation pratique de l'arrivée",
        description: "Préparation pratique de l'arrivée.",
        icon: "flag",
        order: 3,
        published: true,
      },
      {
        id: "support-4",
        title: "Accueil et premières orientations",
        description: "Accueil et premières orientations selon la formule choisie.",
        icon: "chat",
        order: 4,
        published: true,
      },
      {
        id: "support-5",
        title: "Accompagnement dans les premières étapes",
        description: "Accompagnement dans les premières étapes d'installation.",
        icon: "check",
        order: 5,
        published: true,
      },
    ],
    published: true,
  },

  visualSection: {
    eyebrow: "Bien plus qu'un logement",
    title: "Préparer son arrivée, c'est déjà commencer son parcours.",
    description:
      "Un étudiant bien installé démarre dans de meilleures conditions. Anticiper le logement, la zone et les premières démarches, c'est se donner les moyens de réussir.",
    badge: "Installation préparée",
    image: {
      url: "/images/logement-visuel.jpg",
      alt: "Jeune étudiant souriant avec sac à dos et livres sur un campus universitaire",
    },
    published: true,
  },

  information: {
    badge: "À savoir",
    title: "L'accompagnement reste conditionnel et réaliste.",
    description:
      "L'accompagnement dépend de la formule choisie et des disponibilités.",
    published: true,
  },

  cta: {
    title: "Prépare ton arrivée avec plus de sérénité.",
    description:
      "Décris ton projet : Campus Way te répondra pour préparer ton installation selon ta situation.",
    primaryButton: {
      label: "Préparer mon arrivée",
      href: "/trouver-mon-ecole",
      type: "internal",
    },
    secondaryButton: {
      label: "Parler à Campus Way",
      href: "",
      type: "whatsapp",
    },
    published: true,
  },
};