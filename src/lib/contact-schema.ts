import { z } from "zod";

/** Esquema compartido entre el formulario (cliente) y la API (servidor). */
export const contactSchema = z.object({
  name: z.string({ error: "Escribe tu nombre completo." }).trim().min(2, "Escribe tu nombre completo.").max(120, "Máximo 120 caracteres."),
  role: z.string().trim().max(120, "Máximo 120 caracteres.").optional().default(""),
  organization: z
    .string({ error: "Indica el municipio o institución." })
    .trim()
    .min(2, "Indica el municipio o institución.")
    .max(160, "Máximo 160 caracteres."),
  email: z.email("Escribe un correo válido.").max(160),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || /^[+()\d\s-]{7,30}$/.test(v), "Escribe un teléfono válido.")
    .optional()
    .default(""),
  message: z
    .string({ error: "Cuéntanos en qué podemos ayudarte." })
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(4000, "Máximo 4000 caracteres."),
  consent: z.literal(true, { error: "Debes aceptar el aviso de privacidad." }),
  // Honeypot anti-spam: debe llegar vacío.
  company_website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<ContactField, string>> };

export function flattenErrors(error: z.ZodError): Partial<Record<ContactField, string>> {
  const out: Partial<Record<ContactField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
