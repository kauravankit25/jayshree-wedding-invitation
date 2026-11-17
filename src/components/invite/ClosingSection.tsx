import { Heart, RotateCcw } from "lucide-react";
import coupleClosing from "@/assets/couple-closing.webp";
import { Button } from "@/components/ui/button";
import { couple } from "@/data/wedding";
import { ArchFinial, ArchOutline, FloralCorner, GoldDivider, GoldDust, Petals } from "./Decor";
import { Reveal } from "./Reveal";

export function ClosingSection({ guest, onReplay }: { guest?: string | undefined; onReplay: () => void }) {
  return (
    <section id="thanks" className="relative scroll-mt-14 overflow-hidden bg-pearl px-6 pb-36 pt-20 text-center">
      <GoldDust count={12} />
      <Petals count={8} />
      <FloralCorner side="left" className="opacity-80" />
      <FloralCorner side="right" className="opacity-80" />

      <div className="relative mx-auto max-w-md">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-64 sm:w-72">
            <img
              src={coupleClosing}
              alt="The bride and groom walking hand in hand towards a Mughal arch"
              width={900}
              height={1125}
              loading="lazy"
              decoding="async"
              className="mask-arch absolute inset-2.5 h-[calc(100%-1.25rem)] w-[calc(100%-1.25rem)] object-cover"
            />
            <ArchOutline />
            <ArchFinial className="absolute -top-7 left-1/2 -translate-x-1/2" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 font-script text-6xl leading-tight text-gold-gradient sm:text-7xl">
            {couple.bride} <span className="font-display text-3xl italic">&amp;</span> {couple.groom}
          </p>
          <GoldDivider className="mt-4" />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-sm text-xl leading-relaxed text-foreground">
            {guest ? `Dear ${guest}, thank you` : "Thank you"} for being part of our story. Your love, your
            blessings and your presence mean the world to us — we can't wait to celebrate with you.
          </p>
          <p className="mt-5 font-hindi text-lg text-secondary-foreground">
            आपकी गरिमामयी उपस्थिति ही हमारा सौभाग्य है।
          </p>
          <p className="mt-6 flex items-center justify-center gap-2 font-display text-lg italic text-primary">
            With love <Heart className="h-4 w-4 fill-blush text-blush" aria-hidden /> the families of {couple.bride} &amp;{" "}
            {couple.groom}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Button variant="royal" size="xl" className="mt-10" onClick={onReplay}>
            <RotateCcw />
            Replay Invitation
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
