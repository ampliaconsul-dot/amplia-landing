"use client";

import { useEffect, useRef, useState } from "react";

/** true la primera vez que el elemento entra en pantalla (mismo patrón que Reveal). */
export function useInView<T extends Element>(rootMargin = "0px 0px -80px 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}
