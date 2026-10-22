// QA automatizado: responsive, accesibilidad (axe), SEO, enlaces y formulario.
// Uso: BASE_URL=http://localhost:3000 node qa/qa.mjs
import { chromium } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = new URL("./screenshots/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
};

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);

async function revealAll(page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);
}

// 1. Responsive
for (const [label, width, height] of [["mobile", 375, 812], ["tablet", 768, 1024], ["desktop", 1440, 900]]) {
  const ctx0 = await browser.newContext({ viewport: { width, height } });
  const page = await ctx0.newPage();
  page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await revealAll(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(`[${label}] sin scroll horizontal`, overflow <= 0, `exceso=${overflow}px`);
  check(`[${label}] sin errores de consola`, errors.length === 0, errors.join(" | "));
  await page.screenshot({ path: `${OUT}${label}-full.png`, fullPage: true });
  await page.screenshot({ path: `${OUT}${label}-hero.png` });

  if (label === "mobile") {
    const toggle = page.getByRole("button", { name: "Abrir menú" });
    await toggle.click();
    const visible = await page.locator("#menu-movil").isVisible();
    check("[mobile] menú móvil abre", visible);
    await page.screenshot({ path: `${OUT}mobile-menu.png` });
    await page.keyboard.press("Escape");
    check("[mobile] menú cierra con Escape", !(await page.locator("#menu-movil").isVisible()));
  }
  await page.close();
}

// 2. Accesibilidad, SEO y enlaces (desktop)
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE, { waitUntil: "networkidle" });
await revealAll(page);

const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
const serious = axe.violations.filter((v) => ["serious", "critical"].includes(v.impact));
check(
  "axe WCAG 2.1 AA: sin violaciones serias/críticas",
  serious.length === 0,
  axe.violations.map((v) => `${v.id}(${v.impact}, ${v.nodes.length})`).join(", ") || "0 violaciones",
);

const seo = await page.evaluate(() => ({
  title: document.title,
  desc: document.querySelector('meta[name="description"]')?.content ?? "",
  h1: document.querySelectorAll("h1").length,
  lang: document.documentElement.lang,
  og: !!document.querySelector('meta[property="og:image"]'),
  canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
  jsonld: !!document.querySelector('script[type="application/ld+json"]'),
  headings: [...document.querySelectorAll("h1,h2,h3")].map((h) => +h.tagName[1]),
  imgsNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
}));
check("SEO: <title> presente (≤70)", seo.title.length > 10 && seo.title.length <= 70, `${seo.title.length} car.`);
check("SEO: meta description (120–170)", seo.desc.length >= 120 && seo.desc.length <= 170, `${seo.desc.length} car.`);
check("SEO: un solo H1", seo.h1 === 1);
check("SEO: lang es-MX", seo.lang === "es-MX");
check("SEO: Open Graph image", seo.og);
check("SEO: canonical", !!seo.canonical, seo.canonical);
check("SEO: JSON-LD", seo.jsonld);
const skips = seo.headings.filter((l, i) => i > 0 && l - seo.headings[i - 1] > 1).length;
check("Encabezados sin saltos de nivel", skips === 0, seo.headings.join(""));
check("Todas las imágenes con alt", seo.imgsNoAlt === 0);

const anchors = await page.evaluate(() =>
  [...document.querySelectorAll('a[href^="#"]')]
    .map((a) => a.getAttribute("href"))
    .filter((h) => h.length > 1 && !document.getElementById(h.slice(1))),
);
check("Anclas internas con destino válido", anchors.length === 0, anchors.join(", "));

for (const path of ["/robots.txt", "/sitemap.xml", "/opengraph-image"]) {
  const r = await page.request.get(BASE + path);
  check(`GET ${path} → 200`, r.status() === 200, String(r.status()));
}

// 3. Teclado: primer Tab muestra "Saltar al contenido"
await page.goto(BASE, { waitUntil: "networkidle" });
await page.keyboard.press("Tab");
const firstFocus = await page.evaluate(() => document.activeElement?.textContent?.trim());
check("Teclado: primer foco es 'Saltar al contenido'", firstFocus === "Saltar al contenido", firstFocus);
let tabbed = 0;
for (let i = 0; i < 40; i++) {
  await page.keyboard.press("Tab");
  const ok = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return false;
    const s = getComputedStyle(el);
    return s.outlineStyle !== "none" || s.boxShadow !== "none";
  });
  if (ok) tabbed++;
}
check("Teclado: foco visible en elementos interactivos", tabbed >= 38, `${tabbed}/40`);

// 4. Formulario: validación del cliente
await page.goto(BASE + "#contacto", { waitUntil: "networkidle" });
await revealAll(page);
await page.locator("#contacto").scrollIntoViewIfNeeded();
await page.getByRole("button", { name: /Enviar solicitud/ }).click();
await page.locator('[aria-invalid="true"]').first().waitFor({ timeout: 5000 });
const invalid = await page.locator('[aria-invalid="true"]').count();
check("Formulario: validación muestra errores por campo", invalid >= 4, `${invalid} campos inválidos`);
const focused = await page.evaluate(() => document.activeElement?.id);
check("Formulario: foco al primer campo con error", focused === "f-name", focused);
await page.screenshot({ path: `${OUT}form-errors.png`, fullPage: false });

// 5. Formulario: envío exitoso (API mockeada) y error de servidor
async function fill() {
  await page.fill("#f-name", "María López");
  await page.fill("#f-role", "Síndica Municipal");
  await page.fill("#f-organization", "H. Ayuntamiento de Ures");
  await page.fill("#f-email", "maria@example.com");
  await page.fill("#f-phone", "+52 662 123 4567");
  await page.fill("#f-message", "Necesitamos apoyo con la entrega-recepción de la administración.");
  await page.check("#f-consent");
}
let sentBody = null;
await page.route("**/api/contact", async (route) => {
  sentBody = route.request().postDataJSON();
  await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
});
await fill();
await page.getByRole("button", { name: /Enviar solicitud/ }).click();
await page.getByText("¡Gracias! Recibimos tu mensaje.").waitFor({ timeout: 5000 });
check("Formulario: envío exitoso muestra confirmación", true);
check("Formulario: payload correcto", sentBody?.organization === "H. Ayuntamiento de Ures" && sentBody?.consent === true);
await page.screenshot({ path: `${OUT}form-success.png` });

await page.unroute("**/api/contact");
await page.route("**/api/contact", (route) =>
  route.fulfill({ status: 503, contentType: "application/json", body: '{"ok":false,"error":"El formulario no está disponible en este momento."}' }),
);
await page.getByRole("button", { name: "Enviar otro mensaje" }).click();
await fill();
await page.getByRole("button", { name: /Enviar solicitud/ }).click();
await page.getByText("El formulario no está disponible en este momento.").waitFor({ timeout: 5000 });
check("Formulario: error del servidor muestra fallback (correo/WhatsApp)", await page.getByRole("alert").getByText("WhatsApp").isVisible());

await browser.close();
writeFileSync(new URL("./results.json", import.meta.url), JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} verificaciones OK`);
process.exit(failed.length ? 1 : 0);
