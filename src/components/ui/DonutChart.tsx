"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

const R = 40;
const C = 2 * Math.PI * R;

/** Dona animada: el arco se dibuja y la cifra cuenta hasta el porcentaje al entrar en pantalla. */
export function DonutChart({ percent, label }: { percent: number; label: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(percent);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1600, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(percent * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, percent]);

  return (
    <div ref={ref} role="img" aria-label={label} className="relative aspect-square w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
        {/* Otros (resto del círculo) */}
        <circle cx="50" cy="50" r={R} fill="none" stroke="var(--color-green-500)" strokeOpacity="0.45" strokeWidth="14" />
        {/* Amplía */}
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="14"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - shown / 100)}
        />
      </svg>
      <div aria-hidden className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-extrabold text-gold-light tabular-nums sm:text-5xl">
          {Math.round(shown)}%
        </span>
        <span className="text-xs font-medium text-white/80 sm:text-sm">de los municipios</span>
      </div>
    </div>
  );
}
