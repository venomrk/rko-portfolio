"use client";

import { motion } from "framer-motion";

const floatingIcons = [
  { icon: "⚡", color: "#00ff88", delay: 0, x: -200, y: -100, size: 60 },
  { icon: "🔮", color: "#a855f7", delay: 0.2, x: 200, y: -80, size: 50 },
  { icon: "💎", color: "#3b82f6", delay: 0.4, x: -150, y: 80, size: 45 },
  { icon: "🚀", color: "#ec4899", delay: 0.6, x: 180, y: 60, size: 55 },
  { icon: "⭐", color: "#eab308", delay: 0.8, x: -80, y: -150, size: 40 },
  { icon: "🎯", color: "#00ff88", delay: 1, x: 100, y: 120, size: 48 },
];

export default function Hero3D() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Light Leaks / Gradient Orbs */}
      <div className="light-leak light-leak-purple w-[600px] h-[600px] -top-40 -left-40" />
      <div className="light-leak light-leak-blue w-[500px] h-[500px] top-1/2 -right-40" />
      <div className="light-leak light-leak-green w-[400px] h-[400px] bottom-0 left-1/3" />

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
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
                boxShadow: `0 0 30px ${item.color}30, 0 0 60px ${item.color}15`,
              }}
            >
              <span style={{ fontSize: item.size * 0.5 }}>{item.icon}</span>
              {/* Particle dots */}
              <div className="particle" style={{ top: -8, left: '50%', animationDelay: `${i * 0.3}s` }} />
              <div className="particle" style={{ bottom: -6, right: 0, animationDelay: `${i * 0.3 + 0.5}s` }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Central Device / Content */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <span className="badge badge-purple">
            <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
            Portfolio 2026
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text-hero leading-tight">
          Discover your path
          <br />
          <span className="gradient-text">to Innovation</span>
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10">
          Learn about cutting-edge projects, explore open-source tools,
          <br className="hidden md:block" />
          and contribute to the future of technology.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="https://github.com/venomrk"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn-neon flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View GitHub
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline flex items-center gap-2"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ height: ["20%", "60%", "20%"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 bg-[#00ff88] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
