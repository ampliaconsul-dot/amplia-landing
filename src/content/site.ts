/**
 * Contenido editable de la landing.
 * Todo el texto y los datos de contacto viven aquí para poder actualizarlos
 * sin tocar los componentes.
 *
 * ⚠️ PENDIENTE: los valores marcados con `TODO` son marcadores de posición.
 * Reemplázalos con los datos reales antes de publicar.
 */

export const site = {
  name: "Amplía Consultoría",
  shortName: "Amplía",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://amplia-landing.vercel.app",
  title: "Amplía Consultoría | Gestión pública municipal en Sonora",
  description:
    "Asesoría jurídica para Ayuntamientos de Sonora: entrega-recepción, Plan Municipal de Desarrollo, auditorías y transparencia. Agenda tu diagnóstico.",
  locale: "es_MX",
  region: "Sonora, México",
  leader: {
    name: "Lic. Fabiola Kitazawa Galaz",
    role: "Directora General",
  },
  contact: {
    // TODO: reemplazar con los datos reales
    email: "contacto@amplia-consultoria.mx",
    phone: "+52 662 000 0000",
    phoneHref: "tel:+526620000000",
    whatsappHref: "https://wa.me/526620000000",
    address: "Hermosillo, Sonora, México",
    hours: "Lunes a viernes, 9:00 a 18:00 h",
  },
} as const;

export const nav = [
  { label: "Servicios", href: "#servicios" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const hero = {
  eyebrow: "Consultoría para Ayuntamientos de Sonora",
  title: "Tu aliado confiable en la gestión pública",
  titleAccent: "gestión pública",
  subtitle:
    "Acompañamos a los Ayuntamientos de Sonora para cumplir el marco normativo, solventar auditorías y modernizar su administración con certeza jurídica.",
  primaryCta: { label: "Agenda un diagnóstico", href: "#contacto" },
  secondaryCta: { label: "Ver servicios", href: "#servicios" },
  highlights: ["Ética y legalidad", "Acompañamiento cercano", "Resultados medibles"],
};

export const trust = {
  label: "Especialistas en",
  items: [
    "Ayuntamientos de Sonora",
    "Entrega-recepción",
    "Auditorías y solventaciones",
    "Transparencia y PNT",
    "Marco normativo municipal",
  ],
};

export type ServiceIcon = "transition" | "plan" | "law" | "audit" | "transparency" | "shield";

export const services: {
  icon: ServiceIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: "transition",
    title: "Entrega-recepción",
    description:
      "Conducimos la transición de la administración pública municipal con orden, soporte documental y apego a la ley.",
  },
  {
    icon: "plan",
    title: "Plan Municipal de Desarrollo",
    description:
      "Diseñamos y actualizamos el PMD con diagnóstico, objetivos y metas alineados a la planeación estatal y nacional.",
  },
  {
    icon: "law",
    title: "Actualización normativa",
    description:
      "Revisamos y actualizamos reglamentos, manuales y lineamientos para que el municipio opere con normativa aplicable y vigente.",
  },
  {
    icon: "audit",
    title: "Atención a auditorías",
    description:
      "Damos seguimiento y solventamos observaciones de los órganos fiscalizadores, reduciendo riesgos y responsabilidades.",
  },
  {
    icon: "transparency",
    title: "Transparencia y PNT",
    description:
      "Elaboramos planes de trabajo y actualizamos la información de los sujetos obligados en la Plataforma Nacional de Transparencia.",
  },
  {
    icon: "shield",
    title: "Blindaje de actos de autoridad",
    description:
      "Diseñamos estrategias para la debida fundamentación y motivación de los actos de autoridad y su protección jurídica.",
  },
];

export const benefits = {
  title: "Lo que gana tu municipio",
  subtitle:
    "Más que asesoría: un aliado que convierte las obligaciones administrativas en procesos ordenados y verificables.",
  items: [
    {
      title: "Menos observaciones",
      description: "Prevención y solventación oportuna frente a los órganos de fiscalización.",
    },
    {
      title: "Cumplimiento normativo",
      description: "Reglamentos y procedimientos actualizados y aplicables a la realidad municipal.",
    },
    {
      title: "Procesos ordenados",
      description: "Responsabilidades claras y documentación lista para cada etapa administrativa.",
    },
    {
      title: "Confianza ciudadana",
      description: "Transparencia y rendición de cuentas que fortalecen la legitimidad del gobierno local.",
    },
  ],
};

export const methodology = {
  title: "Nuestra metodología de trabajo",
  subtitle:
    "Un proceso claro en cuatro etapas, desde el diagnóstico hasta la rendición de cuentas.",
  steps: [
    {
      title: "Planeación",
      description:
        "Diagnóstico, diseño de estrategias y definición de metas de cumplimiento vinculadas con la transparencia y la normatividad.",
    },
    {
      title: "Implementación",
      description:
        "Ejecución técnica de los procedimientos y acompañamiento directo, atendiendo las responsabilidades administrativas y legales.",
    },
    {
      title: "Seguimiento",
      description:
        "Evaluación, observación y mejora continua de los procesos de entrega-recepción, auditorías y rendición de cuentas.",
    },
    {
      title: "Transparencia",
      description:
        "Publicación y actualización de la información para que el municipio rinda cuentas con certeza ante la ciudadanía.",
    },
  ],
};

export const about = {
  eyebrow: "Quiénes somos",
  title: "Un equipo especializado en el fortalecimiento de la gestión pública municipal.",
  body:
    "Somos un equipo de profesionales enfocado en el acompañamiento de los gobiernos municipales, así como en la actualización de la información de los sujetos obligados en materia de transparencia y rendición de cuentas. Trabajamos en lo organizacional para lograr una modernización administrativa real.",
  mission:
    "Brindar asesoría jurídica especializada, ética y eficiente a los Ayuntamientos del Estado de Sonora para fortalecer sus capacidades institucionales, garantizar el cumplimiento del marco normativo y promover una gestión pública ordenada y sustentada en la legalidad.",
  vision:
    "Consolidarnos como la consultoría jurídica de referencia en Sonora por nuestro compromiso con la mejora continua y el servicio público, contribuyendo a la democracia y al desarrollo sostenible de los gobiernos locales.",
  leaderQuote:
    "Nuestro compromiso es ser un aliado confiable para los Ayuntamientos en cada uno de sus procesos.",
};

export const difference = {
  title: "Nuestra diferencia",
  subtitle: "Valores que se traducen en compromisos concretos con cada administración.",
  items: [
    {
      title: "Ética y legalidad",
      description: "Cada recomendación está fundamentada en el marco jurídico vigente.",
    },
    {
      title: "Excelencia técnica",
      description: "Calidad profesional y rigor en cada documento, proceso y entregable.",
    },
    {
      title: "Acompañamiento cercano",
      description: "Trabajo en equipo, empatía y adaptación a la realidad de cada municipio.",
    },
    {
      title: "Compromiso social",
      description: "Transparencia como principio para fortalecer la confianza ciudadana.",
    },
    {
      title: "Confiabilidad",
      description: "Responsabilidad en los resultados y crecimiento sostenido de la gestión.",
    },
    {
      title: "Enfoque preventivo",
      description: "Promovemos prácticas responsables antes de que surjan observaciones.",
    },
  ],
};

export const ctaBand = {
  title: "¿Tu municipio está listo para su próxima auditoría?",
  subtitle:
    "Agenda un diagnóstico sin costo y recibe una ruta clara de cumplimiento para tu administración.",
  cta: { label: "Agendar diagnóstico gratuito", href: "#contacto" },
};

export const contactSection = {
  eyebrow: "Contacto",
  title: "Hablemos de tu administración",
  subtitle:
    "Cuéntanos qué necesita tu Ayuntamiento. Te responderemos en un máximo de un día hábil.",
};
