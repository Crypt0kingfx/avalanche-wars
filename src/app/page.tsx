"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [address, setAddress] = useState("");

  function go() {
    const a = address.trim();
    if (!a) return;
    router.push(`/wallet/${a}`);
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold mb-6 text-red-500">Avalanche Wars</h1>

      <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
        Wallet Intelligence & NFT Power Rankings
      </p>

      <div className="w-full max-w-xl flex gap-3">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Paste wallet address (0x...)"
          className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white outline-none"
        />
        <button
          onClick={go}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-lg font-semibold transition"
        >
          Analyze
        </button>
      </div>

      <p className="text-sm text-zinc-500 mt-4">
        Tip: paste any wallet you want to demo.
      </p>
    </main>
  );
}