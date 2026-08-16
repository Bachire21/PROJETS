export type StudentFormData = {
  firstName: string;
  lastName: string;
  country: string;
  whatsapp: string;
  email: string;
  educationLevel: string;
  diploma: string;
  desiredField: string;
  desiredCity: string;
  budget: string;
  intake: string;
  needs: string[];
  message: string;
};

export const initialFormData: StudentFormData = {
  firstName: "",
  lastName: "",
  country: "",
  whatsapp: "",
  email: "",
  educationLevel: "",
  diploma: "",
  desiredField: "",
  desiredCity: "",
  budget: "",
  intake: "",
  needs: [],
  message: "",
};

export const hero = {
  eyebrow: "Trouver mon école",
  title: "Trouve la formation qui correspond à ton projet.",
  description:
    "Quelques informations sur ton parcours suffisent pour recevoir des orientations claires et adaptées à ton profil.",
  checks: [
    "Orientation personnalisée",
    "Options adaptées à ton profil",
    "Accompagnement Campus Way",
  ],
  image: {
    src: "/images/find-school-hero.jpg",
    alt: "Groupe d'étudiants étudiant en bibliothèque avec un enseignant",
  },
  card: {
    icon: "🎓",
    title: "Ton projet",
    description: "Études au Maroc",
  },
};

export const steps = [
  {
    number: "01",
    title: "Informations personnelles",
    subtitle: "Faisons connaissance.",
    hint: "Ces informations nous permettent de personnaliser ton accompagnement.",
    sideLabel: "Ton profil",
  },
  {
    number: "02",
    title: "Ton parcours",
    subtitle: "Parle-nous de ton parcours académique.",
    hint: "Indique ton niveau actuel et la filière qui t'intéresse.",
    sideLabel: "Ton parcours",
  },
  {
    number: "03",
    title: "Ton projet au Maroc",
    subtitle: "Commençons à définir ton projet.",
    hint: "Tes préférences nous aident à chercher les options pertinentes pour toi.",
    sideLabel: "Ton projet",
  },
  {
    number: "04",
    title: "Comment pouvons-nous t'accompagner ?",
    subtitle: "Dis-nous ce dont tu as besoin.",
    hint: "Tu peux sélectionner plusieurs besoins.",
    sideLabel: "Ton accompagnement",
  },
] as const;

export const educationLevels = ["Bac", "Bac +2", "Bac +3", "Master"] as const;

export const countries = [
  "Côte d'Ivoire",
  "Sénégal",
  "Cameroun",
  "Gabon",
  "Bénin",
  "Togo",
  "Burkina Faso",
  "Mali",
  "Guinée",
  "Congo",
  "République démocratique du Congo",
  "Niger",
  "Tchad",
  "Comores",
  "Madagascar",
  "Mauritanie",
  "Haïti",
  "France",
  "Belgique",
  "Suisse",
  "Autre pays",
] as const;

export const desiredFields = [
  "Informatique & Numérique",
  "Économie & Gestion",
  "Droit",
  "Médecine & Santé",
  "Ingénierie & Génie",
  "Communication & Marketing",
  "Sciences",
  "Tourisme & Hôtellerie",
  "Autre filière",
] as const;

export const cities = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Kénitra",
  "Tanger",
  "Autre ville",
] as const;

export const budgets = [
  { value: "limit", label: "Budget limité", description: "Une option économique est préférable" },
  { value: "middle", label: "Budget moyen", description: "Un bon équilibre qualité / coût" },
  { value: "comfortable", label: "Budget confortable", description: "Plus de flexibilité sur le choix" },
  { value: "undefined", label: "À définir ensemble", description: "Tu préfères en parler avec nous" },
] as const;

export const intakes = [
  { value: "next", label: "Rentrée prochaine", description: "Dès cette année" },
  { value: "following", label: "Rentrée suivante", description: "L'année prochaine" },
  { value: "later", label: "Plus tard", description: "Dans quelques années" },
  { value: "unknown", label: "Je ne sais pas encore", description: "À évaluer ensemble" },
] as const;

export const needs = [
  {
    id: "orientation",
    title: "Orientation",
    description: "Choisir une formation adaptée",
    icon: "compass",
  },
  {
    id: "admission",
    title: "Admission",
    description: "Préparer mon dossier",
    icon: "file",
  },
  {
    id: "logement",
    title: "Logement",
    description: "Préparer mon logement",
    icon: "bed",
  },
  {
    id: "installation",
    title: "Installation",
    description: "Organiser mon arrivée",
    icon: "flag",
  },
] as const;

export const reassurance = {
  privacy: "Tes informations restent confidentielles.",
  points: [
    "Nous analysons ton profil.",
    "Nous t'orientons vers des options pertinentes.",
  ],
  privacyHref: "/politique-de-confidentialite",
  privacyLabel: "Politique de confidentialité",
};

export const sidePanel = {
  eyebrow: "Ton parcours avec Campus Way",
  phrase:
    "Quelques minutes suffisent pour nous présenter ton projet.",
};

export const successMessages = {
  titlePrefix: "Ton projet est prêt,",
  description:
    "Merci pour ces informations. Elles serviront à préparer ton orientation personnalisée.",
  pendingNote:
    "Ta demande a bien été enregistrée : elle sera traitée par un conseiller Campus Way qui te contactera sur WhatsApp ou par e-mail.",
};
