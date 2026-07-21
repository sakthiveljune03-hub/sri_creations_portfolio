/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const targetPosRef = useRef({ x: 0, y: 0 });
  const isMobileDevice = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (isMobileDevice) return;

    const updateCoordinates = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setTargetPosition({ x, y });
      targetPosRef.current = { x, y };
      
      // Update CSS variables for mouse-reactive lighting
      document.documentElement.style.setProperty("--mouse-x", `${x}px`);
      document.documentElement.style.setProperty("--mouse-y", `${y}px`);
      document.documentElement.style.setProperty("--mouse-page-x", `${e.pageX}px`);
      document.documentElement.style.setProperty("--mouse-page-y", `${e.pageY}px`);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", updateCoordinates);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Initial check
    setHidden(false);

    // Sleek lerping loop for custom cursor lag feel
    let animationFrameId: number;
    const lerp = () => {
      setPosition((prev) => {
        const dx = targetPosRef.current.x - prev.x;
        const dy = targetPosRef.current.y - prev.y;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18,
        };
      });
      animationFrameId = requestAnimationFrame(lerp);
    };
    animationFrameId = requestAnimationFrame(lerp);

    // Track links, buttons and interactive elements for hover states
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .interactive-card"
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    // Re-run listener attachment on DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", updateCoordinates);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isMobileDevice]);

  if (hidden || isMobileDevice) return null;

  return (
    <>
      {/* Dynamic Cursor Circle */}
      <div
        id="custom-cursor-circle"
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-violet-500/50 mix-blend-screen transition-all duration-100 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block ${
          hovered ? "w-16 h-16 bg-violet-500/10 border-cyan-400" : "w-8 h-8 bg-transparent"
        } ${clicked ? "scale-90 bg-violet-400/20" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Inner Dot */}
      <div
        id="custom-cursor-dot"
        className={`fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block transition-transform duration-100 ${
          clicked ? "scale-50 bg-pink-500" : ""
        }`}
        style={{
          left: `${targetPosition.x}px`,
          top: `${targetPosition.y}px`,
        }}
      />

      {/* Global Mouse Reactive ambient glow overlay (extremely subtle) */}
      <div
        id="ambient-spotlight"
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300 opacity-20 bg-[radial-gradient(circle_300px_at_var(--mouse-x,_50%)_var(--mouse-y,_50%),_rgba(124,58,237,0.15),_transparent_80%)]"
      />
    </>
  );
}
