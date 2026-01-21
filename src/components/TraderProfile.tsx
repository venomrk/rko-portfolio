"use client";

import { GitHubUser } from "@/lib/github";

interface TraderProfileProps {
    user: GitHubUser | null;
}

export default function TraderProfile({ user }: TraderProfileProps) {
    if (!user) return null;

    return (
        <div className="flex items-center justify-between mb-8 animate-fadeIn">
            <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#27272a] shadow-xl">
                    <img src={user.avatar_url} alt={user.login} className="w-full h-full object-cover" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-3xl font-bold text-white">{user.name || user.login}</h1>
                        <span className="text-blue-400">⚡</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                        <span className="text-white font-bold">{user.followers}</span> followers · <span className="text-white font-bold">{user.following}</span> following
                    </p>
                    <div className="flex gap-2">
                        <span className="px-2 py-1 rounded bg-[#18181b] border border-[#27272a] text-[10px] uppercase font-bold text-muted-foreground">TOP CONTRIBUTOR</span>
                        <span className="px-2 py-1 rounded bg-[#18181b] border border-[#27272a] text-[10px] uppercase font-bold text-muted-foreground">SERIAL BUILDER</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white text-black font-bold text-sm rounded-md hover:bg-gray-200 transition-colors"
                >
                    View Profile
                </a>
            </div>
        </div>
    );
}
