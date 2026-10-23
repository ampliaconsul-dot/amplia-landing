import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/Section";
import { BrushRing } from "@/components/ui/BrushRing";
import { ContactForm } from "./ContactForm";
import { contactSection, site } from "@/content/site";

export function Contact() {
  const items = [
    { icon: Mail, label: "Correo", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: Phone, label: "Teléfono", value: site.contact.phone, href: site.contact.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: "Escríbenos por WhatsApp", href: site.contact.whatsappHref, external: true },
    { icon: MapPin, label: "Ubicación", value: site.contact.address },
    { icon: Clock, label: "Horario", value: site.contact.hours },
  ];

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-brand on-dark relative overflow-hidden py-20 text-white md:py-28">
      <span
        aria-hidden
        className="animate-drift pointer-events-none absolute -right-40 -bottom-40 size-[40rem] rounded-full bg-green-400/20 blur-3xl"
      />
      <BrushRing
        id="contact"
        animated
        tone="light"
        strokeWidth={16}
        className="pointer-events-none absolute -top-32 -left-40 w-[30rem] opacity-15"
      />
      <div className="container-page relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="contacto-title"
            eyebrow={contactSection.eyebrow}
            title={contactSection.title}
            subtitle={contactSection.subtitle}
            align="left"
            dark
          />
          <ul className="flex flex-col gap-5">
            {items.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                  <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                </span>
                <div className="flex flex-col">
                  <span className="font-display text-xs font-bold tracking-[0.14em] text-gold-light uppercase">{label}</span>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="font-medium text-white underline-offset-4 hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="font-medium text-white">{value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-ink">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
