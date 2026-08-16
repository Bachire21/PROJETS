import { loadServicesContent } from "@/lib/content-store";
import { ServicesManager } from "@/components/admin/services/ServicesManager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const content = await loadServicesContent();
  return <ServicesManager initialContent={content} />;
}