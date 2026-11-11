export type SiteButtonVariant = "primary" | "outline" | "light" | "ghost" | "success";
export type SiteButtonSize = "xs" | "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<SiteButtonVariant, string> = {
  primary: "site-btn-primary",
  outline: "site-btn-outline",
  light: "site-btn-light",
  ghost: "site-btn-ghost",
  success: "site-btn-success",
};

const SIZE_CLASSES: Record<SiteButtonSize, string> = {
  xs: "site-btn-xs",
  sm: "site-btn-sm",
  md: "",
  lg: "site-btn-lg",
};

export interface SiteButtonClassOptions {
  variant?: SiteButtonVariant;
  size?: SiteButtonSize;
  fullWidth?: boolean;
  className?: string;
}

/**
 * Returns unified Header-style button classes (.site-btn) for buttons and links.
 * Uses the royal-blue pill silhouette (#094E9B) and top-right #75B5F5 accent bubble
 * defined in build-tailwind.mjs.
 */
export function siteButtonClass({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: SiteButtonClassOptions = {}): string {
  return [
    "site-btn",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Unified rounded-full filter tab pill styling aligned with Header royal blue (#094E9B).
 */
export function siteFilterTabClass(isActive: boolean, className = ""): string {
  return [
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer",
    isActive
      ? "bg-[#094E9B] text-white border border-[#094E9B] shadow-[0_6px_16px_rgba(9,78,155,0.28)] scale-[1.02]"
      : "bg-white text-slate-700 border border-slate-200 hover:bg-sky-50/80 hover:border-[#75B5F5] hover:text-[#094E9B]",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

