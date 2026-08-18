export type StudentFormData = {
  firstName: string;
  lastName: string;
  country: string;
  whatsapp: string;
  email: string;
  educationLevel: string;
  diplomaYear: string;
  diploma: string;
  desiredField: string;
  desiredFormation: string;
  targetLevel: string;
  desiredCity: string;
  budget: string;
  housingBudget: string;
  intake: string;
  needs: string[];
  alreadyAdmitted: string;
  startedSteps: string;
  message: string;
  consent: string;
};

export const initialFormData: StudentFormData = {
  firstName: "",
  lastName: "",
  country: "",
  whatsapp: "",
  email: "",
  educationLevel: "",
  diplomaYear: "",
  diploma: "",
  desiredField: "",
  desiredFormation: "",
  targetLevel: "",
  desiredCity: "",
  budget: "",
  housingBudget: "",
  intake: "",
  needs: [],
  alreadyAdmitted: "",
  startedSteps: "",
  message: "",
  consent: "",
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
    hint: "Indique ton niveau actuel, ton diplôme et la filière qui t'intéresse.",
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
  {
    number: "05",
    title: "Finalisation",
    subtitle: "Une dernière étape, puis on s'occupe de la suite.",
    hint: "Ajoute ce que tu veux nous dire et valide ta demande.",
    sideLabel: "Finalisation",
  },
] as const;

export const educationLevels = [
  "Bac",
  "Bac +1",
  "Bac +2",
  "Bac +3",
  "Bac +4",
  "Master",
] as const;

export const diplomaYears = [
  "Avant 2021",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
] as const;

export const targetLevels = [
  "Licence",
  "Master",
  "Ingénieur",
  "Autre niveau",
] as const;

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
    id: "accueil",
    title: "Accueil",
    description: "Être accueilli(e) à l'arrivée",
    icon: "building",
  },
  {
    id: "installation",
    title: "Installation",
    description: "Organiser mon arrivée",
    icon: "flag",
  },
  {
    id: "administratif",
    title: "Accompagnement administratif",
    description: "Être guidé(e) dans les démarches",
    icon: "shield",
  },
] as const;

export const yesNoOptions = ["Oui", "Non"] as const;

export const situationQuestions = [
  {
    key: "alreadyAdmitted",
    label: "Es-tu déjà admis(e) dans un établissement au Maroc ?",
  },
  {
    key: "startedSteps",
    label: "As-tu déjà commencé des démarches ?",
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
  titlePrefix: "Merci !",
  description: "Nous avons bien reçu ta demande.",
  pendingNote:
    "L'équipe Campus Way reviendra vers toi pour la suite.",
};

export const consent = {
  label:
    "J'accepte que mes informations soient utilisées par Campus Way afin d'être recontacté(e) dans le cadre de mon projet d'études au Maroc. Les données collectées ne sont pas partagées avec des tiers.",
  requiredMessage: "Merci de cocher cette case pour valider l'envoi de ta demande.",
  privacyHref: "/politique-de-confidentialite",
};
