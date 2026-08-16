import type { ReactNode } from "react";

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionTitleProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {eyebrow ? (
        <p
          className={`flex items-center gap-2.5 text-label uppercase tracking-[0.16em] text-magenta-500 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-6 bg-magenta-500/60" aria-hidden="true" />
          {eyebrow}
          {centered && <span className="h-px w-6 bg-magenta-500/60" aria-hidden="true" />}
        </p>
      ) : null}
      <h2 className="mt-4 text-h2 text-navy-900 sm:text-h2-lg">
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-lead text-navy-700/75 ${
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}