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
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold text-cyan-400 mb-6">
        Avalanche Wars — Wallet Ranking
      </h1>

      <div className="mb-6 text-sm text-zinc-400 break-all">
        Address: {address}
      </div>

      <div className="space-y-6 max-w-3xl">

        {/* XP CARD */}

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

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-6 text-cyan-400">
            NFT Loadout
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {data.sample.map((nft: any, i: number) => (

              <div
                key={i}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-3"
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