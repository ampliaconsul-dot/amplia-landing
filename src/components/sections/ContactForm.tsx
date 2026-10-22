"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ContactField, ContactResponse } from "@/lib/contact-schema";
import { site } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<ContactField, string>>;

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted/70 transition-colors outline-none hover:border-teal-400/60 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600/10";

function Field({
  name,
  label,
  required,
  error,
  children,
}: {
  name: ContactField;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={`f-${name}`} className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="text-teal-700" aria-hidden>
            {" "}*
          </span>
        ) : (
          <span className="font-normal text-muted"> (opcional)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`f-${name}-error`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const a11y = (name: ContactField) => ({
    id: `f-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `f-${name}-error` : undefined,
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      role: String(fd.get("role") ?? ""),
      organization: String(fd.get("organization") ?? ""),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      company_website: String(fd.get("company_website") ?? ""),
    };

    // zod se carga solo al enviar para no pesar en la carga inicial
    const { contactSchema, flattenErrors } = await import("@/lib/contact-schema");
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = flattenErrors(parsed.error);
      setErrors(fieldErrors);
      setStatus("error");
      setMessage("Revisa los campos marcados.");
      const first = Object.keys(fieldErrors)[0];
      if (first) formRef.current?.querySelector<HTMLElement>(`#f-${first}`)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;
      if (res.ok && data?.ok) {
        setStatus("success");
        formRef.current?.reset();
        return;
      }
      if (data && !data.ok && data.fieldErrors) setErrors(data.fieldErrors);
      setStatus("error");
      setMessage((data && !data.ok && data.error) || "No pudimos enviar tu mensaje. Intenta de nuevo.");
    } catch {
      setStatus("error");
      setMessage("Sin conexión. Verifica tu red e intenta de nuevo.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-3xl bg-white p-8 shadow-lift md:p-10">
        <CheckCircle2 className="size-10 text-teal-700" aria-hidden />
        <h3 className="font-display text-2xl font-bold">¡Gracias! Recibimos tu mensaje.</h3>
        <p className="text-muted">Nuestro equipo te contactará en un máximo de un día hábil.</p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-describedby="form-status"
      className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-lift sm:p-8 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Nombre completo" required error={errors.name}>
          <input {...a11y("name")} type="text" autoComplete="name" required className={inputCls} />
        </Field>
        <Field name="role" label="Cargo" error={errors.role}>
          <input {...a11y("role")} type="text" autoComplete="organization-title" className={inputCls} />
        </Field>
      </div>
      <Field name="organization" label="Municipio o institución" required error={errors.organization}>
        <input {...a11y("organization")} type="text" autoComplete="organization" required className={inputCls} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="email" label="Correo electrónico" required error={errors.email}>
          <input {...a11y("email")} type="email" autoComplete="email" inputMode="email" required className={inputCls} />
        </Field>
        <Field name="phone" label="Teléfono" error={errors.phone}>
          <input {...a11y("phone")} type="tel" autoComplete="tel" inputMode="tel" className={inputCls} />
        </Field>
      </div>
      <Field name="message" label="¿En qué podemos ayudarte?" required error={errors.message}>
        <textarea {...a11y("message")} rows={5} required className={`${inputCls} resize-y`} />
      </Field>

      {/* Honeypot: oculto para personas y lectores de pantalla */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="f-company_website">No llenar este campo</label>
        <input id="f-company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            {...a11y("consent")}
            type="checkbox"
            className="mt-0.5 size-5 shrink-0 accent-teal-700"
          />
          <span>
            Acepto el tratamiento de mis datos conforme al{" "}
            <a href="#aviso-privacidad" className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-900">
              aviso de privacidad
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="f-consent-error" className="text-sm text-red-700">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={submitting} aria-busy={submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Enviando…
            </>
          ) : (
            <>
              Enviar solicitud
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </>
          )}
        </Button>
        <p className="text-xs text-muted">
          <span aria-hidden className="text-teal-700">*</span> Campos obligatorios
        </p>
      </div>

      <div id="form-status" role="alert" aria-live="assertive" className="empty:hidden">
        {status === "error" && message && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200">
            {message}{" "}
            <span className="block pt-1 text-red-800/90">
              También puedes escribirnos a{" "}
              <a className="font-medium underline" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>{" "}
              o por{" "}
              <a className="font-medium underline" href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              .
            </span>
          </div>
        )}
      </div>
    </form>
  );
}
