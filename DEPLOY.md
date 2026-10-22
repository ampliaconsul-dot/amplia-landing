# Despliegue: Vercel + Cloudflare (DNS) + Resend (correo)

## 1. Subir el código a GitHub

```bash
cd amplia-landing
git remote add origin https://github.com/<tu-usuario>/amplia-landing.git
git branch -M main
git push -u origin main
```

## 2. Desplegar en Vercel

**Opción A (recomendada): Git conectado.**
1. https://vercel.com/new → **Import Git Repository** → elige `amplia-landing`.
2. Framework: **Next.js** (se detecta solo). Build: `npm run build`. No cambies nada más.
3. **Environment Variables** (Production y Preview):
   - `NEXT_PUBLIC_SITE_URL` = `https://www.tudominio.com`
   - `RESEND_API_KEY` = `re_...`
   - `CONTACT_TO_EMAIL` = correo que recibe las solicitudes
   - `CONTACT_FROM_EMAIL` = `Amplía Consultoría <web@tudominio.com>`
4. **Deploy**. A partir de ahí, cada `git push` a `main` publica a producción y cada rama genera un preview.

> Si quieres reemplazar el proyecto actual `amplia-landing.vercel.app`, en el proyecto existente ve a **Settings → Git → Connect Git Repository** y conéctalo a este repo, o importa uno nuevo y mueve el dominio.

**Opción B: Vercel CLI.**
```bash
npm i -g vercel
vercel login
vercel link            # vincula a tu proyecto
vercel env add RESEND_API_KEY production   # repite para cada variable
vercel --prod
```

## 3. Dominio en Cloudflare → Vercel

1. En Vercel: **Project → Settings → Domains → Add**: agrega `tudominio.com` y `www.tudominio.com`. Elige cuál es el principal (recomendado `www`) y que el otro redirija (308).
2. En Cloudflare: **tu dominio → DNS → Records**. **Elimina** cualquier registro `A`, `AAAA` o `CNAME` existente para `@` y `www` que choque.
3. Crea:

| Tipo | Nombre | Contenido | Proxy status | TTL |
| --- | --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | **DNS only (nube gris)** | Auto |
| CNAME | `www` | `cname.vercel-dns.com` | **DNS only (nube gris)** | Auto |

   > Si Vercel te muestra valores específicos para tu proyecto (por ejemplo, otro CNAME tipo `xxxx.vercel-dns-017.com` o una IP distinta), **usa los que muestre Vercel**: tienen prioridad sobre esta tabla.

4. **Proxy en gris (DNS only) es obligatorio**: con la nube naranja, Cloudflare intercepta el tráfico y Vercel no puede emitir ni renovar el certificado SSL (Let's Encrypt). Vercel ya incluye CDN y HTTPS.
5. Si tienes registros **CAA**, agrega `0 issue "letsencrypt.org"`.
6. **SSL/TLS** en Cloudflare: no aplica mientras el proxy esté en gris. Si algún día activas la nube naranja, ponlo en **Full (strict)**, nunca en *Flexible* (provoca bucles de redirección).
7. Vuelve a Vercel → Domains: en minutos ambos dominios deben aparecer como **Valid Configuration** con certificado emitido.
8. Actualiza `NEXT_PUBLIC_SITE_URL` en Vercel con el dominio final y redeploya (afecta canonical, sitemap y Open Graph).

## 4. Correo del formulario (Resend)

1. Crea una cuenta en https://resend.com → **Domains → Add Domain** → `tudominio.com` (región us-east-1).
2. Resend te mostrará registros (MX y TXT de SPF en `send`, TXT DKIM `resend._domainkey`, y opcionalmente DMARC). Cópialos **tal cual** en Cloudflare DNS, todos en **DNS only**.
3. Pulsa **Verify** en Resend.
4. **API Keys → Create** (permiso *Sending access*) y pega la clave en `RESEND_API_KEY` en Vercel.
5. Prueba: envía el formulario en producción y revisa la bandeja de `CONTACT_TO_EMAIL`.

> Para probar antes de verificar el dominio puedes usar `CONTACT_FROM_EMAIL=onboarding@resend.dev`, pero solo entrega al correo dueño de la cuenta de Resend.

## 5. Verificación posterior

- `https://tudominio.com` redirige a `https://www.tudominio.com` con candado válido.
- `https://www.tudominio.com/sitemap.xml` y `/robots.txt` responden.
- Formulario: envío real llega a la bandeja.
- Opcional: da de alta el sitio en Google Search Console y envía el sitemap.
