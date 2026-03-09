import { NextResponse } from "next/server";
import { updateOnChainScore } from "@/lib/avalancheWarsWrite";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("SYNC BODY:", body);

    const { address, score } = body;

    if (!address || typeof score !== "number") {
      console.log("Invalid payload");
      return NextResponse.json(
        { ok: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    console.log("Calling updateOnChainScore...");
    const txHash = await updateOnChainScore(address, score);
    console.log("TX HASH:", txHash);

    return NextResponse.json({
      ok: true,
      txHash,
    });
  } catch (err: any) {
    console.error("SYNC ERROR:", err);

    return NextResponse.json(
      { ok: false, error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}