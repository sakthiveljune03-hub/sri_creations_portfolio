/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { 
  Film, Camera, Palette, Heart, Video, User, Activity, Plus, Minus, ArrowRight, CheckCircle2, Mic
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import { SERVICES } from "../data";
import { ServiceItem } from "../types";

export default function Services() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  return (
    <section id="services" className="pt-0 pb-28 bg-transparent relative px-6 overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(255,45,85,0.025)_0%,_transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D55] animate-pulse" />
            <span 
              className="text-[10px] md:text-xs text-zinc-400 font-bold uppercase"
              style={{
                fontFamily: '"Ethnocentric", "Branche", sans-serif',
                letterSpacing: '0.12em',
                lineHeight: '1.2'
              }}
            >
              My Expertise & Arsenal
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase"
            style={{
              fontFamily: '"Ethnocentric", "Branche", sans-serif',
              letterSpacing: '0.08em',
              lineHeight: '1.2'
            }}
          >
            STORIES CRAFTED THROUGH<br />
            <span className="bg-gradient-to-r from-[#FF2D55] via-[#FF4D4D] to-[#FF6A3D] bg-clip-text text-transparent">
              CREATIVITY & CINEMATIC VISION
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-[#C9CDD4] text-sm md:text-base leading-relaxed font-sans max-w-3xl mx-auto"
          >
            From cinematic reels and commercial advertisements to photography and creative branding, every project is designed to inspire, engage, and leave a lasting impression.
          </motion.p>
        </div>

        {/* Services Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start mt-12">
          {SERVICES.map((service: ServiceItem, index: number) => (
            <ServiceCard 
              key={service.id}
              service={service}
              index={index}
              expandedCard={expandedCard}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

const ServiceCard: React.FC<{
  service: ServiceItem;
  index: number;
  expandedCard: string | null;
  toggleExpand: (id: string) => void;
}> = ({ service, index, expandedCard, toggleExpand }) => {
  const isExpanded = expandedCard === service.id;
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse coords relative to card dimensions (for 3D tilt & magnet)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mouse coords in pixels (for spotlight radial glow)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring physics for smooth tilt and magnet movement
  const springConfig = { stiffness: 100, damping: 20 };
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const magnetX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);
  const magnetY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-7, 7]), springConfig);

  const liftY = useSpring(isHovered ? -10 : 0, springConfig);

  // Combine lift and magnet
  const transformY = useTransform([liftY, magnetY], ([l, m]) => (l as number) + (m as number));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);

    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Motion template for dynamic radial border gradient glow
  const borderGlowBg = useMotionTemplate`radial-gradient(circle 200px at ${cursorX}px ${cursorY}px, rgba(255, 45, 85, 0.18) 0%, transparent 100%)`;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Film":
        return <Film className="w-5 h-5 text-[#FF2D55]" />;
      case "Camera":
        return <Camera className="w-5 h-5 text-[#FF2D55]" />;
      case "Palette":
        return <Palette className="w-5 h-5 text-[#FF2D55]" />;
      case "Heart":
        return <Heart className="w-5 h-5 text-[#FF2D55]" />;
      case "Video":
        return <Video className="w-5 h-5 text-[#FF2D55]" />;
      case "User":
        return <User className="w-5 h-5 text-[#FF2D55]" />;
      case "Activity":
        return <Activity className="w-5 h-5 text-[#FF2D55]" />;
      case "Mic":
        return <Mic className="w-5 h-5 text-[#FF2D55]" />;
      default:
        return <Film className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => toggleExpand(service.id)}
      style={{
        x: magnetX,
        y: transformY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group relative rounded-2xl p-5 lg:p-6 cursor-pointer select-none bg-white/[0.02] hover:bg-white/[0.035] border border-white/[0.08] backdrop-blur-md hover:backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#FF2D55]/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_20px_rgba(255,45,85,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-500 ease-out w-full max-w-[91%] mx-auto"
    >
      {/* ─── DYNAMIC SPOTLIGHT GLOW BORDER SHINE (FOLLOWS CURSOR) ─── */}
      <motion.div 
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: borderGlowBg,
        }}
      />

      {/* ─── LIGHTING SWEEP REFLECTION EFFECT (TRIGGERS ON CURSOR ENTER) ─── */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-10">
        <motion.div
          animate={isHovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="absolute inset-0 w-[200%] h-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
        />
      </div>

      <div className="relative z-20">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Animated Icon Container */}
            <motion.div 
              animate={isHovered ? { scale: 1.1, y: [0, -3, 0] } : { scale: 1, y: 0 }}
              transition={
                isHovered 
                  ? { scale: { duration: 0.3 }, y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
                  : { duration: 0.3 }
              }
              className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:bg-white/10 group-hover:border-[#FF2D55]/30 transition-all duration-300"
            >
              {getIcon(service.icon)}
            </motion.div>
            <h3 
              className="font-bold text-base lg:text-lg text-white group-hover:text-[#FF2D55] transition-colors"
              style={{
                fontFamily: '"Ethnocentric", "Branche", sans-serif',
                letterSpacing: '0.08em',
                lineHeight: '1.2',
                textTransform: 'uppercase'
              }}
            >
              {service.title}
            </h3>
          </div>

          {/* Expand Plus/Minus indicator */}
          <div className={`p-1.5 rounded-lg border transition-all duration-300 ${
            isExpanded
              ? "bg-white/10 border-white/20 text-[#FF2D55] rotate-180"
              : "bg-white/5 border border-white/10 text-zinc-500 group-hover:text-zinc-300 group-hover:border-white/20"
          }`}>
            {isExpanded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </div>
        </div>

        {/* Primary Description */}
        <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-sans">
          {service.description}
        </p>

        {/* Expanded Details List (Expand on Click) */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-[500px] opacity-100 mt-5 pt-5 border-t border-white/5" : "max-h-0 opacity-0"
          }`}
        >
          {/* Animated reveal container for content lists */}
          <motion.div
            animate={isHovered ? { y: -4, opacity: 1 } : { y: 0, opacity: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Sub-services Bullet Grid */}
            <div>
              <span 
                className="text-[9px] text-zinc-500 font-bold uppercase block mb-2"
                style={{
                  fontFamily: '"Ethnocentric", "Branche", sans-serif',
                  letterSpacing: '0.1em',
                  lineHeight: '1.2'
                }}
              >
                {service.listTitle}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {service.listItems.map((item, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/8 text-zinc-300 font-sans">
                    • {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Features Included List */}
            <div className="mt-4">
              <span 
                className="text-[9px] text-zinc-500 font-bold uppercase block mb-2"
                style={{
                  fontFamily: '"Ethnocentric", "Branche", sans-serif',
                  letterSpacing: '0.1em',
                  lineHeight: '1.2'
                }}
              >
                Includes:
              </span>
              <ul className="grid grid-cols-1 gap-1.5">
                {service.extendedDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[10px] text-zinc-300 font-sans">
                    <CheckCircle2 className="w-3 h-3 text-[#FF2D55] shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 text-[9px] font-mono text-[#FF2D55] font-bold tracking-wider uppercase mt-5 hover:text-[#FF4D4D] transition-colors">
              <span>Discuss Service pipeline</span>
              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>

        {!isExpanded && (
          <p className="text-[9px] font-mono text-zinc-500 tracking-wider uppercase mt-4 group-hover:text-zinc-400 transition-colors">
            Click to view details & scope &rarr;
          </p>
        )}
      </div>
    </motion.div>
  );
}
