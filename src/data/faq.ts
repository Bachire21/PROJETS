export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
};

export type FaqPageData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  emptyState: {
    title: string;
    description: string;
  };
  noResults: {
    message: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryButton: { label: string; href: string };
    secondaryButton: { label: string };
  };
};

export const faqPage: FaqPageData = {
  hero: {
    eyebrow: "FAQ",
    title: "Les réponses aux questions que tu te poses.",
    description:
      "Retrouve ici les réponses aux questions les plus fréquentes concernant ton projet d'études et ton installation au Maroc.",
  },

  emptyState: {
    title: "Questions & réponses",
    description:
      "Les réponses aux questions fréquentes seront bientôt disponibles. En attendant, notre équipe peut répondre directement à ton projet.",
  },

  noResults: {
    message: "Aucune réponse ne correspond à ta recherche.",
  },

  cta: {
    eyebrow: "Une question ?",
    title: "Tu ne trouves pas ta réponse ?",
    description:
      "Notre équipe peut t'aider directement à comprendre les prochaines étapes de ton projet.",
    primaryButton: { label: "Trouver mon école", href: "/trouver-mon-ecole" },
    secondaryButton: { label: "Parler à Campus Way" },
  },
};

// Aucune question n'est créée ici : les vraies questions/réponses seront
// ajoutées plus tard depuis /admin/faq, puis publiées.
export const seedFaqItems: FAQItem[] = [];