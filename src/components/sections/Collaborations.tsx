import { MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { DonutChart } from "@/components/ui/DonutChart";
import { SonoraMap } from "@/components/ui/SonoraMap";
import { collaborations as c } from "@/content/site";

export function Collaborations() {
  const others = Math.round((100 - c.percent) * 10) / 10;
  return (
    <Section id="colaboraciones" tone="brand" labelledBy="colaboraciones-title">
      <span
        aria-hidden
        className="animate-drift pointer-events-none absolute -top-40 -left-40 size-[34rem] rounded-full bg-gold/10 blur-3xl"
      />
      <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="flex flex-col gap-10">
          <SectionHeading id="colaboraciones-title" eyebrow={c.eyebrow} title={c.title} align="left" dark />

          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center">
            <Reveal variant="scale" className="w-52 shrink-0 sm:w-56">
              <DonutChart
                percent={c.percent}
                label={`Amplía ha acompañado al ${c.percent} % de los municipios de Sonora (${c.served} de ${c.total}).`}
              />
            </Reveal>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <span aria-hidden className="size-4 rounded-sm bg-gold" />
                <span className="font-display text-sm font-bold">
                  Amplía <span className="text-gold-light">{c.percent} %</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden className="size-4 rounded-sm bg-green-500/60" />
                <span className="font-display text-sm font-bold">
                  Otros <span className="text-white/80">{others} %</span>
                </span>
              </li>
              <li className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15">
                <MapPin className="size-4 text-gold-light" aria-hidden />
                <span className="text-sm">
                  <strong className="font-display text-gold-light">{c.served}</strong> de {c.total} municipios
                </span>
              </li>
            </ul>
          </div>

          <Reveal variant="up" delay={0.1}>
            <p className="border-l-2 border-gold pl-5 text-lg leading-relaxed text-white/90 italic">{c.text}</p>
          </Reveal>
        </div>

        <Reveal variant="right" className="mx-auto w-full max-w-[34rem]">
          <SonoraMap />
        </Reveal>
      </div>
    </Section>
  );
}
