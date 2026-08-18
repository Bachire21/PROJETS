export const PAGE_LABELS: Record<string, string> = {
  "logement-installation": "Logement & Installation",
  faq: "FAQ",
  temoignages: "Témoignages",
  services: "Parcours & services",
  etudes: "Étudier au Maroc",
  ecoles: "Écoles & Formations",
  demandes: "Demandes d'orientation",
  settings: "Paramètres",
};

export function pageLabel(key: string): string {
  return PAGE_LABELS[key] ?? key;
}