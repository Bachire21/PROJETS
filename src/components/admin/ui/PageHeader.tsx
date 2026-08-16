import type { ReactNode } from "react";
import { StatusChip } from "@/components/admin/ui/fields";
import { PublicDestination } from "@/components/admin/ui/PublicDestination";

export function AdminPageHeader({
  title,
  description,
  destination,
  published,
  actions,
}: {
  title: string;
  description: string;
  destination: string;
  published?: boolean;
  actions?: ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-admin-title tracking-tight text-navy-900">
              {title}
            </h1>
            {published !== undefined ? (
              <StatusChip published={published} />
            ) : null}
          </div>
          <p className="mt-2 text-admin-body leading-relaxed text-navy-700/70">
            {description}
          </p>
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
      <PublicDestination href={destination} />
    </div>
  );
}