import { loadEtudesContent } from "@/lib/content-store";
import { EtudesManager } from "@/components/admin/etudes/EtudesManager";

export const dynamic = "force-dynamic";

export default async function AdminEtudesPage() {
  console.log("[DEBUG] render page: /admin/etudes");
  const content = await loadEtudesContent();
  return <EtudesManager initialContent={content} />;
}