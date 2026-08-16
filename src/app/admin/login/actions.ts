"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, sessionCookieName, verifyCredentials } from "@/lib/auth";

export async function loginAction(
  _prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").trim();
  const code = String(formData.get("code") ?? "");

  if (!verifyCredentials(email, code)) {
    return { error: "Identifiants incorrects. Vérifiez l'email et le code d'accès." };
  }

  const store = await cookies();
  store.set(sessionCookieName, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 12 * 60 * 60,
  });

  const next = String(formData.get("next") ?? "");
  if (next.startsWith("/admin") && next !== "/admin/login") {
    redirect(next);
  }
  redirect("/admin/dashboard");
}