import Image, { type StaticImageData } from "next/image";
import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { about, site } from "@/content/site";
import teamPhoto from "../../../public/images/equipo-amplia.webp";
import portrait from "../../../public/images/fabiola-kitazawa.webp";

function PhotoCard({
  src,
  alt,
  label,
  sublabel,
  className = "",
  position = "50% 50%",
}: {
  src: StaticImageData;
  alt: string;
  label: string;
  sublabel: string;
  className?: string;
  position?: string;
}) {
  return (
    <figure className={`group relative overflow-hidden rounded-3xl shadow-lift ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 18rem, 46vw"
        placeholder="blur"
        style={{ objectPosition: position }}
        className="photo-duotone object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ocean/85 via-teal-900/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
        <span className="block font-display text-sm font-bold">{label}</span>
        <span className="block text-xs text-white/90">{sublabel}</span>
      </figcaption>
    </figure>
  );
}

export function About() {
  return (
    <Section id="nosotros" tone="mist" labelledBy="nosotros-title">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="grid grid-cols-2 gap-4">
            <PhotoCard
              src={portrait}
              alt={`${site.leader.name}, ${site.leader.role}`}
              label={site.leader.name}
              sublabel={site.leader.role}
              position="50% 15%"
              className="row-span-2 aspect-[3/4.4]"
            />
            <PhotoCard
              src={teamPhoto}
              alt="Integrante del equipo de Amplía Consultoría trabajando en su computadora"
              label="Equipo Amplía"
              sublabel="Acompañamiento técnico"
              position="60% 30%"
              className="aspect-square"
            />
            <blockquote className="bg-brand on-dark flex flex-col justify-between gap-3 rounded-3xl p-5 text-white shadow-lift">
              <Quote className="size-5 text-mint" aria-hidden />
              <p className="text-sm leading-snug font-medium">“{about.leaderQuote}”</p>
            </blockquote>
          </div>
        </Reveal>

        <div className="flex flex-col gap-8">
          <SectionHeading id="nosotros-title" eyebrow={about.eyebrow} title={about.title} align="left" />
          <p className="-mt-2 text-lg leading-relaxed text-muted">{about.body}</p>
          <dl className="grid gap-4">
            {[
              { term: "Misión", text: about.mission },
              { term: "Visión", text: about.vision },
            ].map((item) => (
              <div key={item.term} className="rounded-3xl border-l-4 border-teal-600 bg-white p-6 shadow-soft">
                <dt className="mb-2 font-display text-xs font-bold tracking-[0.2em] text-teal-700 uppercase">
                  {item.term}
                </dt>
                <dd className="text-[0.95rem] leading-relaxed text-ink-soft">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
