/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * CinematicGallery — Immersive 3D Showcase Section
 * Futuristic virtual exhibition room with circular arc panel layout,
 * deep-space atmosphere, reflective floor, and premium cinematic interactions.
 */

import React, { useState, useRef, useEffect, useCallback, useMemo, RefObject } from "react";
import {
  Play, Pause, X, Volume2, VolumeX, Maximize2, Minimize2,
  ChevronLeft, ChevronRight, Film
} from "lucide-react";
import { PORTFOLIO_PROJECTS } from "../data";
import { Project } from "../types";
import { motion, useMotionValue, AnimatePresence } from "motion/react";

/* ─────────────────────────────────────────────────────────────
   STARFIELD CANVAS
───────────────────────────────────────────────────────────── */
interface Star {
  x: number; y: number; r: number; speed: number;
  opacity: number; twinkleSpeed: number; twinkleOffset: number;
}
interface Nebula {
  x: number; y: number; r: number; color: string;
  driftX: number; driftY: number; opacity: number;
}

function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    // Build stars
    const N_STARS = 280;
    const stars: Star[] = Array.from({ length: N_STARS }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.3,
      speed: Math.random() * 0.12 + 0.02,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.025 + 0.008,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Build galaxy dust particles (smaller, denser)
    const N_DUST = 120;
    const dust: Star[] = Array.from({ length: N_DUST }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.7,
      r: Math.random() * 0.8 + 0.1,
      speed: Math.random() * 0.06 + 0.01,
      opacity: Math.random() * 0.3 + 0.05,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Nebula blobs
    const nebulae: Nebula[] = [
      { x: W * 0.2, y: H * 0.25, r: W * 0.22, color: "120,40,180", driftX: 0.08, driftY: 0.03, opacity: 0.07 },
      { x: W * 0.75, y: H * 0.55, r: W * 0.18, color: "255,45,85",  driftX: -0.06, driftY: 0.05, opacity: 0.05 },
      { x: W * 0.5, y: H * 0.1,  r: W * 0.14, color: "40,80,255",  driftX: 0.04, driftY: -0.04, opacity: 0.04 },
    ];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      stars.forEach(s => { s.x = Math.random() * W; s.y = Math.random() * H; });
      dust.forEach(s  => { s.x = Math.random() * W; s.y = Math.random() * H * 0.7; });
      nebulae.forEach((n, i) => {
        n.x = [W * 0.2, W * 0.75, W * 0.5][i];
        n.y = [H * 0.25, H * 0.55, H * 0.1][i];
        n.r = W * [0.22, 0.18, 0.14][i];
      });
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (t: number) => {
      timeRef.current = t;
      ctx.clearRect(0, 0, W, H);

      // Deep space gradient background
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0,   "#03000d");
      bg.addColorStop(0.4, "#060010");
      bg.addColorStop(0.7, "#080520");
      bg.addColorStop(1,   "#03000d");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Nebulae
      nebulae.forEach((n) => {
        const nx = n.x + Math.sin(t * 0.0003 * n.driftX) * 40;
        const ny = n.y + Math.cos(t * 0.0003 * n.driftY) * 20;
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.r);
        grad.addColorStop(0,   `rgba(${n.color},${n.opacity})`);
        grad.addColorStop(0.6, `rgba(${n.color},${n.opacity * 0.4})`);
        grad.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw galaxy dust
      dust.forEach(s => {
        s.y -= s.speed * 0.3;
        if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset);
        ctx.globalAlpha = s.opacity * twinkle;
        ctx.fillStyle   = "#c9c0ff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw stars
      stars.forEach(s => {
        s.y -= s.speed * 0.5;
        if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset);
        const alpha = s.opacity * (0.6 + 0.4 * twinkle);
        ctx.globalAlpha = alpha;

        // Bigger stars get a tiny halo
        if (s.r > 1.2) {
          const halo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
          halo.addColorStop(0, `rgba(255,255,255,${alpha * 0.5})`);
          halo.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle   = s.r > 1 ? "#ffffff" : "#e0e0ff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   ENVIRONMENT FX  (fog bands + light rays)
───────────────────────────────────────────────────────────── */
function EnvironmentFX() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-48"
        style={{ background: "linear-gradient(to bottom, #030008 0%, transparent 100%)" }} />

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: "linear-gradient(to top, #030008 0%, transparent 100%)" }} />

      {/* Fog layer 1 */}
      <div className="absolute inset-x-0" style={{
        top: "55%", height: "160px",
        background: "linear-gradient(to bottom, transparent, rgba(80,30,130,0.12) 50%, transparent)",
        animation: "fogDrift 12s ease-in-out infinite",
      }} />

      {/* Fog layer 2 */}
      <div className="absolute inset-x-0" style={{
        top: "65%", height: "120px",
        background: "linear-gradient(to bottom, transparent, rgba(30,10,80,0.18) 50%, transparent)",
        animation: "fogDrift 18s ease-in-out infinite reverse",
        animationDelay: "-5s",
      }} />

      {/* Volumetric light ray 1 */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, width: "180px",
        background: "linear-gradient(to right, transparent, rgba(255,45,85,0.04) 40%, rgba(255,45,85,0.06) 50%, rgba(255,45,85,0.04) 60%, transparent)",
        transform: "skewX(-15deg)",
        animation: "sweepLight 9s ease-in-out infinite",
        left: "-20%",
      }} />

      {/* Volumetric light ray 2 */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, width: "100px",
        background: "linear-gradient(to right, transparent, rgba(180,140,255,0.05) 50%, transparent)",
        transform: "skewX(-10deg)",
        animation: "sweepLight 14s ease-in-out infinite",
        animationDelay: "-4s",
        left: "-20%",
      }} />

      {/* Central ambient glow */}
      <div className="absolute" style={{
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%", height: "60%",
        background: "radial-gradient(ellipse at center, rgba(120,40,180,0.08) 0%, rgba(255,45,85,0.04) 40%, transparent 75%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   REFLECTIVE FLOOR
───────────────────────────────────────────────────────────── */
function ReflectiveFloor() {
  return (
    <div
      className="absolute inset-x-0 bottom-0 pointer-events-none cinema-reflection-shimmer"
      style={{
        height: "200px",
        zIndex: 1,
        background: `
          linear-gradient(
            to top,
            rgba(120,40,180,0.12) 0%,
            rgba(80,20,130,0.07) 30%,
            rgba(255,45,85,0.04) 60%,
            transparent 100%
          )
        `,
        backdropFilter: "blur(2px)",
        maskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
        borderTop: "1px solid rgba(180,100,255,0.1)",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   LENS FLARE
───────────────────────────────────────────────────────────── */
function LensFlare({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x, top: y,
        width: 120, height: 120,
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(255,200,80,0.55) 0%, rgba(255,100,40,0.3) 30%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(8px)",
        animation: "lensFlare 2.5s ease-out forwards",
        zIndex: 5,
        mixBlendMode: "screen",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   VIDEO PROGRESS BAR (for active panel)
───────────────────────────────────────────────────────────── */
function VideoProgressBar({ videoRef }: { videoRef: RefObject<HTMLVideoElement | null> }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const update = () => {
      if (vid.duration) setProgress((vid.currentTime / vid.duration) * 100);
    };
    vid.addEventListener("timeupdate", update);
    return () => vid.removeEventListener("timeupdate", update);
  }, [videoRef]);

  return (
    <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/10" style={{ zIndex: 10 }}>
      <div
        className="h-full cinema-progress-pulse"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(to right, #FF2D55, #FF6A3D)",
          transition: "width 0.5s linear",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PANEL REFLECTION
───────────────────────────────────────────────────────────── */
function PanelReflection({ thumbnail, isActive }: { thumbnail: string; isActive: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "100%",
        left: "2px", right: "2px",
        height: "90px",
        overflow: "hidden",
        transform: "scaleY(-1)",
        borderRadius: "0 0 16px 16px",
        opacity: isActive ? 0.35 : 0.18,
        transition: "opacity 0.6s ease",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <img
        src={thumbnail}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(2px) saturate(0.7)" }}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(80,20,140,0.3), rgba(5,0,20,0.6))",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD LAYOUT & STYLE HELPER
───────────────────────────────────────────────────────────── */
const getCardStyles = (diff: number, isMobile: boolean, isTablet: boolean) => {
  let spacing = 280;
  if (isMobile) spacing = 150;
  else if (isTablet) spacing = 200;

  // Linear position offset
  const x = diff * spacing;

  let rotateY = 0;
  if (diff !== 0) {
    // Rotate towards center
    rotateY = diff > 0 ? -15 : 15;
    if (Math.abs(diff) >= 2) {
      rotateY = diff > 0 ? -25 : 25;
    }
  }

  let scale = 1.0;
  let opacity = 1.0;
  let blur = 0;
  let z = 0;

  if (diff === 0) {
    scale = 1.0;
    opacity = 1.0;
    blur = 0;
    z = 120;
  } else if (Math.abs(diff) === 1) {
    scale = 0.88;
    opacity = 0.75;
    blur = 2;
    z = 0;
  } else {
    // Outer cards and beyond (fade out gradually)
    scale = 0.75;
    opacity = Math.max(0.0, 0.4 - (Math.abs(diff) - 2) * 0.15);
    blur = Math.min(8, 5 + (Math.abs(diff) - 2) * 2);
    z = -100 - (Math.abs(diff) - 2) * 50;
  }

  const zIndex = Math.max(1, 10 - Math.abs(diff));

  return { x, y: 0, z, rotateY, scale, opacity, blur, zIndex };
};

/* ─────────────────────────────────────────────────────────────
   INDIVIDUAL PANEL (CARD)
───────────────────────────────────────────────────────────── */
interface PanelProps {
  key?: React.Key;
  project: Project;
  diff: number;
  isActive: boolean;
  isAdjacent: boolean;
  isMobile: boolean;
  isTablet: boolean;
  onClick: () => void;
  onPlayClick: () => void;
}

function CinemaPanel({
  project, diff, isActive, isAdjacent, isMobile, isTablet, onClick, onPlayClick,
}: PanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const handleEnded = () => {
    setIsVideoPlaying(false);
    setHasEnded(true);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (vid) {
      if (hasEnded || vid.ended) {
        vid.currentTime = 0;
        setHasEnded(false);
      } else if (!hasPlayedOnce) {
        vid.currentTime = 0;
      }
      setIsAudioActive(true);
      setIsVideoPlaying(true);
      setHasPlayedOnce(true);
      vid.muted = false;
      vid.play().catch(() => {});
    }
  };

  const isSpecialCard = true;

  // Force reload when video source changes
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.load();
    }
  }, [project.videoUrl]);

  // Autoplay / pause based on active state
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isActive) {
      if (hasPlayedOnce) {
        if (isVideoPlaying && !hasEnded) {
          vid.muted = !isAudioActive;
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      } else {
        if (isVideoPlaying) {
          vid.muted = !isAudioActive;
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      }
    } else {
      vid.pause();
      if (!hasPlayedOnce) {
        setIsVideoPlaying(true);
      } else {
        setIsVideoPlaying(false);
      }
    }
  }, [isActive, isVideoPlaying, isAudioActive, hasPlayedOnce, hasEnded]);

  // Pause video on page scroll and resume silent autoplay on stop (if audio not enabled)
  useEffect(() => {
    if (!isActive || !isSpecialCard) return;

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      setIsVideoPlaying(false);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        if (!isAudioActive) {
          setIsVideoPlaying(true);
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isActive, isSpecialCard, isAudioActive]);

  const { x, y, z, rotateY, scale, opacity, blur, zIndex } = getCardStyles(diff, isMobile, isTablet);

  // Transition settings: easeOutExpo curve, 750ms duration
  const transition = {
    type: "tween",
    ease: [0.16, 1, 0.3, 1],
    duration: 0.75,
  };

  return (
    <motion.div
      onClick={() => {
        if (isActive && isSpecialCard && isVideoPlaying) {
          setIsVideoPlaying(false);
        } else {
          onClick();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "clamp(162px, 16.2vw, 252px)",
        aspectRatio: "9/16",
        transformOrigin: "center center",
        cursor: isActive ? "pointer" : "grab",
        willChange: "transform, opacity, filter",
      }}
      animate={{
        x: `calc(-50% + ${x}px)`,
        y: "-50%",
        z,
        rotateY,
        scale,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : "blur(0px)",
        zIndex,
      }}
      transition={transition}
    >
      {/* Panel card */}
      <motion.div
        style={{
          position: "relative",
          width: "100%", height: "100%",
          borderRadius: "20px",
          overflow: "visible",
          border: isActive
            ? "1.5px solid rgba(255,45,85,0.8)"
            : "1px solid rgba(255,255,255,0.08)",
          boxShadow: isActive
            ? "0 0 35px rgba(255,45,85,0.6), 0 0 70px rgba(255,45,85,0.2), 0 25px 50px rgba(0,0,0,0.7)"
            : "0 15px 35px rgba(0,0,0,0.5)",
          background: "rgba(10, 5, 20, 0.4)",
          backdropFilter: "blur(20px)",
          transformStyle: "preserve-3d",
        }}
        // Idle floating motion + hover scale reaction
        animate={{
          y: isActive ? [0, -8, 0] : [0, -5, 0],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: isActive ? 4 : 5,
            ease: "easeInOut",
            delay: diff * 0.4, // offset phases to feel alive
          }
        }}
        whileHover={isActive ? { scale: 1.03 } : {}}
      >
        {/* Glow ring for active panel */}
        {isActive && (
          <div
            className="cinema-ring-glow"
            style={{
              position: "absolute", inset: -3, borderRadius: "24px",
              pointerEvents: "none", zIndex: -1,
              background: "linear-gradient(135deg, #FF2D55, #FF6A3D)",
              opacity: 0.4,
              filter: "blur(8px)",
            }}
          />
        )}

        {/* Inner overflow-hidden wrapper */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "20px", overflow: "hidden",
          transformStyle: "preserve-3d",
        }}>
          {/* Thumbnail */}
          <motion.img
            src={project.thumbnail}
            alt={project.title}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover",
              filter: isActive ? "brightness(0.9) saturate(1.1)" : "brightness(0.55) saturate(0.8)",
            }}
            animate={{
              scale: isHovered && isActive ? 1.05 : 1.0,
            }}
            transition={{ duration: 0.5 }}
            referrerPolicy="no-referrer"
            loading="lazy"
          />

          {/* Autoplay video overlay (active panel) */}
          {(isActive || isSpecialCard) && (
            <video
              ref={videoRef}
              src={project.videoUrl}
              autoPlay={isActive}
              loop={!hasPlayedOnce}
              muted={!isAudioActive}
              playsInline
              preload="metadata"
              onEnded={handleEnded}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover",
                borderRadius: "inherit",
                zIndex: isActive ? 1 : -1,
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.5s ease",
                transform: "translateZ(0)", // GPU acceleration
              }}
            />
          )}

          {/* Dark gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: isActive
              ? "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%)",
            zIndex: 2,
            transition: "background 0.5s ease",
          }} />

          {/* Premium Glass Reflection Sheen */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 100%)",
              opacity: isActive ? 0.6 : 0.25,
              zIndex: 3,
              transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
              pointerEvents: "none",
            }}
          />

          {/* Category badge (top) */}
          {!isSpecialCard && (
            <div style={{ position: "absolute", top: 14, left: 14, zIndex: 4 }}>
              <span style={{
                fontSize: "9px", fontFamily: "JetBrains Mono, monospace",
                fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                color: isActive ? "#FF2D55" : "rgba(255,255,255,0.7)",
                background: "rgba(0,0,0,0.65)",
                border: isActive ? "1px solid rgba(255,45,85,0.5)" : "1px solid rgba(255,255,255,0.15)",
                padding: "4px 9px", borderRadius: "5px",
                backdropFilter: "blur(8px)",
                transition: "all 0.4s ease",
              }}>
                {project.category}
              </span>
            </div>
          )}

          {/* Duration badge */}
          {!isSpecialCard && (
            <div style={{ position: "absolute", top: 14, right: 14, zIndex: 4 }}>
              <span style={{
                fontSize: "9px", fontFamily: "JetBrains Mono, monospace",
                fontWeight: 600, color: "#D8B56A",
                background: "rgba(30,20,0,0.75)", border: "1px solid rgba(216,181,106,0.3)",
                padding: "4px 8px", borderRadius: "5px",
                backdropFilter: "blur(8px)",
              }}>
                {project.duration}
              </span>
            </div>
          )}

          {/* Play icon (center) */}
          {!isSpecialCard && (
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 4,
              pointerEvents: "none",
            }}>
              <motion.div
                style={{
                  width: 52, height: 52,
                  borderRadius: "50%",
                  background: isActive ? "rgba(255,45,85,0.9)" : "rgba(255,255,255,0.12)",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  backdropFilter: "blur(8px)",
                  boxShadow: isActive ? "0 0 25px rgba(255,45,85,0.6)" : "0 4px 15px rgba(0,0,0,0.4)",
                }}
                animate={{
                  scale: isActive ? (isHovered ? 1.1 : 1.0) : (isHovered ? 1.08 : 0.95),
                  opacity: isActive ? (isHovered ? 1.0 : 0.0) : 0.85,
                }}
                transition={{ duration: 0.3 }}
              >
                <Play style={{ width: 20, height: 20, fill: "white", color: "white", marginLeft: 2 }} />
              </motion.div>
            </div>
          )}

          {/* Premium Play Button for special cards */}
          <AnimatePresence>
            {isSpecialCard && isActive && (!isAudioActive || !isVideoPlaying || hasEnded) && (
              <motion.button
                onClick={handlePlayClick}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.12)",
                  border: "1.5px solid rgba(255, 255, 255, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  zIndex: 10,
                  boxShadow: "0 0 30px rgba(216, 181, 106, 0.4), 0 4px 15px rgba(0, 0, 0, 0.5)",
                }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 40px rgba(216, 181, 106, 0.65), 0 4px 20px rgba(0, 0, 0, 0.6)",
                }}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                aria-label="Play video"
              >
                <Play style={{ width: 24, height: 24, fill: "white", color: "white", marginLeft: 3 }} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Bottom info */}
          {!isSpecialCard && (
            <div style={{
              position: "absolute", bottom: 14, left: 14, right: 14, zIndex: 4,
            }}>
              <span style={{
                display: "block", fontSize: "9px",
                fontFamily: "JetBrains Mono, monospace",
                color: "rgba(200,200,210,0.75)", marginBottom: "4px",
              }}>
                {project.client} · {project.year}
              </span>
              <h3 style={{
                margin: 0, fontSize: "clamp(12px,1.2vw,15px)",
                fontFamily: "Ethnocentric, Branche, sans-serif", fontWeight: 700,
                color: isActive ? "#FF2D55" : "white",
                lineHeight: 1.2,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "color 0.4s ease",
                textShadow: isActive ? "0 0 15px rgba(255,45,85,0.4)" : "none",
              }}>
                {project.title}
              </h3>
            </div>
          )}

          {/* Progress bar (active panel) */}
          {isActive && <VideoProgressBar videoRef={videoRef} />}
        </div>

        {/* Reflection below panel */}
        <PanelReflection thumbnail={project.thumbnail} isActive={isActive} />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FULLSCREEN CINEMATIC PLAYER
───────────────────────────────────────────────────────────── */
interface FullscreenPlayerProps {
  project: Project;
  onClose: () => void;
}

function FullscreenPlayer({ project, onClose }: FullscreenPlayerProps) {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying]  = useState(true);
  const [muted,   setMuted]    = useState(false);
  const [fs,      setFs]       = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().catch(() => {});
    const onTime = () => { if (vid.duration) { setProgress(vid.currentTime / vid.duration * 100); } };
    const onMeta = () => setDuration(vid.duration);
    vid.addEventListener("timeupdate", onTime);
    vid.addEventListener("loadedmetadata", onMeta);
    return () => {
      vid.removeEventListener("timeupdate", onTime);
      vid.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (playing) vid.pause(); else vid.play().catch(() => {});
    setPlaying(!playing);
  };

  const resetHideTimer = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    vid.currentTime = pct * vid.duration;
  };

  const toggleFullscreen = () => {
    const el = document.documentElement;
    if (!fs) { el.requestFullscreen?.(); setFs(true); }
    else       { document.exitFullscreen?.(); setFs(false); }
  };

  const fmtTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const currentTime = duration ? progress / 100 * duration : 0;

  return (
    <div
      className="cinema-player-bg"
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(2,0,10,0.97)",
        backdropFilter: "blur(24px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "clamp(16px,3vw,48px)",
      }}
      onMouseMove={resetHideTimer}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 24, right: 24,
          padding: "10px", borderRadius: "50%",
          background: "rgba(30,10,50,0.8)",
          border: "1px solid rgba(255,45,85,0.3)",
          color: "rgba(255,255,255,0.7)",
          cursor: "pointer", zIndex: 10,
          transition: "all 0.2s ease",
          lineHeight: 0,
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = "rgba(255,45,85,0.3)"; e.currentTarget.style.color = "white"; }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = "rgba(30,10,50,0.8)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
        aria-label="Close player"
        title="Close (Esc)"
      >
        <X style={{ width: 20, height: 20 }} />
      </button>

      {/* Player wrapper */}
      <div className="cinema-player-content" style={{ width: "100%", maxWidth: "1000px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Video */}
        <div
          style={{
            position: "relative", aspectRatio: "16/9",
            borderRadius: "16px", overflow: "hidden",
            background: "#000",
            border: "1px solid rgba(255,45,85,0.2)",
            boxShadow: "0 0 80px rgba(255,45,85,0.2), 0 40px 100px rgba(0,0,0,0.7)",
          }}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted={muted}
            loop
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            referrerPolicy="no-referrer"
          />

          {/* Controls overlay */}
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            flexDirection: "column", justifyContent: "flex-end",
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
            opacity: showControls ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}>
            {/* Progress bar */}
            <div
              onClick={(e) => { e.stopPropagation(); seek(e); }}
              style={{
                width: "100%", height: 4,
                background: "rgba(255,255,255,0.15)",
                cursor: "pointer", position: "relative",
                marginBottom: 16,
              }}
            >
              <div style={{
                height: "100%", width: `${progress}%`,
                background: "linear-gradient(to right, #FF2D55, #FF6A3D)",
                transition: "width 0.3s linear",
                boxShadow: "0 0 8px rgba(255,45,85,0.8)",
              }} />
            </div>

            {/* Control row */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 20px 16px",
              gap: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Play/Pause */}
                <button
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  style={{
                    padding: 8, borderRadius: 8,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "white", cursor: "pointer", lineHeight: 0,
                  }}
                >
                  {playing
                    ? <Pause style={{ width: 16, height: 16 }} />
                    : <Play  style={{ width: 16, height: 16, fill: "white" }} />
                  }
                </button>

                {/* Mute */}
                <button
                  onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
                  style={{
                    padding: 8, borderRadius: 8,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: muted ? "rgba(255,255,255,0.4)" : "white",
                    cursor: "pointer", lineHeight: 0,
                  }}
                >
                  {muted ? <VolumeX style={{ width: 16, height: 16 }} /> : <Volume2 style={{ width: 16, height: 16 }} />}
                </button>

                {/* Time */}
                <span style={{ fontSize: 12, fontFamily: "JetBrains Mono, monospace", color: "rgba(255,255,255,0.6)" }}>
                  {fmtTime(currentTime)} / {fmtTime(duration)}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{
                  fontSize: 10, fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#FF2D55",
                  background: "rgba(255,45,85,0.1)",
                  border: "1px solid rgba(255,45,85,0.3)",
                  padding: "3px 8px", borderRadius: 4,
                }}>
                  {project.category}
                </span>

                {/* Fullscreen */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                  style={{
                    padding: 8, borderRadius: 8,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white", cursor: "pointer", lineHeight: 0,
                  }}
                >
                  {fs ? <Minimize2 style={{ width: 16, height: 16 }} /> : <Maximize2 style={{ width: 16, height: 16 }} />}
                </button>
              </div>
            </div>
          </div>

          {/* Pause play indicator */}
          {!playing && (
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: 72, height: 72, borderRadius: "50%",
              background: "rgba(255,45,85,0.8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 40px rgba(255,45,85,0.5)",
              pointerEvents: "none",
            }}>
              <Play style={{ width: 28, height: 28, fill: "white", color: "white", marginLeft: 4 }} />
            </div>
          )}
        </div>

        {/* Project info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "start" }}>
          <div>
            <span style={{
              display: "block", fontSize: 10,
              fontFamily: "JetBrains Mono, monospace",
              color: "#FF2D55", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              marginBottom: 6,
            }}>
              {project.client} · {project.year}
            </span>
            <h3 style={{
              margin: "0 0 10px", fontSize: "clamp(18px,2.5vw,28px)",
              fontFamily: "Ethnocentric, Branche, sans-serif", fontWeight: 700,
              color: "white",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              {project.title}
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(200,200,215,0.75)", lineHeight: 1.65 }}>
              {project.description}
            </p>
          </div>

          {/* Skills */}
          <div style={{
            minWidth: 180,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            padding: "16px 18px",
          }}>
            <span style={{
              display: "block", fontSize: 9,
              fontFamily: "JetBrains Mono, monospace",
              color: "rgba(200,200,200,0.5)",
              letterSpacing: "0.15em", textTransform: "uppercase",
              fontWeight: 700, marginBottom: 10,
            }}>
              Editing Pipeline
            </span>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {project.skills.map(skill => (
                <li key={skill} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#D8B56A", flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: "rgba(220,220,230,0.85)" }}>
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN GALLERY COMPONENT
───────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [flarePos, setFlarePos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  const DISPLAY_PROJECTS = useMemo(() => PORTFOLIO_PROJECTS.slice(0, 5), []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openProject) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, openProject]);

  // Rate-limited Mouse Wheel navigation
  const lastWheelTime = useRef(0);
  const onWheel = useCallback((e: WheelEvent) => {
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);

    // If vertical movement is dominant, ignore the event and allow normal page scrolling
    if (absY > absX) {
      return;
    }

    // Only prevent default and control carousel if horizontal scrolling is dominant
    e.preventDefault();
    const now = Date.now();
    if (now - lastWheelTime.current < 800) return;

    const threshold = 10;
    if (e.deltaX > threshold) {
      if (activeIndex < DISPLAY_PROJECTS.length - 1) {
        setActiveIndex(prev => prev + 1);
        lastWheelTime.current = now;
      }
    } else if (e.deltaX < -threshold) {
      if (activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
        lastWheelTime.current = now;
      }
    }
  }, [activeIndex, DISPLAY_PROJECTS.length]);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < DISPLAY_PROJECTS.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    const swipeThreshold = 50;
    const swipeVelocityThreshold = 200;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocityThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocityThreshold) {
      handlePrev();
    }
  };

  // Lens flare on panel hover
  const triggerFlare = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setFlarePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setFlarePos(null), 2500);
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        padding: "0 0 80px",
        background: "transparent",
      }}
    >
      {/* === BACKGROUND LAYERS === */}
      <StarfieldCanvas />
      <EnvironmentFX />
      <ReflectiveFloor />

      {/* Lens flare burst */}
      {flarePos && <LensFlare x={flarePos.x} y={flarePos.y} />}

      {/* === CONTENT === */}
      <div style={{ position: "relative", zIndex: 2 }}>

        {/* ── Header ── */}
        <div style={{
          textAlign: "center",
          padding: "0 24px",
          marginBottom: "clamp(32px, 5vw, 56px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ width: 32, height: 1, background: "#D8B56A" }} />
            <Film style={{ width: 14, height: 14, color: "#D8B56A" }} />
            <span style={{
              fontSize: 10, fontFamily: "JetBrains Mono, monospace",
              fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#D8B56A",
            }}>
              Director's Cut &amp; Works
            </span>
            <Film style={{ width: 14, height: 14, color: "#D8B56A" }} />
            <span style={{ width: 32, height: 1, background: "#D8B56A" }} />
          </div>

          <h2 style={{
            margin: "0 0 16px",
            fontFamily: "Ethnocentric, Branche, sans-serif",
            fontSize: "clamp(28px, 5vw, 56px)",
            fontWeight: 700, color: "#F8F6F2",
            letterSpacing: "0.08em", lineHeight: 1.1,
            textTransform: "uppercase",
          }}>
            Selected{" "}
            <span style={{
              background: "linear-gradient(135deg, #FF2D55 0%, #FF6A3D 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Showreel &amp; Works
            </span>
          </h2>

          <p style={{
            margin: "0 auto 0",
            maxWidth: 540,
            fontSize: "clamp(12px,1.1vw,15px)",
            color: "#9299A5",
            lineHeight: 1.7,
          }}>
            Explore a curated selection of high-end video editing projects inside this immersive virtual exhibition room.
            Swipe left/right, scroll with your wheel, or drag to navigate the showcase deck.
          </p>
        </div>

        {/* ── 3D Scene ── */}
        <div
          ref={sceneRef}
          style={{
            position: "relative",
            height: "clamp(480px, 70vh, 800px)",
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
            overflow: "visible",
            touchAction: "pan-y",
          }}
        >
          {/* Ambient floor glow beneath scene */}
          <div style={{
            position: "absolute",
            bottom: "8%", left: "20%", right: "20%",
            height: "80px",
            background: "radial-gradient(ellipse, rgba(120,40,180,0.2) 0%, transparent 80%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }} />

          {/* Cards Track (handles dragging and touch gestures) */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            style={{
              x: dragX,
              width: "100%",
              height: "100%",
              position: "relative",
              transformStyle: "preserve-3d",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {DISPLAY_PROJECTS.map((project, i) => {
              const diff = i - activeIndex;
              const isActive = i === activeIndex;
              const isAdjacent = Math.abs(diff) === 1;

              return (
                <CinemaPanel
                  key={project.id}
                  project={project}
                  diff={diff}
                  isActive={isActive}
                  isAdjacent={isAdjacent}
                  isMobile={isMobile}
                  isTablet={isTablet}
                  onClick={() => {
                    if (isDragging) return;
                    setActiveIndex(i);
                  }}
                  onPlayClick={() => {
                    setOpenProject(project);
                  }}
                />
              );
            })}
          </motion.div>

          {/* Nav arrows */}
          {activeIndex > 0 && (
            <button
              onClick={handlePrev}
              style={{
                position: "absolute",
                left: "clamp(12px, 3vw, 40px)",
                top: "50%", transform: "translateY(-50%)",
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(20,8,40,0.8)",
                border: "1px solid rgba(255,45,85,0.3)",
                color: "rgba(255,255,255,0.8)",
                cursor: "pointer", zIndex: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 20px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,45,85,0.3)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,45,85,0.7)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(20,8,40,0.8)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,45,85,0.3)"; }}
              aria-label="Previous card"
            >
              <ChevronLeft style={{ width: 20, height: 20 }} />
            </button>
          )}

          {activeIndex < DISPLAY_PROJECTS.length - 1 && (
            <button
              onClick={handleNext}
              style={{
                position: "absolute",
                right: "clamp(12px, 3vw, 40px)",
                top: "50%", transform: "translateY(-50%)",
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(20,8,40,0.8)",
                border: "1px solid rgba(255,45,85,0.3)",
                color: "rgba(255,255,255,0.8)",
                cursor: "pointer", zIndex: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 20px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,45,85,0.3)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,45,85,0.7)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(20,8,40,0.8)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,45,85,0.3)"; }}
              aria-label="Next card"
            >
              <ChevronRight style={{ width: 20, height: 20 }} />
            </button>
          )}
        </div>

        {/* ── Active Panel Info Strip ── */}
        {DISPLAY_PROJECTS.length > 0 && (
          <div style={{
            textAlign: "center",
            marginTop: "clamp(16px,3vw,32px)",
            padding: "0 24px",
          }}>
            {/* Dot indicators */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
              {DISPLAY_PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  style={{
                    width: i === activeIndex ? 24 : 8,
                    height: 8, borderRadius: 4,
                    background: i === activeIndex ? "#FF2D55" : "rgba(255,255,255,0.2)",
                    border: "none", cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                    boxShadow: i === activeIndex ? "0 0 12px rgba(255,45,85,0.5)" : "none",
                  }}
                  aria-label={`Go to card ${i + 1}`}
                />
              ))}
            </div>


          </div>
        )}
      </div>

      {/* ── Fullscreen Player ── */}
      {openProject && (
        <FullscreenPlayer
          project={openProject}
          onClose={() => setOpenProject(null)}
        />
      )}
    </section>
  );
}
