type AnalyzeResponse = {
  ok: boolean;
  address: string;
  chain: string;
  collection: string;
  totalValueEstimate: number;
  rarityIndex: number;
  powerScore: number;
  error?: string;
};

export default async function WalletPage({
  params,
}: {
  params: Promise<{ address: string }> | { address: string };
}) {
  const { address } = await Promise.resolve(params);

  const res = await fetch(
    `http://localhost:3000/api/analyze?address=${encodeURIComponent(address)}`,
    { cache: "no-store" }
  );
  const data = (await res.json()) as AnalyzeResponse;

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-red-500">Wallet Analysis</h1>

      <p className="text-zinc-300 mt-2">
        Address: <span className="text-white">{address}</span>
      </p>

      <div className="mt-8 grid gap-4 max-w-2xl">
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="text-zinc-400 text-sm">Collection</div>
          <div className="text-xl font-semibold">{data.collection}</div>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="text-zinc-400 text-sm">Power Score</div>
          <div className="text-4xl font-bold">{data.powerScore}</div>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="text-zinc-400 text-sm">Total Value Estimate</div>
          <div className="text-2xl font-semibold">{data.totalValueEstimate}</div>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="text-zinc-400 text-sm">Rarity Index</div>
          <div className="text-2xl font-semibold">{data.rarityIndex}</div>
        </div>
      </div>
    </main>
  );
}