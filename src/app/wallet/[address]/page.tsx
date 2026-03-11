import Link from "next/link";
import { analyzeWallet } from "@/lib/analyzeWallet";
import { getOnChainScore } from "@/lib/avalancheWars";
import { getTier } from "@/lib/tier";

type AnalyzeResponse = {
  ok: boolean;
  address: string;
  nftCount: number;
  floorByCollection?: Record<string, number>;
  totalValueEstimate: number;
  powerScore: number;
  sample: any[];
};

export default async function WalletPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {

  const { address } = await params;

  if (!address) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        Wallet address missing
      </main>
    );
  }

  let data: AnalyzeResponse = {
    ok: true,
    address,
    nftCount: 0,
    totalValueEstimate: 0,
    powerScore: 0,
    sample: [],
  };

  let onChainScore = 0;

  let tier = {
    name: "RECRUIT",
    color: "text-zinc-400",
  };

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
    tier = {
      name: "RECRUIT",
      color: "text-zinc-400",
    };
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-blue-950 text-white p-8">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

        <h1 className="text-4xl font-bold text-cyan-400">
          Avalanche Wars — Wallet Ranking
        </h1>

        <Link
          href="/leaderboard"
          className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
        >
          View Leaderboard
        </Link>

      </div>

      <div className="mb-10 text-sm text-zinc-400 break-all">
        Address: {address}
      </div>

      {/* DASHBOARD */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">

        {/* XP CARD */}

        <div className="p-8 rounded-3xl border border-cyan-500/40 bg-zinc-950 shadow-[0_0_40px_rgba(34,211,238,0.25)]">

          <div className="text-sm text-cyan-300 tracking-widest">
            RANKED XP
          </div>

          <div className={`text-5xl font-extrabold mt-2 ${tier.color}`}>
            {data.powerScore}
          </div>

          <div className="mt-2 text-xl font-semibold">
            {tier.name}
          </div>

          <div className="mt-6 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{ width: `${data.powerScore}%` }}
            />
          </div>

        </div>

        {/* ON CHAIN SCORE */}

        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">

          <div className="text-sm text-zinc-400">
            On-Chain Score
          </div>

          <div className="text-3xl font-bold">
            {onChainScore}
          </div>

        </div>

        {/* NFT COUNT */}

        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">

          <div className="text-sm text-zinc-400">
            NFT Count
          </div>

          <div className="text-3xl font-bold">
            {data.nftCount}
          </div>

        </div>

        {/* TOTAL VALUE */}

        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">

          <div className="text-sm text-zinc-400">
            Total Floor Value
          </div>

          <div className="text-3xl font-bold">
            {data.totalValueEstimate}
          </div>

        </div>

      </div>

      {/* NFT GALLERY */}

      {data.sample?.length > 0 && (

        <div className="mt-14">

          <h2 className="text-2xl font-bold mb-6 text-cyan-400">
            NFT Loadout
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {data.sample.map((nft: any, i: number) => (

              <div
                key={i}
                className="rounded-xl border border-cyan-500/20 bg-zinc-950 p-3 hover:scale-105 hover:border-cyan-400 transition"
              >

                <img
                  src={nft.display_image_url || nft.image_url}
                  alt={nft.name}
                  className="rounded-lg mb-2"
                />

                <div className="text-sm font-semibold">
                  {nft.name || "NFT"}
                </div>

                <div className="text-xs text-zinc-400">
                  {nft.collection}
                </div>

              </div>

            ))}

          </div>

        </div>

      )}

    </main>
  );
}