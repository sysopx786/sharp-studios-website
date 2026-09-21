export const SHOP = {
  name: "Sharp Studios LLC",
  shortName: "Sharp Studios",
  phone: "(610) 816-8924",
  phoneTel: "+16108168924",
  sms: "(610) 816-8924",
  smsHref: "sms:+16108168924",
  address: "157 N 5th St",
  city: "Reading, PA 19601",
  mapsQuery: "157 N 5th St, Reading, PA 19601",
  mapsUrl:
    "https://www.google.com/maps/place/Sharp+Studios+LLC/@40.3383225,-75.9276184,17z/data=!4m6!3m5!1s0x89c677c15c1ab2b5:0x8d051fd62f3f07f7!8m2!3d40.3383225!4d-75.9276184",
  mapsEmbed:
    "https://maps.google.com/maps?q=157%20N%205th%20St%2C%20Reading%20PA%2019601&z=16&output=embed",
  rating: 5.0,
  reviewCount: 82,
  instagramHandle: "sharpstudiosbarbershop",
  instagramUrl: "https://www.instagram.com/sharpstudiosbarbershop/",
  booksyUrl: "https://booksy.com/en-us/43280_sharp-studios-barbershop_barber-shop_33164_reading",
  googleReviewsUrl:
    "https://www.google.com/maps/place/Sharp+Studios+LLC/@40.3383225,-75.9276184,17z/data=!4m8!3m7!1s0x89c677c15c1ab2b5:0x8d051fd62f3f07f7!8m2!3d40.3383225!4d-75.9276184!9m1!1b1",
  googleWriteReviewUrl:
    "https://www.google.com/search?q=Sharp+Studios+LLC%2C+157+N+5th+St%2C+Reading%2C+PA&ludocid=10161563139007514615#lrd=0x89c677c15c1ab2b5:0x8d051fd62f3f07f7,3,,,",
  ownerName: "Wilson Heredia",
} as const;

export const WEEK_HOURS = [
  { key: "sun", jsonLd: "Sunday", open: null, close: null },
  { key: "mon", jsonLd: "Monday", open: 10 * 60, close: 19 * 60 },
  { key: "tue", jsonLd: "Tuesday", open: null, close: null },
  { key: "wed", jsonLd: "Wednesday", open: 10 * 60, close: 19 * 60 },
  { key: "thu", jsonLd: "Thursday", open: 9 * 60, close: 20 * 60 },
  { key: "fri", jsonLd: "Friday", open: 9 * 60, close: 19 * 60 },
  { key: "sat", jsonLd: "Saturday", open: 8 * 60, close: 19 * 60 },
] as const;

export type WeekdayKey = (typeof WEEK_HOURS)[number]["key"];

export function minutesToClock(mins: number): string {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const suffix = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function minutesToClockCompact(mins: number): string {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const suffix = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 || 12;
  if (m === 0) return `${h12} ${suffix}`;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function minutesToJsonLd(mins: number): string {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export const HOUR_LABELS = WEEK_HOURS.map((day) =>
  day.open == null || day.close == null
    ? { closed: true as const, open: "", close: "" }
    : {
        closed: false as const,
        open: minutesToClock(day.open),
        close: minutesToClock(day.close),
      },
);

export function hoursByKey(key: WeekdayKey) {
  const day = WEEK_HOURS.find((row) => row.key === key);
  if (!day) throw new Error(`Unknown weekday ${key}`);
  if (day.open == null || day.close == null) {
    return { ...day, closed: true as const, openLabel: "", closeLabel: "" };
  }
  return {
    ...day,
    closed: false as const,
    openLabel: minutesToClock(day.open),
    closeLabel: minutesToClock(day.close),
  };
}

export function openingHoursJsonLd() {
  return WEEK_HOURS.flatMap((day) =>
    day.open == null || day.close == null
      ? []
      : [
          {
            "@type": "OpeningHoursSpecification" as const,
            dayOfWeek: day.jsonLd,
            opens: minutesToJsonLd(day.open),
            closes: minutesToJsonLd(day.close),
          },
        ],
  );
}

export const SERVICES = [
  { id: "premium", mins: 60, duration: "1h", price: "$52.00", sale: "$46.80", lowest: "$52.00" },
  { id: "combo", mins: 40, duration: "40min", price: "$42.00+", sale: "$37.80+", lowest: "$42.00" },
  { id: "mens", mins: 30, duration: "30min", price: "$37.00+", sale: "$33.30+", lowest: "$37.00" },
  { id: "kids", mins: 30, duration: "30min", price: "$32.00+", sale: "$28.80+", lowest: "$32.00" },
  { id: "lineup", mins: 15, duration: "15min", price: "$22.00", sale: "$19.80", lowest: "$22.00" },
  { id: "beard", mins: 15, duration: "15min", price: "$17.00", sale: "$15.30", lowest: "$17.00" },
  { id: "brows", mins: 10, duration: "10min", price: "$12.00", sale: "$10.80", lowest: "$12.00" },
] as const;

export type ServiceId = (typeof SERVICES)[number]["id"];

export const REVIEWS = [
  {
    name: "Victor Zaragoza",
    stars: 5,
    quoteEn:
      "Excellent barbershop. The staff is friendly, professional, and makes you feel welcome from the moment you walk in. Clean shop, great atmosphere, and they take their time so the cut is exactly how you want it. I’ll be back — and I’m sending family and friends.",
    quoteEs:
      "Excelente barbería. El personal es amable, profesional, y te hace sentir bienvenido desde que entras. Local limpio, gran ambiente, y se toman el tiempo para que el corte quede como lo pediste. Voy a volver — y voy a recomendarla.",
    quotePt:
      "Barbearia excelente. A equipe é simpática, profissional, e te recebe bem desde a porta. Loja limpa, ótimo clima, e eles têm paciência para acertar o corte. Vou voltar — e vou indicar.",
  },
  {
    name: "Maria Lopez",
    stars: 5,
    quoteEn:
      "If you’re looking for a barber who really knows what they’re doing, go to Wilson. Attention to detail, precision, and the vibe was top tier. He took his time, made sure everything was perfect, and the result exceeded my expectations. I’ll definitely be coming back.",
    quoteEs:
      "Si buscas un barbero que de verdad sabe lo que hace, ve con Wilson. Detalle, precisión, y el ambiente de otro nivel. Se tomó su tiempo, lo dejó perfecto, y el resultado superó lo que esperaba. Voy a volver.",
    quotePt:
      "Se você quer um barbeiro que realmente sabe o que faz, vai no Wilson. Detalhe, precisão, e a vibe no alto. Ele teve paciência, deixou tudo perfeito, e o resultado passou do que eu esperava. Vou voltar.",
  },
  {
    name: "Adalberto Figueroa",
    stars: 5,
    quoteEn:
      "Awesome service. Complete hair, face, and beard — hot towel, facial cleanse, and massage. Doesn’t get any better than that for the price. Treats every customer with respect and makes you comfortable while you wait.",
    quoteEs:
      "Servicio brutal. Pelo, cara y barba completos — toalla caliente, limpieza y masaje. Por el precio, no se consigue mejor. Trata a cada cliente con respeto y te hace sentir cómodo mientras esperas.",
    quotePt:
      "Atendimento demais. Cabelo, rosto e barba completos — toalha quente, limpeza e massagem. Pelo preço, não tem melhor. Trata todo mundo com respeito e deixa a espera leve.",
  },
  {
    name: "Lynn",
    stars: 5,
    quoteEn:
      "Come check out Wilson. Amazing skills. He’s been my barber for the past six years and finally got his own shop — 5th and Walnut, Reading PA.",
    quoteEs:
      "Vayan a ver a Wilson. Un oficio brutal. Lleva seis años cortándome, y por fin abrió su propia barbería — 5th y Walnut, Reading PA.",
    quotePt:
      "Vai ver o Wilson. Mão boa demais. É meu barbeiro há seis anos e finalmente abriu a loja dele — 5th e Walnut, Reading PA.",
  },
  {
    name: "Monse Reyes",
    stars: 5,
    quoteEn:
      "Excellent service, no appointments required, very professional and friendly staff. A pleasant experience. Best wishes to this new business owner — congratulations.",
    quoteEs:
      "Excelente servicio, no hace falta cita, personal profesional y amable. Una experiencia agradable. Éxito a este nuevo dueño — felicidades.",
    quotePt:
      "Atendimento excelente, sem hora marcada, equipe profissional e simpática. Experiência boa. Sucesso para o dono novo — parabéns.",
  },
  {
    name: "Michael Alvarez",
    stars: 5,
    quoteEn: "My son and I had a great experience. Great service and a friendly atmosphere. A great spot for anyone.",
    quoteEs: "Mi hijo y yo la pasamos muy bien. Buen servicio y ambiente amable. Un buen lugar para cualquiera.",
    quotePt: "Meu filho e eu curtimos. Bom atendimento e clima amigável. Serve para todo mundo.",
  },
  {
    name: "Malwin Estevez",
    stars: 5,
    quoteEn:
      "Awesome place, nice environment — my kid and I loved it. Charly was my barber and I fully recommend him. Great experience. We’ll be back.",
    quoteEs:
      "Lugar brutal, buen ambiente — a mi hijo y a mí nos encantó. Charly fue mi barbero y lo recomiendo. Gran experiencia. Volvemos.",
    quotePt:
      "Lugar demais, clima bom — meu filho e eu amamos. O Charly foi meu barbeiro e eu indico. Experiência ótima. Voltamos.",
  },
  {
    name: "Grace Rivera",
    stars: 5,
    quoteEn: "Wilson is the best barber. He’s been cutting my son’s hair for over eight years. I recommend this place.",
    quoteEs: "Wilson es el mejor barbero. Lleva más de ocho años cortándole a mi hijo. Recomiendo este lugar.",
    quotePt: "Wilson é o melhor barbeiro. Corta o cabelo do meu filho há mais de oito anos. Recomendo.",
  },
  {
    name: "Jose Ferrand",
    stars: 5,
    quoteEn: "Great job Alberto. Love the location and the atmosphere. 10/10.",
    quoteEs: "Gran trabajo, Alberto. Me encanta el local y el ambiente. 10/10.",
    quotePt: "Mandou bem, Alberto. Amei o lugar e o clima. 10/10.",
  },
  {
    name: "Leon McKenzie",
    stars: 5,
    quoteEn: "Alberto and Jose did an excellent job for me and my boys. Will definitely return.",
    quoteEs: "Alberto y Jose hicieron un trabajo excelente conmigo y mis muchachos. Sin duda volvemos.",
    quotePt: "Alberto e Jose mandaram bem comigo e com meus meninos. Com certeza voltamos.",
  },
  {
    name: "Jamel Edwards",
    stars: 5,
    quoteEn: "Sharp Studios is legit. Wilson The Barber will have the cut looking #Sharp.",
    quoteEs: "Sharp Studios es de verdad. Wilson The Barber te deja el corte #Sharp.",
    quotePt: "Sharp Studios é realmente boa. O Wilson The Barber te deixa #Sharp.",
  },
  {
    name: "Karolyne Reyes",
    stars: 5,
    quoteEn:
      "I definitely recommend this barbershop. Excellent customer service. From the moment you arrive they greet you with a coffee. Pleasant, organized atmosphere.",
    quoteEs:
      "Definitivamente recomiendo esta barbería. Excelente atención. Desde que llegas te reciben con un café. Ambiente agradable y muy organizado.",
    quotePt:
      "Recomendo demais. Atendimento excelente. Chegou, já tem café. Clima gostoso e organizado.",
  },
  {
    name: "G Uchiha",
    stars: 5,
    quoteEn: "Best barbershop in Reading. All the staff are respectful and it’s a kids-friendly environment. Thank you Alberto.",
    quoteEs: "La mejor barbería de Reading. Todo el personal es respetuoso y es un ambiente para niños. Gracias Alberto.",
    quotePt: "A melhor barbearia de Reading. Equipe respeitosa e ambiente bom para criança. Valeu, Alberto.",
  },
  {
    name: "Cory Rodriguez",
    stars: 5,
    quoteEn:
      "Will is amazing with kids — fast, professional, and always delivers. I especially appreciate how patient he is with my son, who is autistic.",
    quoteEs:
      "Will es increíble con los niños — rápido, profesional, y siempre entrega. Aprecio sobre todo la paciencia con mi hijo, que es autista.",
    quotePt:
      "O Will é incrível com criança — rápido, profissional, e sempre entrega. Agradeço a paciência com meu filho, que é autista.",
  },
  {
    name: "Bellas sweets",
    stars: 5,
    quoteEn: "Love the barbershop aura, professional barbers, and right in center city. Happy customer here.",
    quoteEs: "Me encanta el aura de barbería, barberos profesionales, y justo en el centro. Cliente feliz.",
    quotePt: "Amei o clima de barbearia, barbeiros profissionais, e bem no centro. Cliente feliz.",
  },
  {
    name: "Luis Manuel Almonte",
    stars: 5,
    quoteEn: "The best fades in the area. You can see the passion and technique in every snip.",
    quoteEs: "Los mejores fades del área. Se ve la pasión y la técnica en cada corte.",
    quotePt: "Os melhores fades da região. Dá para ver a paixão e a técnica em cada corte.",
  },
] as const;

export const RATING_BARS = [
  { stars: 5, pct: 100 },
  { stars: 4, pct: 0 },
  { stars: 3, pct: 0 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
] as const;

export const HIGHLIGHTS = [
  { src: "/images/gallery/from-chair-03.jpg", altEn: "A cut in the shop", altEs: "Un corte en el local", pos: "top" },
  { src: "/images/gallery/from-chair-04.jpg", altEn: "Braids and a lineup in the chair", altEs: "Trenzas y perfilado en la silla", pos: "top" },
  { src: "/images/shop-neon.jpg", altEn: "Fresh fade in the chair", altEs: "Fade fresco en la silla", pos: "top" },
  { src: "/images/google/g-33.jpg", altEn: "Lightning design fade", altEs: "Fade con diseño de rayo", pos: "top" },
  { src: "/images/google/g-00.jpg", altEn: "Skin fade and beard in the chair", altEs: "Skin fade y barba en la silla", pos: "top" },
  { src: "/images/google/g-41.jpg", altEn: "Mid fade and beard, side view", altEs: "Mid fade y barba de lado", pos: "top" },
  { src: "/images/google/g-01.jpg", altEn: "Kids’ fade", altEs: "Fade de niño", pos: "top" },
  { src: "/images/google/g-05.jpg", altEn: "Low fade and beard", altEs: "Low fade y barba", pos: "top" },
  { src: "/images/google/g-06.jpg", altEn: "Beard lineup", altEs: "Perfilado de barba", pos: "top" },
  { src: "/images/google/g-09.jpg", altEn: "Mid fade and beard", altEs: "Mid fade y barba", pos: "top" },
  { src: "/images/google/g-10.jpg", altEn: "Kids’ curls and lineup", altEs: "Rizos de niño y perfilado", pos: "top" },
  { src: "/images/google/g-13.jpg", altEn: "Taper fade in the shop", altEs: "Taper fade en el local", pos: "top" },
  { src: "/images/google/g-19.jpg", altEn: "Burst fade and beard", altEs: "Burst fade y barba", pos: "top" },
  { src: "/images/google/g-21.jpg", altEn: "Kids’ design cut", altEs: "Corte con diseño de niño", pos: "top" },
  { src: "/images/google/g-23.jpg", altEn: "Clean skin fade", altEs: "Skin fade limpio", pos: "top" },
  { src: "/images/google/g-35.jpg", altEn: "Drop fade and beard", altEs: "Drop fade y barba", pos: "top" },
  { src: "/images/google/g-03.jpg", altEn: "Shape-up and beard", altEs: "Shape-up y barba", pos: "top" },
  { src: "/images/google/g-11.jpg", altEn: "Precision lineup", altEs: "Perfilado preciso", pos: "top" },
  { src: "/images/google/g-61.jpg", altEn: "Fresh fade, front view", altEs: "Fade fresco de frente", pos: "top" },
  { src: "/images/google/g-07.jpg", altEn: "Classic fade", altEs: "Fade clásico", pos: "top" },
] as const;

export type GalleryPhoto = {
  src: string;
  altEn: string;
  altEs: string;
  wide: boolean;
  pos: string;
};

export const GALLERY: readonly GalleryPhoto[] = [];

export const PHOTOS = [...HIGHLIGHTS, ...GALLERY];

export const HERO_VIDEO = {
  src: "/videos/hero-crew.mp4",
  poster: "/images/hero-crew.jpg",
} as const;

export const FEATURED_VIDEO = {
  src: "/videos/featured-design.mp4",
  poster: "/images/featured-poster.jpg",
} as const;

export const VIDEOS = [
  {
    id: "reel-entrance",
    src: "/videos/reel-entrance.mp4",
    poster: "/images/reels/reel-entrance.jpg",
    titleEn: "Walk through the door",
    titleEs: "Entra al local",
    titlePt: "Entra na loja",
    group: "vibe",
  },
  {
    id: "reel-walkin",
    src: "/videos/reel-walkin.mp4",
    poster: "/images/reels/reel-walkin.jpg",
    titleEn: "On 5th Street",
    titleEs: "En la 5th",
    titlePt: "Na 5th",
    group: "vibe",
  },
  {
    id: "reel-shop",
    src: "/videos/reel-shop.mp4",
    poster: "/images/reels/reel-shop.jpg",
    titleEn: "On the floor",
    titleEs: "En el piso",
    titlePt: "No salão",
    group: "vibe",
  },
  {
    id: "reel-transform",
    src: "/videos/reel-transform.mp4",
    poster: "/images/reels/reel-transform.jpg",
    titleEn: "Before / after",
    titleEs: "Antes / después",
    titlePt: "Antes / depois",
    group: "work",
  },
  {
    id: "reel-design",
    src: "/videos/reel-design.mp4",
    poster: "/images/reels/reel-design.jpg",
    titleEn: "The design",
    titleEs: "El diseño",
    titlePt: "O desenho",
    group: "work",
  },
  {
    id: "reel-scissors",
    src: "/videos/featured-design.mp4",
    poster: "/images/reels/reel-scissors.jpg",
    titleEn: "The scissors",
    titleEs: "Las tijeras",
    titlePt: "As tesouras",
    group: "work",
  },
  {
    id: "reel-fade",
    src: "/videos/reel-fade.mp4",
    poster: "/images/reels/reel-fade.jpg",
    titleEn: "The fade",
    titleEs: "El fade",
    titlePt: "O fade",
    group: "work",
  },
  {
    id: "reel-handshake",
    src: "/videos/reel-handshake.mp4",
    poster: "/images/reels/reel-handshake.jpg",
    titleEn: "The finish",
    titleEs: "El cierre",
    titlePt: "O acabamento",
    group: "work",
  },
  {
    id: "reel-lineup",
    src: "/videos/reel-lineup.mp4",
    poster: "/images/reels/reel-lineup.jpg",
    titleEn: "The lineup",
    titleEs: "El perfilado",
    titlePt: "O pezinho",
    group: "work",
  },
  {
    id: "reel-curls",
    src: "/videos/reel-curls.mp4",
    poster: "/images/reels/reel-curls.jpg",
    titleEn: "Curls",
    titleEs: "Rizos",
    titlePt: "Cachos",
    group: "work",
  },
  {
    id: "reel-mullet",
    src: "/videos/reel-mullet.mp4",
    poster: "/images/reels/reel-mullet.jpg",
    titleEn: "The mullet",
    titleEs: "El mullet",
    titlePt: "O mullet",
    group: "work",
  },
  {
    id: "reel-taper",
    src: "/videos/reel-taper.mp4",
    poster: "/images/reels/reel-taper.jpg",
    titleEn: "By the window",
    titleEs: "En la ventana",
    titlePt: "Na janela",
    group: "work",
  },
  {
    id: "reel-beard",
    src: "/videos/reel-beard.mp4",
    poster: "/images/reels/reel-beard.jpg",
    titleEn: "Beard + line",
    titleEs: "Barba y línea",
    titlePt: "Barba e linha",
    group: "work",
  },
  {
    id: "reel-shave",
    src: "/videos/reel-shave.mp4",
    poster: "/images/reels/reel-shave.jpg",
    titleEn: "In the chair",
    titleEs: "En la silla",
    titlePt: "Na cadeira",
    group: "work",
  },
] as const;

const WEEKDAY_SHORT: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function getReadingNow() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
      hour12: false,
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  );
  const day = WEEKDAY_SHORT[parts.weekday ?? "Sun"] ?? 0;
  const hour = Number(parts.hour);
  const minute = Number(parts.minute);
  return { day, minutes: hour * 60 + minute };
}

export function getShopStatus() {
  const { day, minutes } = getReadingNow();
  const hours = WEEK_HOURS[day];
  if (hours.open != null && hours.close != null && minutes >= hours.open && minutes < hours.close) {
    return { open: true as const, time: minutesToClockCompact(hours.close) };
  }
  if (hours.open != null && minutes < hours.open) {
    return { open: false as const, time: minutesToClockCompact(hours.open) };
  }
  for (let i = 1; i <= 7; i++) {
    const next = WEEK_HOURS[(day + i) % 7];
    if (next.open != null) {
      return { open: false as const, time: minutesToClockCompact(next.open) };
    }
  }
  return { open: false as const, time: "" };
}
