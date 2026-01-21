"use client";

import { motion } from "framer-motion";
import { GitHubRepo } from "@/lib/github";

interface TradeCardProps {
    repo: GitHubRepo;
}

export default function TradeCard({ repo }: TradeCardProps) {
    const isUp = Math.random() > 0.4;
    const percentage = (Math.random() * 20).toFixed(1);

    return (
        <div className="dashboard-card p-5 flex flex-col gap-4 animate-fadeIn">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#27272a] flex items-center justify-center text-lg">
                        {repo.language === 'TypeScript' ? '🟦' : repo.language === 'Python' ? '🐍' : '📄'}
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm uppercase tracking-tight">{repo.name}</h3>
                        <p className="text-[10px] text-muted-foreground">7/17/25 22c @1.97 <span className={isUp ? "text-green-500" : "text-red-500"}>{isUp ? '↑' : '↓'}{percentage}%</span></p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] px-2 py-0.5 rounded border border-[#27272a] text-muted-foreground uppercase font-bold">OPEN</span>
                    <span className="text-[9px] text-muted-foreground uppercase">UPD. 10H</span>
                </div>
            </div>

            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <div className="flex gap-4 text-[10px] uppercase font-bold">
                        <span className="text-muted-foreground">RISK: <span className="text-white">DEGEN</span></span>
                        <span className="text-muted-foreground">RISK/REWARD: <span className="text-white">0.63</span></span>
                    </div>
                    <div className="mt-2 text-[10px] text-muted-foreground bg-[#18181b] px-2 py-1 rounded inline-block">
                        POSITION TAKEN BAS...
                    </div>
                </div>

                <div className="w-24 h-12">
                    <svg className="w-full h-full" viewBox="0 0 100 40">
                        <path
                            d="M0 30 Q 25 10, 50 30 T 100 20"
                            fill="none"
                            stroke={isUp ? "#22c55e" : "#ef4444"}
                            strokeWidth="2"
                        />
                    </svg>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#27272a] pt-3 text-muted-foreground">
                <div className="flex gap-4">
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <span className="text-xs">👍</span> <span className="text-[10px] font-bold">1</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <span className="text-xs">💬</span> <span className="text-[10px] font-bold">0</span>
                    </button>
                    <button className="hover:text-white transition-colors">
                        <span className="text-xs">🔖</span>
                    </button>
                </div>
                <div className="flex gap-2">
                    <button className="text-muted-foreground hover:text-white">📤</button>
                    <button className="text-muted-foreground hover:text-white">⋯</button>
                </div>
            </div>
        </div>
    );
}
