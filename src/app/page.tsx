"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {

  const [address, setAddress] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!address) return;

    router.push(`/wallet/${address}`);
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* BACKGROUND IMAGE */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519681393784-d120267933ba')",
        }}
      />

      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* CONTENT */}

      <div className="relative z-10 w-full max-w-3xl text-center">

        <h1 className="text-6xl font-bold text-cyan-400 mb-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
          Avalanche Wars
        </h1>

        <p className="text-zinc-300 mb-10 text-lg">
          Discover the power of Avalanche wallets. Rank players by NFT strength,
          explore their assets, and compete on the global leaderboard.
        </p>

        {/* GLASS PANEL */}

        <div className="bg-white/5 border border-cyan-500/30 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.25)]">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4"
          >

            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Avalanche wallet address..."
              className="flex-1 px-4 py-3 rounded-lg bg-black/60 border border-zinc-700 outline-none focus:border-cyan-400"
            />

            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500 text-black rounded-lg font-semibold hover:bg-cyan-400 transition shadow-lg"
            >
              Analyze Wallet
            </button>

          </form>

        </div>

        {/* NAV LINKS */}

        <div className="mt-10 flex justify-center gap-8 text-cyan-400">

          <Link href="/leaderboard" className="hover:underline">
            Global Leaderboard
          </Link>

          <Link href="/" className="hover:underline">
            Wallet Analyzer
          </Link>

        </div>

      </div>
    </main>
  );
}