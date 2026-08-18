import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionCookieName, verifySessionToken } from "@/lib/auth";

// Garde de session à appeler au début de chaque Server Action admin.
// Le proxy protège déjà les routes /admin/*, mais les actions doivent
// vérifier elles-mêmes l'authentification (préconisation des docs Next :
// « Always verify authentication and authorization inside each Server
// Function rather than relying on Proxy alone »).
export async function requireAdminSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(sessionCookieName)?.value;
  if (!token || !verifySessionToken(token)) {
    redirect("/admin/login");
  }
}