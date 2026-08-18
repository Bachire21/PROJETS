export const site = {
  name: "Campus Way",
  tagline: "Le chemin vers ton campus.",
  description:
    "Agence d'orientation et d'accompagnement pour les étudiants africains francophones qui souhaitent poursuivre leurs études au Maroc.",
  city: "Casablanca",
  whatsappUrl:
    "https://wa.me/33753192425?text=Bonjour%20Campus%20Way%2C%20je%20souhaite%20avoir%20des%20informations%20concernant%20mon%20projet%20d%27%C3%A9tudes%20au%20Maroc.",
  phoneNumbers: ["+212 7 70 73 75 68", "+212 7 12 52 43 11"],
  email: "campusway458@gmail.com",
  socials: {
    instagram: "https://instagram.com/campus_way_",
    tiktok: "https://tiktok.com/@campus_way",
    linkedin: "",
  },
} as const;

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Étudier au Maroc", href: "/etudier-au-maroc" },
  { label: "Écoles & Formations", href: "/ecoles-formations" },
  { label: "Nos services", href: "/nos-services" },
  { label: "Logement & Installation", href: "/logement-installation" },
  { label: "Témoignages", href: "/temoignages" },
  { label: "FAQ", href: "/faq" },
] as const;

export const footerNavigation = [
  { label: "Étudier au Maroc", href: "/etudier-au-maroc" },
  { label: "Écoles & Formations", href: "/ecoles-formations" },
  { label: "Nos services", href: "/nos-services" },
  { label: "Trouver mon école", href: "/trouver-mon-ecole" },
  { label: "Logement & Installation", href: "/logement-installation" },
  { label: "Témoignages", href: "/temoignages" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
] as const;

export const legalNavigation = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Conditions générales", href: "/conditions-generales" },
] as const;
