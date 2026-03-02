import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const address = searchParams.get("address") ?? "";
  const collection = searchParams.get("collection") ?? "off-the-grid";
  const chain = searchParams.get("chain") ?? "avalanche";

  if (!address) {
    return NextResponse.json(
      { ok: false, error: "Missing ?address=" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    address,
    chain,
    collection,
    // placeholder values for now:
    totalValueEstimate: 0,
    rarityIndex: 0,
    powerScore: 0,
  });
}