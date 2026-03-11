import { analyzeWallet } from "@/lib/analyzeWallet";
import { getOnChainScore } from "@/lib/avalancheWars";
import { getTier } from "@/lib/tier";

export default async function WalletPage({
  params,
}: {
  params: { address: string };
}) {
  const address = params?.address || "";

  if (!address) {
    return (
      <main className="p-8 text-white bg-black min-h-screen">
        Wallet address missing
      </main>
    );
  }

  let data = {
    powerScore: 0,
    nftCount: 0,
    totalValueEstimate: 0,
  };

  let onChainScore = 0;
  let tier = { name: "RECRUIT", color: "text-zinc-400" };

  try {
    const result = await analyzeWallet(address);

    if (result) {
      data = result;
    }
  } catch (err) {
    console.error("Analyzer failed:", err);
  }

  try {
    onChainScore = await getOnChainScore(address);
  } catch {
    onChainScore = 0;
  }

  try {
    tier = getTier(data.powerScore);
  } catch {
    tier = { name: "RECRUIT", color: "text-zinc-400" };
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">
        Avalanche Wars — Wallet Ranking
      </h1>

      <div className="mb-6 text-sm text-zinc-400 break-all">
        Address: {address}
      </div>

      <div className="space-y-6 max-w-3xl">

        <div className="p-8 rounded-3xl border border-cyan-500/30 bg-zinc-950">
          <div className="text-sm text-cyan-300 tracking-widest">
            RANKED XP
          </div>

          <div className={`text-5xl font-extrabold mt-2 ${tier.color}`}>
            {data.powerScore}
          </div>

          <div className="mt-2 text-xl font-semibold">
            {tier.name}
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="text-sm text-zinc-400">
            On-Chain Score
          </div>

          <div className="text-3xl font-bold">
            {onChainScore}
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="text-sm text-zinc-400">
            NFT Count
          </div>

          <div className="text-3xl font-bold">
            {data.nftCount}
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="text-sm text-zinc-400">
            Total Floor Value
          </div>

          <div className="text-3xl font-bold">
            {data.totalValueEstimate}
          </div>
        </div>

      </div>
    </main>
  );
}