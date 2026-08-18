import { loadLogementContent } from "@/lib/content-store";
import { LogementManager } from "@/components/admin/logement/LogementManager";

export const dynamic = "force-dynamic";

export default async function AdminLogementPage() {
  console.log("[DEBUG] render page: /admin/logement");
  const content = await loadLogementContent();
  return <LogementManager initialContent={content} />;
}
