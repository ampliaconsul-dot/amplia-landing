import { BadgeCheck, Gem, Handshake, HeartHandshake, Scale, Telescope, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { difference } from "@/content/site";

// Un icono por compromiso, en el mismo orden que `difference.items`
const icons: LucideIcon[] = [Scale, Gem, Handshake, HeartHandshake, BadgeCheck, Telescope];

export function Difference() {
  return (
    <Section labelledBy="diferencia-title">
      <SectionHeading
        id="diferencia-title"
        eyebrow="Por qué Amplía"
        title={difference.title}
        subtitle={difference.subtitle}
      />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {difference.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal as="li" key={item.title} delay={(i % 3) * 0.1} variant="scale">
              <div className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/50 hover:shadow-soft">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-soft text-green-700 transition-colors duration-300 group-hover:bg-green-600 group-hover:text-white">
                  <Icon className="size-6 group-hover:animate-wiggle" strokeWidth={1.7} aria-hidden />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-base font-bold tracking-tight">{item.title}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-muted">{item.description}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
