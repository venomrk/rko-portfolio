"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Cursor3D from "@/components/Cursor3D";
import Header from "@/components/Header";
import Hero3D from "@/components/Hero3D";
import ProjectCard from "@/components/ProjectCard";
import { fetchGitHubRepos, GitHubRepo } from "@/lib/github";

export default function Home() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadRepos() {
      const data = await fetchGitHubRepos();
      setRepos(data);
      setLoading(false);
    }
    loadRepos();
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Cursor3D />
      <Header />

      {/* Hero Section */}
      <Hero3D />

      {/* Featured Projects Section */}
      <section id="projects" className="relative py-24 px-6">
        {/* Background Effects */}
        <div className="light-leak light-leak-blue w-[500px] h-[500px] top-0 right-0" />
        
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-2"
              >
                Featured <span className="gradient-text">Projects</span>
              </motion.h2>
              <p className="text-white/50">
                See all projects{" "}
                <a href="https://github.com/venomrk" className="text-[#00ff88] hover:underline">
                  →
                </a>
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="toggle-container">
              <button
                onClick={() => setFilter("all")}
                className={`toggle-option ${filter === "all" ? "active" : ""}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("featured")}
                className={`toggle-option ${filter === "featured" ? "active" : ""}`}
              >
                Featured
              </button>
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => scrollCarousel("left")}
              className="carousel-arrow"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="carousel-arrow"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Projects Carousel */}
          {loading ? (
            <div className="flex gap-6 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="min-w-[320px] h-[320px] rounded-2xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              {repos
                .filter((r) => filter === "all" || r.stargazers_count > 0)
                .map((repo, index) => (
                  <div key={repo.id} className="min-w-[320px] snap-start pt-8">
                    <ProjectCard repo={repo} index={index} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: repos.length, label: "Projects", icon: "📁" },
              { value: repos.reduce((a, r) => a + r.stargazers_count, 0), label: "Stars", icon: "⭐" },
              { value: repos.reduce((a, r) => a + r.forks_count, 0), label: "Forks", icon: "🔀" },
              { value: [...new Set(repos.map((r) => r.language).filter(Boolean))].length, label: "Languages", icon: "💻" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center group hover:border-[#00ff88]/30"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white group-hover:text-[#00ff88] transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="light-leak light-leak-purple w-[400px] h-[400px] top-20 left-0" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge badge-green mb-6">About RKO</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Building the <span className="gradient-text">Future</span>
            </h2>
            <p className="text-lg text-white/50 mb-8 max-w-2xl mx-auto">
              I&apos;m O Rakshith Kumar, a passionate developer focused on building innovative
              open-source solutions. Each project represents a real problem solved with clean,
              maintainable code.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Next.js", "TypeScript", "Python", "Machine Learning", "Web3"].map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-full glass-card text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="light-leak light-leak-green w-[300px] h-[300px] bottom-0 right-1/4" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Let&apos;s <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-white/50 mb-8">
              Have a project idea or want to collaborate? Reach out!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:rakshith098765@gmail.com"
                className="btn-neon flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Me
              </a>
              <a
                href="https://github.com/venomrk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Profile
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© 2026 RKO. Built with Next.js & Framer Motion.</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/venomrk" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="mailto:rakshith098765@gmail.com" className="hover:text-white transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
