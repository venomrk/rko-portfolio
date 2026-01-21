"use client";

import { motion } from "framer-motion";

export default function DashboardHeader() {
    return (
        <header className="h-14 border-b border-[#1e1e24] flex items-center justify-between px-8 bg-[#09090b]/50 backdrop-blur-md sticky top-0 z-40 ml-16">
            <nav className="flex items-center gap-8">
                {["Alerts", "Leaderboard", "Bookmarks"].map((item) => (
                    <button
                        key={item}
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                    >
                        {item}
                    </button>
                ))}
            </nav>

            <div className="flex items-center gap-4 text-muted-foreground text-xs">
                <span>Compare with:</span>
                <button className="flex items-center gap-1 text-white font-medium">
                    average user <span className="text-[10px]">▼</span>
                </button>
            </div>
        </header>
    );
}
