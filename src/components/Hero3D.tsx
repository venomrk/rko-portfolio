"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const floatingIcons = [
  { icon: "🐉", color: "#daa520", delay: 0, x: -220, y: -120, size: 65 },
  { icon: "🔥", color: "#ff6b35", delay: 0.2, x: 210, y: -90, size: 55 },
  { icon: "⚔️", color: "#c0c0c0", delay: 0.4, x: -160, y: 90, size: 50 },
  { icon: "🏯", color: "#b8860b", delay: 0.6, x: 190, y: 70, size: 60 },
  { icon: "☯️", color: "#ffd700", delay: 0.8, x: -90, y: -160, size: 45 },
  { icon: "🎋", color: "#daa520", delay: 1, x: 110, y: 130, size: 52 },
];

export default function Hero3D() {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Ancient Temple"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0806]/50 to-[#0a0806]" />
      </div>

      {/* Fire Particle Overlay */}
      <div className="fire-bg" />

      {/* Light Leaks / Gradient Orbs - Fire Theme */}
      <div className="light-leak light-leak-gold w-[600px] h-[600px] -top-40 -left-40" />
      <div className="light-leak light-leak-ember w-[500px] h-[500px] top-1/2 -right-40" />
      <div className="light-leak light-leak-fire w-[400px] h-[400px] bottom-0 left-1/3" />

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: item.delay + 0.5, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-1/2 top-1/2 floating"
            style={{
              transform: `translate(${item.x}px, ${item.y}px)`,
              animationDelay: `${item.delay}s`,
            }}
          >
            <div
              className="relative flex items-center justify-center rounded-2xl glass-card"
              style={{
                width: item.size,
                height: item.size,
                boxShadow: `0 0 30px ${item.color}40, 0 0 60px ${item.color}20`,
              }}
            >
              <span style={{ fontSize: item.size * 0.5 }}>{item.icon}</span>
              {/* Ember particles */}
              <div className="ember-particle" style={{ top: -8, left: '50%', animationDelay: `${i * 0.3}s` }} />
              <div className="ember-particle" style={{ bottom: -6, right: 0, animationDelay: `${i * 0.3 + 0.5}s` }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Central Content */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-20 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <span className="badge badge-gold">
            <span className="w-2 h-2 rounded-full bg-[#daa520] animate-pulse" />
            Portfolio 2026
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text-hero">Forge Your Path</span>
          <br />
          <span className="gradient-text text-glow-gold">to Innovation</span>
        </h1>

        <p className="text-lg md:text-xl text-[#f5f0e6]/60 max-w-2xl mx-auto mb-10">
          Explore legendary projects, master cutting-edge tools,
          <br className="hidden md:block" />
          and join the journey of open-source warriors.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="https://github.com/venomrk"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn-gold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View GitHub
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline-gold flex items-center gap-2"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Explore Projects
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-[#daa520]/40 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ height: ["20%", "60%", "20%"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 bg-gradient-to-b from-[#daa520] to-[#ff6b35] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
