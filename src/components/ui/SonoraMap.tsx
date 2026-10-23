"use client";

import { useInView } from "./useInView";
import { SONORA_PATH, SONORA_PINS, SONORA_VIEWBOX } from "@/content/sonora-map";

/** Mapa de Sonora con relieve y pines que caen escalonados al entrar en pantalla (decorativo). */
export function SonoraMap() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} aria-hidden className={`sonora-map relative w-full ${inView ? "is-in" : ""}`}>
      <svg viewBox={SONORA_VIEWBOX} className="h-auto w-full overflow-visible">
        {/* Relieve: copia desplazada del contorno */}
        <path d={SONORA_PATH} fill="var(--color-green-950)" fillOpacity="0.55" transform="translate(1.6 2.6)" />
        <path d={SONORA_PATH} fill="#f4f2ec" stroke="var(--color-green-600)" strokeWidth="0.35" strokeLinejoin="round" />
        {SONORA_PINS.map(([x, y], i) => (
          <g key={i} className="map-pin" style={{ transitionDelay: `${0.3 + i * 0.06}s` }}>
            <ellipse cx={x} cy={y} rx="1.4" ry="0.5" fill="#000" fillOpacity="0.25" />
            <circle className="map-pin-pulse" cx={x} cy={y} r="2.6" fill="var(--color-gold)" style={{ animationDelay: `${(i % 6) * 0.4}s` }} />
            <line x1={x} y1={y} x2={x} y2={y - 5.2} stroke="var(--color-green-900)" strokeWidth="0.55" strokeLinecap="round" />
            <circle cx={x} cy={y - 6.2} r="1.9" fill="var(--color-gold)" stroke="var(--color-green-900)" strokeWidth="0.4" />
            <circle cx={x - 0.55} cy={y - 6.75} r="0.55" fill="#fff" fillOpacity="0.8" />
          </g>
        ))}
      </svg>
    </div>
  );
}
