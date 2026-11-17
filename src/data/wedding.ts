import tilakImg from "@/assets/event-tilak.webp";
import haldiImg from "@/assets/event-haldi.webp";
import sangeetImg from "@/assets/event-sangeet.webp";
import baraatImg from "@/assets/event-baraat.webp";
import receptionImg from "@/assets/event-reception.webp";

export const couple = {
  bride: "Jayshree",
  groom: "Ankit",
  brideHi: "जयश्री",
  groomHi: "अंकित",
} as const;

export interface WeddingEvent {
  id: string;
  name: string;
  nameHi: string;
  /** ISO calendar date, YYYY-MM-DD (all-day; no times were provided). */
  date: string;
  venue?: string;
  blurb: string;
  image: string;
}

/** Single source of truth for every ceremony shown on the invitation. */
export const weddingEvents: WeddingEvent[] = [
  {
    id: "tilak",
    name: "Tilak Ceremony",
    nameHi: "तिलक",
    date: "2026-11-30",
    venue: "Rajmahal, Kamti Road, Gadarwara",
    blurb: "With the sacred tilak, two families begin a lifelong bond of love and respect.",
    image: tilakImg,
  },
  {
    id: "haldi-mehendi",
    name: "Haldi & Mehendi",
    nameHi: "हल्दी एवं मेहंदी",
    date: "2026-11-07",
    blurb: "A morning of turmeric, laughter and henna — colours of joy for the bride and groom.",
    image: haldiImg,
  },
  {
    id: "sangeet",
    name: "Sangeet",
    nameHi: "संगीत",
    date: "2026-12-08",
    blurb: "An evening of music, dance and celebration with our dearest ones.",
    image: sangeetImg,
  },
  {
    id: "baraat",
    name: "Baraat",
    nameHi: "बारात",
    date: "2026-12-09",
    venue: "Rajmahal, Kamti Road, Gadarwara",
    blurb: "The groom arrives in grandeur as the wedding procession dances its way to the mandap.",
    image: baraatImg,
  },
  {
    id: "reception",
    name: "Reception",
    nameHi: "स्वागत समारोह",
    date: "2026-12-13",
    venue: "Acharya Mahal, Gadarwara",
    blurb: "Join us to bless the newlyweds as they begin their journey together.",
    image: receptionImg,
  },
];

/** The wedding day the countdown points to. */
export const weddingDayId = "baraat";
