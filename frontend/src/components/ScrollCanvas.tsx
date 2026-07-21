import { useEffect, useRef } from "react";

/**
 * ScrollCanvas — Full-screen image-sequence scroll animation.
 * 
 * Plays 537 frames (sequence1: 300 + sequence2: 237) tied to scroll position.
 * 
 * FIX: Instead of clearRect (which shows black), we fill the canvas with
 * the site's deep-space gradient FIRST, then draw the frame on top.
 * This means even when frames haven't loaded yet, the canvas shows
 * the matching site background — never a black flash.
 */
export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Detect mobile / touch devices to load fewer frames and optimize performance
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const totalFramesSeq1 = 300;
    const totalFramesSeq2 = 237;
    const totalFrames = totalFramesSeq1 + totalFramesSeq2;

    const images: HTMLImageElement[] = [];
    const loadedStatus = new Array(totalFrames).fill(false);

    let currentFrame = 0;
    let targetFrame = 0;
    const lerpFactor = isMobile ? 0.3 : 0.08;
    let isAnimating = false;
    let animationId: number;

    // Helper to resolve paths relative to the public directory
    function getFramePath(index: number) {
      if (index < totalFramesSeq1) {
        const frameNum = String(index + 1).padStart(3, "0");
        return `/sequence1/ezgif-frame-${frameNum}.jpg`;
      } else {
        const frameNum = String(index - totalFramesSeq1 + 1).padStart(3, "0");
        return `/sequence2/ezgif-frame-${frameNum}.jpg`;
      }
    }

    // Fill canvas with the site's background gradient instead of black
    function fillBackground(ctx: CanvasRenderingContext2D) {
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "#050505");
      grad.addColorStop(0.4, "#0a0a0a");
      grad.addColorStop(1, "#050505");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Canvas scaling to simulate "object-fit: cover"
    function drawImageCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const ratioX = canvasWidth / imgWidth;
      const ratioY = canvasHeight / imgHeight;
      const ratio = Math.max(ratioX, ratioY);

      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;

      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      // Fill with gradient FIRST (no black flash)
      fillBackground(ctx);
      // Then draw the frame on top
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight, x, y, newWidth, newHeight);
    }

    // Robust nearest loaded frame resolver
    function findClosestLoadedFrame(index: number) {
      if (loadedStatus[index]) return index;

      let step = 1;
      while (step < totalFrames) {
        if (index - step >= 0 && loadedStatus[index - step]) {
          return index - step;
        }
        if (index + step < totalFrames && loadedStatus[index + step]) {
          return index + step;
        }
        step++;
      }
      return -1;
    }

    function renderFrame(index: number) {
      const frameToDraw = findClosestLoadedFrame(index);
      if (frameToDraw !== -1 && images[frameToDraw]) {
        drawImageCover(ctx, images[frameToDraw]);
      } else {
        // No frame loaded yet — show the gradient instead of black
        fillBackground(ctx);
      }
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      const currentIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(currentFrame)));
      renderFrame(currentIndex);
    }

    // Parallel preloading of all frames (load 3x fewer frames on mobile to save bandwidth/RAM)
    function preloadImages() {
      const frameStep = isMobile ? 3 : 1;
      for (let i = 0; i < totalFrames; i += frameStep) {
        images[i] = new Image();
        images[i].onload = () => {
          loadedStatus[i] = true;
          const currentIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(currentFrame)));
          if (i === currentIndex || (i === 0 && currentIndex === 0)) {
            renderFrame(currentIndex);
          }
        };
        images[i].onerror = () => {
          console.warn(`Failed to load frame ${i} at path: ${getFramePath(i)}`);
        };
        images[i].src = getFramePath(i);
      }
    }

    function animate() {
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) < 0.01) {
        currentFrame = targetFrame;
        isAnimating = false;
      } else {
        currentFrame += diff * lerpFactor;
        isAnimating = true;
      }

      const frameToRender = Math.min(totalFrames - 1, Math.max(0, Math.round(currentFrame)));
      renderFrame(frameToRender);

      if (isAnimating) {
        animationId = requestAnimationFrame(animate);
      }
    }

    function updateScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const scrollFraction = maxScroll <= 0 ? 0 : scrollY / maxScroll;
      targetFrame = scrollFraction * (totalFrames - 1);
      
      if (!isAnimating) {
        isAnimating = true;
        animationId = requestAnimationFrame(animate);
      }
    }

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", updateScroll, { passive: true });

    resizeCanvas();
    preloadImages();
    updateScroll();
    
    // Trigger initial render/animation run
    isAnimating = true;
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", updateScroll);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -2, // Back of the layer stack
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
