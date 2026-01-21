"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import TraderProfile from "@/components/TraderProfile";
import TradeCard from "@/components/TradeCard";
import StatsPanel from "@/components/StatsPanel";
import { fetchGitHubRepos, GitHubRepo } from "@/lib/github";

export default function Home() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRepos() {
      const data = await fetchGitHubRepos();
      setRepos(data);
      setLoading(false);
    }
    loadRepos();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 flex gap-8 p-10 ml-16 overflow-y-auto">
          {/* Main Feed */}
          <div className="flex-1 max-w-3xl">
            <TraderProfile />

            <div className="mb-6 flex items-center justify-between border-b border-[#1e1e24] pb-2">
              <div className="flex gap-6">
                {["My Trades", "Bookmarked"].map((tab) => (
                  <button key={tab} className={`text-sm font-bold pb-2 transition-colors ${tab === "My Trades" ? "text-white border-b-2 border-white" : "text-muted-foreground hover:text-white"}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              {["Recents", "Popular", "Profitable"].map((filter) => (
                <button key={filter} className={`px-3 py-1 text-[10px] font-bold rounded uppercase transition-colors ${filter === "Recents" ? "bg-[#18181b] text-white border border-[#27272a]" : "text-muted-foreground hover:text-white"}`}>
                  {filter}
                </button>
              ))}
              <div className="ml-auto flex gap-2">
                <button className="text-muted-foreground hover:text-white p-1">🎚️</button>
                <button className="text-muted-foreground hover:text-white p-1">🔘</button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-48 rounded-xl bg-[#18181b] animate-pulse border border-[#27272a]" />
                ))
              ) : (
                repos.map((repo) => (
                  <TradeCard key={repo.id} repo={repo} />
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar Stats */}
          <StatsPanel />
        </main>
      </div>
    </div>
  );
}
