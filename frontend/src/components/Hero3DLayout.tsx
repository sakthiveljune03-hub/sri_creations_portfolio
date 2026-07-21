/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";

export default function Hero3DLayout() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showButton, setShowButton] = useState(true);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!isMobile) {
        setScrollY(currentScrollY);
      }
      setShowButton(currentScrollY === 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMobile]);

  const handleBookNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById("contact");
    if (targetElement) {
      let actualTop = targetElement.getBoundingClientRect().top + window.scrollY;
      
      // Correct for any active translateY transforms in parent elements (e.g. ScrollReveal)
      let parent = targetElement.parentElement;
      while (parent) {
        const style = window.getComputedStyle(parent);
        const transform = style.transform || style.webkitTransform;
        if (transform && transform !== "none") {
          const matrix = transform.match(/^matrix\((.+)\)$/);
          if (matrix) {
            const values = matrix[1].split(", ");
            const ty = parseFloat(values[5]);
            if (!isNaN(ty)) {
              actualTop -= ty;
            }
          }
        }
        parent = parent.parentElement;
      }

      const offsetPosition = actualTop;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      window.history.pushState(null, "", "#contact");
    }
  };

  // Parallax / Scroll transform computations (disabled on mobile to prevent GPU lagging and jank)
  const videoTranslateY = isMobile ? 0 : scrollY * 0.5;
  const textTranslateY = isMobile ? 0 : -scrollY * 0.18;
  const textOpacity = isMobile ? 1 : Math.max(0, 1 - scrollY / 600);
  const textScale = isMobile ? 1 : Math.max(0.95, 1 - (scrollY / 1000) * 0.05);

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden z-0 select-none bg-black"
    >
      {/* ─── FULLSCREEN BACKGROUND VIDEO ─── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none will-change-transform"
        style={{
          transform: `translateY(${videoTranslateY}px)`,
          opacity: 0.6,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-[1.02]" // Subtle scale to prevent empty borders during transform
          src="https://res.cloudinary.com/xdzjp4sb/video/upload/f_auto,q_auto/v1784442280/flow-1e4eb1cd-c4f5-4786-9549--erasio_cplr9u.mp4"
        />
      </div>

      {/* ─── CINEMATIC OVERLAYS & GLOWS ─── */}
      {/* Dark cinematic linear gradient overlay (35% to 65%) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      
      {/* Blue and purple ambient glow around the center of the hero section */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,45,85,0.12)_0%,_rgba(255,45,85,0.06)_40%,_transparent_75%)] z-10 pointer-events-none" />

      {/* ─── TEXT OVERLAY CONTENT ─── */}
      <div
        className="max-w-4xl px-6 text-center z-20 flex flex-col items-center justify-center will-change-transform"
        style={{
          transform: `translateY(${textTranslateY}px) scale(${textScale})`,
          opacity: textOpacity,
          /* Smooth blur-to-clear page load transitions */
          filter: isLoaded ? "blur(0px)" : "blur(8px)",
          transition: isLoaded 
            ? "filter 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.1s linear, opacity 0.1s linear" 
            : "none",
        }}
      >
        {/* Main Heading - Branche Font */}
        <h1
          id="hero-title"
          style={{ fontFamily: "'Branche', sans-serif" }}
          className={`text-[2.4rem] md:text-[3.65rem] lg:text-[4.85rem] font-medium tracking-[0.06em] text-[#F8F6F2] mb-6 leading-[1.2] transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          EVERY FRAME TELLS<br />
          <span className="inline-block italic font-normal bg-gradient-to-r from-[#F8F6F2] via-[#F8F6F2] to-[#D8B56A] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] -translate-x-2.5 md:-translate-x-5 lg:-translate-x-7 transition-transform duration-500 pb-3 pr-2 overflow-visible">
            A STORY
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`font-sans text-sm md:text-lg max-w-2xl mx-auto mb-10 text-[#C9CDD4] font-light leading-relaxed transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Creating premium cinematic edits, visual storytelling, and creative experiences that leave a lasting impression.
        </p>

        {/* Primary Button */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="#portfolio"
            className="hero-gradient-glow-btn px-10 py-4 text-white font-sans text-xs font-bold tracking-[0.2em] uppercase rounded-[20px] flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>▶</span> Watch Showreel
          </a>
        </div>
      </div>

      {/* ─── SCROLL INDICATOR ─── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 select-none pointer-events-none transition-opacity duration-300"
        style={{
          opacity: Math.max(0, 1 - scrollY / 120),
        }}
      >
        {/* Animated mouse icon */}
        <div className="w-5.5 h-9 border border-white/30 rounded-full flex justify-center p-1.5 animate-pulse">
          <div className="w-1.5 h-2.5 bg-[#D8B56A] rounded-full animate-bounce" />
        </div>
        <span className="font-dm-mono text-[9px] tracking-[0.25em] text-white/50 uppercase">
          Scroll to Explore
        </span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-gradient-glow-btn {
          background: linear-gradient(135deg, #FF2D55 0%, #FF3B30 50%, #FF6A3D 100%);
          box-shadow: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
          will-change: transform, box-shadow;
        }
        .hero-gradient-glow-btn:hover {
          transform: scale(1.05);
          box-shadow: none;
          filter: brightness(1.1);
        }
        .hero-gradient-glow-btn:active {
          transform: scale(0.97);
        }

        .book-now-floating-btn {
          position: fixed;
          z-index: 50;
          top: 96px; /* Positioned below mobile navigation bar with a gap */
          left: 50%;
          right: auto;
          transform: translateX(-50%) scale(1);
          background: linear-gradient(135deg, #FF2D55 0%, #FF3B30 50%, #FF6A3D 100%);
          border: none;
          border-radius: 20px;
          padding: 8px 20px;
          box-shadow: none;
          
          font-family: "Randu Madu", sans-serif;
          font-weight: 700;
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #FFFFFF;
          cursor: pointer;
          
          transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease, opacity 350ms ease-in-out, translate 350ms ease-in-out;
          will-change: transform, opacity, translate, box-shadow;
        }
        
        .book-now-floating-btn:hover {
          transform: translateX(-50%) scale(1.05);
          filter: brightness(1.1);
          box-shadow: none;
        }
        
        .book-now-floating-btn:active {
          transform: translateX(-50%) scale(0.97);
        }
        
        @media (min-width: 768px) {
          .book-now-floating-btn {
            top: 24px;
            right: 24px;
            left: auto;
            transform: scale(1);
          }
          .book-now-floating-btn:hover {
            transform: scale(1.05);
          }
          .book-now-floating-btn:active {
            transform: scale(0.97);
          }
        }
        
        @media (min-width: 1024px) {
          .book-now-floating-btn {
            top: 45px; /* Moved down by 13px on desktop */
            right: 40px;
            left: auto;
            transform: scale(1);
          }
        }
        
        .book-now-btn-show {
          opacity: 1;
          translate: 0 0;
          pointer-events: auto;
        }
        
        .book-now-btn-hide {
          opacity: 0;
          translate: 0 -18px;
          pointer-events: none;
        }
      `}} />

      <button
        onClick={handleBookNowClick}
        className={`book-now-floating-btn ${showButton ? "book-now-btn-show" : "book-now-btn-hide"}`}
      >
        Book Now
      </button>
    </section>
  );
}
