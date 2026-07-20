import React, { useState, useEffect } from "react";
import { Download, X, Laptop, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      const dismissed = localStorage.getItem("pwa-prompt-dismissed");
      if (!dismissed) {
        setIsVisible(true);
      }
    };

    const handleAppInstalled = () => {
      console.log("[PWA] App installed successfully");
      setDeferredPrompt(null);
      setIsVisible(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] Installation outcome: ${outcome}`);
    
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("pwa-prompt-dismissed", "true");
  };

  if (!isVisible || isDismissed) return null;

  return (
    <AnimatePresence>
      {isMobile ? (
        /* Mobile Slide-Up Bottom Sheet */
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-5 pb-7 rounded-t-[32px] border-t border-white/20 white-glass shadow-[0_-12px_40px_rgba(0,0,0,0.3)] pointer-events-auto"
        >
          <div className="flex flex-col gap-5 items-center text-center">
            <div className="w-12 h-1 bg-white/10 rounded-full" />
            
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D8B56A] shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
              <Smartphone className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-display text-lg font-bold text-white mb-1.5">
                Sri Creations App
              </h4>
              <p className="text-zinc-400 text-xs font-sans max-w-[280px]">
                Install Sri Creations for a faster cinematic experience.
              </p>
            </div>

            <div className="flex gap-4 w-full mt-2">
              <button
                onClick={handleDismiss}
                className="flex-1 py-3 px-6 rounded-full font-sans text-xs font-semibold text-zinc-400 border border-white/10 hover:bg-white/5 hover:text-white transition-all duration-300"
              >
                Not Now
              </button>
              
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleInstallClick}
                className="flex-1 py-3 px-6 rounded-full font-sans text-xs font-semibold bg-white text-zinc-950 shadow-[0_4px_15px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 hover:bg-zinc-100 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Install
              </motion.button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Desktop Bottom Floating Card */
        <motion.div
          initial={{ x: 100, y: 50, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          exit={{ x: 100, y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="fixed bottom-6 right-6 z-50 p-4.5 rounded-2xl border border-white/12 white-glass shadow-[0_12px_48px_rgba(0,0,0,0.25)] pointer-events-auto flex items-center gap-4.5 max-w-[378px]"
        >
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D8B56A] shrink-0">
            <Laptop className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <h4 className="font-display text-sm font-bold text-white mb-0.5">
              Sri Creations
            </h4>
            <p className="text-zinc-400 text-[11px] font-sans leading-relaxed">
              Install Sri Creations for a faster cinematic experience.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleInstallClick}
              className="py-2 px-4 rounded-full font-sans text-[11px] font-bold bg-white text-zinc-950 shadow-[0_4px_12px_rgba(255,255,255,0.2)] flex items-center justify-center gap-1.5 hover:bg-zinc-100 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              Install
            </motion.button>
            
            <button
              onClick={handleDismiss}
              className="py-1.5 px-3 rounded-full font-sans text-[10px] font-semibold text-zinc-400 border border-white/5 hover:bg-white/5 hover:text-white transition-all duration-300"
            >
              Dismiss
            </button>
          </div>

          <button
            onClick={handleDismiss}
            className="absolute top-2.5 right-2.5 p-1 rounded-full text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
