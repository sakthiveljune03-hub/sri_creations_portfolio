/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, Instagram, Twitter, Linkedin, Phone, Rocket, Globe, Film } from "lucide-react";

export default function Contact() {
  const contactMethods = [
    {
      id: "whatsapp",
      title: "WhatsApp",
      link: "https://wa.me/6385945448?text=Hi%20Sri%20Creation!%20%F0%9F%91%8B%0A%0AI%20visited%20your%20portfolio%20website%20and%20I'm%20interested%20in%20your%20video%20editing%20services.%0A%0AI%20would%20like%20to%20discuss%20my%20project.%20Please%20get%20back%20to%20me.%20Thank%20you!",
      icon: (
        <svg className="w-[30px] h-[30px] text-[#25D366] transition-all duration-[250ms] ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(37,211,102,0.45)] group-hover:brightness-110 hover:animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.714-1.463L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.792 1.453 5.485.002 9.95-4.462 9.954-9.953.002-2.661-1.033-5.161-2.909-7.04C16.51 1.775 14.015.772 11.351.772c-5.49 0-9.956 4.462-9.96 9.953-.001 1.905.503 3.766 1.463 5.385L1.879 20.91l4.768-1.756zM17.472 14.382c-.32-.16-1.89-.879-2.18-.985-.29-.108-.5-.16-.71.16-.21.32-.8.985-.98 1.19-.18.204-.36.228-.68.068-1.55-.783-2.61-1.39-3.662-3.21-.28-.48.28-.445.8-.1.144-.092.274-.216.39-.36.08-.162.12-.326.06-.48-.06-.16-.71-1.7-.97-2.33-.25-.6-.52-.52-.71-.53-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.28 3.26.16.21 2.22 3.39 5.38 4.75 1.9.82 2.73.93 3.72.78.6-.09 1.89-.77 2.15-1.52.26-.75.26-1.4.18-1.52-.08-.12-.29-.19-.61-.35z"/>
        </svg>
      ),
      defaultStyle: "text-[#25D366]",
      hoverStyle: "group-hover:drop-shadow-[0_0_6px_rgba(37,211,102,0.45)] group-hover:brightness-110"
    },
    {
      id: "instagram",
      title: "Instagram",
      link: "https://www.instagram.com/avenix_core?igsh=eTIyd2N2ZWU5ejdr",
      icon: (
        <svg className="w-[30px] h-[30px] transition-all duration-[250ms] ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(255,79,163,0.45)] group-hover:brightness-110" viewBox="0 0 24 24" fill="none" stroke="url(#instagram-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      defaultStyle: "bg-gradient-to-r from-[#FF4FA3] to-[#FF7BC8] bg-clip-text text-transparent",
      hoverStyle: "group-hover:drop-shadow-[0_0_6px_rgba(255,79,163,0.45)] group-hover:brightness-110"
    },
    {
      id: "phone",
      title: "Phone Number",
      link: "tel:+919626359550",
      icon: (
        <svg className="w-[30px] h-[30px] transition-all duration-[250ms] ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(255,60,60,0.45)] group-hover:brightness-110 hover:animate-pulse" viewBox="0 0 24 24" fill="none" stroke="url(#phone-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      defaultStyle: "bg-gradient-to-r from-[#FF3C3C] to-[#FF6B6B] bg-clip-text text-transparent",
      hoverStyle: "group-hover:drop-shadow-[0_0_6px_rgba(255,60,60,0.45)] group-hover:brightness-110"
    }
  ];

  return (
    <section id="contact" className="pt-0 pb-28 bg-transparent relative px-6 overflow-hidden border-b border-zinc-900/50">
      {/* Background spotlights */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(255,45,85,0.04)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-[#D8B56A]" />
              <span className="font-mono text-xs text-[#D8B56A] font-bold tracking-widest uppercase">
                RESERVE PIPELINE LOCKS
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-[#F8F6F2]">
              Contact Me To Design <span className="bg-gradient-to-r from-[#FF2D55] to-[#FF6A3D] bg-clip-text text-transparent">Your Ideas & Videos</span>
            </h2>
            <p className="text-[#C9CDD4] text-sm md:text-base leading-relaxed mt-4 font-sans">
              Ready to scale your raw camera footage into high-end cinema cuts? Get in touch via our priority channels below.
            </p>
          </div>
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Social Contacts (Column span 5 on desktop) */}
          <div className="lg:col-span-5 order-2 md:order-1 lg:order-1 flex flex-col justify-center h-full">
            {/* Hidden SVG with linearGradient definitions for brand colors */}
            <svg width="0" height="0" className="absolute">
              <defs>
                {/* Instagram pink gradient */}
                <linearGradient id="instagram-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF4FA3" />
                  <stop offset="100%" stopColor="#FF7BC8" />
                </linearGradient>

                {/* Phone red/orange gradient */}
                <linearGradient id="phone-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF3C3C" />
                  <stop offset="100%" stopColor="#FF6B6B" />
                </linearGradient>
              </defs>
            </svg>

            {/* Vertical list of contact methods (Left Aligned on desktop, Centered on mobile) */}
            <div className="flex flex-col items-center lg:items-start justify-center gap-[28px] py-6 max-w-sm mx-auto lg:mx-0">
              {contactMethods.map((method) => (
                <a
                  key={method.id}
                  href={method.link}
                  target={method.id !== "phone" ? "_blank" : undefined}
                  rel={method.id !== "phone" ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3.5 select-none transition-all duration-[250ms] ease-out cursor-pointer"
                >
                  {/* Icon (28px - 32px) */}
                  <div className="transition-all duration-[250ms] ease-out">
                    {method.icon}
                  </div>

                  {/* Name */}
                  <span 
                    className={`font-display font-semibold text-lg transition-all duration-[250ms] ease-out ${method.defaultStyle} ${method.hoverStyle}`}
                  >
                    {method.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Availability Card (Column span 7 on desktop) */}
          <div className="lg:col-span-7 order-1 md:order-2 lg:order-2 flex justify-center lg:justify-end w-full">
            {/* New Project Availability Block (Glassmorphism, Hover lift/glow, Fade-in-up) */}
            <div className="white-glass white-glass-hover rounded-[32px] p-5 text-left transition-all duration-[500ms] ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(255,45,85,0.12)] border border-white/[0.08] animate-fade-in-up w-full max-w-[85%] lg:max-w-[80%] lg:mr-0">
              {/* Heading */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 shrink-0 shadow-[0_0_12px_rgba(249,115,22,0.3)] animate-pulse">
                  <Rocket className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-[#FF2D55] to-[#FF6A3D] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,45,85,0.4)]" style={{ fontFamily: "Ethnocentric, Branche, sans-serif" }}>
                  AVAILABLE FOR NEW PROJECTS
                </h3>
              </div>

              {/* Body Content / Subtitle */}
              <p className="text-white text-xs md:text-sm leading-relaxed mb-6" style={{ fontFamily: "'Randu Madu', sans-serif" }}>
                Currently accepting bookings for August 2026 and upcoming collaborations.
              </p>

              {/* Divider */}
              <div className="h-[1px] bg-white/5 w-full mb-5" />

              {/* Scope details */}
              <div className="flex flex-col gap-4 font-sans text-xs text-zinc-300" style={{ fontFamily: "'Randu Madu', sans-serif" }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-[#FF2D55] shrink-0 shadow-[0_0_10px_rgba(255,45,85,0.25)]">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-white leading-normal">Response within 10 to 20 min</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.25)]">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-white leading-normal">Available for remote and on-location projects</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.25)]">
                    <Film className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-white leading-normal">Open for reels, weddings, advertisements, and cinematic productions</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Social channels bottom footer */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center">
          <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-4">
            Follow Sriman&apos;s Creative updates:
          </span>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#FF2D55]/50 hover:bg-white/10 flex items-center justify-center transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://www.instagram.com/avenix_core?igsh=eTIyd2N2ZWU5ejdr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#FF2D55]/50 hover:bg-white/10 flex items-center justify-center transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#FF2D55]/50 hover:bg-white/10 flex items-center justify-center transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-[#FF2D55]/50 hover:bg-white/10 flex items-center justify-center transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
