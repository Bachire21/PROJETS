export const contactPage = {
  hero: {
    eyebrow: "Contact",
    title: "On t'écoute, où que tu sois.",
    description:
      "Une question sur une école, un dossier, un logement ? Écris-nous : on répond rapidement, en toute simplicité.",
  },
  methods: {
    eyebrow: "Coordonnées",
    title: "Plusieurs façons de nous joindre.",
    description:
      "Choisis le canal qui te convient : WhatsApp, email, téléphone ou rendez-vous à Casablanca.",
    whatsapp: {
      label: "WhatsApp",
      value: "+33 7 53 19 24 25",
      hint: "Le plus rapide, réponse en quelques minutes.",
    },
    email: {
      label: "Email",
      value: "campusway458@gmail.com",
      hint: "Pour envoyer un dossier ou une demande détaillée.",
    },
    phone: {
      label: "Téléphone",
      hint: "Appelle-nous directement au Maroc.",
    },
    location: {
      label: "Localisation",
      value: "Casablanca, Maroc",
      hint: "Campus Way accompagne les étudiants partout au Maroc.",
    },
  },
  form: {
    eyebrow: "Écris-nous",
    title: "Une question ? Envoie-la-nous.",
    description:
      "Compose ton message ici, il s'ouvrira directement dans WhatsApp : pas de formulaire perdu, une vraie réponse.",
    nameLabel: "Ton prénom",
    namePlaceholder: "Ex. Amina",
    messageLabel: "Ton message",
    messagePlaceholder: "Bonjour Campus Way, je souhaite des informations sur…",
    submitLabel: "Envoyer sur WhatsApp",
  },
} as const;