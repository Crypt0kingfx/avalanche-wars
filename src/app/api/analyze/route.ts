import { NextResponse } from "next/server";
import { getWalletNfts, getCollectionStats } from "@/lib/opensea";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const address = searchParams.get("address") ?? "";
    const collection = searchParams.get("collection") ?? "";
    const chain = searchParams.get("chain") ?? "avalanche";

    if (!address) {
      return NextResponse.json(
        { ok: false, error: "Missing ?address=" },
        { status: 400 }
      );
    }

    const data = await getWalletNfts({
      chain,
      address,
      collection: collection || undefined,
      limit: 50,
    });

    const nfts = Array.isArray(data?.nfts) ? data.nfts : [];

    // --- floor-based portfolio value estimate ---
    const uniqueCollections: string[] = Array.from(
  new Set(
    nfts
      .map((nft: any) => nft.collection)
      .filter((slug: any) => typeof slug === "string")
  )
);

    const floorByCollection: Record<string, number> = {};
    let totalValueEstimate = 0;

    for (const slug of uniqueCollections) {
      try {
        const stats = await getCollectionStats(slug);

        // Handle possible response shapes
        const floor =
          stats?.total?.floor_price ??
          stats?.stats?.floor_price ??
          stats?.floor_price ??
          0;

        const floorNum = typeof floor === "number" ? floor : Number(floor) || 0;
        floorByCollection[slug] = floorNum;

        const countInCollection = nfts.filter(
          (x: any) => x.collection === slug
        ).length;

        totalValueEstimate += floorNum * countInCollection;
      } catch {
        floorByCollection[slug] = 0;
      }
    }

    // --- simple power score (MVP) ---
    // Value is the main driver (floor-based).
    // Diversity bonus makes it feel more "gamey" and helps wallets with multiple collections.
    const diversityBonus = uniqueCollections.length * 25; // +25 per unique collection
    const powerScore = Math.round(totalValueEstimate * 1000 + diversityBonus);

    return NextResponse.json({
      ok: true,
      address,
      chain,
      collection,
      nftCount: nfts.length,
      sample: nfts.slice(0, 2),
      floorByCollection,
      totalValueEstimate,
      rarityIndex: 0, // coming next
      powerScore,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}