import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/about-section";
import { BarbersSection } from "@/components/barbers-section";
import { FeaturedSection } from "@/components/featured-section";
import { GallerySection } from "@/components/gallery-section";
import { HeroSection } from "@/components/hero-section";
import { MobileDock } from "@/components/mobile-dock";
import { ReviewsFoundation } from "@/components/reviews-foundation";
import { ReviewsSection } from "@/components/reviews-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VideosSection } from "@/components/videos-section";
import { WeekAt603 } from "@/components/week-at-603";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div
      id="top"
      className="min-h-dvh bg-ink text-paper pb-[calc(6.25rem+env(safe-area-inset-bottom))]"
    >
      <div id="scroll-top-mark" className="h-px w-px overflow-hidden" aria-hidden />
      <SiteHeader />
      <HeroSection />
      <FeaturedSection />
      <div className="stripe-rule" />
      <main id="main">
        <AboutSection />
        <BarbersSection />
        <ServicesSection />
        <ReviewsFoundation />
        <WeekAt603 />
        <GallerySection />
        <VideosSection />
        <ReviewsSection />
      </main>
      <div className="stripe-rule" />
      <SiteFooter />
      <MobileDock />
    </div>
  );
}
