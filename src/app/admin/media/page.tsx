import { loadMediaContent } from "@/lib/content-store";
import { MediaManager } from "@/components/admin/media/MediaManager";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const content = await loadMediaContent();
  return <MediaManager initialContent={content} />;
}