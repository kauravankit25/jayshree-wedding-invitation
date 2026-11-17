import { motion } from "framer-motion";
import { Music, RotateCcw, Share2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingControls({
  playing,
  onToggleMusic,
  onReplay,
  onShare,
}: {
  playing: boolean;
  onToggleMusic: () => void;
  onReplay: () => void;
  onShare: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col gap-2.5"
    >
      <Button variant="orb" size="orb" className="hidden sm:inline-flex" onClick={onShare} aria-label="Share invitation" title="Share invitation">
        <Share2 />
      </Button>
      <Button variant="orb" size="orb" onClick={onReplay} aria-label="Replay invitation" title="Replay invitation">
        <RotateCcw />
      </Button>
      <Button
        variant="orb"
        size="orb"
        onClick={onToggleMusic}
        aria-pressed={playing}
        aria-label={playing ? "Mute music" : "Play music"}
        title={playing ? "Mute music" : "Play music"}
        className={playing ? "shadow-glow" : undefined}
      >
        {playing ? <Music className="animate-pulse" /> : <VolumeX />}
      </Button>
    </motion.div>
  );
}
