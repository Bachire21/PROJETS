import crypto from "node:crypto";

// Identifiants et clés Admin : variables d'environnement uniquement.
// Aucun secret ne doit être codé en dur (voir .env.example pour la liste).
//
// Deux formats sont acceptés :
//  1. Multi-admin (recommandé) : CW_ADMINS est un tableau JSON, ex.
//     CW_ADMINS=[{"email":"a@exemple.com","codeSalt":"...","codeHash":"..."}, ...]
//     Le sel et le hash d'un code se génèrent avec :
//     node scripts/generate-admin-credentials.mjs "email@exemple.com" "mon-code"
//  2. Admin unique (rétrocompatible) : CW_ADMIN_EMAIL + CW_ADMIN_CODE_SALT +
//     CW_ADMIN_CODE_HASH.

type AdminAccount = { email: string; codeSalt: string; codeHash: string };

function parseAdminAccounts(): AdminAccount[] {
  const accounts: AdminAccount[] = [];

  const raw = process.env.CW_ADMINS;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        for (const entry of parsed) {
          if (
            entry &&
            typeof entry.email === "string" &&
            typeof entry.codeSalt === "string" &&
            typeof entry.codeHash === "string"
          ) {
            accounts.push({
              email: entry.email.trim().toLowerCase(),
              codeSalt: entry.codeSalt,
              codeHash: entry.codeHash,
            });
          }
        }
      }
    } catch {
      // CW_ADMINS mal formé : ignoré, on garde le format admin unique ci-dessous.
    }
  }

  const legacyEmail = process.env.CW_ADMIN_EMAIL;
  const legacySalt = process.env.CW_ADMIN_CODE_SALT;
  const legacyHash = process.env.CW_ADMIN_CODE_HASH;
  if (legacyEmail && legacySalt && legacyHash) {
    accounts.push({
      email: legacyEmail.trim().toLowerCase(),
      codeSalt: legacySalt,
      codeHash: legacyHash,
    });
  }

  return accounts;
}

const ADMIN_ACCOUNTS = parseAdminAccounts();

function findAccount(email: string): AdminAccount | undefined {
  const normalized = email.trim().toLowerCase();
  return ADMIN_ACCOUNTS.find((account) => account.email === normalized);
}

function verifyCode(code: string, salt: string, hashHex: string): boolean {
  const hash = crypto.scryptSync(code, salt, 64);
  const expected = Buffer.from(hashHex, "hex");
  return hash.length === expected.length && crypto.timingSafeEqual(hash, expected);
}

const SESSION_SECRET = process.env.CW_ADMIN_SESSION_SECRET;
const SESSION_COOKIE = "cw_admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

function sign(payload: string): string {
  if (!SESSION_SECRET) throw new Error("CW_ADMIN_SESSION_SECRET non défini.");
  return crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
}

export function verifyCredentials(email: string, code: string): boolean {
  const account = findAccount(email);
  if (!account) return false;
  return verifyCode(code, account.codeSalt, account.codeHash);
}

export function createSessionToken(email: string): string {
  const payload = Buffer.from(
    JSON.stringify({ email: email.trim().toLowerCase(), exp: Date.now() + SESSION_DURATION_MS }),
    "utf8",
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string): boolean {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  if (!SESSION_SECRET) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return false;
  }
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email: string;
      exp: number;
    };
    return (
      parsed.exp > Date.now() &&
      ADMIN_ACCOUNTS.some((account) => account.email === parsed.email)
    );
  } catch {
    return false;
  }
}

export function isAdminEmail(email: string): boolean {
  return findAccount(email) !== undefined;
}

export function sessionEmailFromToken(token: string): string | null {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  if (verifySessionToken(token)) {
    try {
      const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
        email: string;
      };
      return parsed.email ?? null;
    } catch {
      return null;
    }
  }
  return null;
}

export const sessionCookieName = SESSION_COOKIE;
