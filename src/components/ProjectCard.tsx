"use client";

import { motion } from "framer-motion";
import { GitHubRepo, getLanguageColor } from "@/lib/github";

interface ProjectCardProps {
  repo: GitHubRepo;
  index: number;
}

export default function ProjectCard({ repo, index }: ProjectCardProps) {
  const formattedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="glass-card card-3d rounded-2xl overflow-hidden group relative"
    >
      {/* Fire glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#daa520] rounded-full blur-[80px] opacity-30" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#ff6b35] rounded-full blur-[60px] opacity-20" />
      </div>

      {/* Logo breaking top border */}
      <div className="absolute -top-6 left-6 z-10">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1a1510] to-[#0f0c08] border border-[#daa520]/30 flex items-center justify-center shadow-lg group-hover:shadow-[0_0_30px_rgba(218,165,32,0.4)] transition-shadow">
          {repo.language ? (
            <span
              className="text-2xl font-bold"
              style={{ color: getLanguageColor(repo.language) }}
            >
              {repo.language.charAt(0)}
            </span>
          ) : (
            <span className="text-2xl">🐉</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="pt-12 p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-[#f5f0e6] group-hover:text-[#daa520] transition-colors truncate pr-4">
            {repo.name}
          </h3>
          <span className="badge badge-gold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Active
          </span>
        </div>

        <p className="text-sm text-[#f5f0e6]/50 mb-4 line-clamp-2 min-h-[40px]">
          {repo.description || "An ancient artifact of code awaiting discovery"}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-4 text-sm text-[#f5f0e6]/40">
          {repo.language && (
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shadow-lg"
                style={{ 
                  backgroundColor: getLanguageColor(repo.language),
                  boxShadow: `0 0 10px ${getLanguageColor(repo.language)}40`
                }}
              />
              <span>{repo.language}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="text-[#ffd700]">⭐</span>
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🔀</span>
            <span>{repo.forks_count}</span>
          </div>
        </div>

        {/* Builders / Contributors Preview */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="avatar-stack">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-[#daa520] to-[#ff6b35]"
                  style={{ opacity: 1 - i * 0.2 }}
                />
              ))}
            </div>
            <span className="text-xs text-[#f5f0e6]/40">+ warriors</span>
          </div>
          <span className="text-xs text-[#f5f0e6]/30">{formattedDate}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold w-full flex items-center justify-center gap-2 text-sm"
        >
          <span>⚔️</span>
          View Project
        </a>
      </div>
    </motion.article>
  );
}
