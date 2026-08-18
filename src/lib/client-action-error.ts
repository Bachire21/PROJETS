// Message d'erreur renvoyé par le proxy (src/proxy.ts) quand une Server
// Action est appelée avec une session expirée : le client Next.js le
// rejette tel quel dans l'erreur de l'action (erreur E394, body text/plain).
const SESSION_EXPIRED_MESSAGE = "Session expirée. Recharge la page et reconnecte-toi.";

export function isSessionExpiredError(error: unknown): boolean {
  return error instanceof Error && error.message.includes("Session expirée");
}

export function actionErrorMessage(error: unknown, fallback: string): string {
  return isSessionExpiredError(error) ? SESSION_EXPIRED_MESSAGE : fallback;
}