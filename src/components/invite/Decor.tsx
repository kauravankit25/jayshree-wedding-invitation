import wisteriaImg from "@/assets/wisteria.webp";
import floralCornerImg from "@/assets/floral-corner.webp";
import { cn } from "@/lib/utils";

const PETAL_TONES = ["text-lavender", "text-blush", "text-lilac", "text-lavender", "text-blush"];

/** Floating petals — deterministic positions so SSR and client markup match. */
export function Petals({ count = 12, className }: { count?: number; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {Array.from({ length: count }, (_, i) => {
        const size = 10 + ((i * 5) % 11);
        const style = {
          left: `${(i * 37 + 7) % 100}%`,
          width: size,
          height: size * 1.35,
          "--delay": `${-((i * 2.3) % 16)}s`,
          "--dur": `${13 + ((i * 3) % 9)}s`,
          "--drift": `${(i % 2 ? 1 : -1) * (24 + ((i * 13) % 50))}px`,
        } as React.CSSProperties;
        return (
          <svg key={i} viewBox="0 0 20 28" className={cn("petal", PETAL_TONES[i % PETAL_TONES.length])} style={style}>
            <path
              d="M10 0C16 6 20 14 16 22C14 26 6 26 4 22C0 14 4 6 10 0Z"
              fill="currentColor"
              opacity="0.85"
            />
            <path d="M10 3C9 10 9 17 10 24" stroke="var(--color-card)" strokeWidth="0.6" fill="none" opacity="0.6" />
          </svg>
        );
      })}
    </div>
  );
}

/** Subtle golden particles. */
export function GoldDust({ count = 16, className }: { count?: number; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {Array.from({ length: count }, (_, i) => {
        const size = 3 + (i % 4) * 1.5;
        const style = {
          left: `${(i * 53 + 11) % 100}%`,
          top: `${(i * 29 + 17) % 100}%`,
          width: size,
          height: size,
          "--delay": `${-((i * 1.3) % 8)}s`,
          "--dur": `${6 + (i % 5) * 1.4}s`,
        } as React.CSSProperties;
        return <span key={i} className="dust" style={style} />;
      })}
    </div>
  );
}

/** Hanging wisteria garland that gently sways from the top edge. */
export function Wisteria({ className, slow }: { className?: string; slow?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 top-0 flex justify-center", className)}>
      <img
        src={wisteriaImg}
        alt=""
        width={1400}
        height={700}
        className={cn(
          "fade-bottom w-[150%] max-w-none sm:h-[300px] sm:w-full sm:object-cover sm:object-top",
          slow ? "sway-slow" : "sway",
        )}
        decoding="async"
      />
    </div>
  );
}

export function FloralCorner({ side = "left", className }: { side?: "left" | "right"; className?: string }) {
  return (
    <img
      aria-hidden
      src={floralCornerImg}
      alt=""
      width={640}
      height={640}
      loading="lazy"
      decoding="async"
      className={cn(
        "pointer-events-none absolute bottom-0 w-40 sm:w-56",
        side === "left" ? "left-0 -translate-x-6" : "right-0 translate-x-6 -scale-x-100",
        className,
      )}
    />
  );
}

/** Thin gold ornamental divider with a central lotus-diamond motif. */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center justify-center gap-3 text-gold", className)}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold sm:w-24" />
      <svg viewBox="0 0 48 20" className="h-5 w-12">
        <path d="M24 2 L30 10 L24 18 L18 10 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M24 6 L27 10 L24 14 L21 10 Z" fill="currentColor" />
        <circle cx="10" cy="10" r="1.6" fill="currentColor" />
        <circle cx="38" cy="10" r="1.6" fill="currentColor" />
        <path d="M2 10 H7 M41 10 H46" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold sm:w-24" />
    </div>
  );
}

const ARCH = "M0 300V105C0 62 42 40 72 26C88 18 96 10 100 0C104 10 112 18 128 26C158 40 200 62 200 105V300";
const ARCH_INNER = "M8 300V108C8 68 48 47 76 33C90 26 97 19 100 11C103 19 110 26 124 33C152 47 192 68 192 108V300";

/** Double gold-hairline Mughal arch outline that stretches to its container. */
export function ArchOutline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 300"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-0 h-full w-full overflow-visible text-gold", className)}
    >
      <path d={ARCH} fill="none" stroke="currentColor" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      <path
        d={ARCH_INNER}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="2 3"
        vectorEffect="non-scaling-stroke"
        opacity="0.8"
      />
    </svg>
  );
}

/** Small kalash-like finial that crowns an arch. */
export function ArchFinial({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={cn("h-8 w-8 text-gold", className)}>
      <path d="M20 2 C22 8 26 10 26 16 C26 21 23 24 20 24 C17 24 14 21 14 16 C14 10 18 8 20 2Z" fill="currentColor" opacity="0.9" />
      <circle cx="20" cy="30" r="3" fill="currentColor" />
      <path d="M8 36 H32" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
