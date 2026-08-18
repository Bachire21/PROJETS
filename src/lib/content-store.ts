import {
  logementPageData,
  type LogementPageData,
} from "@/data/logement-installation";
import { faqPage, seedFaqItems, type FAQItem } from "@/data/faq";
import {
  temoignagesPage,
  seedTestimonials,
  type Testimonial,
} from "@/data/temoignages";
import {
  servicesPage,
  type ServicesPageData,
} from "@/data/services";
import {
  etudesPage,
  type EtudesPageData,
} from "@/data/etudier-au-maroc";
import {
  establishments,
  formations,
  type Establishment,
  type Formation,
} from "@/data/ecoles-formations";
import {
  seedOrientationRequests,
  type OrientationRequest,
} from "@/data/demandes";
import { seedSettings, type SiteSettings } from "@/data/settings";
import {
  seedActivityLog,
  type ActivityLogEntry,
} from "@/data/activity";
import { seedMediaItems, type MediaItem } from "@/data/media";
import {
  DOCUMENT_KEYS,
  readStoredJson,
  writeStoredJson,
} from "@/lib/storage";

// Stockage persistant : la couche de stockage (`src/lib/storage`) décide
// du provider — fichiers locaux (développement/VPS) ou Supabase (Vercel).
// Chaque page publique relit son document à chaque requête (force-dynamic) :
// une publication depuis l'Admin est visible immédiatement côté public.

const documentKey = DOCUMENT_KEYS;

async function readJsonFile<T>(key: string, fallback: () => T): Promise<T> {
  const start = Date.now();
  const result = await readStoredJson(key, fallback);
  console.log(`[DEBUG] content-store read "${key}" total ${Date.now() - start}ms`);
  return result;
}

async function writeJsonFile<T>(key: string, content: T): Promise<void> {
  const start = Date.now();
  await writeStoredJson(key, content);
  console.log(`[DEBUG] content-store write "${key}" total ${Date.now() - start}ms`);
}

// ---------------------------------------------------------------
// Logement & Installation
// ---------------------------------------------------------------

export async function loadLogementContent(): Promise<LogementPageData> {
  return readJsonFile(documentKey.logement, () => logementPageData);
}

export async function saveLogementContent(
  content: LogementPageData,
): Promise<void> {
  await writeJsonFile(documentKey.logement, content);
}

// ---------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------

export type FaqContent = {
  faqItems: FAQItem[];
  page: {
    hero: { eyebrow: string; title: string; description: string };
    emptyState: { title: string; description: string };
    noResults: { message: string };
    cta: {
      eyebrow: string;
      title: string;
      description: string;
      primaryButton: { label: string; href: string };
      secondaryButton: { label: string };
    };
  };
};

export async function loadFaqContent(): Promise<FaqContent> {
  return readJsonFile(documentKey.faq, () => ({
    faqItems: seedFaqItems,
    page: faqPage,
  }));
}

export async function saveFaqContent(content: FaqContent): Promise<void> {
  await writeJsonFile(documentKey.faq, content);
}

// ---------------------------------------------------------------
// Témoignages
// ---------------------------------------------------------------

export type TemoignagesContent = {
  testimonials: Testimonial[];
  page: {
    hero: { eyebrow: string; title: string; description: string };
    emptyState: { description: string };
    cta: {
      eyebrow: string;
      title: string;
      description: string;
      primaryButton: { label: string; href: string };
      secondaryButton: { label: string };
    };
  };
};

export async function loadTemoignagesContent(): Promise<TemoignagesContent> {
  return readJsonFile(documentKey.temoignages, () => ({
    testimonials: seedTestimonials,
    page: temoignagesPage,
  }));
}

export async function saveTemoignagesContent(
  content: TemoignagesContent,
): Promise<void> {
  await writeJsonFile(documentKey.temoignages, content);
}

// ---------------------------------------------------------------
// Nos services
// ---------------------------------------------------------------

export type ServicesContent = ServicesPageData;

export async function loadServicesContent(): Promise<ServicesContent> {
  return readJsonFile(documentKey.services, () => servicesPage);
}

export async function saveServicesContent(
  content: ServicesContent,
): Promise<void> {
  await writeJsonFile(documentKey.services, content);
}

// ---------------------------------------------------------------
// Étudier au Maroc
// ---------------------------------------------------------------

export type EtudesContent = EtudesPageData;

export async function loadEtudesContent(): Promise<EtudesContent> {
  return readJsonFile(documentKey.etudes, () => etudesPage);
}

export async function saveEtudesContent(content: EtudesContent): Promise<void> {
  await writeJsonFile(documentKey.etudes, content);
}

// ---------------------------------------------------------------
// Écoles & Formations
// ---------------------------------------------------------------

export type EcolesContent = {
  establishments: Establishment[];
  formations: Formation[];
};

export async function loadEcolesContent(): Promise<EcolesContent> {
  return readJsonFile(documentKey.ecoles, () => ({
    establishments,
    formations,
  }));
}

export async function saveEcolesContent(content: EcolesContent): Promise<void> {
  await writeJsonFile(documentKey.ecoles, content);
}

// ---------------------------------------------------------------
// Demandes d'orientation
// ---------------------------------------------------------------

export type DemandesContent = {
  requests: OrientationRequest[];
};

export async function loadDemandesContent(): Promise<DemandesContent> {
  return readJsonFile(documentKey.demandes, () => ({ requests: seedOrientationRequests }));
}

export async function saveDemandesContent(
  content: DemandesContent,
): Promise<void> {
  await writeJsonFile(documentKey.demandes, content);
}

// ---------------------------------------------------------------
// Paramètres du site
// ---------------------------------------------------------------

export type SettingsContent = SiteSettings;

export async function loadSettingsContent(): Promise<SettingsContent> {
  return readJsonFile(documentKey.settings, () => seedSettings);
}

export async function saveSettingsContent(
  content: SettingsContent,
): Promise<void> {
  await writeJsonFile(documentKey.settings, content);
}

// ---------------------------------------------------------------
// Journal d'activité
// ---------------------------------------------------------------

export type ActivityContent = {
  entries: ActivityLogEntry[];
};

const activityLimit = 300;

export async function loadActivityContent(): Promise<ActivityContent> {
  return readJsonFile(documentKey.activity, () => ({ entries: seedActivityLog }));
}

export async function appendActivityLog(
  action: string,
  target: string,
  status: string,
): Promise<void> {
  try {
    const content = await loadActivityContent();
    const entry: ActivityLogEntry = {
      id: crypto.randomUUID(),
      user: "Admin",
      action,
      target,
      date: new Date().toISOString(),
      status,
    };
    content.entries = [entry, ...content.entries].slice(0, activityLimit);
    await writeJsonFile(documentKey.activity, content);
  } catch (error) {
    console.log(`[DEBUG] appendActivityLog FAILED: ${(error as Error).message}`);
    // Le journal ne doit jamais bloquer une action d'administration.
  }
}

// ---------------------------------------------------------------
// Médiathèque
// ---------------------------------------------------------------

export type MediaContent = {
  items: MediaItem[];
};

export async function loadMediaContent(): Promise<MediaContent> {
  return readJsonFile(documentKey.media, () => ({ items: seedMediaItems }));
}

export async function saveMediaContent(content: MediaContent): Promise<void> {
  await writeJsonFile(documentKey.media, content);
}