"use client";

import { GitHubRepo } from "@/lib/github";
import { formatDistanceToNow } from "date-fns";

interface TradeCardProps {
    repo: GitHubRepo;
}

export default function TradeCard({ repo }: TradeCardProps) {
    // Simulate some "trading" data based on repo stats
    const isUp = repo.stargazers_count > 0;
    const percentage = (repo.stargazers_count * 1.5 + repo.forks_count * 2).toFixed(1);
    const updatedTime = new Date(repo.updated_at).toLocaleDateString();
    const timeAgo = formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true });

    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-card p-5 flex flex-col gap-4 animate-fadeIn group hover:border-[#3f3f46] transition-all cursor-pointer block"
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#27272a] flex items-center justify-center text-lg">
                        {repo.language === 'TypeScript' ? '🟦' : repo.language === 'Python' ? '🐍' : '📄'}
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm uppercase tracking-tight group-hover:text-blue-400 transition-colors">{repo.name}</h3>
                        <p className="text-[10px] text-muted-foreground">{updatedTime} • <span className={isUp ? "text-green-500" : "text-red-500"}>{isUp ? '↑' : '•'} {percentage}% Impact</span></p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] px-2 py-0.5 rounded border border-[#27272a] text-muted-foreground uppercase font-bold">ACTIVE</span>
                    <span className="text-[9px] text-muted-foreground uppercase">UPD. {timeAgo}</span>
                </div>
            </div>

            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1 w-2/3">
                    <div className="flex gap-4 text-[10px] uppercase font-bold">
                        <span className="text-muted-foreground">LANG: <span className="text-white">{repo.language || 'N/A'}</span></span>
                        <span className="text-muted-foreground">SIZE: <span className="text-white">{repo.size} KB</span></span>
                    </div>
                    <div className="mt-2 text-[10px] text-muted-foreground bg-[#18181b] px-2 py-1 rounded inline-block truncate w-full">
                        {repo.description || "No description provided"}
                    </div>
                </div>

                <div className="w-24 h-12 opacity-50 group-hover:opacity-100 transition-opacity">
                    {/* Simple sparkline visual based on random seed from repo id */}
                    <svg className="w-full h-full" viewBox="0 0 100 40">
                        <path
                            d={`M0 30 Q 25 ${30 - (repo.id % 20)}, 50 30 T 100 20`}
                            fill="none"
                            stroke={isUp || repo.id % 2 === 0 ? "#22c55e" : "#ef4444"}
                            strokeWidth="2"
                        />
                    </svg>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#27272a] pt-3 text-muted-foreground">
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <span className="text-xs">⭐</span> <span className="text-[10px] font-bold">{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <span className="text-xs">🔱</span> <span className="text-[10px] font-bold">{repo.forks_count}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <span className="text-muted-foreground hover:text-white text-xs">↗ Open Repo</span>
                </div>
            </div>
        </a>
    );
}
