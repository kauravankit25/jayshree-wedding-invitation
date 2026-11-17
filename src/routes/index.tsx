import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BlessingSection } from "@/components/invite/BlessingSection";
import { ClosingSection } from "@/components/invite/ClosingSection";
import { EventNav, type NavItem } from "@/components/invite/EventNav";
import { EventSection } from "@/components/invite/EventSection";
import { FloatingControls } from "@/components/invite/FloatingControls";
import { OpeningScreen } from "@/components/invite/OpeningScreen";
import { ShareSection } from "@/components/invite/ShareSection";
import { useAmbientMusic } from "@/components/invite/useAmbientMusic";
import { weddingEvents } from "@/data/wedding";
import { sanitizeGuestName } from "@/lib/invite";

const TITLE = "Jayshree Weds Ankit · Wedding Invitation";
const DESCRIPTION =
  "You are warmly invited to the wedding celebrations of Jayshree & Ankit — Tilak, Haldi & Mehendi, Sangeet, Baraat and Reception in Gadarwara, 2026.";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { guest?: string | undefined } => ({
    guest: sanitizeGuestName(search["guest"]),
  }),
  head: ({ match }) => {
    const guest = sanitizeGuestName((match.search as Record<string, unknown> | undefined)?.["guest"]);
    const ogTitle = guest ? `Dear ${guest}, you're invited · Jayshree Weds Ankit` : TITLE;
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: ogTitle },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: ogTitle },
        { name: "twitter:description", content: DESCRIPTION },
      ],
    };
  },
  component: Invitation,
});

const NAV: NavItem[] = [
  { id: "welcome", label: "Welcome" },
  ...weddingEvents.map((e) => ({ id: e.id, label: e.name.replace(" Ceremony", "") })),
  { id: "share", label: "Share" },
  { id: "thanks", label: "Thank You" },
];

function Invitation() {
  const { guest } = Route.useSearch();
  const [opened, setOpened] = useState(false);
  const music = useAmbientMusic();

  useEffect(() => {
    document.documentElement.style.overflow = opened ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [opened]);

  const open = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setOpened(true);
    void music.play();
  }, [music]);

  const replay = useCallback(() => {
    setOpened(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const navigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const events = useMemo(
    () =>
      weddingEvents.map((event, i) => {
        const nextEvent = weddingEvents[i + 1];
        return {
          event,
          next: nextEvent
            ? { id: nextEvent.id, label: nextEvent.name.replace(" Ceremony", "") }
            : { id: "share", label: "Share the invitation" },
        };
      }),
    [],
  );

  return (
    <>
      <AnimatePresence>{!opened && <OpeningScreen key="opening" guest={guest} onOpen={open} />}</AnimatePresence>

      <main aria-hidden={!opened} inert={!opened ? true : undefined}>
        <EventNav items={NAV} onNavigate={navigate} />
        <BlessingSection guest={guest} />
        {events.map(({ event, next }, i) => (
          <EventSection key={event.id} event={event} index={i} next={next} onNavigate={navigate} />
        ))}
        <ShareSection guest={guest} onReplay={replay} />
        <ClosingSection guest={guest} onReplay={replay} />
      </main>

      {opened && (
        <FloatingControls
          playing={music.playing}
          onToggleMusic={music.toggle}
          onReplay={replay}
          onShare={() => navigate("share")}
        />
      )}
    </>
  );
}
