"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Cursor3D from "@/components/Cursor3D";
import Sidebar from "@/components/Sidebar";
import ProjectCard from "@/components/ProjectCard";
import { fetchGitHubRepos, GitHubRepo } from "@/lib/github";

export default function Home() {
  const [activeSection, setActiveSection] = useState("projects");
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<GitHubRepo | null>(null);

  useEffect(() => {
    async function loadRepos() {
      const data = await fetchGitHubRepos();
      setRepos(data);
      setLoading(false);
    }
    loadRepos();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Cursor3D />
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b border-[#333]">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <nav className="flex items-center text-sm text-[#888]">
                <span>RKO</span>
                <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-white capitalize">{activeSection}</span>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-64 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-white placeholder-[#888] focus:outline-none focus:border-[#22c55e] transition-colors"
                />
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <a
                href="https://github.com/venomrk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1a1a1a] border border-[#333] hover:border-[#22c55e] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        {activeSection === "dashboard" && (
          <section className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#22c55e]/20 via-[#3b82f6]/20 to-[#a855f7]/20 p-8 border border-[#333]"
            >
              <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-4">
                  Welcome to <span className="gradient-text">RKO Portfolio</span>
                </h1>
                <p className="text-lg text-[#aaa] max-w-2xl mb-6">
                  Explore my projects, contribute to open source, and discover how each tool works.
                  Every project is designed to solve real problems.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveSection("projects")}
                    className="px-6 py-3 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold transition-colors"
                  >
                    View Projects
                  </button>
                  <a
                    href="https://github.com/venomrk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg border border-[#333] hover:bg-[#2a2a2a] font-semibold transition-colors"
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#22c55e]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-[#3b82f6]/10 rounded-full blur-3xl" />
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {[
                { label: "Total Projects", value: repos.length, icon: "📁" },
                { label: "Total Stars", value: repos.reduce((a, r) => a + r.stargazers_count, 0), icon: "⭐" },
                { label: "Total Forks", value: repos.reduce((a, r) => a + r.forks_count, 0), icon: "🔀" },
                { label: "Languages", value: [...new Set(repos.map(r => r.language).filter(Boolean))].length, icon: "💻" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-[#1a1a1a] border border-[#333] hover:border-[#22c55e]/50 transition-colors"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-[#888]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Grid */}
        {activeSection === "projects" && (
          <section className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">My Projects</h2>
                <p className="text-[#888]">Open source projects and tools I&apos;ve built</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-black font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Activity
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 rounded-xl bg-[#1a1a1a] animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo, index) => (
                  <ProjectCard key={repo.id} repo={repo} index={index} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* About Section */}
        {activeSection === "about" && (
          <section className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h2 className="text-3xl font-bold mb-6">
                About <span className="gradient-text">RKO</span>
              </h2>
              <div className="prose prose-invert">
                <p className="text-lg text-[#aaa] mb-4">
                  I&apos;m O Rakshith Kumar, a passionate developer focused on building innovative
                  solutions. I believe in the power of open source and love to contribute to
                  projects that make a difference.
                </p>
                <p className="text-lg text-[#aaa] mb-6">
                  Each project in this portfolio represents a problem I&apos;ve encountered and
                  solved. I encourage you to explore, learn, and contribute!
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#333]">
                    <h3 className="font-semibold mb-2">🎯 Focus Areas</h3>
                    <ul className="text-[#aaa] text-sm space-y-1">
                      <li>• Web Development</li>
                      <li>• Machine Learning</li>
                      <li>• Open Source</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#333]">
                    <h3 className="font-semibold mb-2">🛠️ Tech Stack</h3>
                    <ul className="text-[#aaa] text-sm space-y-1">
                      <li>• TypeScript / Python</li>
                      <li>• Next.js / React</li>
                      <li>• Node.js / FastAPI</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === "contact" && (
          <section className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl"
            >
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-[#aaa] mb-6">
                Have a project idea or want to collaborate? Reach out!
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:rakshith098765@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a] border border-[#333] hover:border-[#22c55e] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#22c55e]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-[#888]">rakshith098765@gmail.com</div>
                  </div>
                </a>
                <a
                  href="https://github.com/venomrk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a] border border-[#333] hover:border-[#22c55e] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#22c55e]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#22c55e]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">GitHub</div>
                    <div className="text-sm text-[#888]">@venomrk</div>
                  </div>
                </a>
              </div>
            </motion.div>
          </section>
        )}
      </main>
    </div>
  );
}
