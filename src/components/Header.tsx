/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  cinemaMode: boolean;
  setCinemaMode: (val: boolean) => void;
}

export default function Header({ cinemaMode, setCinemaMode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredTabId, setHoveredTabId] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);

  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Setup Intersection Observer for active section tracking
    const sections = ["home", "about", "services", "portfolio", "testimonials", "contact"];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observerOptions = {
      root: null,
      // Focus on the middle-upper part of the screen (50% - 60% viewport visibility)
      rootMargin: "-25% 0px -35% 0px",
      threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9]
    };

    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver((entries) => {
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.set(entry.target.id, entry.intersectionRatio);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      // Determine which section has the highest intersection ratio
      let bestSection = "home";
      let maxRatio = -1;

      visibleSections.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          bestSection = id;
        }
      });

      // If at the very top of the page, default to home
      if (window.scrollY < 50) {
        setActiveSection("home");
      } else if (visibleSections.size > 0) {
        setActiveSection(bestSection);
      }
    }, observerOptions);

    sectionElements.forEach(el => observer.observe(el));

    // Initial check on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      isScrollingRef.current = true;
      setActiveSection(targetId);

      let actualTop = 0;
      let curr: HTMLElement | null = targetElement;
      while (curr) {
        actualTop += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }

      const compensationOffset = window.innerWidth >= 768 ? 90 : 80;
      const offsetPosition = actualTop - compensationOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Update URL hash without causing a jump
      window.history.pushState(null, "", href);

      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  const allLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Showcase", href: "#portfolio", id: "portfolio" },
    { name: "Testimonials", href: "#testimonials", id: "testimonials" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <>
      {/* ─── FIXED LOGO IN TOP LEFT CORNER ─── */}
      <a
        href="#home"
        onClick={(e) => handleScrollTo(e, "#home")}
        className="fixed z-50 pointer-events-auto flex items-center gap-[16px] group select-none transition-all duration-300
          top-4 left-[2px]
          md:top-[22px] md:left-[14px]
          lg:top-[28px] lg:left-[22px]"
      >
        <img
          src="/logo-images/brand_logo.png"
          alt="Sri Creation"
          className="w-[44px] h-[44px] md:w-[48px] md:h-[48px] translate-y-[10px] object-contain group-hover:rotate-6 transition-transform duration-300"
        />
        <span className="font-cormorant text-[20px] md:text-[24px] lg:text-[28px] font-bold tracking-[2px] bg-gradient-to-r from-[#F8F6F2] via-[#F8F6F2] to-[#D8B56A] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] uppercase whitespace-nowrap">
          SRI CREATION
        </span>
      </a>

      {/* Top Cinematic Glass Blur Overlay */}
      <div
        className={`fixed top-0 left-0 right-0 z-30 pointer-events-none ${
          isMounted ? "opacity-90" : "opacity-0"
        }`}
        style={{
          height: isScrolled ? "140px" : "160px",
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.04) 30%, rgba(255, 255, 255, 0.02) 60%, rgba(255, 255, 255, 0.00) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.06)",
          maskImage: "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.67) 30%, rgba(255, 255, 255, 0.33) 60%, rgba(255, 255, 255, 0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.67) 30%, rgba(255, 255, 255, 0.33) 60%, rgba(255, 255, 255, 0) 100%)",
        }}
      >
        {/* Soft premium red and gold ambient studio glow diffusion */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(255,45,85,0.12)_0%,_rgba(216,181,106,0.06)_40%,_transparent_75%)]" />
      </div>

      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center px-6 pointer-events-none ${
          cinemaMode ? "opacity-20 hover:opacity-100" : ""
        } ${isScrolled ? "py-3" : "py-4"}`}
      >
        <nav
          ref={navRef}
          className={`w-full max-w-[1400px] px-4 md:px-10 flex items-center justify-between relative select-none pointer-events-none ${
            isScrolled ? "h-[76px]" : "h-[86px]"
          } ${isMounted ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"}`}
          aria-label="Main Centered Navigation"
        >
          {/* ─── DESKTOP LAYOUT ─── */}
          <div className="hidden md:flex items-center justify-between w-full h-full relative">
            {/* Left side Logo placeholder to balance space */}
            <div className="flex-1 flex justify-start pointer-events-auto h-full items-center relative" />

            {/* Center Pill Nav */}
            <div className="absolute left-1/2 -translate-x-1/2 flex justify-center pointer-events-auto">
              <div
                className={`flex items-center gap-[4px] rounded-[32px] select-none relative ${
                  isScrolled
                    ? "h-[50px] px-[20px] py-[4.5px]"
                    : "h-[54px] px-[20px] py-[5.5px]"
                }`}
                style={{
                  background: "rgba(255, 255, 255, 0.01)",
                  backdropFilter: "none",
                  WebkitBackdropFilter: "none",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                  boxShadow: "none"
                }}
              >
                {allLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      onMouseEnter={() => setHoveredTabId(link.id)}
                      onMouseLeave={() => setHoveredTabId(null)}
                      className={`font-wildcat antialiased text-[15px] tracking-[1.5px] relative px-[16px] h-[36px] rounded-[22px] flex items-center justify-center select-none ${
                        isActive
                          ? "text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.55)]"
                          : hoveredTabId === link.id
                            ? "text-white font-semibold"
                            : "text-[#E8E8E8]/70 font-medium"
                      }`}
                    >
                      {/* Active sliding background indicator (Liquid Glass Toolbar style) */}
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-[22px] bg-white/[0.22] border border-white/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.45),0_8px_20px_rgba(0,0,0,0.4),0_0_12px_rgba(255,255,255,0.15)]"
                        />
                      )}

                      {/* Hover sliding background indicator */}
                      {hoveredTabId === link.id && (
                        <div
                          className="absolute inset-0 rounded-[22px] bg-white/[0.12] border border-white/15"
                        />
                      )}

                      {/* Soft white glow indicator under the active text */}
                      {isActive && (
                        <div
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full blur-[6px] opacity-80 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                        />
                      )}

                      <span className="relative z-10">{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right side balancing space */}
            <div className="flex-1 flex justify-end" />
          </div>

          {/* ─── MOBILE & TABLET LAYOUT ─── */}
          <div className="flex md:hidden items-center justify-between w-full h-full px-2 pointer-events-auto">
            {/* Left side Logo placeholder to balance space */}
            <div className="flex-1 flex justify-start relative h-full items-center" />

            {/* Mobile Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ─── MOBILE MENU DRAWER ─── */}
      <div
        className={`fixed inset-0 z-30 md:hidden ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        style={{
          background: "rgba(5, 5, 5, 0.96)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <div className="flex flex-col justify-between h-full pt-32 pb-12 px-8">
          <nav aria-label="Mobile Drawer Navigation">
            <ul className="flex flex-col gap-3">
              {allLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleScrollTo(e, link.href);
                      }}
                      className={`flex items-center justify-between py-4 px-6 rounded-2xl ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-[#E8E8E8]/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className={`font-wildcat antialiased text-[13px] tracking-[1.5px] ${
                        isActive ? "font-semibold text-white" : "font-medium"
                      }`}>{link.name}</span>
                      <span className="font-mono text-xs text-zinc-500">[{String(i + 1).padStart(2, "0")}]</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            {/* CTA action */}
            <a
              href="#contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleScrollTo(e, "#contact");
              }}
              className="w-full py-4 bg-[#FF2D55] hover:bg-[#FF4D4D] text-white font-sans text-xs font-bold text-center rounded-[14px] tracking-[0.12em] flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,45,85,0.45)]"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
