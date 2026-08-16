export const site = {
  name: "Campus Way",
  tagline: "Le chemin vers ton campus.",
  description:
    "Agence d'orientation et d'accompagnement pour les étudiants africains francophones qui souhaitent poursuivre leurs études au Maroc.",
  city: "Casablanca",
  whatsappUrl:
    "https://wa.me/33753192425?text=Bonjour%20Campus%20Way%2C%20je%20souhaite%20avoir%20des%20informations%20concernant%20mon%20projet%20d%27%C3%A9tudes%20au%20Maroc.",
  phoneNumbers: ["+212 770737568", "+212 712524311"],
  email: "campusway458@gmail.com",
  socials: {
    instagram: "https://instagram.com/campusway.ma",
    tiktok: "https://tiktok.com/@campusway.ma",
    linkedin: "https://linkedin.com/company/campusway",
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
  ...navigation,
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalNavigation = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Conditions générales", href: "/conditions-generales" },
] as const;
