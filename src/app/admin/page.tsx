import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  console.log("[DEBUG] render page: /admin (redirect)");
  redirect("/admin/dashboard");
}