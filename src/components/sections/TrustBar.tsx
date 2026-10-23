import { trust } from "@/content/site";

function Items({ copy = false }: { copy?: boolean }) {
  return (
    <ul
      aria-hidden={copy || undefined}
      className={`flex shrink-0 items-center gap-10 pr-10 ${copy ? "marquee-copy" : ""}`}
    >
      {trust.items.map((item) => (
        <li key={item} className="inline-flex items-center gap-2.5 text-sm font-medium whitespace-nowrap text-ink-soft md:text-[0.95rem]">
          <span aria-hidden className="size-1.5 rounded-full bg-green-500" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function TrustBar() {
  return (
    <div className="border-y border-line bg-white">
      <div className="container-page flex flex-col items-center gap-4 py-7 lg:flex-row lg:gap-10">
        <p className="shrink-0 font-display text-xs font-bold tracking-[0.2em] text-green-700 uppercase">{trust.label}</p>
        {/* Marquee infinito: la segunda lista es una copia visual oculta a lectores de pantalla */}
        <div className="marquee relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track animate-marquee flex w-max">
            <Items />
            <Items copy />
          </div>
        </div>
      </div>
    </div>
  );
}
