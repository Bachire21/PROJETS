import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  sessionCookieName,
  sessionEmailFromToken,
  verifySessionToken,
  createSessionToken,
} from "@/lib/auth";

// Les Server Actions POSTent vers l'URL de la page avec l'en-tête
// `Next-Action`. Une redirection classique vers /admin/login produirait
// côté client une réponse non-RSC → « An unexpected response was received
// from the server. » (erreur E394). On renvoie donc un 401 text/plain dont
// le message est affiché tel quel par le client Next.js
// (server-action-reducer.js), sans navigation forcée.
const ACTION_HEADER = "next-action";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 7 * 24 * 60 * 60,
};

function isServerAction(request: NextRequest): boolean {
  return request.method === "POST" && request.headers.has(ACTION_HEADER);
}

function actionSessionExpired(): NextResponse {
  return new NextResponse(
    "Session expirée. Recharge la page et reconnecte-toi.",
    {
      status: 401,
      headers: { "content-type": "text/plain; charset=utf-8" },
    },
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(sessionCookieName)?.value;

  if (pathname === "/admin/login") {
    if (token && verifySessionToken(token)) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!token || !verifySessionToken(token)) {
    if (isServerAction(request)) {
      return actionSessionExpired();
    }
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Session glissante : chaque requête admin valide repousse l'expiration
  // du cookie à +7 jours. Une session active ne peut plus expirer en plein
  // travail ; elle ne part qu'après 7 jours d'inactivité.
  const sessionEmail = sessionEmailFromToken(token);
  if (!sessionEmail) return actionSessionExpired();
  const response = NextResponse.next();
  response.cookies.set(
    sessionCookieName,
    createSessionToken(sessionEmail),
    COOKIE_OPTIONS,
  );
  return response;
}

export const config = {
  matcher: "/admin/:path*",
};