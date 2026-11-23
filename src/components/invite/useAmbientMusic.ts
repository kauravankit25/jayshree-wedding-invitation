
import { useCallback, useEffect, useRef, useState } from "react";

export function useAmbientMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("src/assets/india_happy-indian-wedding-490659.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";

    audioRef.current = audio;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
    } catch (error) {
      console.error("Unable to play wedding music:", error);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await play();
    } else {
      pause();
    }
  }, [play, pause]);

  return {
    playing,
    play,
    pause,
    toggle,
  };
}
