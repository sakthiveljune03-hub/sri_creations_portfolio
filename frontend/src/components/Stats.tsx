/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Video, Eye, HeartHandshake, Award } from "lucide-react";
import { STATS } from "../data";
import { StatItem } from "../types";
import { motion } from "motion/react";

// Mechanical Odometer Roll Component for completed videos
function OdometerCounter({ isStarted, onComplete }: { isStarted: boolean; onComplete: () => void }) {
  const digits = ["1", "0", "0", "0"];
  const colConfigs = [
    { delay: 0.1, duration: 3.2, repeats: 1 },
    { delay: 0.2, duration: 3.3, repeats: 2 },
    { delay: 0.3, duration: 3.4, repeats: 3 },
    { delay: 0.4, duration: 3.5, repeats: 4 }
  ];

  useEffect(() => {
    if (!isStarted) return;
    const timer = setTimeout(() => {
      onComplete();
    }, 3900); // 3.5s duration + 0.4s max delay
    return () => clearTimeout(timer);
  }, [isStarted, onComplete]);

  if (!isStarted) {
    return <span>0</span>;
  }

  return (
    <span className="inline-flex items-center leading-none h-[1.15em]">
      {digits.map((digit, idx) => {
        const val = parseInt(digit) || 0;
        const config = colConfigs[idx];
        const numbers: number[] = [];
        for (let r = 0; r < config.repeats; r++) {
          numbers.push(...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        }
        numbers.push(val);

        const targetIndex = numbers.length - 1;

        return (
          <span
            key={idx}
            className="h-full overflow-hidden relative w-[0.62em] flex flex-col items-center select-none leading-none"
          >
            <motion.span
              initial={{ y: "0%" }}
              animate={{ y: `-${(targetIndex * 100) / numbers.length}%` }}
              transition={{
                duration: config.duration,
                delay: config.delay,
                ease: [0.16, 1, 0.3, 1] // easeOutExpo
              }}
              className="flex flex-col items-center justify-start w-full leading-none"
            >
              {numbers.map((n, nIdx) => (
                <span key={nIdx} className="h-[1.15em] flex items-center justify-center leading-none">
                  {n}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

// Animated Count-Up component
function StatCard({ stat, index }: { stat: StatItem; index: number; key?: string }) {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const isCounting = hasStarted && !isFinished;

  // Map icon strings to Lucide icon components
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Video":
        return <Video className="w-6 h-6 text-[#D8B56A]" />;
      case "Eye":
        return <Eye className="w-6 h-6 text-[#D8B56A]" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-6 h-6 text-[#D8B56A]" />;
      case "Award":
        return <Award className="w-6 h-6 text-[#D8B56A]" />;
      default:
        return <Video className="w-6 h-6 text-zinc-400" />;
    }
  };

  useEffect(() => {
    // 60% visibility scroll observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.6 } // triggers when approximately 60% of card is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    if (stat.icon === "Video") return; // Odometer component handles Completed Videos

    const startValue = 1;
    const endValue = stat.numericValue;
    if (startValue === endValue) return;

    const duration = 2000; // standard cards duration
    const startTime = performance.now();

    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    let animationFrameId: number;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);

      setCount(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
        setIsFinished(true);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, stat.numericValue, stat.icon]);

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl w-full max-w-[91%] mx-auto white-glass white-glass-hover p-5 md:p-7 flex flex-col justify-between overflow-hidden group transition-all duration-300"
    >
      {/* Background glow trail */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D55]/10 to-[#D8B56A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Soft gold shimmer sweep when count completes on completed videos card */}
      {isFinished && stat.icon === "Video" && (
        <motion.div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden z-10">
          <motion.div
            className="absolute top-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#D8B56A]/20 to-transparent -skew-x-12"
            initial={{ left: "-100%" }}
            animate={{ left: "200%" }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        </motion.div>
      )}

      {/* Celebration particle burst upon odometer completion */}
      {isFinished && stat.icon === "Video" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 flex items-center justify-center">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 360) / 12;
            const distance = 50 + Math.random() * 35;
            const x = Math.cos((angle * Math.PI) / 180) * distance;
            const y = Math.sin((angle * Math.PI) / 180) * distance;

            return (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 0.8 }}
                animate={{
                  scale: [0, 1.2, 0],
                  x: x,
                  y: y,
                  opacity: 0
                }}
                transition={{
                  duration: 1.3,
                  ease: "easeOut",
                  delay: 0.15
                }}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#D8B56A" : "#FF2D55"
                }}
              />
            );
          })}
        </div>
      )}

      {/* Card Content */}
      <div className="flex items-center justify-between mb-6">
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
          {renderIcon(stat.icon)}
        </div>
        <span className="font-mono text-xs text-zinc-600 tracking-wider">0{index + 1} // STAT</span>
      </div>

      <div>
        <motion.h3
          animate={
            isCounting
              ? {
                  textShadow: [
                    "0 0 4px rgba(255,255,255,0.1)",
                    "0 0 16px rgba(255,255,255,0.4)",
                    "0 0 4px rgba(255,255,255,0.1)"
                  ],
                  scale: 1
                }
              : isFinished
                ? {
                    scale: [1, 1.08, 1],
                    textShadow: "0 0 8px rgba(255,255,255,0.2)"
                  }
                : { scale: 1, textShadow: "none" }
          }
          transition={
            isCounting
              ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              : isFinished
                ? { duration: 0.5, ease: "easeOut" }
                : { duration: 0.3 }
          }
          style={{
            fontFamily: "Forte, Forte, cursive"
          }}
          className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 flex items-baseline select-none"
        >
          {stat.icon === "Video" ? (
            <OdometerCounter isStarted={hasStarted} onComplete={() => setIsFinished(true)} />
          ) : (
            count
          )}
          <span
            className={`font-mono ml-1.5 transition-all duration-700 ${
              isFinished && stat.icon === "Video"
                ? "text-[#D8B56A] drop-shadow-[0_0_12px_rgba(216,181,106,0.6)] font-bold scale-110"
                : "text-transparent bg-gradient-to-r from-[#FF2D55] to-[#FF6A3D] bg-clip-text"
            }`}
          >
            {stat.suffix}
          </span>
        </motion.h3>
        <p
          className="text-sm font-medium text-zinc-400 tracking-wide"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          {stat.label}
        </p>
      </div>

      {/* Decorative interactive mouse-glow border highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF2D55] to-[#D8B56A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="pt-0 pb-24 bg-transparent relative px-6 border-b border-zinc-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
