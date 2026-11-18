import { Check, Copy, MessageCircle, RotateCcw, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { buildInviteUrl, inviteShareMessage, sanitizeGuestName, whatsappShareUrl } from "@/lib/invite";
import { GoldDivider } from "./Decor";
import { Reveal } from "./Reveal";

const params = new URLSearchParams(
  typeof window !== "undefined" ? window.location.search : ""
);

const isShare = params.get("access") || "normal";

export function ShareSection({ guest, onReplay }: { guest?: string | undefined; onReplay: () => void }) {
  const [name, setName] = useState(guest ?? "");
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
    setCanShare(typeof navigator.share === "function");
  }, []);

  const cleanName = sanitizeGuestName(name);
  const link = origin ? buildInviteUrl(origin, cleanName) : "";
  const message = inviteShareMessage(link, cleanName);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Invitation link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please copy the link manually");
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: "Jayshree weds Ankit", text: message.replace(link, "").trim(), url: link });
    } catch {
      /* user dismissed the share sheet */
    }
  };

  return (
    isShare=="admin" &&
    <section id="share" className="relative scroll-mt-14 bg-dusk px-6 py-20 text-center">
      <div className="relative mx-auto max-w-md">
        <Reveal>
          <p className="font-caps text-xs uppercase tracking-[0.4em] text-gold-deep">Spread the joy</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-primary sm:text-4xl">Share a personal invitation</h2>
          <GoldDivider className="mt-5" />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 rounded-3xl border border-gold/40 bg-card/80 p-6 text-left shadow-soft">
            <label htmlFor="guest-name" className="font-caps text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Guest name
            </label>
            <input
              id="guest-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              placeholder="e.g. Sharma Family"
              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-display text-lg text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
            <p className="mt-3 break-all rounded-xl bg-muted px-4 py-3 font-display text-sm text-muted-foreground" aria-live="polite">
              {link || " "}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button asChild variant="royal" size="lg">
                <a href={whatsappShareUrl(message)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  Share on WhatsApp
                </a>
              </Button>
              <Button variant="pearl" size="lg" onClick={copy} disabled={!link}>
                {copied ? <Check /> : <Copy />}
                {copied ? "Copied" : "Copy link"}
              </Button>
              {canShare && (
                <Button variant="pearl" size="lg" onClick={nativeShare} className="sm:col-span-2">
                  <Share2 />
                  More sharing options
                </Button>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Button variant="link" className="mt-8 font-display text-base" onClick={onReplay}>
            <RotateCcw />
            Replay the invitation
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
