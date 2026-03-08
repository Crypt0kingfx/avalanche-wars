"use client";

import { useEffect, useState } from "react";
import SnowBackground from "@/components/SnowBackground";

type LeaderboardEntry = {
  address: string;
  powerScore: number;
  totalValueEstimate: number;
  nftCount: number;
};

function getTier(score: number) {
  if (score >= 1000) return "APEX";
  if (score >= 500) return "COMMANDER";
  if (score >= 200) return "ELITE";
  if (score >= 50) return "SOLDIER";
  return "RECRUIT";
}

function getMedal(index: number) {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return `#${index + 1}`;
}

function AnimatedScore({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(counter);
      }
      setDisplay(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="text-2xl font-bold text-white">
      {display}
    </div>
  );
}

export default function LeaderboardPage() {
  const [ranked, setRanked] = useState<LeaderboardEntry[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeWallet(address: string) {
    const res = await fetch(`/api/analyze?address=${address}`);
    return res.json();
  }

  async function addWallet() {
    if (!input) return;
    setLoading(true);

    const data = await analyzeWallet(input);

    if (data.ok) {
      const newEntry: LeaderboardEntry = {
        address: data.address,
        powerScore: data.powerScore,
        totalValueEstimate: data.totalValueEstimate,
        nftCount: data.nftCount,
      };

      const updated = [...ranked, newEntry].sort(
        (a, b) => b.powerScore - a.powerScore
      );

      setRanked(updated);
      setInput("");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 relative z-10">
      <SnowBackground />

      <h1 className="text-4xl font-bold text-red-500 mb-6 text-center">
        Avalanche Wars Leaderboard
      </h1>

      {/* Wallet Input */}
      <div className="max-w-3xl mx-auto mb-8 flex gap-4">
        <input
          type="text"
          placeholder="Enter wallet address..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none"
        />
        <button
          onClick={addWallet}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold transition"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {/* Leaderboard */}
      <div className="max-w-4xl mx-auto space-y-4">
        {ranked.map((entry, index) => (
          <div
            key={entry.address}
            className={`flex items-center justify-between p-6 rounded-2xl border transition
              ${
                index === 0
                  ? "border-yellow-500 bg-yellow-500/10"
                  : index === 1
                  ? "border-gray-400 bg-gray-400/10"
                  : index === 2
                  ? "border-amber-700 bg-amber-700/10"
                  : "border-zinc-800 bg-zinc-950"
              }`}
          >
            <div className="flex items-center gap-6">
              <div className="text-2xl font-bold">
                {getMedal(index)}
              </div>

              <div>
                <div className="font-semibold">
                  {entry.address.slice(0, 6)}...
                  {entry.address.slice(-4)}
                </div>

                <div className="text-sm text-zinc-400">
                  NFTs: {entry.nftCount}
                </div>

                <div className="text-xs mt-1 text-red-400 font-bold">
                  {getTier(entry.powerScore)}
                </div>
              </div>
            </div>

            <div className="text-right">
              <AnimatedScore value={entry.powerScore} />
              <div className="text-sm text-zinc-500">
                Value: {entry.totalValueEstimate}
              </div>
            </div>
          </div>
        ))}

        {ranked.length === 0 && (
          <div className="text-center text-zinc-500 mt-10">
            No wallets analyzed yet.
          </div>
        )}
      </div>
    </main>
  );
}