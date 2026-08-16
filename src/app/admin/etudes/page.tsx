import { loadEtudesContent, loadMediaContent } from "@/lib/content-store";
import { EtudesManager } from "@/components/admin/etudes/EtudesManager";

export const dynamic = "force-dynamic";

export default async function AdminEtudesPage() {
  const [content, media] = await Promise.all([
    loadEtudesContent(),
    loadMediaContent(),
  ]);
  return <EtudesManager initialContent={content} initialMedia={media.items} />;
}