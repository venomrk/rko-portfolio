"use client";

import { motion } from "framer-motion";

export default function TraderProfile() {
    return (
        <div className="flex items-center justify-between mb-8 animate-fadeIn">
            <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#27272a] shadow-xl">
                    <img src="https://avatars.githubusercontent.com/u/172956658?v=4" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-3xl font-bold text-white">glitchspx</h1>
                        <span className="text-blue-400">⚡</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">59 subscribers</p>
                    <div className="flex gap-2">
                        <span className="px-2 py-1 rounded bg-[#18181b] border border-[#27272a] text-[10px] uppercase font-bold text-muted-foreground">TOP 6</span>
                        <span className="px-2 py-1 rounded bg-[#18181b] border border-[#27272a] text-[10px] uppercase font-bold text-muted-foreground">SERIAL TRADER</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button className="px-4 py-2 bg-white text-black font-bold text-sm rounded-md hover:bg-gray-200 transition-colors">
                    Create Alert
                </button>
            </div>
        </div>
    );
}
