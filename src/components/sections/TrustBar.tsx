import { trust } from "@/content/site";

export function TrustBar() {
  return (
    <div className="border-y border-line bg-white">
      <div className="container-page flex flex-col items-center gap-4 py-7 lg:flex-row lg:gap-10">
        <p className="shrink-0 font-display text-xs font-bold tracking-[0.2em] text-teal-700 uppercase">{trust.label}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
          {trust.items.map((item) => (
            <li key={item} className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft md:text-[0.95rem]">
              <span aria-hidden className="size-1.5 rounded-full bg-teal-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
