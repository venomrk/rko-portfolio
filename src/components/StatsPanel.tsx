"use client";

import { motion } from "framer-motion";

export default function StatsPanel() {
    return (
        <div className="w-80 flex flex-col gap-6 animate-fadeIn">
            <div className="dashboard-card p-6">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Trades</h4>
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
                        <polygon
                            points="100,50 140,80 120,130 80,130 60,80"
                            fill="rgba(59, 130, 246, 0.3)"
                            stroke="#3b82f6"
                            strokeWidth="2"
                        />
                        {/* Labels */}
                        <text x="100" y="15" textAnchor="middle" fill="#71717a" fontSize="8">AVG RETURN</text>
                        <text x="190" y="85" textAnchor="start" fill="#71717a" fontSize="8">RISK REWARD</text>
                        <text x="155" y="185" textAnchor="middle" fill="#71717a" fontSize="8">AVG DRAWDOWN</text>
                        <text x="45" y="185" textAnchor="middle" fill="#71717a" fontSize="8">WIN RATE</text>
                        <text x="10" y="85" textAnchor="end" fill="#71717a" fontSize="8">PROFITABILITY</text>
                    </svg>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Avg. Win</p>
                        <p className="text-xl font-bold text-white">80.21%</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Avg. Loss</p>
                        <p className="text-xl font-bold text-white">15.94%</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Avg. Return</p>
                        <p className="text-xl font-bold text-white">29.98%</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-card p-6">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Win Rate</h4>
                    <span className="text-xl font-bold text-white">68.75%</span>
                </div>
                <div className="w-full h-1.5 bg-[#18181b] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[68.75%]"></div>
                </div>
            </div>

            <div className="dashboard-card p-6">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Trades</h4>
                    <span className="text-xl font-bold text-white">80</span>
                </div>
                <div className="w-full h-1.5 bg-[#18181b] rounded-full overflow-hidden">
                    <div className="h-full bg-white/20 w-[80%]"></div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="dashboard-card p-4">
                    <p className="text-[9px] text-muted-foreground uppercase font-bold mb-1">Break Even Rate</p>
                    <p className="text-lg font-bold text-white">50.94%</p>
                </div>
                <div className="dashboard-card p-4">
                    <p className="text-[9px] text-muted-foreground uppercase font-bold mb-1">Sum Gain</p>
                    <p className="text-lg font-bold text-white">2,451.70%</p>
                </div>
            </div>

            <button className="w-full py-2 text-muted-foreground hover:text-white text-xs font-bold transition-colors">
                Show All Stats ▼
            </button>
        </div>
    );
}
