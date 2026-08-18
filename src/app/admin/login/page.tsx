import Image from "next/image";
import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/auth/LoginForm";

export const metadata: Metadata = {
  title: "Connexion — Espace admin Campus Way",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  console.log("[DEBUG] render page: /admin/login");
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white p-8 shadow-2xl shadow-navy-950/40">
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <Image
              src="/logo.png"
              alt="Campus Way"
              width={1254}
              height={1254}
              className="h-20 w-auto rounded-full"
              priority
            />
            <div>
              <p className="font-display text-2xl font-bold tracking-tight text-navy-900">
                Campus <span className="text-magenta-500">Way</span>
              </p>
              <p className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-navy-400">
                Espace admin — Connexion
              </p>
            </div>
          </div>
          <LoginForm next={next ?? ""} />
        </div>
        <p className="mt-6 text-center text-xs text-cream/50">
          Accès réservé à l&apos;équipe Campus Way.
        </p>
      </div>
    </div>
  );
}