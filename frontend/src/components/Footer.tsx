/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent relative px-6 py-16 overflow-hidden">

      {/* Subtle animated/glowing gradient division line at the top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#FF2D55] via-[#D8B56A] to-[#FF2D55] opacity-60" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand identity (Left Side) */}
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
            <p className="text-[8px] text-zinc-400 opacity-90 font-mono tracking-[0.8px] leading-[1.2] mt-[8px]">
              &copy; 2026 SRI CREATION. All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Copyright & Developer Credit (Right Side) */}
        <div className="text-center md:text-right relative">
          <span className="font-mono text-[11px] text-zinc-500 opacity-80 leading-[1.2]">
            Developed By <span className="font-semibold text-zinc-400 opacity-90">A_Core & Team</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
