import { loadFaqContent } from "@/lib/content-store";
import { FaqManager } from "@/components/admin/faq/FaqManager";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  console.log("[DEBUG] render page: /admin/faq");
  const content = await loadFaqContent();
  return <FaqManager initialContent={content} />;
}