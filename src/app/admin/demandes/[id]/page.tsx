import { notFound } from "next/navigation";
import { loadDemandesContent } from "@/lib/content-store";
import { DemandeFiche } from "@/components/admin/demandes/DemandeFiche";

export const dynamic = "force-dynamic";

export default async function AdminDemandeFichePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(`[DEBUG] render page: /admin/demandes/${id}`);
  const content = await loadDemandesContent();
  const request = content.requests.find(
    (item) => item.id === id && !item.deletedAt,
  );
  if (!request) {
    notFound();
  }
  return <DemandeFiche initialRequest={request} />;
}