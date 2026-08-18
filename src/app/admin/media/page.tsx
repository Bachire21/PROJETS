import { loadMediaContent } from "@/lib/content-store";
import { MediaManager } from "@/components/admin/media/MediaManager";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  console.log("[DEBUG] render page: /admin/media");
  const content = await loadMediaContent();
  return <MediaManager initialContent={content} />;
}