import {
  ArrowLeftRight,
  ClipboardList,
  Scale,
  SearchCheck,
  Eye,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { services, type ServiceIcon } from "@/content/site";

const icons: Record<ServiceIcon, LucideIcon> = {
  transition: ArrowLeftRight,
  plan: ClipboardList,
  law: Scale,
  audit: SearchCheck,
  transparency: Eye,
  shield: ShieldCheck,
};

function ServiceCard({ icon, title, description }: (typeof services)[number]) {
  const Icon = icons[icon];
  return (
    <article className="group bg-brand on-dark relative flex h-full flex-col items-center gap-4 overflow-hidden rounded-3xl p-8 text-center text-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <span
        aria-hidden
        className="absolute -top-20 -right-20 size-48 rounded-full border-[18px] border-white/10 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-45"
      />
      <span aria-hidden className="shine pointer-events-none absolute inset-0" />
      <span className="relative inline-flex size-16 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur transition-colors duration-300 group-hover:bg-white/25">
        <Icon className="size-8 group-hover:animate-wiggle" strokeWidth={1.5} aria-hidden />
      </span>
      <h3 className="relative font-display text-lg font-bold tracking-tight">{title}</h3>
      <p className="relative text-[0.95rem] leading-relaxed text-white/90">{description}</p>
    </article>
  );
}

export function Services() {
  return (
    <Section id="servicios" labelledBy="servicios-title">
      <SectionHeading
        id="servicios-title"
        eyebrow="Servicios"
        title="Asesoría integral para cada etapa de la administración municipal"
        subtitle="Soluciones jurídicas y administrativas diseñadas para la realidad de los Ayuntamientos de Sonora."
      />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal as="li" key={s.title} delay={(i % 3) * 0.1} variant="scale">
            <ServiceCard {...s} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
