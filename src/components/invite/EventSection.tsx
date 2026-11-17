import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarPlus, ChevronDown, MapPin } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import type { WeddingEvent } from "@/data/wedding";
import { formatEventDate, googleCalendarUrl, mapsUrl } from "@/lib/invite";
import { cn } from "@/lib/utils";
import { ArchFinial, ArchOutline, GoldDivider, Petals } from "./Decor";
import { Reveal } from "./Reveal";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

export function EventSection({
  event,
  index,
  next,
  onNavigate,
}: {
  event: WeddingEvent;
  index: number;
  next?: { id: string; label: string };
  onNavigate: (id: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const date = formatEventDate(event.date);
  const tinted = index % 2 === 1;

  return (
    <section
      id={event.id}
      ref={ref}
      aria-labelledby={`${event.id}-title`}
      className={cn(
        "relative scroll-mt-14 overflow-hidden px-6 py-20 sm:py-28",
        tinted ? "bg-pearl" : "bg-background",
      )}
    >
      <div className="absolute inset-0 texture-silk opacity-40" aria-hidden />
      {index % 2 === 0 && <Petals count={5} />}

      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <p className="font-caps text-xs uppercase tracking-[0.4em] text-gold-deep">Ceremony {ROMAN[index]}</p>
          <p className="mt-3 font-hindi text-4xl leading-snug text-gold-gradient sm:text-5xl">{event.nameHi}</p>
          <h2 id={`${event.id}-title`} className="mt-1 font-display text-3xl font-medium tracking-wide text-primary sm:text-4xl">
            {event.name}
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto mt-10 w-full">
          <div className="relative isolate px-6 pb-10 pt-14">
            <div aria-hidden className="absolute inset-0 -z-10 mask-arch bg-card/85" />
            <ArchOutline />
            <ArchFinial className="absolute -top-6 left-1/2 -translate-x-1/2" />

            <motion.img
              style={{ y: imgY }}
              src={event.image}
              alt={`Illustration for the ${event.name}`}
              width={560}
              height={560}
              loading="lazy"
              decoding="async"
              className="mx-auto w-52 sm:w-60"
            />

            <div className="mt-4 flex items-stretch justify-center gap-4">
              <div className="flex flex-col justify-center text-right">
                <span className="font-caps text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {date.weekday}
                </span>
              </div>
              <div className="flex flex-col items-center border-x border-gold/60 px-5">
                <span className="font-display text-6xl font-semibold leading-none text-primary">{date.day}</span>
              </div>
              <div className="flex flex-col justify-center text-left">
                <span className="font-display text-xl leading-tight text-foreground">{date.month}</span>
                <span className="font-caps text-xs tracking-[0.25em] text-muted-foreground">{date.year}</span>
              </div>
            </div>

            <GoldDivider className="mt-6" />

            <p className="mt-5 text-lg italic leading-relaxed text-secondary-foreground">{event.blurb}</p>

            {event.venue && (
              <p className="mt-5 flex items-start justify-center gap-2 text-lg text-foreground">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-deep" aria-hidden />
                <span>{event.venue}</span>
              </p>
            )}

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {event.venue && (
                <Button asChild variant="pearl" size="lg">
                  <a href={mapsUrl(event.venue)} target="_blank" rel="noopener noreferrer">
                    <MapPin />
                    Directions
                  </a>
                </Button>
              )}
              <Button asChild variant="pearl" size="lg">
                <a href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer">
                  <CalendarPlus />
                  Save the date
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        {next && (
          <button
            type="button"
            onClick={() => onNavigate(next.id)}
            className="mx-auto mt-10 flex flex-col items-center gap-1 font-caps text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
          >
            Next · {next.label}
            <ChevronDown className="h-5 w-5 animate-bounce text-gold-deep" aria-hidden />
          </button>
        )}
      </div>
    </section>
  );
}
