import { getWalletNfts } from "@/lib/opensea";

export async function analyzeWallet(address: string) {
  try {

    const response = await getWalletNfts({
      chain: "avalanche",
      address,
      limit: 50,
    });

    const nfts = Array.isArray(response) ? response : response?.nfts || [];

    const nftCount = nfts.length;

    // Simple score logic
    const powerScore = Math.min(nftCount * 40, 100);

    const totalValueEstimate = nftCount * 0.02;

    return {
      ok: true,
      address,
      nftCount,
      floorByCollection: {},
      totalValueEstimate,
      powerScore,
      sample: nfts.slice(0, 5),
    };

  } catch (err) {

    console.error("Analyzer failed:", err);

    return {
      ok: true,
      address,
      nftCount: 0,
      floorByCollection: {},
      totalValueEstimate: 0,
      powerScore: 0,
      sample: [],
    };
  }
}