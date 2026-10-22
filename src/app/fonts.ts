import localFont from "next/font/local";

// Fuentes auto-alojadas (OFL) con precarga y fallback ajustado para evitar CLS.
export const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

export const montserrat = localFont({
  src: "../fonts/montserrat-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-montserrat",
});
