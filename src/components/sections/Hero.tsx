import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { BrushRing } from "@/components/ui/BrushRing";
import { hero, site } from "@/content/site";
import portrait from "../../../public/images/fabiola-kitazawa.webp";

export function Hero() {
  const [lead, accent] = hero.title.split(hero.titleAccent);
  return (
    <section id="inicio" aria-labelledby="hero-title" className="bg-hero-light relative overflow-hidden">
      <div aria-hidden className="bg-hex absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="container-page relative grid items-center gap-14 pt-32 pb-20 md:pt-40 md:pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="relative z-10 flex flex-col items-start gap-7">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 font-display text-xs font-semibold tracking-wide text-teal-700 shadow-soft ring-1 ring-teal-700/10">
            <span aria-hidden className="size-1.5 rounded-full bg-teal-500" />
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="font-display text-[2.35rem] leading-[1.05] font-extrabold tracking-tight text-ink uppercase sm:text-5xl lg:text-[3.6rem]"
          >
            {lead}
            <span className="bg-gradient-to-r from-teal-600 to-ocean bg-clip-text text-transparent">{hero.titleAccent}</span>
            {accent}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted">{hero.subtitle}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-sm font-medium text-ink-soft">
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

        {/* Retrato dentro del anillo de pincel (combinación de ambas referencias) */}
        <figure className="relative mx-auto w-full max-w-[22rem] sm:max-w-md">
          <div className="relative aspect-square">
            <BrushRing id="hero" strokeWidth={30} className="absolute -inset-[9%] z-20 h-[118%] w-[118%] drop-shadow-lg" />
            <div className="absolute inset-[4%] z-10 overflow-hidden rounded-full bg-mint-soft shadow-lift">
              <Image
                src={portrait}
                alt={`${site.leader.name}, ${site.leader.role} de Amplía Consultoría`}
                fill
                priority
                sizes="(min-width: 640px) 26rem, 80vw"
                placeholder="blur"
                className="photo-duotone object-cover object-[50%_18%]"
              />
            </div>
          </div>
          <figcaption className="absolute -bottom-4 left-1/2 z-30 w-max -translate-x-1/2 rounded-2xl bg-white px-5 py-3 text-center shadow-lift ring-1 ring-line">
            <span className="block font-display text-sm font-bold text-ink">{site.leader.name}</span>
            <span className="block text-xs font-medium text-teal-700">{site.leader.role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
