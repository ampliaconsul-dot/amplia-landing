import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ConsultingCycle } from "@/components/ui/ConsultingCycle";
import { hero } from "@/content/site";

/** Retraso escalonado para la animación de entrada */
const enter = (i: number) => ({ animationDelay: `${0.1 + i * 0.12}s` });

export function Hero() {
  const [lead, accent] = hero.title.split(hero.titleAccent);
  return (
    <section id="inicio" aria-labelledby="hero-title" className="bg-hero-light relative overflow-hidden">
      <div aria-hidden className="bg-hex absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      {/* Blobs menta en movimiento */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="animate-drift absolute -top-24 right-[8%] size-[28rem] rounded-full bg-gold/20 blur-3xl" />
        <span
          className="animate-drift absolute bottom-0 -left-24 size-[22rem] rounded-full bg-green-400/15 blur-3xl"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      <div className="container-page relative grid items-center gap-14 pt-32 pb-20 md:pt-40 md:pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative z-10 flex flex-col items-start gap-7">
          <p
            style={enter(0)}
            className="animate-enter inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 font-display text-xs font-semibold tracking-wide text-green-700 shadow-soft ring-1 ring-green-700/10"
          >
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            style={enter(1)}
            className="animate-enter font-display text-[2.35rem] leading-[1.05] font-extrabold tracking-tight text-ink uppercase sm:text-5xl lg:text-[3.6rem]"
          >
            {lead}
            <span className="text-brand-animated">{hero.titleAccent}</span>
            {accent}
          </h1>
          <p style={enter(2)} className="animate-enter max-w-xl text-lg leading-relaxed text-pretty text-muted">
            {hero.subtitle}
          </p>
          <div style={enter(3)} className="animate-enter flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <ul style={enter(4)} className="animate-enter flex flex-wrap gap-x-6 gap-y-2 pt-1 text-sm font-medium text-ink-soft">
            {hero.highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-2">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-green-600 text-white">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Ciclo de consultoría animado (sustituye la fotografía) */}
        <figure style={enter(2)} className="animate-enter relative mx-auto w-full max-w-[19rem] sm:max-w-[25rem]">
          <ConsultingCycle />
          <figcaption className="sr-only">
            Metodología Amplía: Planeación, Implementación, Seguimiento y Transparencia
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
