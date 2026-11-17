import { motion, useReducedMotion } from "framer-motion";
import { MailOpen } from "lucide-react";
import coupleHero from "@/assets/couple-hero.webp";
import { Button } from "@/components/ui/button";
import { couple } from "@/data/wedding";
import { ArchFinial, ArchOutline, FloralCorner, GoldDust, Petals, Wisteria } from "./Decor";

export function OpeningScreen({ guest, onOpen }: { guest?: string | undefined; onOpen: () => void }) {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation of Jayshree and Ankit"
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-pearl"
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08, filter: "blur(10px)" }}
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="absolute inset-0 texture-silk opacity-70" aria-hidden />
      <Wisteria className="-top-24 sm:top-0" />
      <GoldDust count={14} />
      <Petals count={10} />
      <FloralCorner side="left" className="w-28 opacity-90 sm:w-56" />
      <FloralCorner side="right" className="w-28 opacity-90 sm:w-56" />

      <div className="relative mx-auto flex h-full w-full max-w-md flex-col items-center px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[15svh] text-center sm:pt-[24svh]">
        <motion.div {...fade(0.2)} className="relative flex w-full flex-1 flex-col items-center">
          <div className="relative flex w-full flex-1 flex-col items-center px-5 pb-4 pt-14">
            <ArchOutline />
            <ArchFinial className="absolute -top-7 left-1/2 -translate-x-1/2" />

            <motion.p {...fade(0.5)} className="font-hindi text-4xl leading-tight text-gold-gradient sm:text-5xl">
              शुभ विवाह
            </motion.p>
            <motion.p
              {...fade(0.8)}
              className="mt-2 font-caps text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground"
            >
              Together with their families
            </motion.p>

            <motion.h1 {...fade(1.0)} className="mt-2 font-script text-primary">
              <span className="block text-5xl leading-[1.1] sm:text-6xl">{couple.bride}</span>
              <span className="block font-display text-lg italic text-gold-deep">weds</span>
              <span className="block text-5xl leading-[1.1] sm:text-6xl">{couple.groom}</span>
            </motion.h1>

            <motion.div {...fade(1.3)} className="relative mt-1 flex min-h-0 w-full flex-1 items-end justify-center">
              <img
                src={coupleHero}
                alt="Illustration of the bride in a lavender lehenga and the groom in an ivory sherwani"
                width={900}
                height={1125}
                fetchPriority="high"
                className="breathe h-full max-h-[34svh] w-auto object-contain drop-soft"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div {...fade(1.6)} className="relative z-10 mt-4 flex flex-col items-center gap-3">
          {guest && (
            <p className="font-display text-lg italic text-secondary-foreground">
              Dear <span className="font-semibold not-italic text-primary">{guest}</span>, you are invited
            </p>
          )}
          <Button variant="royal" size="xl" onClick={onOpen} autoFocus>
            <MailOpen />
            Open Wedding Invitation
          </Button>
          {/* <p className="font-caps text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
            With soft music
          </p> */}
        </motion.div>
      </div>
    </motion.div>
  );
}
