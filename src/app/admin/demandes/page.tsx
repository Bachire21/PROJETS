import { loadDemandesContent } from "@/lib/content-store";
import { DemandesManager } from "@/components/admin/demandes/DemandesManager";

export const dynamic = "force-dynamic";

export default async function AdminDemandesPage() {
  const content = await loadDemandesContent();
  return <DemandesManager initialContent={content} />;
}