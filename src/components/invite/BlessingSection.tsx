import ganeshaImg from "@/assets/ganesha.webp";
import { couple, weddingDayId, weddingEvents } from "@/data/wedding";
import { formatEventDate } from "@/lib/invite";
import { Countdown } from "./Countdown";
import { GoldDivider, GoldDust, Wisteria } from "./Decor";
import { Reveal } from "./Reveal";

export function BlessingSection({ guest }: { guest?: string | undefined }) {
  const weddingDay = weddingEvents.find((e) => e.id === weddingDayId)!;
  return (
    <section id="welcome" className="relative scroll-mt-14 overflow-hidden bg-dusk px-6 pb-24 pt-36 text-center sm:pt-64">
      <Wisteria className="-top-24 opacity-90 sm:top-0" slow />
      <GoldDust count={10} />
      <div className="relative mx-auto max-w-xl">
        <Reveal>
          <p className="font-hindi text-2xl text-gold-deep sm:text-3xl">॥ श्री गणेशाय नमः ॥</p>
        </Reveal>
        <Reveal delay={0.15}>
          <img
            src={ganeshaImg}
            alt="Illustration of Lord Ganesha seated on a lotus"
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
            className="breathe mx-auto mt-4 w-44 sm:w-56"
          />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-4 max-w-sm font-hindi text-base leading-relaxed text-secondary-foreground">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
            <br />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </p>
          <GoldDivider className="mt-6" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 font-script text-4xl text-primary sm:text-5xl">
            {guest ? `Dear ${guest},` : "Dear Family & Friends,"}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-md text-xl leading-relaxed text-foreground">
            With the blessings of Lord Ganesha and our elders, we joyfully invite you to share in the
            celebrations as
          </p>
          <p className="mt-5 font-script text-6xl leading-tight text-gold-gradient sm:text-7xl">
            {couple.bride} <span className="font-display text-3xl italic">&amp;</span> {couple.groom}
          </p>
          <p className="mt-1 font-hindi text-xl text-secondary-foreground">
            {couple.brideHi} संग {couple.groomHi}
          </p>
          <p className="mx-auto mt-5 max-w-md text-xl leading-relaxed text-foreground">
            begin their journey of togetherness. Your presence and blessings would make our joy complete.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <p className="font-caps text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Until the Baraat · {formatEventDate(weddingDay.date).day} {formatEventDate(weddingDay.date).month}
          </p>
          <div className="mt-5">
            <Countdown date={weddingDay.date} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
