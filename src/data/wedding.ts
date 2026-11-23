import tilakImg from "@/assets/event-tilak.webp";
import haldiImg from "@/assets/event-haldi.webp";
import sangeetImg from "@/assets/event-sangeet.webp";
import baraatImg from "@/assets/event-baraat.webp";
import receptionImg from "@/assets/event-reception.webp";
const params = new URLSearchParams(
  typeof window !== "undefined" ? window.location.search : ""
);

const weddingId = params.get("side") || "groom";


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
  mapUrl: string;
  theme?: string;
}

/** Single source of truth for every ceremony shown on the invitation. */

const weddingEvents2: WeddingEvent[] = [
  {
    id: "tilak",
    name: "Tilak Ceremony",
    nameHi: "तिलक",
    date: "2026-11-30",
    venue: "Rajmahal, Kamti Road, Gadarwara",
    blurb: "With the sacred tilak, two families begin a lifelong bond of love and respect.",
    image: tilakImg,
    mapUrl: "https://maps.app.goo.gl/H9dR4uhDzAzze85A9",
  },
  {
    id: "haldi",
    name: "Haldi",
    nameHi: "हल्दी",
    date: "2026-12-06",
    blurb: "A morning of turmeric, laughter and henna — colours of joy for the bride and groom.",
    image: haldiImg,
    mapUrl: "",
    theme: "Yellow and Pink"
  },
  {
    id: "mehendi",
    name: "Mehendi",
    nameHi: "मेहंदी",
    date: "2026-12-07",
    blurb: "A morning of color, laughter and henna — colours of joy for the bride and groom.",
    image: haldiImg,
    mapUrl: "",
    theme: "Green and Purple"
  },
  {
    id: "sangeet",
    name: "Sangeet",
    nameHi: "संगीत",
    date: "2026-12-08",
    blurb: "An evening of music, dance and celebration with our dearest ones.",
    image: sangeetImg,
    mapUrl: "",
  },
  {
    id: "baraat",
    name: "Baraat",
    nameHi: "बारात",
    date: "2026-12-09",
    venue: "Rajmahal, Kamti Road, Gadarwara",
    blurb: "The groom arrives in grandeur as the wedding procession dances its way to the mandap.",
    image: baraatImg,
    mapUrl: "https://maps.app.goo.gl/H9dR4uhDzAzze85A9",
  },
  {
    id: "reception",
    name: "Reception",
    nameHi: "स्वागत समारोह",
    date: "2026-12-13",
    venue: "Acharya Mahal, Gadarwara",
    mapUrl: "https://maps.app.goo.gl/tYFFYyYYzaCtkxxf6",
    blurb: "Join us to bless the newlyweds as they begin their journey together.",
    image: receptionImg,
  },
]

const weddingEvents1: WeddingEvent[] = [ 
  {
    id: "haldi",
    name: "Haldii and Gauri Pujan",
    nameHi: "हल्दी",
    date: "2026-12-06",
    theme: "Sky Blue",
    blurb: "A morning of turmeric, laughter and joy — colours of joy for the bride and groom.",
    image: haldiImg,
    mapUrl: "",
  },
  
  {
    id: "sangeet",
    name: "Sangeet",
    nameHi: "संगीत",
    date: "2026-12-07",
    blurb: "An evening of music, dance and celebration with our dearest ones.",
    image: sangeetImg,
    mapUrl: "",
  },
  {
    id: "mehendi",
    name: "Mehendi",
    nameHi: "मेहंदी",
    date: "2026-12-08",
    theme: "Orange",
    blurb: "A morning of color, laughter and joy — colours of joy for the bride and groom.",
    image: haldiImg,
    mapUrl: "",
  },
  {
    id: "baraat",
    name: "Wedding Ceremony",
    nameHi: "बारात",
    date: "2026-12-09",
    venue: "Rajmahal, Kamti Road, Gadarwara",
    blurb: "The groom arrives in grandeur as the wedding procession dances its way to the mandap.",
    image: baraatImg,
    mapUrl: "https://maps.app.goo.gl/H9dR4uhDzAzze85A9",
  },
]

export const weddingEvents = weddingId=="bride" ? weddingEvents1 : weddingEvents2;

/** The wedding day the countdown points to. */
export const weddingDayId = "baraat";
