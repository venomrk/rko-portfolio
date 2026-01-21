"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#daa520] to-[#b8860b] flex items-center justify-center font-bold text-[#0a0806] text-lg gold-glow transition-shadow group-hover:shadow-[0_0_40px_rgba(218,165,32,0.7)]">
            R
          </div>
          <span className="text-xl font-semibold text-[#f5f0e6] group-hover:text-[#daa520] transition-colors">
            RKO
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["Projects", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-[#f5f0e6]/60 hover:text-[#daa520] transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#daa520] to-[#ff6b35] transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/venomrk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-[#daa520]/20 hover:border-[#daa520]/60 hover:bg-[#daa520]/10 transition-all"
          >
            <svg className="w-5 h-5 text-[#daa520]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="mailto:rakshith098765@gmail.com"
            className="btn-gold text-sm py-2 px-4"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </motion.header>
  );
}
