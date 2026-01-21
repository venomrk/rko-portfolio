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
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#00ff88] rounded-full blur-[80px] opacity-30" />
      </div>

      {/* Logo breaking top border */}
      <div className="absolute -top-6 left-6 z-10">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#0f0f18] border border-white/10 flex items-center justify-center shadow-lg group-hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-shadow duration-300">
          {repo.language ? (
            <span
              className="text-2xl font-bold"
              style={{ color: getLanguageColor(repo.language) }}
            >
              {repo.language.charAt(0)}
            </span>
          ) : (
            <svg className="w-6 h-6 text-[#00ff88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="pt-12 p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-white group-hover:text-[#00ff88] transition-colors truncate pr-4">
            {repo.name}
          </h3>
          <span className="badge badge-green shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Active
          </span>
        </div>

        <p className="text-sm text-white/50 mb-4 line-clamp-2 min-h-[40px]">
          {repo.description || "No description available"}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-4 text-sm text-white/40">
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
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
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
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-[#a855f7] to-[#3b82f6]"
                  style={{ opacity: 1 - i * 0.2 }}
                />
              ))}
            </div>
            <span className="text-xs text-white/40">+ contributors</span>
          </div>
          <span className="text-xs text-white/30">{formattedDate}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-neon w-full flex items-center justify-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View Project
        </a>
      </div>
    </motion.article>
  );
}
