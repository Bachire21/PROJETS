"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import {
  ActivityIcon,
  BedIcon,
  BuildingIcon,
  CompassIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GridIcon,
  ImageIcon,
  ListIcon,
  MapPinIcon,
  MenuIcon,
  QuestionIcon,
  QuoteIcon,
  SettingsIcon,
  CloseIcon,
} from "@/components/icons";

const navGroups = [
  {
    label: "Tableau de bord",
    items: [{ label: "Dashboard", href: "/admin/dashboard", icon: GridIcon }],
  },
  {
    label: "Contenu du site",
    items: [
      { label: "Étudier au Maroc", href: "/admin/etudes", icon: CompassIcon },
      { label: "Parcours & services", href: "/admin/services", icon: ListIcon },
      {
        label: "Logement & Installation",
        href: "/admin/logement",
        icon: BedIcon,
      },
      { label: "Témoignages", href: "/admin/temoignages", icon: QuoteIcon },
      { label: "FAQ", href: "/admin/faq", icon: QuestionIcon },
    ],
  },
  {
    label: "Catalogue",
    items: [
      { label: "Établissements", href: "/admin/etablissements", icon: BuildingIcon },
      { label: "Formations", href: "/admin/formations", icon: GraduationAdminIcon },
    ],
  },
  {
    label: "Orientation",
    items: [
      {
        label: "Demandes d'orientation",
        href: "/admin/demandes",
        icon: MapPinIcon,
      },
    ],
  },
  {
    label: "Médiathèque",
    items: [{ label: "Médiathèque", href: "/admin/media", icon: ImageIcon }],
  },
  {
    label: "Site",
    items: [{ label: "Paramètres", href: "/admin/parametres", icon: SettingsIcon }],
  },
  {
    label: "Système",
    items: [
      {
        label: "Journal d'activité",
        href: "/admin/activite",
        icon: ActivityIcon,
      },
    ],
  },
];

function GraduationAdminIcon({ className }: { className?: string }) {
  return <FileTextIcon className={className} />;
}

function LogoutIcon({ className }: { className?: string }) {
  return <ExternalLinkIcon className={className} />;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const isActive = (href: string) =>
    href === "/admin/dashboard"
      ? pathname === "/admin/dashboard" || pathname === "/admin"
      : pathname.startsWith(href);

  const brand = (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt=""
        width={1254}
        height={1254}
        className="h-10 w-auto rounded-full"
        priority
      />
      <div>
        <p className="font-display text-sm font-bold tracking-tight text-navy-900">
          Campus Way
        </p>
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-navy-400">
          Espace administration
        </p>
      </div>
    </div>
  );

  const userMenu = (
    <div className="relative">
      <button
        type="button"
        onClick={() => setUserMenuOpen((open) => !open)}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-navy-200 bg-white px-4 text-sm font-bold text-navy-900 transition-colors hover:border-navy-900"
      >
        ADMIN
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-3.5 w-3.5 text-navy-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {userMenuOpen ? (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setUserMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-xl shadow-navy-900/10">
            <div className="border-b border-navy-100 px-4 py-3">
              <p className="text-sm font-bold text-navy-900">Admin Campus Way</p>
              <p className="mt-0.5 truncate text-xs text-navy-500">
                bachirendiaye7@gmail.com
              </p>
            </div>
            <div className="p-2">
              <Link
                href="/admin/logout"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                <LogoutIcon className="h-4 w-4" />
                Déconnexion
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );

  const sidebar = (
    <aside className="flex h-full flex-col bg-navy-900 text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 lg:hidden">
        <Image
          src="/logo.png"
          alt=""
          width={1254}
          height={1254}
          className="h-9 w-auto rounded-full"
        />
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="Fermer le menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-cream/70 hover:bg-white/10 hover:text-white"
        >
          <CloseIcon className="h-4.5 w-4.5" />
        </button>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto p-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 pt-2 pb-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cream/50">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-magenta-500 text-white shadow-md shadow-magenta-500/30"
                        : "text-cream/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/10 p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-cream/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ExternalLinkIcon className="h-4 w-4" />
          Voir le site public
        </Link>
        <Link
          href="/admin/logout"
          className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-cream/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogoutIcon className="h-4 w-4" />
          Déconnexion
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-navy-900 hover:bg-cream lg:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <Link href="/admin/dashboard" className="shrink-0">
            {brand}
          </Link>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-navy-900 px-4 text-sm font-bold text-white transition-colors hover:bg-navy-700"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Voir le site</span>
            </Link>
            {userMenu}
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-72 shadow-2xl">
            {sidebar}
          </div>
        </div>
      ) : null}

      <div className="lg:grid lg:grid-cols-[17rem_1fr]">
        <div className="hidden lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)]">
          {sidebar}
        </div>
        <main className="min-w-0 p-5 sm:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}