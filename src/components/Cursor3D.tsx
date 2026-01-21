"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor3D() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", moveCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [moveCursor]);

  return (
    <>
      {/* Main cursor dot - neon green */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? 60 : 16,
          height: isHovering ? 60 : 16,
          opacity: isVisible ? 1 : 0,
          translateX: isHovering ? -30 : -8,
          translateY: isHovering ? -30 : -8,
          background: isHovering 
            ? "radial-gradient(circle, rgba(0, 255, 136, 0.2) 0%, transparent 70%)"
            : "#00ff88",
          boxShadow: isHovering 
            ? "0 0 40px rgba(0, 255, 136, 0.4)"
            : "0 0 20px rgba(0, 255, 136, 0.8), 0 0 40px rgba(0, 255, 136, 0.4)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
      />

      {/* Outer ring - purple accent */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? 80 : 50,
          height: isHovering ? 80 : 50,
          opacity: isVisible ? 0.6 : 0,
          translateX: isHovering ? -40 : -25,
          translateY: isHovering ? -40 : -25,
          border: "1px solid rgba(168, 85, 247, 0.5)",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
        }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
      />

      {/* Glowing trail - blue accent */}
      <motion.div
        className="pointer-events-none fixed z-[9997] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 120,
          height: 120,
          translateX: -60,
          translateY: -60,
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
