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
  params: { address: string };
}) {
  const { address } = params;

  let data: AnalyzeResponse | null = null;
  let onChainScore = 0;
  let synced = false;
  let tier = { name: "RECRUIT", color: "text-zinc-400" };

  try {
    // Fetch wallet analysis
    const res = await fetch(
  `${process.env.NEXT_PUBLIC_SITE_URL}/api/analyze?address=${encodeURIComponent(address)}`,
  { cache: "no-store" }
);

data = await res.json();

    if (data?.ok) {
      // Read on-chain score
      try {
        onChainScore = await getOnChainScore(address);
      } catch (err) {
        console.error("On-chain read failed:", err);
        onChainScore = 0;
      }

      // Auto-sync score if needed
      if (data.powerScore > onChainScore) {
        try {
          console.log("AUTO SYNC TRIGGERED");

          const syncRes = await fetch(
            "https://avalanche-wars.vercel.app/api/sync",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                address,
                score: data.powerScore,
              }),
            }
          );

          const syncData = await syncRes.json();

          if (syncData.ok) {
            onChainScore = data.powerScore;
            synced = true;
          } else {
            console.error("Sync failed:", syncData);
          }
        } catch (err) {
          console.error("Auto sync error:", err);
        }
      }

      tier = getTier(data.powerScore);
    }
  } catch (err) {
    console.error("Wallet page error:", err);
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">
        Avalanche Wars — Wallet Ranking
      </h1>

      <div className="mb-6 text-sm text-zinc-400 break-all">
        Address: {address}
      </div>

      {!data?.ok && (
        <div className="text-red-500">
          Failed to load wallet data.
        </div>
      )}

      {data?.ok && (
        <div className="space-y-6 max-w-3xl">

          {/* XP Card */}
          <div className="p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-black via-zinc-950 to-black shadow-xl backdrop-blur-xl">

            <div className="text-sm text-cyan-300 tracking-widest">
              RANKED XP
            </div>

            <div className={`text-5xl font-extrabold mt-2 ${tier.color}`}>
              {data.powerScore}
            </div>

            <div className="mt-2 text-xl font-semibold tracking-wide">
              {tier.name}
            </div>

            {synced && (
              <div className="mt-2 text-xs text-green-400">
                ✓ Synced On-Chain
              </div>
            )}

            <div className="mt-6 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                style={{
                  width: `${Math.min(data.powerScore, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* On-chain score */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="text-sm text-zinc-400">
              On-Chain Score
            </div>
            <div className="text-3xl font-bold">
              {onChainScore}
            </div>
          </div>

          {/* NFT count */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="text-sm text-zinc-400">
              NFT Count
            </div>
            <div className="text-3xl font-bold">
              {data.nftCount}
            </div>
          </div>

          {/* Total value */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="text-sm text-zinc-400">
              Total Floor Value
            </div>
            <div className="text-3xl font-bold">
              {data.totalValueEstimate}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
