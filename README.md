# Amplía Consultoría — Landing

Landing page de **Amplía Consultoría** (consultoría jurídica y de gestión pública para Ayuntamientos de Sonora).

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · lucide-react · zod · Resend.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completa las variables
npm run dev                  # http://localhost:3000
```

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sin emitir |

## Dónde editar

- **Textos, servicios, datos de contacto:** `src/content/site.ts` (un solo archivo). Los valores con `TODO` son marcadores: reemplázalos antes de publicar.
- **Colaboraciones:** cifras en `collaborations` (`src/content/site.ts`); silueta y pines del mapa en `src/content/sonora-map.ts`.
- **Colores y tipografía:** tokens en `src/app/globals.css` (`@theme`). Paleta Premium Editorial (#FAFAFA, verde #2C4F4A, dorado #D4AF37). Fuentes auto-alojadas en `src/fonts/` (Montserrat + Inter, licencia OFL).

## Estructura

```
src/app/            layout (SEO, JSON-LD), página, API de contacto, sitemap, robots, OG image
src/components/ui/  Button, Section/SectionHeading, BrushRing (isotipo SVG), Logo, Reveal
src/components/sections/  Header, Hero, TrustBar, Services, Benefits, Methodology, About,
                          Difference, CtaBand, Contact, ContactForm, Footer
src/lib/contact-schema.ts  validación compartida cliente/servidor (zod)
qa/qa.mjs          QA automatizado (Playwright + axe)
```

## Formulario de contacto

`POST /api/contact` valida con zod, filtra bots con un campo honeypot y envía el correo con [Resend](https://resend.com) (`replyTo` = correo del solicitante). Variables: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Si faltan, responde 503 y el formulario muestra un respaldo por correo y WhatsApp.

## QA

```bash
npm run build && npm run start &
BASE_URL=http://localhost:3000 node qa/qa.mjs
```

Ver `QA-REPORT.md` y `DEPLOY.md`.
