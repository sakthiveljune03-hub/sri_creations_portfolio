/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent relative px-6 py-16 overflow-hidden">
      {/* SVG Gradient definition for Instagram icon */}
      <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }} aria-hidden="true">
        <linearGradient id="instagram-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="35%" stopColor="#DD2A7B" />
          <stop offset="65%" stopColor="#8134AF" />
          <stop offset="100%" stopColor="#515BD4" />
        </linearGradient>
      </svg>

      {/* Subtle animated/glowing gradient division line at the top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#FF2D55] via-[#D8B56A] to-[#FF2D55] opacity-60" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center translate-y-[8px]">
            <img
              src="/logo-images/brand_logo.png"
              alt="Sri Creation"
              className="w-[48px] h-[48px] object-contain"
            />
          </div>
          <div>
            <span className="font-komika text-sm font-bold tracking-wider text-white">
              SRI CREATION
            </span>
            <p className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase">
              VIDEO EDITOR
            </p>
            <p className="text-[8px] text-[rgba(255,255,255,0.55)] font-mono tracking-[0.8px] leading-[1.2] mt-[8px]">
              &copy; 2026 Sri Creation. All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center relative -translate-y-[15px]">
          <a
            href="https://www.instagram.com/avenix_core?igsh=eTIyd2N2ZWU5ejdr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-[10px] cursor-pointer group transition-all duration-300 ease"
          >
            <Instagram
              size={18}
              className="transition-transform duration-300 ease group-hover:scale-[1.08]"
              style={{ stroke: "url(#instagram-grad)" }}
            />
            <span className="font-mono text-[15px] font-medium text-[rgba(255,255,255,0.82)] tracking-[0.5px] transition-all duration-300 ease group-hover:text-[#E1306C] group-hover:drop-shadow-[0_0_8px_rgba(225,48,108,0.5)]">
              avenix_core
            </span>
          </a>
          <span className="font-mono text-[8px] text-zinc-400 opacity-90 block leading-[1.2]">
            &copy; 2026 ACore & Team. All Rights Reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
