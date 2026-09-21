import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { GoogleG, GoogleStars } from "@/components/brand-marks";
import { LinkBooksy } from "@/components/link-booksy";
import { HERO_VIDEO, SHOP } from "@/lib/shop";
import { useI18n } from "@/lib/i18n";
import { asset } from "@/lib/utils";

export function HeroSection() {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  function toggleSound() {
    const el = videoRef.current;
    if (!el) return;
    const nextMuted = !el.muted;
    el.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) void el.play().catch(() => {});
  }

  return (
    <section className="bg-ink pt-[7.5rem] text-paper md:pt-32">
      <h1 className="sr-only">
        {t.heroTitle} {t.heroSub}
      </h1>
      <div className="mx-auto max-w-2xl px-4 sm:max-w-3xl sm:px-6">
        {reduceMotion ? (
          <img
            src={asset(HERO_VIDEO.poster)}
            alt="The Sharp Studios barbers in the shop"
            width={1280}
            height={720}
            fetchPriority="high"
            decoding="async"
            className="mx-auto aspect-video h-auto w-full rounded-2xl object-cover shadow-lg"
          />
        ) : (
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={asset(HERO_VIDEO.poster)}
              width={1280}
              height={720}
              aria-label="Welcome to Sharp Studios"
              className="aspect-video h-auto w-full bg-ink-2 object-cover"
            >
              <source src={asset(HERO_VIDEO.src)} type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!muted}
              aria-label={muted ? t.heroSoundOn : t.heroSoundOff}
              className="absolute right-3 bottom-3 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-ink/80 px-3 text-xs font-bold uppercase tracking-wide text-paper backdrop-blur-sm hover:bg-ink"
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              {muted ? t.heroSoundOn : t.heroSoundOff}
            </button>
          </div>
        )}
      </div>
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-14">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-signal">
          {t.heroKicker}
        </p>
        <p className="mt-4 max-w-xl text-lg text-paper sm:text-xl">
          <LinkBooksy text={t.heroLead} />
        </p>
        <a
          href="#reviews"
          className="mt-8 flex w-full max-w-xl items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-ink shadow-sm"
        >
          <GoogleG className="size-6 shrink-0" />
          <span className="font-display text-[1.75rem] font-semibold leading-none">
            {SHOP.rating.toFixed(1)}
          </span>
          <GoogleStars count={5} className="flex shrink-0 gap-px" />
          <span className="truncate text-sm text-neutral-500">
            {SHOP.reviewCount} {t.reviewsWord}
          </span>
        </a>
        <a
          href="#visit"
          className="mt-3 inline-flex min-h-12 w-full max-w-xl items-center justify-center rounded-xl bg-signal px-5 text-sm font-bold uppercase tracking-wide text-ink hover:bg-[#ffd34d]"
        >
          {t.heroHours}
        </a>
      </div>
    </section>
  );
}
