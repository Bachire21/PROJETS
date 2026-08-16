import Link from "next/link";
import { ExternalLinkIcon } from "@/components/icons";

export function PublicDestination({ href }: { href: string }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-navy-900 px-5 py-3.5 text-white">
      <p className="text-admin-label uppercase tracking-[0.16em] text-cream/60">
        Destination publique
      </p>
      <p className="font-mono text-sm font-bold">{href}</p>
      <Link
        href={href}
        target="_blank"
        className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-magenta-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-magenta-600"
      >
        <ExternalLinkIcon className="h-3.5 w-3.5" />
        Voir sur le site
      </Link>
    </div>
  );
}