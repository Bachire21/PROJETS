// Classification des erreurs de stockage (Supabase / fichiers) pour un
// diagnostic précis côté serveur, sans exposer de secret ni de détail
// interne au navigateur.

export type StorageErrorCategory =
  | "supabase" // erreur d'API Supabase (PostgREST / Storage)
  | "sql" // erreur SQL renvoyée par Postgres
  | "auth" // erreur d'authentification / autorisation
  | "validation" // données invalides
  | "network" // réponse inattendue, gateway, réseau
  | "server" // autre erreur serveur
  | "unknown";

export type StorageErrorInfo = {
  category: StorageErrorCategory;
  code: string | null;
  message: string;
  details: string | null;
  hint: string | null;
  status: number | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function classifyStorageError(error: unknown): StorageErrorInfo {
  if (isRecord(error)) {
    const code = typeof error.code === "string" ? error.code : null;
    const message =
      typeof error.message === "string" ? error.message : "Erreur inconnue";
    const details = typeof error.details === "string" ? error.details : null;
    const hint = typeof error.hint === "string" ? error.hint : null;
    const status =
      typeof error.status === "number"
        ? error.status
        : typeof error.statusCode === "number"
          ? error.statusCode
          : null;

    let category: StorageErrorCategory;
    if (code && /^[0-9A-Z]{5}$/.test(code)) {
      // Code d'erreur Postgres (ex. 42P01, 42710, 23505) ou PostgREST.
      if (/^42/.test(code)) category = "sql";
      else if (/^28/.test(code)) category = "auth";
      else category = "supabase";
    } else if (/unexpected response/i.test(message)) {
      // Réponse non-JSON de PostgREST (gateway, service suspendu, 5xx).
      category = "network";
    } else if (/failed to fetch|enotfound|econnrefused|econnreset|timeout|network/i.test(message)) {
      category = "network";
    } else if (/denied|forbidden|unauthorized|row level security/i.test(message)) {
      category = "auth";
    } else if (/validation|invalid/i.test(message)) {
      category = "validation";
    } else {
      category = "server";
    }

    return { category, code, message, details, hint, status };
  }

  if (error instanceof Error) {
    const message = error.message;
    let category: StorageErrorCategory = "server";
    if (/failed to fetch|enotfound|econnrefused|econnreset|timeout|network/i.test(message)) {
      category = "network";
    } else if (/unexpected response/i.test(message)) {
      category = "network";
    }
    return { category, code: null, message, details: null, hint: null, status: null };
  }

  return { category: "unknown", code: null, message: "Erreur inconnue", details: null, hint: null, status: null };
}

// Journal serveur : toutes les informations utiles au diagnostic.
// Ne contient jamais de secret (les messages PostgREST n'en exposent pas).
export function logStorageError(context: string, error: unknown): void {
  const info = classifyStorageError(error);
  console.error(
    `[storage] ${context} -> catégorie=${info.category} code=${info.code ?? "-"} status=${info.status ?? "-"} message=${info.message}` +
      (info.details ? ` details=${info.details}` : "") +
      (info.hint ? ` hint=${info.hint}` : ""),
  );
}

// Message destiné au navigateur : identifie la cause sans révéler de
// détail interne, de variable d'environnement ou de valeur sensible.
const SAFE_MESSAGES: Record<StorageErrorCategory, string> = {
  supabase: "Erreur de base de données (Supabase).",
  sql: "Erreur de requête SQL (table ou colonne introuvable).",
  auth: "Erreur d'autorisation (clé ou accès base de données).",
  validation: "Les données envoyées ne sont pas valides.",
  network:
    "Connexion à la base de données indisponible (réseau ou service).",
  server: "Erreur serveur.",
  unknown: "Erreur inconnue.",
};

export function safeStorageMessage(error: unknown, fallback: string): string {
  const info = classifyStorageError(error);
  return `${fallback} ${SAFE_MESSAGES[info.category]}`;
}
