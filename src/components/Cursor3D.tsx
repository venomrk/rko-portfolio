"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor3D() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
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
      {/* Main cursor dot */}
      <motion.div
        className="custom-cursor pointer-events-none fixed z-[9999] rounded-full bg-white"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? 48 : 12,
          height: isHovering ? 48 : 12,
          opacity: isVisible ? 1 : 0,
          translateX: isHovering ? -24 : -6,
          translateY: isHovering ? -24 : -6,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500 }}
      />

      {/* Cursor ring */}
      <motion.div
        className="custom-cursor pointer-events-none fixed z-[9998] rounded-full border-2 border-[#22c55e]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
          opacity: isVisible ? 0.5 : 0,
          translateX: isHovering ? -32 : -20,
          translateY: isHovering ? -32 : -20,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />

      {/* Glowing trail */}
      <motion.div
        className="custom-cursor pointer-events-none fixed z-[9997] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 80,
          height: 80,
          translateX: -40,
          translateY: -40,
          background:
            "radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
