export type Testimonial = {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  formation: string;
  school: string;
  quote: string;
  image: { url: string; alt: string } | null;
  published: boolean;
  order: number;
  featured: boolean;
};

export type TemoignagesPageData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  emptyState: {
    description: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryButton: { label: string; href: string };
    secondaryButton: { label: string };
  };
};

export const temoignagesPage: TemoignagesPageData = {
  hero: {
    eyebrow: "Témoignages",
    title: "Ils ont fait le chemin avec Campus Way.",
    description:
      "Découvre les parcours d'étudiants accompagnés par Campus Way — de la candidature à l'installation au Maroc.",
  },

  emptyState: {
    description:
      "Bientôt, les parcours de nos premiers étudiants accompagnés.",
  },

  cta: {
    eyebrow: "Ton projet",
    title: "Ton projet peut commencer ici.",
    description: "Parle-nous de ton projet d'études au Maroc.",
    primaryButton: { label: "Trouver mon école", href: "/trouver-mon-ecole" },
    secondaryButton: { label: "Parler à Campus Way" },
  },
};

// Aucun témoignage n'est créé ici : Campus Way présentera uniquement
// de vrais témoignages, ajoutés plus tard depuis /admin/temoignages.
export const seedTestimonials: Testimonial[] = [];