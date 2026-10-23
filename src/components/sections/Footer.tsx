import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-mist text-ink">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Logo id="footer-logo" />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Consultoría especializada en gestión pública municipal, transparencia y cumplimiento normativo para los
            Ayuntamientos de Sonora.
          </p>
        </div>
        <nav aria-label="Pie de página">
          <h2 className="mb-4 font-display text-xs font-bold tracking-[0.2em] text-green-700 uppercase">Navegación</h2>
          <ul className="flex flex-col gap-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-ink-soft transition-colors hover:text-green-700">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-4 font-display text-xs font-bold tracking-[0.2em] text-green-700 uppercase">Contacto</h2>
          <ul className="flex flex-col gap-2.5 text-sm text-ink-soft">
            <li>
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-green-700">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.contact.phoneHref} className="transition-colors hover:text-green-700">
                {site.contact.phone}
              </a>
            </li>
            <li>{site.contact.address}</li>
          </ul>
        </div>
      </div>
      <div id="aviso-privacidad" className="border-t border-ink/10">
        <div className="container-page flex flex-col gap-3 py-8 text-xs leading-relaxed text-muted md:flex-row md:items-start md:justify-between md:gap-10">
          <p className="max-w-3xl">
            <strong className="font-semibold text-ink-soft">Aviso de privacidad simplificado.</strong> {site.name} es
            responsable del tratamiento de los datos personales que nos proporciones a través de este sitio, los cuales
            se utilizarán únicamente para atender tu solicitud y dar seguimiento a la relación profesional. Puedes
            ejercer tus derechos ARCO escribiendo a {site.contact.email}.
          </p>
          <p className="shrink-0">© {year} {site.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
