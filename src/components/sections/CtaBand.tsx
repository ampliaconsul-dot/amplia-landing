import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { BrushRing } from "@/components/ui/BrushRing";
import { ctaBand } from "@/content/site";

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="bg-white pb-20 md:pb-28">
      <div className="container-page">
        <div className="bg-brand on-dark relative overflow-hidden rounded-[2rem] px-7 py-14 text-white shadow-lift md:px-16 md:py-16">
          <BrushRing
            id="cta"
            tone="light"
            strokeWidth={18}
            className="pointer-events-none absolute -right-16 -bottom-24 w-[22rem] opacity-30"
          />
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="font-display text-2xl leading-tight font-bold text-balance md:text-4xl">
                {ctaBand.title}
              </h2>
              <p className="mt-3 text-lg text-white/90">{ctaBand.subtitle}</p>
            </div>
            <ButtonLink href={ctaBand.cta.href} variant="light" size="lg" className="shrink-0">
              {ctaBand.cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
