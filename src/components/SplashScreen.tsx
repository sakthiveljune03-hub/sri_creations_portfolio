import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Disc } from "lucide-react";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("sri-splash-shown");
    if (dismissed) {
      setShowSplash(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("sri-splash-shown", "true");
    }, 1500); // 1.5 seconds maximum duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07131f] select-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,45,85,0.08)_0%,_transparent_75%)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#D8B56A]/5 rounded-full blur-[80px]" />

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `floatParticle ${5 + Math.random() * 5}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes floatParticle {
                  0%, 100% { transform: translateY(0) scale(0.5); opacity: 0.1; }
                  50% { transform: translateY(-30px) scale(1.2); opacity: 0.4; }
                }
              `
            }} />
          </div>

          <div className="text-center relative z-10 flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-[#D8B56A] relative group"
            >
              <Disc className="w-12 h-12 animate-spin" style={{ animationDuration: "6s" }} />
              <div className="absolute inset-0 rounded-2xl border border-[#D8B56A]/20 animate-ping opacity-30" />
            </motion.div>

            <div className="flex flex-col items-center">
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="font-display text-2xl md:text-3xl font-bold tracking-[0.18em] text-[#F8F6F2] uppercase"
              >
                SRI CREATIONS
              </motion.h1>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                className="h-[1px] bg-gradient-to-r from-transparent via-[#D8B56A] to-transparent my-3.5"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-mono text-[9px] md:text-[10px] text-zinc-400 font-bold uppercase tracking-[0.25em]"
              >
                Cinematic Engine Loading
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
