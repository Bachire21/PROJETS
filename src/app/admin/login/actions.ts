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

  console.log("[DEBUG] action loginAction attempt");
  if (!verifyCredentials(email, code)) {
    console.log("[DEBUG] action loginAction FAILED: identifiants incorrects");
    return { error: "Identifiants incorrects. Vérifiez l'email et le code d'accès." };
  }

  try {
    const store = await cookies();
    store.set(sessionCookieName, createSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
  } catch (error) {
    console.error("loginAction : création de session impossible.", error);
    return {
      error:
        "La connexion a échoué pour un problème de configuration serveur. Contacte l'administrateur du site.",
    };
  }

  console.log("[DEBUG] action loginAction OK (session créée)");

  const next = String(formData.get("next") ?? "");
  if (next.startsWith("/admin") && next !== "/admin/login") {
    redirect(next);
  }
  redirect("/admin/dashboard");
}