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
  const content = await loadDemandesContent();
  const request = content.requests.find((item) => item.id === id);
  if (!request) {
    notFound();
  }
  return <DemandeFiche initialRequest={request} />;
}