import { useEffect, useState } from "react";
import { istMidnight } from "@/lib/invite";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    Days: Math.floor(s / 86400),
    Hours: Math.floor((s % 86400) / 3600),
    Minutes: Math.floor((s % 3600) / 60),
    Seconds: s % 60,
  };
}

export function Countdown({ date }: { date: string }) {
  const target = istMidnight(date);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now !== null && now >= target) {
    return <p className="font-display text-xl italic text-primary">The celebrations have begun!</p>;
  }

  const p = now === null ? null : parts(target - now);
  return (
    <div className="flex justify-center gap-2 sm:gap-4" role="timer" aria-label="Countdown to the wedding day">
      {(["Days", "Hours", "Minutes", "Seconds"] as const).map((k) => (
        <div
          key={k}
          className="flex w-[4.4rem] flex-col items-center rounded-t-full border border-gold/50 bg-card/70 px-2 pb-2 pt-4 shadow-soft sm:w-20"
        >
          <span className="font-display text-3xl font-semibold tabular-nums text-primary">
            {p ? String(p[k]).padStart(2, "0") : "--"}
          </span>
          <span className="font-caps text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">{k}</span>
        </div>
      ))}
    </div>
  );
}
