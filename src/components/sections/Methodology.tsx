import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BrushRing } from "@/components/ui/BrushRing";
import { methodology } from "@/content/site";

export function Methodology() {
  return (
    <Section id="metodologia" labelledBy="metodologia-title">
      <BrushRing
        id="method"
        animated
        strokeWidth={22}
        className="pointer-events-none absolute top-10 -left-48 hidden w-[26rem] opacity-30 lg:block"
      />
      <SectionHeading
        id="metodologia-title"
        eyebrow="Metodología"
        title={methodology.title}
        subtitle={methodology.subtitle}
      />
      <div className="relative mt-14">
        {/* Línea conectora que se dibuja al entrar en pantalla (escritorio) */}
        <Reveal
          as="span"
          variant="line"
          className="bg-brand absolute top-[3.1rem] right-[12.5%] left-[12.5%] hidden h-0.5 rounded-full lg:block"
        />
        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methodology.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={0.15 + i * 0.18} variant="scale">
              <div className="group relative flex h-full flex-col items-start gap-3 overflow-hidden rounded-3xl bg-white p-7 shadow-soft ring-1 ring-line transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <span
                  aria-hidden
                  className="relative inline-flex size-12 items-center justify-center rounded-full bg-green-800 font-display text-xl font-extrabold text-gold-light shadow-soft ring-4 ring-white transition-transform duration-300 group-hover:scale-110"
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-lg font-bold tracking-tight">
                  <span className="sr-only">Etapa {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-muted">{step.description}</p>
                <span
                  aria-hidden
                  className="bg-brand absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
