# Reporte de QA — Amplía Consultoría (landing)

Fecha: 2026-10-22 · Build de producción (`next build` + `next start`) · Chromium (Playwright)

## Resumen

| Área | Resultado |
| --- | --- |
| Build / TypeScript / ESLint | ✅ Sin errores ni advertencias |
| QA automatizado (`qa/qa.mjs`) | ✅ **31/31** verificaciones (incluye `prefers-reduced-motion`) |
| Lighthouse móvil | Rendimiento **96–97** · Accesibilidad **100** · Buenas prácticas **100** · SEO **100** |
| Lighthouse escritorio | Rendimiento **100** (LCP 0.6 s) |
| `npm audit --omit=dev` | ✅ 0 vulnerabilidades |

Métricas móviles (Lighthouse, 4G simulado): FCP 0.9 s · LCP 2.6 s · TBT 110 ms · CLS 0.

## Responsive
- 375 px, 768 px y 1440 px: sin scroll horizontal, sin errores de consola ni recursos 404.
- Menú móvil: abre/cierra, se cierra con `Escape`, bloquea el scroll de fondo, `aria-expanded`/`aria-controls`.
- Capturas en `qa/screenshots/` (`*-full.png`, `*-hero.png`, `mobile-menu.png`, `form-*.png`).

## Accesibilidad (WCAG 2.1 AA)
- axe-core: 0 violaciones (wcag2a/aa, wcag21a/aa). Se corrigió un contraste del logo en el footer (4.27 → >4.5:1).
- Enlace "Saltar al contenido" como primer foco; foco visible en todos los elementos interactivos.
- Imágenes con `alt` descriptivo; iconos decorativos con `aria-hidden`.
- Formulario: `label` asociado a cada campo, `aria-invalid` + `aria-describedby` por error, foco al primer campo con error, región `role="alert"` para estados, honeypot fuera del árbol accesible.
- Animaciones (anillo que se dibuja y gira, entradas escalonadas, tarjetas flotantes, marquee, apariciones al hacer scroll) usan solo `transform`/`opacity` y se desactivan con `prefers-reduced-motion` (verificado: 0 elementos ocultos y 0 animaciones en curso). Sin JS el contenido se ve completo.

## SEO
- `<title>` 55 car., meta description 147 car., `lang="es-MX"`, canonical, Open Graph + imagen OG generada, Twitter card.
- Un solo H1, jerarquía H2/H3 sin saltos.
- JSON-LD `ProfessionalService`, `sitemap.xml`, `robots.txt` (bloquea `/api/`).

## Rendimiento
- Página estática (SSG); solo `/api/contact` es dinámica.
- JS de la página: 15.5 kB (118 kB first load con el runtime de Next). zod se carga solo al enviar el formulario.
- Fuentes auto-alojadas con `next/font/local` (precarga + fallback métrico, CLS 0).
- Imágenes `next/image` (AVIF/WebP, `sizes`, blur placeholder, `priority` en el hero, lazy en el resto).
- Cabeceras de seguridad: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`; sin `X-Powered-By`.

## Formulario y API
| Caso | Esperado | Resultado |
| --- | --- | --- |
| Envío vacío (UI) | Errores por campo + foco | ✅ |
| Envío válido (API mockeada) | Confirmación "¡Gracias!" y payload correcto | ✅ |
| Error 503 (UI) | Mensaje + respaldo correo/WhatsApp | ✅ |
| `POST` válido sin variables de Resend | 503 con mensaje claro | ✅ |
| `POST` inválido | 422 con errores por campo en español | ✅ |
| Honeypot lleno | 200 sin enviar | ✅ |
| JSON malformado | 400 | ✅ |
| `GET /api/contact` | 405 | ✅ |

**Pendiente de producción:** el envío real con Resend se valida al configurar `RESEND_API_KEY` y el dominio (ver `DEPLOY.md`), porque este entorno no tiene credenciales.

## Pendientes de contenido
1. Confirmar dirección y horario en `src/content/site.ts` (correo ampliaconsul@gmail.com y teléfono/WhatsApp 662 205 5021 ya actualizados).
2. Foto del equipo en alta resolución: la actual se recortó de la presentación (calidad limitada). Basta con reemplazar `public/images/equipo-amplia.webp`. La foto de la Lic. Fabiola se retiró del sitio a petición.
3. Revisión legal del aviso de privacidad simplificado (footer) y, si aplica, enlace al aviso integral.
