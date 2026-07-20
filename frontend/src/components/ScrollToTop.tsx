/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScrollAndResize = () => {
      const mobileWidth = window.innerWidth < 768;
      setIsMobile(mobileWidth);

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      if (scrollTop >= 20) {
        setIsVisible(true);
      } else if (scrollTop <= 0) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScrollAndResize);
    window.addEventListener("resize", handleScrollAndResize);
    
    // Initial check
    handleScrollAndResize();

    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const showButton = isVisible;

  // Base style configuration
  const buttonStyle: React.CSSProperties = {
    position: "fixed",
    bottom: isMobile ? "24px" : "32px",
    right: isMobile ? "20px" : "32px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    outline: "none",
    // Visibility toggle
    pointerEvents: showButton ? "auto" : "none",
    opacity: showButton ? 1 : 0,
    // Red Gradient or Brightened Red Gradient on Hover
    background: isHovered
      ? "linear-gradient(135deg, #FF6666, #FF456F, #FF1E2B)"
      : "linear-gradient(135deg, #FF4D4D, #FF2D55, #E50914)",
    // Shadow Glow (increased shadow on hover)
    boxShadow: isHovered
      ? "0 15px 45px rgba(255, 40, 40, 0.55)"
      : "0 10px 35px rgba(255, 40, 40, 0.35)",
    // Calculate transform chain dynamically for visibility, hover lift, active scale click
    transform: !isVisible
      ? "translateY(12px) scale(0.9)" // Slide down 12px and scale down when hidden
      : isActive
      ? "translateY(0) scale(0.95)"
      : isHovered
      ? "translateY(-5px) scale(1.08)"
      : "translateY(0) scale(1)",
    // Setup transition durations based on state
    transition: isActive
      ? "transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease"
      : isVisible
      ? "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), background 0.35s ease, box-shadow 0.35s ease"
      : "transform 0.25s ease, opacity 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      style={buttonStyle}
      aria-label="Scroll to top"
    >
      <ArrowUp size={26} color="white" strokeWidth={2.5} />
    </button>
  );
}
