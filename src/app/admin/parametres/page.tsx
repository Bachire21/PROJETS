import { loadSettingsContent } from "@/lib/content-store";
import { ParametresManager } from "@/components/admin/parametres/ParametresManager";

export const dynamic = "force-dynamic";

export default async function AdminParametresPage() {
  console.log("[DEBUG] render page: /admin/parametres");
  const content = await loadSettingsContent();
  return <ParametresManager initialContent={content} />;
}