import { loadMediaContent } from "@/lib/content-store";
import { computeMediaUsage } from "@/lib/media-usage";
import { MediaManager } from "@/components/admin/media/MediaManager";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  console.log("[DEBUG] render page: /admin/media");
  const content = await loadMediaContent();
  const usageByMedia = await computeMediaUsage(content.items);
  return (
    <MediaManager
      initialContent={content}
      usageByMedia={usageByMedia}
    />
  );
}