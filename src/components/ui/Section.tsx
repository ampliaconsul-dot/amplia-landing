import type { ReactNode } from "react";

type Tone = "white" | "mist" | "brand";

const tones: Record<Tone, string> = {
  white: "bg-white text-ink",
  mist: "bg-mist text-ink",
  brand: "bg-brand text-white on-dark",
};

export function Section({
  id,
  tone = "white",
  className = "",
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative overflow-hidden py-20 md:py-28 ${tones[tone]} ${className}`}
    >
      <div className="container-page relative">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  const alignCls = align === "center" ? "mx-auto text-center items-center" : "items-start text-left";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignCls}`}>
      {eyebrow && (
        <p
          className={`font-display text-xs font-bold tracking-[0.2em] uppercase ${dark ? "text-mint" : "text-teal-600"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="font-display text-3xl leading-tight font-bold tracking-tight text-balance md:text-[2.6rem]"
      >
        {title}
      </h2>
      {align === "center" && (
        <span aria-hidden className={`h-1 w-12 rounded-full ${dark ? "bg-mint" : "bg-brand"}`} />
      )}
      {subtitle && (
        <p className={`text-base leading-relaxed text-pretty md:text-lg ${dark ? "text-white/85" : "text-muted"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
