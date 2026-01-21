"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export default function DragonCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailIdRef = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 15, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Add fire trail
      trailIdRef.current += 1;
      setTrail((prev) => [
        ...prev.slice(-8),
        { x: e.clientX, y: e.clientY, id: trailIdRef.current },
      ]);
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

    // Cleanup old trail particles
    const cleanup = setInterval(() => {
      setTrail((prev) => prev.slice(-6));
    }, 100);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      clearInterval(cleanup);
    };
  }, [moveCursor]);

  if (!isMounted) return null;

  return (
    <>
      {/* Fire Trail Particles */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none fixed z-[9996] rounded-full"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            width: 8 - index * 0.5,
            height: 8 - index * 0.5,
            background: `radial-gradient(circle, rgba(255, 107, 53, ${0.8 - index * 0.1}) 0%, rgba(218, 165, 32, ${0.5 - index * 0.05}) 50%, transparent 100%)`,
            boxShadow: `0 0 ${10 - index}px rgba(255, 107, 53, ${0.6 - index * 0.08})`,
          }}
        />
      ))}

      {/* Main Dragon Cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: isHovering ? -40 : -24,
          translateY: isHovering ? -40 : -24,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            rotate: isHovering ? [0, 5, -5, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <Image
            src="/dragon-cursor.png"
            alt="Dragon Cursor"
            width={isHovering ? 80 : 48}
            height={isHovering ? 80 : 48}
            className="drop-shadow-[0_0_15px_rgba(218,165,32,0.8)] fire-flicker"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Fire Glow Ring */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? 100 : 70,
          height: isHovering ? 100 : 70,
          opacity: isVisible ? 0.4 : 0,
          translateX: isHovering ? -50 : -35,
          translateY: isHovering ? -50 : -35,
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.2) 0%, rgba(218, 165, 32, 0.1) 50%, transparent 70%)",
          boxShadow: "0 0 30px rgba(218, 165, 32, 0.3)",
        }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
      />

      {/* Ember Particles Around Cursor */}
      {isHovering && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="pointer-events-none fixed z-[9997]"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
              }}
              animate={{
                translateX: [0, Math.cos((i * 90 * Math.PI) / 180) * 40],
                translateY: [0, Math.sin((i * 90 * Math.PI) / 180) * 40],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#ff6b35" : "#daa520",
                  boxShadow: `0 0 10px ${i % 2 === 0 ? "#ff6b35" : "#daa520"}`,
                }}
              />
            </motion.div>
          ))}
        </>
      )}
    </>
  );
}
