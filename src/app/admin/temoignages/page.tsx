import { loadTemoignagesContent } from "@/lib/content-store";
import { TemoignagesManager } from "@/components/admin/temoignages/TemoignagesManager";

export const dynamic = "force-dynamic";

export default async function AdminTemoignagesPage() {
  const content = await loadTemoignagesContent();
  return <TemoignagesManager initialContent={content} />;
}