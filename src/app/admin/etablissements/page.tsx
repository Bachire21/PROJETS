import { loadEcolesContent } from "@/lib/content-store";
import { EstablishmentsManager } from "@/components/admin/ecoles/EstablishmentsManager";

export const dynamic = "force-dynamic";

export default async function AdminEtablissementsPage() {
  console.log("[DEBUG] render page: /admin/etablissements");
  const content = await loadEcolesContent();
  return <EstablishmentsManager initialContent={content} />;
}