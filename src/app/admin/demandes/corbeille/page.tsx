import { loadDemandesContent } from "@/lib/content-store";
import { TrashManager } from "@/components/admin/demandes/TrashManager";

export const dynamic = "force-dynamic";

export default async function AdminDemandesCorbeillePage() {
  const content = await loadDemandesContent();
  return <TrashManager initialContent={content} />;
}