import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { benefits } from "@/content/site";

export function Benefits() {
  return (
    <Section tone="mist" labelledBy="beneficios-title">
      <SectionHeading id="beneficios-title" eyebrow="Beneficios" title={benefits.title} subtitle={benefits.subtitle} />
      <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.items.map((b, i) => (
          <Reveal as="li" key={b.title} delay={i * 0.06}>
            <div className="flex gap-4">
              <span className="bg-brand inline-flex size-8 shrink-0 items-center justify-center rounded-full text-white shadow-soft">
                <Check className="size-4" strokeWidth={3} aria-hidden />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-base font-bold tracking-tight">{b.title}</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted">{b.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
      <div className="mt-14 flex justify-center">
        <ButtonLink href="#contacto" size="lg">
          Solicitar diagnóstico gratuito
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </ButtonLink>
      </div>
    </Section>
  );
}
