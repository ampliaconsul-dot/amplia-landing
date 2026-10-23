import Link from "next/link";
import { BrushRing } from "./BrushRing";

export function Logo({ id = "logo", light = false }: { id?: string; light?: boolean }) {
  return (
    <Link href="#inicio" className="group inline-flex items-center gap-2.5">
      <BrushRing
        id={id}
        strokeWidth={38}
        tone={light ? "light" : "deep"}
        className="size-9 transition-transform duration-500 group-hover:rotate-45"
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-extrabold tracking-[0.08em] ${light ? "text-white" : "text-ink"}`}>
          AMPLÍA
        </span>{" "}
        <span className={`font-display text-[0.6rem] font-semibold tracking-[0.3em] ${light ? "text-gold-light" : "text-gold-ink"}`}>
          CONSULTORÍA
        </span>
      </span>
    </Link>
  );
}
