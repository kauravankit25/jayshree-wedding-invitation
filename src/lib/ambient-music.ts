/**
 * Gentle generative Indian-style instrumental (tanpura drone + santoor-like plucks
 * in raag Bhupali), synthesised with the Web Audio API so no audio file is needed.
 * Only ever started from a user gesture.
 */
const SA = 146.83; // D3
const BHUPALI = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3];

type Ctx = AudioContext;

export class AmbientMusic {
  private ctx: Ctx | null = null;
  private master: GainNode | null = null;
  private bus: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private stopTimer: ReturnType<typeof setTimeout> | null = null;
  private nextDrone = 0;
  private droneStep = 0;
  private nextNote = 0;
  private noteIndex = 7;

  private ensure(): Ctx | null {
    if (this.ctx) return this.ctx;
    const AC =
      typeof window !== "undefined"
        ? window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        : undefined;
    if (!AC) return null;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 3;
    master.connect(comp).connect(ctx.destination);

    const bus = ctx.createGain();
    bus.gain.value = 1;
    bus.connect(master);

    // Soft echo for a spacious, temple-hall feel.
    const delay = ctx.createDelay(1.5);
    delay.delayTime.value = 0.42;
    const fb = ctx.createGain();
    fb.gain.value = 0.38;
    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 1800;
    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    bus.connect(delay);
    delay.connect(tone).connect(fb).connect(delay);
    tone.connect(wet).connect(master);

    this.ctx = ctx;
    this.master = master;
    this.bus = bus;
    return ctx;
  }

  private pluck(freq: number, t: number, gain: number, decay: number, kind: "drone" | "santoor") {
    const ctx = this.ctx!;
    const out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, t);
    out.gain.exponentialRampToValueAtTime(gain, t + (kind === "drone" ? 0.06 : 0.008));
    out.gain.exponentialRampToValueAtTime(0.0001, t + decay);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = kind === "drone" ? 6 : 1;
    filter.frequency.setValueAtTime(kind === "drone" ? 2400 : 5200, t);
    filter.frequency.exponentialRampToValueAtTime(kind === "drone" ? 700 : 900, t + decay * 0.7);

    const a = ctx.createOscillator();
    a.type = kind === "drone" ? "sawtooth" : "triangle";
    a.frequency.value = freq;
    const b = ctx.createOscillator();
    b.type = "sine";
    b.frequency.value = freq * 2.003;
    const bGain = ctx.createGain();
    bGain.gain.value = kind === "drone" ? 0.2 : 0.35;

    a.connect(filter);
    b.connect(bGain).connect(filter);
    filter.connect(out).connect(this.bus!);
    a.start(t);
    b.start(t);
    a.stop(t + decay + 0.05);
    b.stop(t + decay + 0.05);
  }

  private schedule = () => {
    const ctx = this.ctx;
    if (!ctx) return;
    const horizon = ctx.currentTime + 0.5;

    // Tanpura cycle: Pa · Sa' · Sa' · Sa
    const drone = [SA * 0.75, SA, SA, SA * 0.5];
    while (this.nextDrone < horizon) {
      const f = drone[this.droneStep % 4] ?? SA;
      this.pluck(f, this.nextDrone, 0.05, 3.6, "drone");
      this.droneStep += 1;
      this.nextDrone += this.droneStep % 4 === 0 ? 1.6 : 1.05;
    }

    while (this.nextNote < horizon) {
      const r = Math.random();
      if (r < 0.18) {
        this.nextNote += 1.2 + Math.random() * 1.4; // breathing space
        continue;
      }
      const step = Math.random() < 0.5 ? -1 : 1;
      this.noteIndex = Math.min(14, Math.max(3, this.noteIndex + step * (Math.random() < 0.2 ? 2 : 1)));
      const octave = Math.floor(this.noteIndex / 5);
      const freq = SA * (BHUPALI[this.noteIndex % 5] ?? 1) * 2 ** octave;
      this.pluck(freq, this.nextNote, 0.075, 2.4, "santoor");
      if (Math.random() < 0.2) {
        this.pluck(freq, this.nextNote + 0.11, 0.04, 1.6, "santoor");
      }
      this.nextNote += [0.5, 0.75, 0.75, 1, 1.5][Math.floor(Math.random() * 5)] ?? 0.75;
    }
  };

  async start() {
    const ctx = this.ensure();
    if (!ctx || !this.master) return false;
    if (this.stopTimer) {
      clearTimeout(this.stopTimer);
      this.stopTimer = null;
    }
    await ctx.resume();
    const now = ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0.55, now + 2.5);
    if (!this.timer) {
      this.nextDrone = now + 0.1;
      this.nextNote = now + 1.4;
      this.timer = setInterval(this.schedule, 120);
    }
    return true;
  }

  stop() {
    const ctx = this.ctx;
    if (!ctx || !this.master) return;
    const now = ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.6);
    this.stopTimer = setTimeout(() => {
      if (this.timer) clearInterval(this.timer);
      this.timer = null;
      void ctx.suspend();
    }, 700);
  }

  dispose() {
    if (this.timer) clearInterval(this.timer);
    if (this.stopTimer) clearTimeout(this.stopTimer);
    void this.ctx?.close();
    this.ctx = null;
  }
}
