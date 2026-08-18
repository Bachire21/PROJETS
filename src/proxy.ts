import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sessionCookieName, verifySessionToken } from "@/lib/auth";

// Les Server Actions POSTent vers l'URL de la page avec l'en-tête
// `Next-Action`. Une redirection classique vers /admin/login produirait
// côté client une réponse non-RSC → « An unexpected response was received
// from the server. » (erreur E394). On renvoie donc un 401 text/plain avec
// l'en-tête `x-action-redirect` : le client Next.js lit cet en-tête
// (server-action-reducer) et redirige proprement vers la page de connexion
// sans lever d'erreur.
const ACTION_HEADER = "next-action";

function isServerAction(request: NextRequest): boolean {
  return request.method === "POST" && request.headers.has(ACTION_HEADER);
}

function actionSessionExpired(request: NextRequest): NextResponse {
  const url = new URL("/admin/login", request.url);
  url.searchParams.set("next", request.nextUrl.pathname);
  return new NextResponse(
    "Session expirée. Recharge la page et reconnecte-toi.",
    {
      status: 401,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-action-redirect": url.pathname + url.search,
      },
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
      return actionSessionExpired(request);
    }
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};