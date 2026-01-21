"use client";

import { motion } from "framer-motion";

const navItems = [
    { id: "dashboard", icon: "📊" },
    { id: "alerts", icon: "🔔" },
    { id: "leaderboard", icon: "🏆" },
    { id: "bookmarks", icon: "🔖" },
];

export default function DashboardSidebar() {
    return (
        <aside className="fixed left-0 top-0 h-screen w-16 bg-[#09090b] border-r border-[#1e1e24] flex flex-col items-center py-6 gap-8 z-50">
            <div className="text-xl font-bold text-white mb-4">
                🔲
            </div>

            <nav className="flex flex-col gap-6">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:text-white hover:bg-[#18181b] transition-all"
                    >
                        <span className="text-lg">{item.icon}</span>
                    </button>
                ))}
            </nav>

            <div className="mt-auto flex flex-col gap-6">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:text-white transition-all">
                    ⚙️
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden border border-[#27272a]">
                    <img src="https://avatars.githubusercontent.com/u/172956658?v=4" alt="Profile" className="w-full h-full object-cover" />
                </button>
            </div>
        </aside>
    );
}
