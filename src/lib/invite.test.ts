import { describe, expect, it } from "vitest";
import { buildInviteUrl, formatEventDate, sanitizeGuestName, whatsappShareUrl } from "./invite";
import { weddingEvents } from "@/data/wedding";

describe("guest name from the URL", () => {
  it("keeps a decoded name with spaces", () => {
    expect(sanitizeGuestName("Jayshree Patel")).toBe("Jayshree Patel");
  });
  it("treats an empty or missing guest as no name", () => {
    expect(sanitizeGuestName("   ")).toBeUndefined();
    expect(sanitizeGuestName(undefined)).toBeUndefined();
  });
});

describe("shareable links", () => {
  it("encodes the guest name in the ?guest= parameter", () => {
    expect(buildInviteUrl("https://example.com/anything", "Jayshree Patel")).toBe(
      "https://example.com/?guest=Jayshree%20Patel",
    );
  });
  it("round-trips Hindi and ampersands", () => {
    const url = new URL(buildInviteUrl("https://example.com", "शर्मा & Family"));
    expect(url.searchParams.get("guest")).toBe("शर्मा & Family");
  });
  it("builds a WhatsApp link with the encoded message", () => {
    expect(whatsappShareUrl("Hi & welcome")).toBe("https://wa.me/?text=Hi%20%26%20welcome");
  });
});

describe("event details", () => {
  const byId = (id: string) => {
    const ev = weddingEvents.find((e) => e.id === id);
    if (!ev) throw new Error(`missing ${id}`);
    return ev;
  };
  it("lists the five ceremonies in order", () => {
    expect(weddingEvents.map((e) => e.id)).toEqual(["tilak", "haldi-mehendi", "sangeet", "baraat", "reception"]);
  });
  it("has the given dates and venues", () => {
    expect(formatEventDate(byId("tilak").date).full).toBe("Monday, 30 November 2026");
    expect(byId("tilak").venue).toBe("Rajmahal, Kamti Road, Gadarwara");
    expect(formatEventDate(byId("haldi-mehendi").date).full).toBe("Saturday, 7 November 2026");
    expect(formatEventDate(byId("sangeet").date).full).toBe("Tuesday, 8 December 2026");
    expect(formatEventDate(byId("baraat").date).full).toBe("Wednesday, 9 December 2026");
    expect(byId("baraat").venue).toBe("Rajmahal, Kamti Road, Gadarwara");
    expect(formatEventDate(byId("reception").date).full).toBe("Sunday, 13 December 2026");
    expect(byId("reception").venue).toBe("Acharya Mahal, Gadarwara");
  });
});
