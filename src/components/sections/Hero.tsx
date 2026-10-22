import Image from "next/image";
import { ArrowRight, Check, ShieldCheck, FileCheck2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { BrushRing } from "@/components/ui/BrushRing";
import { hero } from "@/content/site";
import teamPhoto from "../../../public/images/equipo-amplia.webp";

/** Retraso escalonado para la animación de entrada */
const enter = (i: number) => ({ animationDelay: `${0.1 + i * 0.12}s` });

export function Hero() {
  const [lead, accent] = hero.title.split(hero.titleAccent);
  return (
    <section id="inicio" aria-labelledby="hero-title" className="bg-hero-light relative overflow-hidden">
      <div aria-hidden className="bg-hex absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      {/* Blobs menta en movimiento */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="animate-drift absolute -top-24 right-[8%] size-[28rem] rounded-full bg-mint/40 blur-3xl" />
        <span
          className="animate-drift absolute bottom-0 -left-24 size-[22rem] rounded-full bg-teal-400/15 blur-3xl"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      <div className="container-page relative grid items-center gap-14 pt-32 pb-20 md:pt-40 md:pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative z-10 flex flex-col items-start gap-7">
          <p
            style={enter(0)}
            className="animate-enter inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 font-display text-xs font-semibold tracking-wide text-teal-700 shadow-soft ring-1 ring-teal-700/10"
          >
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-teal-500" />
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
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-teal-600 text-white">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Persona dentro del anillo de pincel, con tarjetas flotantes */}
        <figure style={enter(2)} className="animate-enter relative mx-auto w-full max-w-[21rem] sm:max-w-md">
          <div className="animate-float relative aspect-square">
            <BrushRing
              id="hero"
              animated
              strokeWidth={30}
              className="absolute -inset-[9%] z-20 h-[118%] w-[118%] drop-shadow-lg"
            />
            <div className="absolute inset-[4%] z-10 overflow-hidden rounded-full bg-mint-soft shadow-lift">
              <Image
                src={teamPhoto}
                alt="Integrante del equipo de Amplía Consultoría trabajando en su computadora"
                fill
                priority
                sizes="(min-width: 640px) 26rem, 80vw"
                placeholder="blur"
                className="photo-duotone object-cover object-[68%_35%]"
              />
            </div>
          </div>

          <div
            aria-hidden
            className="animate-bob absolute top-[6%] -left-4 z-30 hidden items-center gap-2.5 rounded-2xl bg-white/95 px-4 py-3 shadow-lift ring-1 ring-line backdrop-blur sm:flex"
          >
            <span className="bg-brand inline-flex size-8 items-center justify-center rounded-xl text-white">
              <FileCheck2 className="size-4" aria-hidden />
            </span>
            <span className="font-display text-xs font-bold text-ink">Entrega-recepción</span>
          </div>
          <div
            aria-hidden
            style={{ animationDelay: "-2.5s" }}
            className="animate-bob absolute -right-3 bottom-[22%] z-30 hidden items-center gap-2.5 rounded-2xl bg-white/95 px-4 py-3 shadow-lift ring-1 ring-line backdrop-blur sm:flex"
          >
            <span className="bg-brand inline-flex size-8 items-center justify-center rounded-xl text-white">
              <ShieldCheck className="size-4" aria-hidden />
            </span>
            <span className="font-display text-xs font-bold text-ink">Auditorías solventadas</span>
          </div>

          <figcaption className="absolute -bottom-4 left-1/2 z-30 w-max -translate-x-1/2 rounded-2xl bg-white px-5 py-3 text-center shadow-lift ring-1 ring-line">
            <span className="block font-display text-sm font-bold text-ink">Equipo Amplía</span>
            <span className="block text-xs font-medium text-teal-700">Acompañamiento cercano</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
