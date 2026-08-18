import type { IconType } from "@/components/icons";

export type JourneyStep = {
  number: string;
  title: string;
  description: string;
  href: string;
  icon: IconType;
};

export type WhyBlock = {
  number: string;
  title: string;
  description: string;
};

export type Service = {
  number: string;
  title: string;
  description: string;
  icon: IconType;
};

export type ProcessStep = {
  number: string;
  title: string;
};

export const homeHero = {
  eyebrow: "Étudier au Maroc",
  titleStart: "Ton projet d'études au Maroc",
  titleHighlight: "commence ici.",
  description:
    "Campus Way t'accompagne dans le choix de ta formation, ton admission et les étapes essentielles de ton arrivée au Maroc.",
  primaryCta: { label: "Trouver ma formation", href: "/trouver-mon-ecole" },
  secondaryCta: { label: "Découvrir Campus Way", href: "/a-propos" },
  image: {
    src: "/images/hero-accueil.jpg",
    alt: "Campus Way — ton accompagnement pour étudier au Maroc",
  },
  card: {
    icon: "🎓",
    title: "Un parcours clair",
    description: "De l'orientation à l'arrivée",
  },
  badge: "Casablanca · Maroc",
};

export const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "Orientation",
    description: "Trouver une direction adaptée.",
    href: "/nos-services",
    icon: "compass",
  },
  {
    number: "02",
    title: "Admission",
    description: "Préparer sa candidature.",
    href: "/nos-services",
    icon: "file",
  },
  {
    number: "03",
    title: "Logement",
    description: "Préparer son logement.",
    href: "/logement-installation",
    icon: "bed",
  },
  {
    number: "04",
    title: "Installation",
    description: "Préparer son arrivée.",
    href: "/logement-installation",
    icon: "flag",
  },
];

export const whySection = {
  eyebrow: "Pourquoi Campus Way",
  title: "Pourquoi Campus Way ?",
  description:
    "Étudier dans un autre pays ne devrait pas commencer par des informations dispersées et des démarches incompréhensibles. Campus Way réunit orientation, admission et accompagnement autour d'un même parcours.",
  blocks: [
    {
      number: "01",
      title: "Orientation adaptée",
      description:
        "Une orientation construite autour de ton profil, de ton niveau et de ton projet.",
    },
    {
      number: "02",
      title: "Informations pratiques",
      description:
        "Des informations claires sur les établissements, les formations et la vie étudiante.",
    },
    {
      number: "03",
      title: "Préparation de candidature",
      description: "Un dossier préparé, organisé et suivi.",
    },
    {
      number: "04",
      title: "Logement & arrivée",
      description:
        "Une aide pour organiser ton logement et tes premières étapes au Maroc.",
    },
    {
      number: "05",
      title: "Suivi humain",
      description:
        "Un interlocuteur disponible avant, pendant et après ton installation.",
    },
  ],
};

export const missionSection = {
  eyebrow: "Notre mission",
  title: "Notre mission",
  description:
    "Notre mission est de faciliter l'accès des étudiants africains francophones à l'enseignement supérieur au Maroc en leur donnant une information claire, une orientation pertinente et un accompagnement de proximité.",
  cta: { label: "Découvrir Campus Way", href: "/a-propos" },
  image: {
    src: "/images/students.jpg",
    alt: "Étudiante africaine souriante avec une tablette, dans un contexte d'études supérieures",
  },
  badge: "Étudiants africains francophones",
};

export const servicesSection: {
  eyebrow: string;
  title: string;
  services: Service[];
  allCta: { label: string; href: string };
} = {
  eyebrow: "Nos services",
  title: "Nos services",
  services: [
    {
      number: "01",
      title: "Orientation & choix de formation",
      description:
        "Identifier les filières et établissements correspondant au profil, au niveau et au projet.",
      icon: "compass",
    },
    {
      number: "02",
      title: "Admission & candidature",
      description: "Préparer, organiser et suivre le dossier de candidature.",
      icon: "file",
    },
    {
      number: "03",
      title: "Logement",
      description: "Accompagner la recherche et la préparation de l'installation.",
      icon: "bed",
    },
    {
      number: "04",
      title: "Accueil & installation",
      description: "Faciliter les premières étapes à l'arrivée au Maroc.",
      icon: "flag",
    },
    {
      number: "05",
      title: "Accompagnement administratif",
      description:
        "Informer et orienter sur les démarches liées à la vie étudiante et au séjour.",
      icon: "shield",
    },
  ],
  allCta: { label: "Découvrir nos services", href: "/nos-services" },
};

export const processSection = {
  eyebrow: "Comment ça marche",
  title: "Un parcours simple, clair et encadré.",
  steps: [
    { number: "01", title: "Tu nous expliques ton projet." },
    { number: "02", title: "Nous analysons ton profil et tes critères." },
    { number: "03", title: "Nous identifions les options adaptées." },
    {
      number: "04",
      title: "Tu choisis ton orientation et nous préparons la suite.",
    },
    {
      number: "05",
      title:
        "Nous t'accompagnons jusqu'à ton arrivée et tes premières étapes au Maroc.",
    },
  ],
};

export const finalCta = {
  eyebrow: "Prochain pas",
  title: "Prêt à commencer ton parcours ?",
  description:
    "Parle-nous de ton projet d'études et découvre les possibilités qui correspondent à ton profil.",
  primaryCta: { label: "Trouver ma formation", href: "/trouver-mon-ecole" },
  secondaryCta: { label: "Parler à Campus Way" },
};