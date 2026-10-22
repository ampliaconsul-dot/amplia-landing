import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BrushRing } from "@/components/ui/BrushRing";
import { methodology } from "@/content/site";

export function Methodology() {
  return (
    <Section id="metodologia" labelledBy="metodologia-title">
      <BrushRing
        id="method"
        strokeWidth={22}
        className="pointer-events-none absolute top-10 -left-48 hidden w-[26rem] opacity-30 lg:block"
      />
      <SectionHeading
        id="metodologia-title"
        eyebrow="Metodología"
        title={methodology.title}
        subtitle={methodology.subtitle}
      />
      <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {methodology.steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.08}>
            <div className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-3xl bg-white p-7 shadow-soft ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <span
                aria-hidden
                className="font-display text-6xl leading-none font-extrabold text-mint transition-colors duration-300 group-hover:text-teal-400"
              >
                {i + 1}
              </span>
              <h3 className="font-display text-lg font-bold tracking-tight">
                <span className="sr-only">Etapa {i + 1}: </span>
                {step.title}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-muted">{step.description}</p>
              <span aria-hidden className="bg-brand absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
