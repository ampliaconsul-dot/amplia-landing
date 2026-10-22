import { Eye, Quote, Scale, TrendingUp } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BrushRing } from "@/components/ui/BrushRing";
import { about } from "@/content/site";

const chips = [
  { icon: Scale, label: "Ética y legalidad", pos: "top-[4%] -left-2 sm:left-0", delay: "0s" },
  { icon: Eye, label: "Transparencia", pos: "bottom-[16%] -right-3 sm:-right-8", delay: "-1.7s" },
  { icon: TrendingUp, label: "Resultados", pos: "bottom-[2%] left-[8%]", delay: "-3.4s" },
];

export function About() {
  return (
    <Section id="nosotros" tone="mist" labelledBy="nosotros-title">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Composición gráfica: anillo animado con la cita y valores flotantes */}
        <Reveal variant="left" className="relative mx-auto w-full max-w-[26rem]">
          <div className="relative aspect-square">
            <BrushRing id="about" animated strokeWidth={26} className="absolute inset-0 h-full w-full" />
            <blockquote className="absolute inset-[16%] flex flex-col items-center justify-center gap-3 rounded-full bg-white p-8 text-center shadow-lift">
              <Quote className="size-6 text-teal-600" aria-hidden />
              <p className="font-display text-sm leading-snug font-semibold text-ink sm:text-base">
                “{about.leaderQuote}”
              </p>
              <footer className="text-xs font-semibold tracking-[0.16em] text-teal-700 uppercase">Amplía Consultoría</footer>
            </blockquote>
          </div>
          <ul aria-label="Nuestros principios">
            {chips.map(({ icon: Icon, label, pos, delay }) => (
              <li
                key={label}
                style={{ animationDelay: delay }}
                className={`animate-bob absolute ${pos} inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-lift ring-1 ring-line`}
              >
                <span className="bg-brand inline-flex size-7 items-center justify-center rounded-full text-white">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                <span className="font-display text-xs font-bold text-ink">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal variant="right">
            <SectionHeading id="nosotros-title" eyebrow={about.eyebrow} title={about.title} align="left" />
          </Reveal>
          <Reveal variant="right" delay={0.1}>
            <p className="-mt-2 text-lg leading-relaxed text-muted">{about.body}</p>
          </Reveal>
          <dl className="grid gap-4">
            {[
              { term: "Misión", text: about.mission },
              { term: "Visión", text: about.vision },
            ].map((item, i) => (
              // El propio Reveal es el <div> que agrupa dt/dd (estructura válida de <dl>)
              <Reveal
                key={item.term}
                variant="right"
                delay={0.2 + i * 0.12}
                className="rounded-3xl border-l-4 border-teal-600 bg-white p-6 shadow-soft"
              >
                <dt className="mb-2 font-display text-xs font-bold tracking-[0.2em] text-teal-700 uppercase">
                  {item.term}
                </dt>
                <dd className="text-[0.95rem] leading-relaxed text-ink-soft">{item.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
