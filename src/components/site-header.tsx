import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { GoogleG, GoogleStars } from "@/components/brand-marks";
import { BarberPole } from "@/components/barber-pole";
import { SHOP, getShopStatus } from "@/lib/shop";
import { useScrolledFromTop } from "@/lib/scroll-top";
import { LANG_NAME, LANG_SHORT, otherLangs, useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#featured", key: "navFeatured" },
  { href: "#about", key: "navAbout" },
  { href: "#barbers", key: "navBarbers" },
  { href: "#services", key: "navServices" },
  { href: "#foundation", key: "navFoundation" },
  { href: "#week", key: "navWeek" },
  { href: "#gallery", key: "navGallery" },
  { href: "#videos", key: "navCuts" },
  { href: "#reviews", key: "navReviews" },
  { href: "#visit", key: "navVisit" },
] as const;

function SpainFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 9 6" className={cn("shrink-0 rounded-[2px]", className)} aria-hidden>
      <rect width="9" height="6" fill="#c60b1e" />
      <rect y="1.5" width="9" height="3" fill="#ffc400" />
    </svg>
  );
}

function UsFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 19 10" className={cn("shrink-0 rounded-[2px]", className)} aria-hidden>
      <rect width="19" height="10" fill="#bf0a30" />
      <rect y="1.1" width="19" height="1.1" fill="#fff" />
      <rect y="3.3" width="19" height="1.1" fill="#fff" />
      <rect y="5.5" width="19" height="1.1" fill="#fff" />
      <rect y="7.7" width="19" height="1.1" fill="#fff" />
      <rect width="7.6" height="5.4" fill="#002868" />
    </svg>
  );
}

function BrazilFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={cn("shrink-0 rounded-[2px]", className)} aria-hidden>
      <rect width="20" height="14" fill="#009b3a" />
      <polygon points="10,1.4 18.6,7 10,12.6 1.4,7" fill="#fedf00" />
      <circle cx="10" cy="7" r="2.5" fill="#002776" />
    </svg>
  );
}

function LangFlag({ lang, className }: { lang: Lang; className?: string }) {
  if (lang === "es") return <SpainFlag className={className} />;
  if (lang === "pt") return <BrazilFlag className={className} />;
  return <UsFlag className={className} />;
}

function HexLangFlag({ lang }: { lang: Lang }) {
  const clip = `lang-hex-${lang}`;
  return (
    <svg viewBox="0 0 32 28" className="h-6 w-7 shrink-0" aria-hidden>
      <defs>
        <clipPath id={clip}>
          <polygon points="8,1.4 24,1.4 31.2,14 24,26.6 8,26.6 0.8,14" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        {lang === "es" ? (
          <>
            <rect width="32" height="28" fill="#c60b1e" />
            <rect y="7" width="32" height="14" fill="#ffc400" />
          </>
        ) : lang === "pt" ? (
          <>
            <rect width="32" height="28" fill="#009b3a" />
            <polygon points="16,2.2 29.4,14 16,25.8 2.6,14" fill="#fedf00" />
            <circle cx="16" cy="14" r="5.4" fill="#002776" />
            <path
              d="M11.2 14.7c1.6 1.2 3.9 1.8 4.8 1.8 1.6 0 3.6-.75 4.8-1.8"
              fill="none"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <rect width="32" height="28" fill="#bf0a30" />
            <rect y="3.1" width="32" height="3.1" fill="#fff" />
            <rect y="9.3" width="32" height="3.1" fill="#fff" />
            <rect y="15.5" width="32" height="3.1" fill="#fff" />
            <rect y="21.7" width="32" height="3.1" fill="#fff" />
            <rect width="13.5" height="14.2" fill="#002868" />
          </>
        )}
      </g>
      <polygon
        points="8,1.4 24,1.4 31.2,14 24,26.6 8,26.6 0.8,14"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LangCircles() {
  const { lang, setLang } = useI18n();
  const options = otherLangs(lang);
  return (
    <>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLang(option)}
          aria-label={LANG_NAME[option]}
          className="lang-flash inline-flex size-[3.75rem] shrink-0 flex-col items-center justify-center gap-0.5 rounded-full bg-signal text-ink hover:bg-[#ffd34d]"
        >
          <HexLangFlag lang={option} />
          <span className="text-[0.65rem] font-extrabold uppercase leading-none tracking-wide">
            {LANG_SHORT[option]}
          </span>
        </button>
      ))}
    </>
  );
}

export function LangChip({
  full = false,
  className,
}: {
  full?: boolean;
  className?: string;
}) {
  const { lang, setLang } = useI18n();
  const options = otherLangs(lang);
  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex h-12 shrink-0 overflow-hidden rounded-lg bg-signal text-ink shadow-sm sm:h-14 sm:rounded-xl",
        className,
      )}
    >
      {options.map((option, i) => (
        <button
          key={option}
          type="button"
          onClick={() => setLang(option)}
          className={cn(
            "inline-flex h-full shrink-0 items-center justify-center gap-1 px-2.5 hover:bg-[#ffd34d] sm:gap-2 sm:px-3",
            i === 0 && "border-r border-ink/25",
          )}
        >
          <LangFlag lang={option} className="h-4 w-[1.15rem] sm:h-5 sm:w-[1.6rem]" />
          <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wide sm:text-sm sm:tracking-[0.1em]">
            {full ? LANG_NAME[option] : LANG_SHORT[option]}
          </span>
        </button>
      ))}
    </div>
  );
}

export function BooksyFlash({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const { t } = useI18n();
  return (
    <a
      href={SHOP.booksyUrl}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={cn(
        "booksy-flash inline-flex h-11 w-auto shrink-0 flex-col items-center justify-center rounded-lg bg-[#edcc58] px-2.5 py-0.5 text-center text-ink hover:bg-[#f3d56a]",
        className,
      )}
    >
      <span className="text-[0.7rem] font-black uppercase leading-tight tracking-wide">
        {t.heroBook}
      </span>
      <span className="text-[0.5rem] font-bold uppercase leading-tight tracking-wide text-ink/80">
        {t.bookHint}
      </span>
    </a>
  );
}

function StatusTablet({ className }: { className?: string }) {
  const { t } = useI18n();
  const [status, setStatus] = useState(() => getShopStatus());

  useEffect(() => {
    const tick = () => setStatus(getShopStatus());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className={cn(
        "inline-flex h-11 min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-lg border-2 px-2 sm:gap-2 sm:px-3",
        status.open
          ? "border-signal bg-signal/25 text-paper"
          : "status-flash border-signal bg-signal text-ink",
        className,
      )}
      aria-live="polite"
    >
      <span
        className={cn(
          "size-2.5 shrink-0 rounded-full sm:size-3",
          status.open ? "status-dot bg-signal" : "status-dot bg-ink",
        )}
      />
      <span className="text-[0.72rem] font-black uppercase tracking-wide sm:text-lg">
        {status.open ? t.open : t.closed}
      </span>
      <span className="text-[0.72rem] font-semibold tabular-nums sm:text-base">
        {status.open ? t.closesAt : t.opensAt} {status.time}
      </span>
    </span>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const collapsed = useScrolledFromTop();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (collapsed) setOpen(false);
  }, [collapsed]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const menuBtn = (
    <button
      type="button"
      className={cn(
        "relative z-[92] col-start-2 row-start-1 inline-flex size-11 shrink-0 items-center justify-center rounded-md text-paper md:order-last md:size-14",
        collapsed && "hidden",
      )}
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      aria-controls="site-menu"
      aria-label={open ? t.closeMenu : t.openMenu}
    >
      {open ? <X className="size-6 md:size-8" /> : <Menu className="size-6 md:size-8" />}
    </button>
  );

  const menu = open ? (
    <div
      className="fixed inset-0 z-[80]"
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.openMenu}
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/50"
        aria-label={t.closeMenu}
        onClick={closeMenu}
      />
      <div className="absolute inset-x-0 top-[7.25rem] max-h-[min(85dvh,44rem)] overflow-y-auto border-b border-line bg-ink px-4 py-5 shadow-2xl md:top-24 md:px-6">
        <nav className="mx-auto flex max-w-6xl flex-col gap-1" aria-label="Menu">
          <a
            href="#top"
            onClick={closeMenu}
            className="flex min-h-12 items-center text-lg text-paper"
          >
            {t.navHome}
          </a>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={
                link.key === "navReviews"
                  ? "flex min-h-12 items-center gap-2.5 text-lg font-medium text-[#4285F4]"
                  : "flex min-h-12 items-center text-lg text-paper"
              }
            >
              {link.key === "navReviews" ? <GoogleG className="size-6 shrink-0" /> : null}
              {t[link.key]}
              {link.key === "navReviews" ? (
                <GoogleStars count={5} className="ml-1 flex gap-0.5" />
              ) : null}
            </a>
          ))}
        </nav>
        <div className="mx-auto mt-5 flex max-w-6xl flex-col gap-3">
          <LangChip full className="h-14 w-full" />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <header className="fixed inset-x-0 top-0 z-[90] overflow-visible border-b border-line bg-ink/95 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-ink"
      >
        {t.skip}
      </a>
      <div
        className={cn(
          "relative z-[91] mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1.5 px-3 py-2 md:flex md:h-24 md:gap-3 md:px-6 md:py-0",
          collapsed && "flex h-auto py-1.5 md:h-auto md:py-2",
        )}
      >
        <a
          href="#top"
          className={cn(
            "flex min-w-0 items-center gap-2 text-paper md:gap-2.5",
            collapsed && "hidden",
          )}
        >
          <BarberPole height={36} />
          <span className="leading-none">
            <span className="font-display block truncate text-[1.1rem] font-semibold uppercase tracking-[0.06em] sm:text-[1.5rem] sm:tracking-[0.08em]">
              Sharp Studios
            </span>
            <span className="block text-[0.62rem] uppercase tracking-[0.28em] text-cream/80 sm:text-[0.7rem]">
              Barbershop
            </span>
          </span>
        </a>
        {menuBtn}
        <div
          className={cn(
            "col-span-2 flex items-stretch gap-2 md:ml-auto md:items-center",
            collapsed && "w-full",
          )}
        >
          <LangChip full className={cn("hidden md:inline-flex", collapsed && "md:hidden")} />
          <BooksyFlash
            className={cn(
              "h-11 min-w-0 flex-1 md:h-14 md:w-auto md:max-w-[9.5rem] md:flex-none md:px-3",
              collapsed && "h-12 w-full max-w-none flex-none",
            )}
          />
          <StatusTablet
            className={cn(
              "min-w-0 flex-[1.35] md:h-14 md:min-w-[20rem] md:flex-none md:rounded-xl md:px-5",
              collapsed && "hidden",
            )}
          />
        </div>
      </div>
      {mounted ? createPortal(menu, document.body) : null}
    </header>
  );
}
