"use client";

import { useEffect, useState } from "react";
import { homeHero, finalCta } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/icons";

export function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed right-4 bottom-4 z-40 transition-all duration-500 sm:right-6 sm:bottom-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <Button
        href={homeHero.primaryCta.href}
        size="sm"
        className="h-11 text-sm shadow-lg shadow-navy-900/25 sm:h-13"
      >
        {finalCta.primaryCta.label}
        <ArrowRightIcon className="h-4.5 w-4.5" />
      </Button>
    </div>
  );
}