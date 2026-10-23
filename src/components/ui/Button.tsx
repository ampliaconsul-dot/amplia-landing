import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "ghost-light";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-soft ring-1 ring-transparent hover:shadow-lift hover:-translate-y-0.5 hover:ring-gold hover:brightness-110",
  secondary:
    "border border-green-700/30 bg-white/70 text-green-800 backdrop-blur hover:border-green-600 hover:bg-white hover:-translate-y-0.5",
  light: "bg-white text-green-900 shadow-soft ring-1 ring-transparent hover:bg-gold-soft hover:ring-gold hover:-translate-y-0.5",
  "ghost-light": "border border-white/40 text-white hover:border-white hover:bg-white/10 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-[0.95rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type CommonProps = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof Link>, "className">) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "className">) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
