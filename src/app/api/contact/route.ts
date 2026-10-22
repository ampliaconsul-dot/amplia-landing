import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, flattenErrors, type ContactData, type ContactResponse } from "@/lib/contact-schema";

export const runtime = "nodejs";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function renderEmail(d: ContactData) {
  const rows: [string, string][] = [
    ["Nombre", d.name],
    ["Cargo", d.role || "—"],
    ["Municipio / institución", d.organization],
    ["Correo", d.email],
    ["Teléfono", d.phone || "—"],
  ];
  const html = `
    <div style="font-family:Arial,sans-serif;color:#0E1416;max-width:560px">
      <h2 style="color:#1F6F6B;margin:0 0 16px">Nueva solicitud desde el sitio web</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#55605F;white-space:nowrap">${k}</td><td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#55605F">Mensaje</p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(d.message)}</p>
    </div>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMensaje:\n${d.message}`;
  return { html, text };
}

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Solicitud inválida." }, 400);
  }

  // Honeypot: si un bot llenó el campo oculto, respondemos OK sin enviar nada.
  if (payload && typeof payload === "object" && (payload as Record<string, unknown>).company_website) {
    return json({ ok: true }, 200);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      { ok: false, error: "Revisa los campos marcados.", fieldErrors: flattenErrors(parsed.error) },
      422,
    );
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("[contact] Faltan variables de entorno RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL");
    return json(
      { ok: false, error: "El formulario no está disponible en este momento. Escríbenos directamente por correo o WhatsApp." },
      503,
    );
  }

  const data = parsed.data;
  const { html, text } = renderEmail(data);

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
      replyTo: data.email,
      subject: `Nueva solicitud: ${data.organization} — ${data.name}`,
      html,
      text,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("[contact] Error al enviar con Resend:", err);
    return json({ ok: false, error: "No pudimos enviar tu mensaje. Intenta de nuevo en unos minutos." }, 502);
  }

  return json({ ok: true }, 200);
}
