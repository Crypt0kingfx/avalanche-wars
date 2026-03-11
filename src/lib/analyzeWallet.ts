import { getWalletNfts, getCollectionStats } from "@/lib/opensea";

export async function analyzeWallet(address: string) {
  const nfts = await getWalletNfts({
    chain: "avalanche",
    address,
  });

  if (!nfts) {
    return {
      ok: false,
      address,
      nftCount: 0,
      floorByCollection: {},
      totalValueEstimate: 0,
      powerScore: 0,
      sample: [],
    };
  }

  const collections: Record<string, number> = {};

  for (const nft of nfts) {
    const slug =
      typeof nft.collection === "string"
        ? nft.collection
        : nft.collection?.slug;

    if (!slug) continue;

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