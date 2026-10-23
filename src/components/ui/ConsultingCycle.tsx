"use client";

import { useEffect, useState } from "react";
import { Activity, ClipboardList, Eye, Settings2, type LucideIcon } from "lucide-react";
import { BrushRing } from "./BrushRing";
import { methodology } from "@/content/site";

const icons: LucideIcon[] = [ClipboardList, Settings2, Activity, Eye];
// Posición de cada etapa sobre la órbita: 12, 3, 6 y 9 en punto
const positions = [
  "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
  "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
];
const STEP_MS = 3500;
const ARC = 2 * Math.PI * 45;

/**
 * Ciclo de consultoría: las 4 etapas de la metodología orbitando el anillo de marca.
 * Avanza solo, se pausa con hover/foco y cada etapa se puede elegir con clic o teclado.
 */
export function ConsultingCycle() {
  const steps = methodology.steps;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % steps.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [paused, steps.length]);

  const step = steps[active];

  return (
    <div
      role="group"
      aria-label="Ciclo de consultoría Amplía"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="group/cycle relative aspect-square w-full"
    >
      <BrushRing id="cycle" animated strokeWidth={22} className="absolute -inset-[7%] h-[114%] w-[114%] opacity-90" />

      {/* Arco de progreso dorado: avanza un cuarto por etapa */}
      <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 -rotate-90">
        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-line)" strokeWidth="0.6" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray={ARC}
          strokeDashoffset={ARC * (1 - (active + 1) / steps.length)}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>

      {/* Centro: etapa activa */}
      <div className="absolute inset-[22%] flex flex-col items-center justify-center gap-1.5 rounded-full bg-white p-4 text-center shadow-lift ring-1 ring-line">
        <span className="font-display text-[0.6rem] font-bold tracking-[0.2em] text-gold-ink uppercase sm:text-[0.65rem]">
          Ciclo de consultoría
        </span>
        <span key={`n${active}`} className="animate-enter font-display text-4xl leading-none font-extrabold text-gold sm:text-5xl">
          {String(active + 1).padStart(2, "0")}
        </span>
        <span key={`t${active}`} className="animate-enter font-display text-base font-bold text-ink sm:text-lg">
          {step.title}
        </span>
        <span key={`d${active}`} className="animate-enter max-w-[13rem] text-xs leading-snug text-muted sm:text-sm">
          {step.short}
        </span>
      </div>

      {/* Órbita con las etapas: gira lento; cada nodo contra-gira para quedar derecho */}
      <ol className="animate-spin-slow absolute inset-[5%] group-hover/cycle:[animation-play-state:paused]">
        {steps.map((s, i) => {
          const Icon = icons[i];
          const isActive = i === active;
          return (
            <li key={s.title} className={`absolute ${positions[i]}`}>
              <div className="animate-spin-slow flex flex-col items-center gap-1 [animation-direction:reverse] group-hover/cycle:[animation-play-state:paused]">
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`Etapa ${i + 1}: ${s.title}`}
                  onClick={() => setActive(i)}
                  className={`inline-flex size-12 items-center justify-center rounded-full shadow-lift ring-1 transition-all duration-500 sm:size-14 ${
                    isActive
                      ? "scale-110 bg-gold text-green-950 ring-gold"
                      : "bg-white text-green-800 ring-line hover:bg-gold-soft"
                  }`}
                >
                  <Icon className="size-5 sm:size-6" strokeWidth={1.8} aria-hidden />
                </button>
                <span
                  aria-hidden
                  className={`rounded-full px-2 py-0.5 font-display text-[0.65rem] font-bold whitespace-nowrap transition-colors sm:text-xs ${
                    isActive ? "bg-green-800 text-gold-light" : "bg-white/90 text-ink-soft"
                  }`}
                >
                  {s.title}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
