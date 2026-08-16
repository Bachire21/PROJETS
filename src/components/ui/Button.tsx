import type { ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "white" | "whatsapp";

type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = ButtonBaseProps & {
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-900 text-white shadow-sm hover:bg-navy-700 hover:shadow-md active:scale-[0.98]",
  accent:
    "bg-magenta-500 text-white shadow-sm hover:bg-magenta-600 hover:shadow-md active:scale-[0.98]",
  outline:
    "border border-navy-300 text-navy-900 hover:border-navy-900 hover:bg-navy-50 active:scale-[0.98]",
  ghost: "text-navy-900 hover:bg-navy-50",
  white:
    "bg-white text-navy-900 shadow-sm hover:bg-cream hover:shadow-md active:scale-[0.98]",
  whatsapp:
    "bg-whatsapp text-white shadow-sm hover:bg-whatsapp-dark hover:shadow-md active:scale-[0.98]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-button",
  md: "h-11 px-6 text-button",
  lg: "h-12 px-7 text-button-lg sm:h-13",
};

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className = "" } = props;
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = props;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}