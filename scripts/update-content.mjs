// Mise à jour éditoriale Campus Way — applique les contenus du cahier des
// charges aux documents Supabase (la source publique est la base, pas les
// fichiers de seeds). Ciblé par clé/champ : ne touche pas au reste.
// Idempotent et ré-exécutable sans risque.
//
// Usage :
//   node scripts/update-content.mjs            # applique les changements
//   node scripts/update-content.mjs --dry-run  # affiche seulement les diffs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dryRun = process.argv.includes("--dry-run");

function loadEnv() {
  const raw = fs.readFileSync(path.join(root, ".env.local"), "utf8");
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+)$/);
    if (match) env[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
  }
  return env;
}

// ---------------------------------------------------------------
// Contenus du cahier des charges
// ---------------------------------------------------------------

const FAQ_ITEMS = [
  {
    question: "Campus Way est-elle une école ?",
    answer:
      "Non. Campus Way est un service d'orientation et d'accompagnement. Nous aidons les étudiants à identifier des établissements et formations adaptés à leur projet et à préparer leur parcours au Maroc.",
  },
  {
    question: "À qui s'adresse Campus Way ?",
    answer:
      "Principalement aux étudiants africains qui souhaitent poursuivre leurs études au Maroc.",
  },
  {
    question: "Pouvez-vous m'aider à choisir une école ?",
    answer:
      "Oui. Nous analysons ton profil, ton niveau, ton projet, ton budget et tes critères afin de t'orienter vers des options pertinentes.",
  },
  {
    question: "Est-ce que vous accompagnez les étudiants étrangers ?",
    answer:
      "Oui. Campus Way est conçu pour accompagner les étudiants qui préparent leur arrivée au Maroc depuis leur pays de résidence.",
  },
  {
    question: "Pouvez-vous trouver un logement ?",
    answer:
      "Nous pouvons accompagner la recherche et la préparation du logement selon la formule choisie et les disponibilités.",
  },
  {
    question: "Pouvez-vous garantir une admission ?",
    answer:
      "Non. La décision d'admission appartient à chaque établissement. Notre rôle est de préparer et suivre le parcours de candidature.",
  },
  {
    question: "Pouvez-vous garantir l'obtention d'un visa ou d'un titre de séjour ?",
    answer:
      "Non. Campus Way peut informer et orienter sur les démarches, mais les décisions relèvent exclusivement des autorités compétentes.",
  },
  {
    question: "Dans quelles villes intervenez-vous ?",
    answer:
      "Le lancement est centré sur Casablanca. Campus Way prévoit une extension progressive à d'autres villes marocaines.",
  },
  {
    question: "Comment commencer ?",
    answer:
      "Remplis le formulaire « Trouver mon école » ou contacte Campus Way directement via WhatsApp.",
  },
];

const SERVICE_CONTENTS = {
  "service-1": {
    icon: "🎓",
    description:
      "Tu ne sais pas quelle formation ou quelle école choisir ? Campus Way analyse ton profil, ton niveau, ton projet et tes critères pour t'aider à identifier les options les plus cohérentes.",
  },
  "service-2": {
    icon: "📄",
    description:
      "Nous t'aidons à comprendre les conditions d'admission, à organiser les pièces nécessaires et à suivre les différentes étapes de ta candidature auprès de l'établissement.",
  },
  "service-3": {
    icon: "🏠",
    description:
      "Nous t'accompagnons dans la préparation de ton installation et dans la recherche de solutions de logement adaptées à ta situation et à ton lieu d'études.",
  },
  "service-4": {
    icon: "📍",
    description:
      "L'arrivée dans un nouveau pays demande une organisation concrète. Campus Way t'aide à préparer les premières étapes de ton installation et à prendre tes repères.",
  },
  "service-5": {
    icon: "✓",
    description:
      "Nous t'informons et t'orientons sur les principales démarches liées à ton installation et à ta vie étudiante au Maroc, selon ton niveau de service.",
  },
};

// ---------------------------------------------------------------
// Patches par document (mutations ciblées, lecture + écriture)
// ---------------------------------------------------------------

const ETUDES_ADVANTAGES = {
  "avantage-2": {
    title: "Des établissements privés",
    description: "Des établissements proposant des parcours adaptés à différents profils.",
  },
  "avantage-4": {
    title: "Une proximité géographique et culturelle",
    description: "Une proximité avec de nombreux pays africains.",
  },
};

async function main() {
  const env = loadEnv();
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requis dans .env.local");
    process.exit(1);
  }
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let totalChanges = 0;

  async function updateDocument(keyName, apply) {
    const { data, error } = await supabase
      .from("documents")
      .select("data")
      .eq("key", keyName)
      .maybeSingle();
    if (error) {
      console.error(`[${keyName}] erreur de lecture :`, error.message);
      return;
    }
    const current = data?.data ?? null;
    const next = apply(current);
    if (next === undefined) return;
    if (JSON.stringify(next) === JSON.stringify(current)) {
      console.log(`[${keyName}] rien à changer`);
      return;
    }
    const diffs = countDiffs(current, next);
    totalChanges += diffs;
    if (dryRun) {
      console.log(`[${keyName}] ${diffs} champ(s) modifié(s) (dry-run, non appliqué)`);
      return;
    }
    const { error: writeError } = await supabase
      .from("documents")
      .upsert({ key: keyName, data: next, updated_at: new Date().toISOString() }, { onConflict: "key" });
    if (writeError) {
      console.error(`[${keyName}] erreur d'écriture :`, writeError.message);
      return;
    }
    console.log(`[${keyName}] ${diffs} champ(s) modifié(s) et enregistré(s)`);
  }

  function countDiffs(current, next) {
    let count = 0;
    const walk = (a, b) => {
      if (typeof a !== typeof b) { count += 1; return; }
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) { count += 1; return; }
        a.forEach((entry, i) => walk(entry, b[i]));
        return;
      }
      if (a && b && typeof a === "object") {
        for (const key2 of new Set([...Object.keys(a), ...Object.keys(b)])) {
          if (JSON.stringify(a[key2]) !== JSON.stringify(b[key2])) walk(a[key2], b[key2]);
        }
        return;
      }
      if (a !== b) count += 1;
    };
    walk(current, next);
    return count;
  }

  // --- etudes : eyebrow hero + titres d'avantages
  await updateDocument("etudes", (doc) => {
    if (!doc) return undefined;
    const next = structuredClone(doc);
    if (next.hero) next.hero.eyebrow = "Étudier au Maroc";
    for (const advantage of next.advantagesSection?.advantages ?? []) {
      const content = ETUDES_ADVANTAGES[advantage.id];
      if (content) Object.assign(advantage, content);
    }
    return next;
  });

  // --- services : icônes, descriptions, note, CTA
  await updateDocument("services", (doc) => {
    if (!doc) return undefined;
    const next = structuredClone(doc);
    for (const service of next.servicesSection?.services ?? []) {
      const content = SERVICE_CONTENTS[service.id];
      if (content) Object.assign(service, content);
    }
    if (next.servicesSection) {
      next.servicesSection.note =
        "Les services peuvent être proposés séparément ou dans des formules d'accompagnement adaptées au parcours de l'étudiant.";
    }
    if (next.cta?.primaryButton) {
      next.cta.primaryButton.label = "Choisir mon accompagnement";
      next.cta.primaryButton.href = "/trouver-mon-ecole";
    }
    return next;
  });

  // --- faq : les 9 questions/réponses exactes du cahier des charges
  await updateDocument("faq", (doc) => {
    if (!doc) return undefined;
    const next = structuredClone(doc);
    next.faqItems = FAQ_ITEMS.map((item, index) => ({
      id: `faq-${index + 1}`,
      question: item.question,
      answer: item.answer,
      category: "",
      order: index + 1,
      published: true,
    }));
    return next;
  });

  // --- temoignages : aucun faux témoignage + textes du cahier
  await updateDocument("temoignages", (doc) => {
    if (!doc) return undefined;
    const next = structuredClone(doc);
    next.testimonials = [];
    if (next.page?.hero) {
      next.page.hero.title = "Ils ont fait le chemin avec Campus Way.";
      next.page.hero.description =
        "Découvre les parcours d'étudiants accompagnés par Campus Way — de la candidature à l'installation au Maroc.";
    }
    if (next.page?.emptyState) {
      next.page.emptyState.description = "Bientôt, les parcours de nos premiers étudiants accompagnés.";
    }
    return next;
  });

  // --- ecoles : aucune donnée non confirmée (suppression des données de test)
  await updateDocument("ecoles", (doc) => {
    if (!doc) return undefined;
    const next = structuredClone(doc);
    next.establishments = [];
    next.formations = [];
    return next;
  });

  // --- settings : coordonnées et réseaux sociaux du cahier des charges
  await updateDocument("settings", (doc) => {
    if (!doc) return undefined;
    const next = structuredClone(doc);
    if (next.socials) {
      next.socials.instagram = "https://instagram.com/campus_way_";
      next.socials.tiktok = "https://tiktok.com/@campus_way";
      next.socials.linkedin = "";
    }
    next.phoneNumbers = ["+212 7 70 73 75 68", "+212 7 12 52 43 11"];
    return next;
  });

  console.log(
    dryRun
      ? `\nDry-run terminé (${totalChanges} changement(s) détecté(s), rien n'a été écrit).`
      : `\nMigration terminée : ${totalChanges} changement(s) appliqué(s).`,
  );
}

main().catch((error) => {
  console.error("Erreur fatale :", error);
  process.exit(1);
});
