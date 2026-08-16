export type EtudeAdvantage = {
  id: string;
  title: string;
  description: string;
  icon: "graduation" | "building" | "chat" | "globe" | "pin";
  order: number;
  published: boolean;
};

export type EtudeCity = {
  id: string;
  name: string;
  order: number;
  published: boolean;
};

export type EtudeJourneyStep = {
  id: string;
  title: string;
  order: number;
  published: boolean;
};

export type EtudesPageData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    reassurance: string;
    image: { id?: string; src: string; alt: string };
    cards: { icon: string; title: string; description: string }[];
    published: boolean;
  };
  advantagesSection: {
    eyebrow: string;
    title: string;
    description: string;
    advantages: EtudeAdvantage[];
    published: boolean;
  };
  visualSection: {
    eyebrow: string;
    title: string;
    description: string;
    cta: { label: string; href: string };
    image: { src: string; alt: string };
    badge: string;
    published: boolean;
  };
  citiesSection: {
    eyebrow: string;
    title: string;
    description: string;
    cities: EtudeCity[];
    published: boolean;
  };
  journeySection: {
    eyebrow: string;
    title: string;
    description: string;
    steps: EtudeJourneyStep[];
    published: boolean;
  };
  transparency: {
    title: string;
    description: string;
    published: boolean;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    published: boolean;
  };
};

export const etudesPage: EtudesPageData = {
  hero: {
    eyebrow: "Étudier au Maroc",
    title: "Pourquoi étudier au Maroc ?",
    description:
      "Le Maroc offre aux étudiants africains francophones un environnement d'études accessible, dynamique et culturellement proche, avec un large choix d'établissements et de formations dans plusieurs domaines.",
    primaryCta: { label: "Explorer les formations", href: "/ecoles-formations" },
    reassurance: "Orientation · Formations · Accompagnement",
    image: {
      src: "/images/etudier-hero.jpg",
      alt: "Deux jeunes personnes marchant sous des arches marocaines ornées de motifs",
    },
    cards: [],
    published: true,
  },

  advantagesSection: {
    eyebrow: "Un environnement pensé pour ton parcours",
    title: "Des avantages concrets pour tes études.",
    description:
      "Le Maroc réunit plusieurs atouts pour les étudiants africains francophones qui souhaitent poursuivre un projet d'études.",
    advantages: [
      {
        id: "avantage-1",
        title: "Une offre de formations variée",
        description:
          "Management, commerce, informatique, ingénierie, architecture, design et autres spécialités.",
        icon: "graduation",
        order: 1,
        published: true,
      },
      {
        id: "avantage-2",
        title: "Des établissements pour différents profils",
        description:
          "Des établissements privés proposant des parcours adaptés à différents profils.",
        icon: "building",
        order: 2,
        published: true,
      },
      {
        id: "avantage-3",
        title: "Un environnement francophone",
        description:
          "Un environnement francophone facilitant la transition académique.",
        icon: "chat",
        order: 3,
        published: true,
      },
      {
        id: "avantage-4",
        title: "Une proximité avec l'Afrique",
        description:
          "Une proximité géographique et culturelle avec de nombreux pays africains.",
        icon: "globe",
        order: 4,
        published: true,
      },
      {
        id: "avantage-5",
        title: "Des villes étudiantes dynamiques",
        description:
          "Des villes étudiantes dynamiques, notamment Casablanca.",
        icon: "pin",
        order: 5,
        published: true,
      },
    ],
    published: true,
  },

  visualSection: {
    eyebrow: "Ton projet d'études commence par un bon choix.",
    title: "Un bon choix commence par une information claire.",
    description:
      "Formations, établissements, villes : chaque décision compte. Campus Way t'aide à comprendre les options et à choisir celles qui correspondent à ton profil.",
    cta: { label: "Explorer les formations", href: "/ecoles-formations" },
    image: {
      src: "/images/etudier-visuel.jpg",
      alt: "Rue moderne de Casablanca avec des passants, cadre urbain contemporain",
    },
    badge: "Études au Maroc",
    published: true,
  },

  citiesSection: {
    eyebrow: "Choisir sa ville",
    title: "Une ville, un campus, ton avenir.",
    description:
      "Plusieurs villes marocaines accueillent des étudiants : chacune a son rythme et son cadre de vie.",
    cities: [
      { id: "ville-1", name: "Casablanca", order: 1, published: true },
      { id: "ville-2", name: "Rabat", order: 2, published: true },
      { id: "ville-3", name: "Marrakech", order: 3, published: true },
      { id: "ville-4", name: "Fès", order: 4, published: true },
      { id: "ville-5", name: "Kénitra", order: 5, published: true },
      { id: "ville-6", name: "Tanger", order: 6, published: true },
    ],
    published: true,
  },

  journeySection: {
    eyebrow: "Campus Way t'accompagne",
    title: "De l'information à ton installation.",
    description:
      "Campus Way ne se limite pas à fournir de l'information : nous t'accompagnons sur l'ensemble du parcours.",
    steps: [
      { id: "parcours-1", title: "Comprendre les options", order: 1, published: true },
      { id: "parcours-2", title: "Choisir une formation", order: 2, published: true },
      { id: "parcours-3", title: "Préparer sa candidature", order: 3, published: true },
      { id: "parcours-4", title: "Préparer son arrivée", order: 4, published: true },
      { id: "parcours-5", title: "Commencer son installation", order: 5, published: true },
    ],
    published: true,
  },

  transparency: {
    title: "À vérifier avant toute décision.",
    description:
      "Campus Way fournit une information d'orientation et d'accompagnement. Les conditions d'admission, la reconnaissance des diplômes, les tarifs et les démarches administratives doivent toujours être vérifiés auprès de l'établissement et des autorités compétentes avant toute décision.",
    published: true,
  },

  finalCta: {
    eyebrow: "Prochain pas",
    title: "Prêt à explorer les possibilités ?",
    description:
      "Découvre les établissements et les formations vers lesquels Campus Way peut t'orienter.",
    primaryCta: { label: "Explorer les formations", href: "/ecoles-formations" },
    secondaryCta: { label: "Trouver mon école", href: "/trouver-mon-ecole" },
    published: true,
  },
};