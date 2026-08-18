import crypto from "node:crypto";

// Identifiants et clés Admin : variables d'environnement uniquement.
// Aucun secret ne doit être codé en dur (voir .env.example pour la liste).

const ADMIN_EMAIL = process.env.CW_ADMIN_EMAIL;
const ADMIN_CODE_SALT = process.env.CW_ADMIN_CODE_SALT;
const ADMIN_CODE_HASH = process.env.CW_ADMIN_CODE_HASH;

const SESSION_SECRET = process.env.CW_ADMIN_SESSION_SECRET;
const SESSION_COOKIE = "cw_admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

function verifyCode(code: string): boolean {
  if (!ADMIN_CODE_HASH || !ADMIN_CODE_SALT) return false;
  const hash = crypto.scryptSync(code, ADMIN_CODE_SALT, 64);
  const expected = Buffer.from(ADMIN_CODE_HASH, "hex");
  return hash.length === expected.length && crypto.timingSafeEqual(hash, expected);
}

function sign(payload: string): string {
  if (!SESSION_SECRET) throw new Error("CW_ADMIN_SESSION_SECRET non défini.");
  return crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
}

export function verifyCredentials(email: string, code: string): boolean {
  return (
    !!ADMIN_EMAIL &&
    email.trim().toLowerCase() === ADMIN_EMAIL &&
    verifyCode(code)
  );
}

export function createSessionToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ email: ADMIN_EMAIL, exp: Date.now() + SESSION_DURATION_MS }),
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
    return parsed.email === ADMIN_EMAIL && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export const sessionCookieName = SESSION_COOKIE;