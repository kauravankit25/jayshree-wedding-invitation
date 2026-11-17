const MAX_GUEST_LENGTH = 60;

/** Normalises the `guest` URL value (already URL-decoded by the router) into a display name. */
export function sanitizeGuestName(raw: unknown): string | undefined {
  if (typeof raw !== "string" && typeof raw !== "number") return undefined;
  const cleaned = String(raw)
    .replace(/\+/g, " ")
    .replace(/[\u0000-\u001f<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_GUEST_LENGTH)
    .trim();
  return cleaned.length > 0 ? cleaned : undefined;
}

/** Builds a shareable, properly encoded personalised invitation link. */
export function buildInviteUrl(base: string, guest?: string): string {
  const url = new URL("/", base);
  const name = sanitizeGuestName(guest);
  return name ? `${url.origin}/?guest=${encodeURIComponent(name)}` : `${url.origin}/`;
}

export function whatsappShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function inviteShareMessage(link: string, guest?: string): string {
  const name = sanitizeGuestName(guest);
  const greeting = name ? `Dear ${name},\n\n` : "";
  return `${greeting}With joy in our hearts, we invite you to celebrate the wedding of Jayshree & Ankit.\n\nOpen your invitation: ${link}`;
}

function parseIsoDate(iso: string): Date {
  const [y = 1970, m = 1, d = 1] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function formatEventDate(iso: string): { weekday: string; day: string; month: string; year: string; full: string } {
  const date = parseIsoDate(iso);
  const opts = { timeZone: "UTC" } as const;
  const weekday = date.toLocaleDateString("en-GB", { ...opts, weekday: "long" });
  const day = date.toLocaleDateString("en-GB", { ...opts, day: "numeric" });
  const month = date.toLocaleDateString("en-GB", { ...opts, month: "long" });
  const year = date.toLocaleDateString("en-GB", { ...opts, year: "numeric" });
  return { weekday, day, month, year, full: `${weekday}, ${day} ${month} ${year}` };
}

export function googleCalendarUrl(ev: { name: string; date: string; venue?: string }): string {
  const start = parseIsoDate(ev.date);
  const end = new Date(start.getTime() + 86_400_000);
  const fmt = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${ev.name} · Jayshree weds Ankit`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: "Wedding celebration of Jayshree & Ankit",
  });
  if (ev.venue) params.set("location", ev.venue);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function mapsUrl(venue: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;
}

/** Midnight IST on the given date, used for the countdown. */
export function istMidnight(iso: string): number {
  return parseIsoDate(iso).getTime() - (5 * 60 + 30) * 60_000;
}
