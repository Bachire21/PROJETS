export type EstablishmentStatus = "partenaire" | "reference";

export type Establishment = {
  id: string;
  name: string;
  slug: string;
  status: EstablishmentStatus;
  city: string;
  neighborhood: string;
  description: string;
  logo: string;
  coverImage: string;
  fields: string[];
  formations: string[];
  levels: string[];
  diplomas: string[];
  accreditation: string;
  admissionConditions: string;
  foreignStudentAdmission: string;
  intakeDates: string;
  tuitionFees: string;
  additionalFees: string;
  contact: { phone: string; email: string; address: string };
  website: string;
  published: boolean;
};

export type Formation = {
  id: string;
  establishmentId: string;
  name: string;
  slug: string;
  field: string;
  level: string;
  diploma: string;
  description: string;
  duration: string;
  admissionConditions: string;
  tuitionFees: string;
  published: boolean;
};

export const filiereOptions = [
  "Management & commerce",
  "Informatique & ingénierie",
  "Architecture & design",
  "Formations généralistes et autres spécialités",
];

export const niveauOptions = ["Bac", "Bac+2", "Bac+3", "Master"];

export const villeOptions = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Kénitra",
  "Tanger",
];

export const statutOptions: {
  value: EstablishmentStatus;
  label: string;
  description: string;
}[] = [
  {
    value: "partenaire",
    label: "Partenaire",
    description:
      "Collaboration validée directement avec Campus Way.",
  },
  {
    value: "reference",
    label: "Référencé",
    description:
      "Établissement présenté à titre d'orientation, sans collaboration formalisée.",
  },
];

// Modèle pour ajouter un établissement publié (copier dans `establishments`) :
// {
//   id: "exemple-1",
//   name: "Nom de l'établissement",
//   slug: "nom-etablissement",
//   status: "reference",
//   city: "Casablanca",
//   neighborhood: "",
//   description: "Présentation factuelle de l'établissement.",
//   logo: "",
//   coverImage: "",
//   fields: ["Management & commerce"],
//   formations: ["Licence en gestion"],
//   levels: ["Bac+3"],
//   diplomas: [],
//   accreditation: "",
//   admissionConditions: "",
//   foreignStudentAdmission: "",
//   intakeDates: "",
//   tuitionFees: "",
//   additionalFees: "",
//   contact: { phone: "", email: "", address: "" },
//   website: "",
//   published: true,
// },
export const establishments: Establishment[] = [];

export const formations: Formation[] = [];