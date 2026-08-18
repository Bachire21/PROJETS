import { loadEcolesContent } from "@/lib/content-store";
import { FormationsManager } from "@/components/admin/ecoles/FormationsManager";

export const dynamic = "force-dynamic";

export default async function AdminFormationsPage() {
  console.log("[DEBUG] render page: /admin/formations");
  const content = await loadEcolesContent();
  return <FormationsManager initialContent={content} />;
}