/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "./components/Header";
import Hero3DLayout from "./components/Hero3DLayout";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";

// Lazy-loaded heavy components below the fold for massive performance gains
const About = React.lazy(() => import("./components/About"));
const Stats = React.lazy(() => import("./components/Stats"));
const Services = React.lazy(() => import("./components/Services"));
const Portfolio = React.lazy(() => import("./components/Portfolio"));
const WhyWorkWithMe = React.lazy(() => import("./components/WhyWorkWithMe"));
const Contact = React.lazy(() => import("./components/Contact"));
const Footer = React.lazy(() => import("./components/Footer"));
const ScrollCanvas = React.lazy(() => import("./components/ScrollCanvas"));

// Premium loading skeleton for smooth transitions
const ComponentLoader = () => (
  <div className="w-full min-h-[250px] flex items-center justify-center p-12">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-[#FF2D55] border-t-transparent rounded-full animate-spin"></div>
      <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest animate-pulse">Loading Cinematic Experience...</div>
    </div>
  </div>
);

function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const checkVisibility = useCallback(() => {
    const el = ref.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight + 100 && rect.bottom > -100;
    if (inViewport) {
      setIsVisible(true);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (checkVisibility()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "100px 0px 0px 0px" }
    );

    observer.observe(el);

    const fallbackTimer = setTimeout(() => {
      checkVisibility();
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [checkVisibility]);

  const getInitialTransform = (): string => {
    switch (direction) {
      case "up": return "translateY(40px)";
      case "down": return "translateY(-40px)";
      case "left": return "translateX(40px)";
      case "right": return "translateX(-40px)";
      case "none": return "none";
      default: return "translateY(40px)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getInitialTransform(),
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [cinemaMode, setCinemaMode] = useState(false);

  return (
    <div
      className={`min-h-screen text-[#F5F5F7] font-sans antialiased overflow-x-hidden selection:bg-[#FF2D55] selection:text-white transition-all duration-700 ${
        cinemaMode ? "brightness-[0.4] select-none pointer-events-none" : ""
      }`}
      style={{ background: "transparent" }}
    >
      {/* Immersive Scroll Animation Background Canvas (Lazy Loaded) */}
      <React.Suspense fallback={null}>
        <ScrollCanvas />
      </React.Suspense>

      {/* Cinematic Splash Loading Screen */}
      <SplashScreen />

      {/* Subtle overlay for text legibility */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background: "linear-gradient(180deg, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.6) 50%, rgba(5,5,5,0.75) 100%)",
        }}
      />

      {/* Cinema mode styles */}
      {cinemaMode && (
        <style dangerouslySetInnerHTML={{
          __html: `
            #main-header, #showreel, #cinematic-player-overlay {
              filter: brightness(2.5) !important;
              pointer-events: auto !important;
            }
            #timeline-perspective-card, #colorgrading-perspective-card, #vfx-perspective-card {
              filter: brightness(2.2) !important;
            }
          `
        }} />
      )}

      {/* Header Navigation */}
      <Header cinemaMode={cinemaMode} setCinemaMode={setCinemaMode} />

      {/* Main Content Flow */}
      <main aria-label="Sriman Cinematic Portfolio Main Content">
        {/* Section 1: Hero — renders immediately, no scroll animation */}
        <Hero3DLayout />

        <React.Suspense fallback={<ComponentLoader />}>
          {/* Section 2: About */}
          <ScrollReveal direction="up" delay={0}>
            <About />
          </ScrollReveal>

          {/* Section 2b: Stats */}
          <ScrollReveal direction="up" delay={0}>
            <Stats />
          </ScrollReveal>

          {/* Section 3: Services */}
          <ScrollReveal direction="up" delay={80}>
            <Services />
          </ScrollReveal>

          {/* Section 4: Portfolio */}
          <ScrollReveal direction="up" delay={0}>
            <Portfolio />
          </ScrollReveal>

          {/* Section 5: Testimonials */}
          <ScrollReveal direction="up" delay={80}>
            <WhyWorkWithMe />
          </ScrollReveal>

          {/* Section 6: Contact */}
          <ScrollReveal direction="up" delay={100}>
            <Contact />
          </ScrollReveal>
        </React.Suspense>
      </main>

      {/* Footer */}
      <React.Suspense fallback={null}>
        <ScrollReveal direction="up" delay={0}>
          <Footer />
        </ScrollReveal>
      </React.Suspense>

      {/* Floating Scroll to Top button */}
      <ScrollToTop />
    </div>
  );
}
