import { getWalletNfts, getCollectionStats } from "@/lib/opensea";

export async function analyzeWallet(address: string) {
  const nfts = await getWalletNfts(address);

  if (!nfts) {
    return { ok: false };
  }

  const collections: Record<string, number> = {};

  for (const nft of nfts) {
    const slug = nft.collection;

    if (!collections[slug]) {
      try {
        const stats = await getCollectionStats(slug);
        collections[slug] = stats?.floor_price || 0;
      } catch {
        collections[slug] = 0;
      }
    }
  }

  const totalValueEstimate = Object.values(collections).reduce(
    (a, b) => a + b,
    0
  );

  const powerScore = Math.min(Math.floor(totalValueEstimate * 1000), 100);

  return {
    ok: true,
    address,
    nftCount: nfts.length,
    floorByCollection: collections,
    totalValueEstimate,
    powerScore,
    sample: nfts.slice(0, 5),
  };
}