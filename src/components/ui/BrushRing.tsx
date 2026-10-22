/**
 * Anillo de pincelada teal — el isotipo de Amplía, recreado en SVG
 * (ligero, escalable y sin depender de imágenes raster).
 */
export function BrushRing({
  id,
  className = "",
  strokeWidth = 26,
  tone = "deep",
}: {
  id: string;
  className?: string;
  strokeWidth?: number;
  tone?: "deep" | "light";
}) {
  const filterId = `brush-${id}`;
  const gradId = `brush-grad-${id}`;
  const stops =
    tone === "deep" ? ["#5cbfb1", "#1f7c75", "#0f3d3a"] : ["#ffffff", "#a8e0d6", "#3fa79b"];
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={stops[0]} />
          <stop offset="50%" stopColor={stops[1]} />
          <stop offset="100%" stopColor={stops[2]} />
        </linearGradient>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.9" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`} stroke={`url(#${gradId})`} strokeLinecap="round">
        <path
          d="M200 38c92 0 160 70 160 160 0 92-70 162-162 162-90 0-158-68-158-158 0-74 46-132 112-154"
          strokeWidth={strokeWidth}
          opacity="0.95"
        />
        <path
          d="M222 46c80 10 132 76 130 152-2 86-72 150-156 150-84 0-150-64-150-150 0-60 34-112 86-136"
          strokeWidth={strokeWidth * 0.4}
          opacity="0.6"
        />
        <path d="M176 30c-84 10-146 82-144 168" strokeWidth={strokeWidth * 0.2} opacity="0.5" />
      </g>
    </svg>
  );
}
