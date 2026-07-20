/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Cpu, Monitor, Music, Sliders, Layers, Camera } from "lucide-react";
import { motion } from "motion/react";

const renderSoftwareIcon = (name: string, isHovered: boolean) => {
  const baseClass = "w-10 h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 object-contain shrink-0 transition-all duration-500 origin-center";
  
  // Custom logo animations on hover:
  // - After Effects: Blue glow pulse + slight rotation
  // - CapCut: Subtle pulse + energy ring (rendered inside card wrapper)
  // - Lightroom: Cyan glow wave + soft float
  // - PicsArt: Pink-purple glow burst + gradient pulse
  let hoverAnimationClass = "";
  if (isHovered) {
    switch (name) {
      case "DaVinci Resolve":
        hoverAnimationClass = "animate-[aePulse_2s_ease-in-out_infinite]";
        break;
      case "CapCut":
        hoverAnimationClass = "animate-[capcutPulse_2s_ease-in-out_infinite]";
        break;
      case "Adobe Lightroom":
        hoverAnimationClass = "animate-[lrFloat_2.2s_ease-in-out_infinite]";
        break;
      case "PicsArt":
        hoverAnimationClass = "animate-[paBurst_1.8s_ease-in-out_infinite]";
        break;
    }
  }

  const iconClass = `${baseClass} ${hoverAnimationClass}`;

  switch (name) {
    case "DaVinci Resolve":
      return <img src="/logo-images/DaVinciResolve.png" alt={name} className={iconClass} style={{ transform: isHovered ? "translateZ(25px)" : "translateZ(0px)" }} />;
    case "Adobe Lightroom":
      return <img src="/logo-images/LR.png" alt={name} className={iconClass} style={{ transform: isHovered ? "translateZ(25px)" : "translateZ(0px)" }} />;
    case "CapCut":
      return <img src="/logo-images/Capcut.png" alt={name} className={iconClass} style={{ transform: isHovered ? "translateZ(25px)" : "translateZ(0px)" }} />;
    case "PicsArt":
      return (
        <svg 
          className={iconClass} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: isHovered ? "translateZ(25px)" : "translateZ(0px)" }}
        >
          <circle cx="13.5" cy="10" r="4.5" fill="url(#picsartGrad)" />
          <circle cx="13.5" cy="10" r="1.8" fill="#101010" />
          <path d="M9 10V17" stroke="url(#picsartGrad)" strokeWidth="2.7" strokeLinecap="round" />
          <defs>
            <linearGradient id="picsartGrad" x1="6.5" y1="6" x2="17.5" y2="17" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF3366"/>
              <stop offset="35%" stopColor="#FF33CC"/>
              <stop offset="70%" stopColor="#9933FF"/>
              <stop offset="100%" stopColor="#33CCFF"/>
            </linearGradient>
          </defs>
        </svg>
      );
    default:
      return <div className="w-1.5 h-1.5 rounded-full bg-[#FF2D55] shrink-0" />;
  }
};

// ─── PARTICLE & GRADIENT MESH BACKGROUNDS ───
function ToolsBackground() {
  return (
    <div className="absolute -inset-6 pointer-events-none overflow-hidden rounded-3xl z-0">
      {/* Dynamic gradient mesh */}
      <div
        className="absolute inset-0 opacity-40 blur-[70px]"
        style={{
          background: "radial-gradient(circle at 20% 30%, rgba(255, 45, 85, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(216, 181, 106, 0.08) 0%, transparent 50%)",
          animation: "meshPulse 8s ease-in-out infinite alternate",
        }}
      />

      {/* Pulsating lens flare orb */}
      <div
        className="absolute -top-12 -left-12 w-60 h-60 rounded-full opacity-15 blur-[45px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 45, 85, 0.25) 0%, rgba(255, 45, 85, 0) 70%)",
          animation: "flareOrbit 12s linear infinite",
        }}
      />

      {/* Floating particles */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <g className="animate-[floatParticles_8s_ease-in-out_infinite_alternate]">
          <circle cx="20%" cy="40%" r="2" fill="#FF2D55" opacity="0.6" className="blur-[1px]" />
          <circle cx="85%" cy="30%" r="1.5" fill="#D8B56A" opacity="0.5" />
          <circle cx="50%" cy="80%" r="2.5" fill="#FF2D55" opacity="0.4" className="blur-[2px]" />
        </g>
        <g className="animate-[floatParticles_11s_ease-in-out_infinite_alternate]" style={{ animationDelay: "-3s" }}>
          <circle cx="75%" cy="85%" r="2" fill="#D8B56A" opacity="0.5" className="blur-[1px]" />
          <circle cx="15%" cy="70%" r="3" fill="#FF2D55" opacity="0.3" className="blur-[2px]" />
          <circle cx="60%" cy="20%" r="1.5" fill="#FFFFFF" opacity="0.6" />
        </g>
      </svg>

      {/* Film grain noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Keyframe animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes meshPulse {
            0% { transform: scale(1) translate(0px, 0px); }
            100% { transform: scale(1.15) translate(10px, -15px); }
          }
          @keyframes flareOrbit {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(15px, 20px) scale(1.1); }
            66% { transform: translate(-10px, 15px) scale(0.95); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes floatParticles {
            0% { transform: translateY(10px) translateX(0px); }
            100% { transform: translateY(-20px) translateX(15px); }
          }
        `
      }} />
    </div>
  );
}

// ─── STAGGERED ENTRANCE CONTAINER FOR SOFTWARE ───
function ToolsContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 justify-items-center w-full"
      style={{ perspective: "1000px" }}
    >
      {React.Children.map(children, (child, index) => {
        const delay = index * 150; // 0.15s stagger delay
        return (
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
            }}
            className="w-full flex justify-center animate-[revealCard_0.8s_ease-out]"
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

// ─── STAGGERED REVEAL CONTAINER FOR CORE VALUES ───
function ValuesContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-4 mt-8" style={{ perspective: "1000px" }}>
      {React.Children.map(children, (child, index) => {
        const delay = index * 150; // 0.15s stagger delay
        return (
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
              transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

// ─── HOVER-MAGNETIC, GLOW, RIPPLE TOOL CARD ───
interface ToolCardProps {
  key?: React.Key;
  name: string;
  index: number;
  renderIcon: (name: string, isHovered: boolean) => React.ReactNode;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

function ToolCard({ name, index, renderIcon }: ToolCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const [tiltPos, setTiltPos] = useState({ rotateX: 0, rotateY: 0 });
  const [ripple, setRipple] = useState<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const [particles, setParticles] = useState<Particle[]>([]);

  const getGlowConfig = (toolName: string) => {
    switch (toolName) {
      case "DaVinci Resolve":
        return { glowRgb: "255, 77, 77", glowHex: "#FF4D4D" }; // Blue
      case "CapCut":
        return { glowRgb: "6, 182, 212", glowHex: "#06b6d4" }; // Cyan
      case "Adobe Lightroom":
        return { glowRgb: "20, 184, 166", glowHex: "#14b8a6" }; // Teal
      case "PicsArt":
        return { glowRgb: "236, 72, 153", glowHex: "#ec4899" }; // Pink
      default:
        return { glowRgb: "255, 45, 85", glowHex: "#FF2D55" };
    }
  };

  const config = getGlowConfig(name);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Center coordinates
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const distanceX = x - centerX;
    const distanceY = y - centerY;

    // Normalised offsets (-1 to 1)
    const pctX = distanceX / centerX;
    const pctY = distanceY / centerY;

    // Magnetic proximity offset computation (toward the cursor by up to 12px)
    const magneticX = pctX * 12;
    const magneticY = pctY * 12;
    setMagneticPos({ x: magneticX, y: magneticY });

    // 3D Tilt rotation (max 12 degrees)
    const rotateX = -pctY * 12;
    const rotateY = pctX * 12;
    setTiltPos({ rotateX, rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMagneticPos({ x: 0, y: 0 });
    setTiltPos({ rotateX: 0, rotateY: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipple({ x, y, active: true });
    setTimeout(() => {
      setRipple(prev => ({ ...prev, active: false }));
    }, 600);
  };

  // Generate corner/edge sparks on hover
  useEffect(() => {
    if (isHovered) {
      const generated = Array.from({ length: 8 }).map((_, i) => {
        const angle = i * 45 + Math.random() * 15;
        return {
          id: i,
          x: 50 + Math.cos((angle * Math.PI) / 180) * 45,
          y: 50 + Math.sin((angle * Math.PI) / 180) * 45,
          size: 2 + Math.random() * 3,
          delay: Math.random() * 0.4,
          duration: 1.2 + Math.random() * 0.8,
          angle: angle
        };
      });
      setParticles(generated);
    } else {
      setParticles([]);
    }
  }, [isHovered]);

  const floatDuration = `${3.5 + (index * 0.4) % 1.5}s`;
  const floatDelay = `${index * 0.3}s`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        "--mouse-x": `${coords.x}px`,
        "--mouse-y": `${coords.y}px`,
        "--glow-rgb": config.glowRgb,
        "--glow-color": config.glowHex,
        "--float-duration": floatDuration,
        "--float-delay": floatDelay,
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `translate3d(${magneticPos.x}px, ${magneticPos.y - 16}px, 0px) rotateX(${tiltPos.rotateX}deg) rotateY(${tiltPos.rotateY}deg) scale(1.08)`
          : `translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)`,
        transition: isHovered 
          ? "transform 0.1s ease-out, box-shadow 0.3s ease" 
          : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease",
        boxShadow: isHovered
          ? `0 25px 50px rgba(0, 0, 0, 0.75), 0 0 25px rgba(var(--glow-rgb), 0.35)`
          : `0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0px transparent`,
        willChange: "transform, box-shadow",
      } as React.CSSProperties}
      className={`group relative p-[1.5px] rounded-2xl cursor-pointer select-none
        w-full max-w-[108px] aspect-square lg:max-w-[72px] lg:h-[72px]
        animate-[cardFloatBreath_var(--float-duration)_ease-in-out_infinite]
      `}
      title={name}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes cardFloatBreath {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-7px) scale(1.01); }
          }
          @keyframes borderSpin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes lightSweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(350%); }
          }
          @keyframes clickRipple {
            0% { transform: scale(0); opacity: 0.4; }
            100% { transform: scale(5); opacity: 0; }
          }
          @keyframes particleFloat {
            0% {
              transform: translate(-50%, -50%) scale(1) translate(0, 0);
              opacity: 0.9;
            }
            100% {
              transform: translate(-50%, -50%) scale(0) translate(calc(var(--dx) * 1px), calc(var(--dy) * 1px));
              opacity: 0;
            }
          }
          @keyframes aePulse {
            0%, 100% { transform: translateZ(25px) scale(1.15) rotate(0deg); filter: drop-shadow(0 0 6px rgba(255, 45, 85, 0.5)); }
            50% { transform: translateZ(25px) scale(1.2) rotate(3deg); filter: drop-shadow(0 0 16px rgba(255, 45, 85, 0.95)); }
          }
          @keyframes capcutPulse {
            0%, 100% { transform: translateZ(25px) scale(1.15); filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4)); }
            50% { transform: translateZ(25px) scale(1.2); filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.8)); }
          }
          @keyframes lrFloat {
            0%, 100% { transform: translateZ(25px) translateY(0px) scale(1.15); filter: drop-shadow(0 0 6px rgba(20, 184, 166, 0.5)); }
            50% { transform: translateZ(25px) translateY(-3px) scale(1.22); filter: drop-shadow(0 0 16px rgba(20, 184, 166, 0.9)); }
          }
          @keyframes paBurst {
            0%, 100% { transform: translateZ(25px) scale(1.15); filter: drop-shadow(0 0 6px rgba(236, 72, 153, 0.5)); }
            50% { transform: translateZ(25px) scale(1.2); filter: drop-shadow(0 0 18px rgba(236, 72, 153, 0.9)) drop-shadow(0 0 25px rgba(153, 51, 255, 0.7)); }
          }
          @keyframes capcutRing {
            0% { transform: translate(-50%, -50%) scale(0.6); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
          }
        `
      }} />

      {/* ─── ROTATING GRADIENT BORDER ─── */}
      <div
        className="absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{
          background: `conic-gradient(from 0deg, transparent, rgba(var(--glow-rgb), 0.7), transparent 35%, rgba(var(--glow-rgb), 0.7), transparent)`,
          animation: "borderSpin 4s linear infinite",
        }}
      />

      {/* ─── INNER CARD BODY ─── */}
      <div 
        className="relative w-full h-full bg-white/[0.08] border border-white/20 rounded-[15px] p-2.5 flex items-center justify-center overflow-hidden transition-all duration-300 z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        style={{ 
          transformStyle: "preserve-3d",
          backdropFilter: isHovered ? "blur(30px)" : "blur(20px)",
          WebkitBackdropFilter: isHovered ? "blur(30px)" : "blur(20px)",
        }}
      >
        {/* Dynamic Cursor Spotlight reflection layer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(circle 85px at var(--mouse-x) var(--mouse-y), rgba(var(--glow-rgb), 0.18), transparent 80%)`,
          }}
        />

        {/* Proximity lighting border spotlight mask */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-xl"
          style={{
            border: `1.5px solid rgba(var(--glow-rgb), 0.45)`,
            maskImage: `radial-gradient(circle 70px at var(--mouse-x) var(--mouse-y), black, transparent 75%)`,
            WebkitMaskImage: `radial-gradient(circle 70px at var(--mouse-x) var(--mouse-y), black, transparent 75%)`,
          }}
        />

        {/* Diagonal Light Sweep Sheen */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden z-20">
          <div
            className="absolute -inset-y-12 -left-1/2 w-[35%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg]"
            style={{
              animation: isHovered ? "lightSweep 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) infinite" : "none"
            }}
          />
        </div>

        {/* Click ripple circle */}
        {ripple.active && (
          <span
            className="absolute rounded-full pointer-events-none bg-white opacity-0 z-20"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              width: "24px",
              height: "24px",
              marginLeft: "-12px",
              marginTop: "-12px",
              animation: "clickRipple 0.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
            }}
          />
        )}

        {/* CapCut Energy Ring element */}
        {name === "CapCut" && isHovered && (
          <span
            className="absolute top-1/2 left-1/2 rounded-full border border-white/20 pointer-events-none z-0 w-14 h-14"
            style={{
              animation: "capcutRing 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

        {/* Brand Icon (preserves 3D depth and is animated based on logo specifications) */}
        <div className="z-10" style={{ transformStyle: "preserve-3d" }}>
          {renderIcon(name, isHovered)}
        </div>
        
        {/* Background glow orb */}
        <div
          className="absolute -inset-10 opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none blur-[35px] z-[-1]"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--glow-rgb), 0.75), transparent 70%)`,
          }}
        />
      </div>

      {/* ─── CORNER SPARKS / PARTICLES ─── */}
      {isHovered && particles.map(p => {
        const dist = 30 + Math.random() * 30; // Float distance
        const dx = Math.cos((p.angle * Math.PI) / 180) * dist;
        const dy = Math.sin((p.angle * Math.PI) / 180) * dist;
        return (
          <span
            key={p.id}
            className="absolute rounded-full pointer-events-none z-30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `rgba(var(--glow-rgb), 0.85)`,
              boxShadow: `0 0 8px var(--glow-color)`,
              "--dx": dx,
              "--dy": dy,
              animation: `particleFloat ${p.duration}s cubic-bezier(0.1, 0.8, 0.3, 1) infinite`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}

// ─── REACTION CORE VALUE STORYTELLING CARD ───
interface ValueCardProps {
  key?: React.Key;
  name: string;
  desc: string;
  icon: React.ReactNode;
  index: number;
}

function ValueCard({ name, desc, icon, index }: ValueCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tiltPos, setTiltPos] = useState({ rotateX: 0, rotateY: 0 });
  const [clickScale, setClickScale] = useState(1);
  const [ripple, setRipple] = useState(false);

  const getCardGlowConfig = (valName: string) => {
    switch (valName) {
      case "Story First":
        return { glowRgb: "216, 181, 106", glowHex: "#D8B56A" }; // Warm gold
      case "Cinematic Flow":
        return { glowRgb: "255, 45, 85", glowHex: "#FF2D55" }; // Blue
      case "Sound & Emotion":
        return { glowRgb: "168, 85, 247", glowHex: "#a855f7" }; // Purple
      default:
        return { glowRgb: "255, 255, 255", glowHex: "#ffffff" };
    }
  };

  const config = getCardGlowConfig(name);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const distanceX = x - centerX;
    const distanceY = y - centerY;

    const pctX = distanceX / centerX;
    const pctY = distanceY / centerY;

    // Tilt limits: 3 degrees max
    const rotateX = -pctY * 3;
    const rotateY = pctX * 3;
    setTiltPos({ rotateX, rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltPos({ rotateX: 0, rotateY: 0 });
  };

  const handleClick = () => {
    setClickScale(0.98);
    setRipple(true);
    setTimeout(() => {
      setClickScale(1);
    }, 150);
    setTimeout(() => {
      setRipple(false);
    }, 600);
  };

  const floatDuration = `${4.5 + (index * 0.7) % 1.5}s`;
  const floatDelay = `${index * 0.4}s`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        "--mouse-x": `${coords.x}px`,
        "--mouse-y": `${coords.y}px`,
        "--glow-rgb": config.glowRgb,
        "--glow-color": config.glowHex,
        "--float-duration": floatDuration,
        "--float-delay": floatDelay,
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `translate3d(0px, -8px, 0px) rotateX(${tiltPos.rotateX}deg) rotateY(${tiltPos.rotateY}deg) scale(${clickScale * 1.03})`
          : `translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(${clickScale})`,
        transition: isHovered 
          ? "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease" 
          : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease, border-color 0.4s ease, background-color 0.4s ease",
        boxShadow: isHovered
          ? `0 15px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(var(--glow-rgb), 0.25)`
          : `0 4px 12px rgba(0, 0, 0, 0.4), 0 0 4px rgba(var(--glow-rgb), 0.05)`,
        borderColor: isHovered 
          ? `rgba(var(--glow-rgb), 0.45)` 
          : `rgba(255, 255, 255, 0.08)`,
        backgroundColor: isHovered
          ? `rgba(30, 30, 30, 0.75)`
          : `rgba(20, 20, 20, 0.55)`,
        backdropFilter: isHovered ? "blur(25px)" : "blur(20px)",
        WebkitBackdropFilter: isHovered ? "blur(25px)" : "blur(20px)",
        willChange: "transform, box-shadow, border-color",
      } as React.CSSProperties}
      className={`group relative flex gap-4 p-4 rounded-xl border select-none cursor-pointer overflow-hidden
        animate-[valueFloat_var(--float-duration)_ease-in-out_infinite]
      `}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes valueFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
          @keyframes glowWavePulse {
            0%, 100% { box-shadow: 0 0 4px rgba(var(--glow-rgb), 0.05); }
            50% { box-shadow: 0 0 10px rgba(var(--glow-rgb), 0.15); }
          }
          @keyframes sweepLight {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `
      }} />

      {/* Dynamic Cursor Spotlight reflection layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(circle 120px at var(--mouse-x) var(--mouse-y), rgba(var(--glow-rgb), 0.12), transparent 80%)`,
        }}
      />

      {/* Diagonal Light Sweep Sheen */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden z-20">
        <div
          className="absolute -inset-y-12 -left-1/3 w-[25%] bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-[-25deg]"
          style={{
            animation: isHovered ? "sweepLight 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards" : "none"
          }}
        />
      </div>

      {/* Ripple Expand Pulse on Click */}
      {ripple && (
        <span
          className="absolute inset-0 bg-white/5 pointer-events-none z-10 rounded-xl"
          style={{
            animation: "pulseGlow 0.4s ease-out forwards",
          }}
        />
      )}

      {/* Icon Wrapper (rotates, scales and glows softly on hover) */}
      <div
        className="p-2.5 rounded-lg bg-white/5 border border-white/10 shrink-0 flex items-center justify-center z-10 transition-all duration-300"
        style={{
          transform: isHovered ? "scale(1.1) rotate(3deg) translateZ(10px)" : "scale(1) rotate(0deg) translateZ(0px)",
          borderColor: isHovered ? `rgba(var(--glow-rgb), 0.5)` : `rgba(255, 255, 255, 0.1)`,
          boxShadow: isHovered ? `0 0 12px var(--glow-color)` : `none`,
        }}
      >
        {icon}
      </div>

      {/* Card Details */}
      <div className="z-10" style={{ transformStyle: "preserve-3d" }}>
        <h4 className="font-display font-bold text-sm text-zinc-100 transition-colors duration-300 group-hover:text-white">
          {name}
        </h4>
        <p className="text-zinc-400 text-xs mt-1 leading-relaxed font-sans font-normal">
          {desc}
        </p>
      </div>

      {/* Subtle Ambient Breathing Glow Behind */}
      <div
        className="absolute -inset-10 opacity-5 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none blur-[30px] z-[-1]"
        style={{
          background: `radial-gradient(circle at center, rgba(var(--glow-rgb), 0.6), transparent 70%)`,
        }}
      />
    </div>
  );
}

export default function About() {
  const profileImg = new URL("../About image/IMG_20260504_174249.jpg.jpeg", import.meta.url).href;

  const coreValues = [
    { name: "Story First", desc: "Every project begins with understanding the story behind the footage.", icon: <Sliders className="w-4 h-4 text-[#D8B56A]" /> },
    { name: "Cinematic Flow", desc: "Creating smooth pacing, seamless transitions, and engaging visual rhythm.", icon: <Layers className="w-4 h-4 text-[#D8B56A]" /> },
    { name: "Sound & Emotion", desc: "Enhancing every scene with music, ambience, and immersive audio design.", icon: <Music className="w-4 h-4 text-[#D8B56A]" /> }
  ];

  const specs = [
    { label: "Discovery", value: "Understanding your vision, audience, and creative goals.", icon: <Cpu className="w-4 h-4 text-[#FF2D55]" /> },
    { label: "Story Development", value: "Building emotional flow and narrative structure.", icon: <Layers className="w-4 h-4 text-[#FF2D55]" /> },
    { label: "Editing & Motion", value: "Crafting transitions, pacing, and cinematic movement.", icon: <Sliders className="w-4 h-4 text-[#FF2D55]" /> },
    { label: "Color & Sound", value: "Enhancing visuals with grading and immersive audio.", icon: <Music className="w-4 h-4 text-[#FF2D55]" /> },
    { label: "Final Delivery", value: "Delivering polished content optimized for every platform.", icon: <Monitor className="w-4 h-4 text-[#FF2D55]" /> }
  ];

  return (
    <section id="about" className="pt-0 pb-28 bg-transparent relative px-6 overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_rgba(255,45,85,0.03)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Bento-style columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* L1: Sri Bio & Core values (Grid span 7) */}
          <div className="lg:col-span-7 w-full max-w-[91%] lg:max-w-[91%] mx-auto flex flex-col justify-between rounded-2xl white-glass white-glass-hover p-5.5 lg:p-7 transition-all duration-300">
            <div className="lg:flow-root">
              {/* Profile Image Frame with Face Center Positioning */}
              <div
                className="relative shrink-0 select-none cursor-pointer rounded-[24px] bg-white/[0.04] border border-white/[0.08] backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.06)] hover:border-white/[0.15] flex items-center justify-center w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] mx-auto lg:mx-0 mb-6 lg:mb-4 lg:mr-6 lg:float-left group overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  isolation: "isolate",
                  transform: "translateZ(0)",
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                }}
              >
                {/* Ambient Glow Background */}
                <motion.div
                  className="absolute -inset-1 rounded-[26px] pointer-events-none filter blur-[10px] -z-10"
                  style={{
                    background: "linear-gradient(135deg, rgba(216,181,106,0.18) 0%, rgba(255,45,85,0.12) 100%)",
                  }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [0.98, 1.02, 0.98]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Shine Sweep */}
                <div className="absolute inset-0 pointer-events-none rounded-[24px] overflow-hidden z-10">
                  <motion.div
                     className="absolute top-0 h-full w-[40%] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                     style={{ left: "-100%" }}
                     animate={{
                       left: ["-100%", "200%"],
                     }}
                     transition={{
                       duration: 2.2,
                       repeat: Infinity,
                       repeatDelay: 5.8,
                       ease: "easeInOut"
                     }}
                  />
                </div>

                {/* Cropped & Centered Profile Image with Premium Hover Animation */}
                <img
                  src={profileImg}
                  alt="Sriman Profile"
                  className="w-full h-full object-cover pointer-events-none rounded-[24px] select-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] scale-100 group-hover:scale-[1.01] md:group-hover:scale-[1.02] lg:group-hover:scale-[1.03] group-hover:rotate-1 group-hover:brightness-[1.08] will-change-transform"
                  style={{
                    objectPosition: "50% 32%",
                    transform: "translateZ(0)",
                  }}
                />
              </div>

              <div className="flex items-center gap-2 mb-6 lg:mb-4">
                <span className="w-8 h-[1px] bg-[#D8B56A]" />
                <span className="font-mono text-xs text-[#D8B56A] font-bold tracking-widest uppercase">
                  ABOUT SRI
                </span>
              </div>
              <h2
                style={{ fontFamily: "'Oswald', sans-serif" }}
                className="text-3xl lg:text-4xl font-medium tracking-[0.03em] leading-[1.15] text-[#F8F6F2] mb-6"
              >
                Hi, I'm <span className="bg-gradient-to-r from-[#FF2D55] to-[#FF6A3D] bg-clip-text text-transparent">Sri</span> &mdash;<br />
                Crafting Stories Through Motion & Emotion
              </h2>
              
              {/* Subheading */}
              <p className="text-[#D8B56A] text-[15px] font-medium leading-relaxed mb-6 font-sans">
                Transforming raw footage into cinematic experiences that captivate audiences and elevate brands.
              </p>

              {/* Main Description */}
              <div
                style={{ fontFamily: "'Randu Madu', sans-serif" }}
                className="flex flex-col gap-4 text-[#C9CDD4] text-sm leading-relaxed font-semibold"
              >
                <p>
                  I am a freelance video editor passionate about turning ideas into visually compelling stories that leave a lasting impression.
                </p>
                <p>
                  From YouTube content and Instagram reels to cinematic wedding films and commercial advertisements, every project is crafted with creativity, precision, and storytelling at its core.
                </p>
                <p>
                  For me, editing is more than arranging clips on a timeline. It's about rhythm, emotion, pacing, and creating moments people remember long after the final frame fades away.
                </p>
              </div>

              {/* Highlight sentences */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-6 font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8B56A]" />
                  Every frame has purpose.
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8B56A]" />
                  Every story deserves to be cinematic.
                </span>
              </div>

              {/* Core Values Rows with Premium Staggered Reveal and Interactions */}
              <ValuesContainer>
                {coreValues.map((val, idx) => (
                  <ValueCard
                    key={val.name}
                    name={val.name}
                    desc={val.desc}
                    icon={val.icon}
                    index={idx}
                  />
                ))}
              </ValuesContainer>
            </div>

            {/* Bottom Signature Quote */}
            <div className="mt-12 pt-6 border-t border-white/5">
              <p className="font-display italic text-lg lg:text-xl text-zinc-100 font-medium">
                &ldquo;Not just editing videos &mdash;<br />creating experiences people remember.&rdquo;
              </p>
              <p className="font-mono text-xs text-[#D8B56A] mt-2 font-bold tracking-widest uppercase">
                &mdash; Sri
              </p>
            </div>
          </div>


          {/* L2: Creative Process & Software (Grid span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            
            {/* Creative Process Box */}
            <div className="w-full max-w-[91%] lg:max-w-[91%] mx-auto flex flex-col justify-between rounded-2xl white-glass white-glass-hover p-5.5 lg:p-7 transition-all duration-300">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-8 h-[1px] bg-[#D8B56A]" />
                  <span className="font-mono text-xs text-[#D8B56A] font-bold tracking-widest uppercase">
                    CREATIVE PROCESS
                  </span>
                </div>
                <h3
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                  className="font-bold text-xl tracking-[0.03em] leading-[1.15] text-[#F8F6F2] mb-6"
                >
                  How Every Story Comes To Life
                </h3>

                {/* Creative Process Items List */}
                <div className="flex flex-col gap-4">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex flex-col py-3 border-b border-zinc-900/60">
                      <div className="flex items-center gap-2.5 text-xs text-[#FF2D55] font-bold tracking-wider uppercase font-mono">
                        {spec.icon}
                        <span>{spec.label}</span>
                      </div>
                      <span
                        style={{ fontFamily: "'Randu Madu', sans-serif" }}
                        className="text-[#C9CDD4] text-xs leading-relaxed mt-1.5 font-bold"
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech badges footer */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="font-mono text-[9px] text-zinc-500">TAILORED WORKFLOWS</span>
                <span className="font-mono text-[9px] text-zinc-500">FAST & COLLABORATIVE</span>
              </div>
            </div>

            {/* Software Expertise Box */}
            <div className="w-full max-w-[91%] lg:max-w-[91%] mx-auto flex flex-col justify-between rounded-2xl white-glass white-glass-hover p-5.5 lg:p-7 transition-all duration-300">
              <div className="relative">
                <div className="flex items-center gap-2 mb-6 relative z-10">
                  <span className="w-8 h-[1px] bg-[#D8B56A]" />
                  <span className="font-mono text-xs text-[#D8B56A] font-bold tracking-widest uppercase">
                    SOFTWARE EXPERTISE
                  </span>
                </div>
                
                {/* Cinematic background particles, flares & mesh */}
                <ToolsBackground />

                {/* Staggered Entrance Container */}
                <ToolsContainer>
                  {["DaVinci Resolve", "CapCut", "Adobe Lightroom", "PicsArt"].map((software, idx) => (
                    <ToolCard
                      key={software}
                      name={software}
                      index={idx}
                      renderIcon={renderSoftwareIcon}
                    />
                  ))}
                </ToolsContainer>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
