"use client";

import { GitHubRepo } from "@/lib/github";

interface StatsPanelProps {
    repos: GitHubRepo[];
}

export default function StatsPanel({ repos }: StatsPanelProps) {
    // Calculate specific stats
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
    const languages = [...new Set(repos.map(r => r.language).filter(Boolean))];
    const topLanguage = languages.length > 0
        ? languages.sort((a, b) =>
            repos.filter(r => r.language === b).length - repos.filter(r => r.language === a).length
        )[0]
        : "N/A";

    // Mock "Win Rate" based on non-empty repos (star count > 0)
    const activeRepos = repos.filter(r => r.stargazers_count > 0 || r.forks_count > 0).length;
    const winRate = repos.length > 0 ? Math.round((activeRepos / repos.length) * 100) : 0;

    return (
        <div className="w-80 flex flex-col gap-6 animate-fadeIn">
            <div className="dashboard-card p-6">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Trading Performance</h4>
                </div>

                {/* Radar Chart Placeholder */}
                <div className="relative aspect-square flex items-center justify-center mb-6">
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                        <polygon
                            points="100,20 180,80 150,170 50,170 20,80"
                            fill="rgba(59, 130, 246, 0.1)"
                            stroke="#3b82f6"
                            strokeWidth="1"
                        />
                        {/* Dynamic inner polygon shape based on stats */}
                        <polygon
                            points="100,50 140,80 120,130 80,130 60,80"
                            fill="rgba(59, 130, 246, 0.3)"
                            stroke="#3b82f6"
                            strokeWidth="2"
                        />
                        {/* Labels */}
                        <text x="100" y="15" textAnchor="middle" fill="#71717a" fontSize="8">STARS</text>
                        <text x="190" y="85" textAnchor="start" fill="#71717a" fontSize="8">FORKS</text>
                        <text x="155" y="185" textAnchor="middle" fill="#71717a" fontSize="8">ACTIVITY</text>
                        <text x="45" y="185" textAnchor="middle" fill="#71717a" fontSize="8">SCALE</text>
                        <text x="10" y="85" textAnchor="end" fill="#71717a" fontSize="8">IMPACT</text>
                    </svg>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Total Stars</p>
                        <p className="text-xl font-bold text-white">{totalStars}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Total Forks</p>
                        <p className="text-xl font-bold text-white">{totalForks}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Top Lang</p>
                        <p className="text-xl font-bold text-white">{topLanguage}</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-card p-6">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Active Rate</h4>
                    <span className="text-xl font-bold text-white">{winRate}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#18181b] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${winRate}%` }}></div>
                </div>
            </div>

            <div className="dashboard-card p-6">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Artifacts</h4>
                    <span className="text-xl font-bold text-white">{repos.length}</span>
                </div>
                <div className="w-full h-1.5 bg-[#18181b] rounded-full overflow-hidden">
                    <div className="h-full bg-white/20 w-full"></div>
                </div>
            </div>

            <button className="w-full py-2 text-muted-foreground hover:text-white text-xs font-bold transition-colors">
                Show All Stats ▼
            </button>
        </div>
    );
}
