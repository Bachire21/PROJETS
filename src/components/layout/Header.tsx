"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigation, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import {
  CloseIcon,
  MenuIcon,
  WhatsAppIcon,
} from "@/components/icons";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white transition-all duration-300 ${
        scrolled
          ? "border-navy-100 shadow-sm shadow-navy-900/5"
          : "border-transparent"
      }`}
    >
      <Container className="flex h-16 max-w-[82rem]! items-center justify-between gap-6 sm:h-20">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Campus Way — Accueil"
          onClick={closeMenu}
        >
          <Image
            src="/logo.png"
            alt=""
            width={1254}
            height={1254}
            className="h-14 w-auto rounded-full sm:h-16"
            priority
          />
          <span className="font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
            Campus <span className="text-magenta-500">Way</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navigation principale"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full border px-3.5 py-2 text-secondary font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-500 ${
                isActive(item.href)
                  ? "border-magenta-500 bg-magenta-500 text-white shadow-md shadow-magenta-500/30"
                  : "border-transparent text-navy-700/80 hover:-translate-y-0.5 hover:border-navy-200 hover:bg-navy-50 hover:text-navy-900 hover:shadow-sm"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nous contacter sur WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-whatsapp to-whatsapp-dark text-white shadow-md shadow-whatsapp/30 ring-2 ring-inset ring-white/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-whatsapp/40 active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-500"
          >
            <WhatsAppIcon className="h-5.5 w-5.5" />
          </Link>
          <Link
            href="/trouver-mon-ecole"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-navy-800 to-navy-950 px-6 text-body font-semibold tracking-tight text-white shadow-md shadow-navy-900/25 ring-1 ring-inset ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:from-navy-700 hover:to-navy-900 hover:shadow-lg hover:shadow-navy-900/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-500 active:scale-[0.98]"
          >
            Trouver mon école
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-50 lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </Container>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-navy-100 bg-white lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-5">
            <nav aria-label="Navigation mobile" className="flex flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`rounded-xl border px-4 py-3 text-base font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? "border-magenta-500 bg-magenta-500 text-white shadow-md shadow-magenta-500/30"
                      : "border-transparent text-navy-700/80 hover:border-navy-200 hover:bg-navy-50 hover:text-navy-900"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/a-propos"
                onClick={closeMenu}
                className={`rounded-xl border px-4 py-3 text-base font-medium transition-all duration-300 ${
                  isActive("/a-propos")
                    ? "border-magenta-500 bg-magenta-500 text-white shadow-md shadow-magenta-500/30"
                    : "border-transparent text-navy-700/80 hover:border-navy-200 hover:bg-navy-50 hover:text-navy-900"
                }`}
              >
                À propos
              </Link>
            </nav>
            <div className="mt-4 flex flex-col gap-3 border-t border-navy-100 pt-5">
              <Link
                href="/trouver-mon-ecole"
                onClick={closeMenu}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-navy-800 to-navy-950 px-6 text-body font-semibold tracking-tight text-white shadow-md shadow-navy-900/25 ring-1 ring-inset ring-white/15 transition-all duration-300 hover:from-navy-700 hover:to-navy-900 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-500 active:scale-[0.98]"
              >
                Trouver mon école
              </Link>
              <Link
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-whatsapp to-whatsapp-dark px-6 text-body font-semibold tracking-tight text-white shadow-md shadow-whatsapp/30 ring-2 ring-inset ring-white/40 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-500 active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Discuter sur WhatsApp
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}