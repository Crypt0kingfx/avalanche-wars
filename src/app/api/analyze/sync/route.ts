import { NextResponse } from "next/server";
import { updateOnChainScore } from "@/lib/avalancheWarsWrite";

export async function POST(req: Request) {
  try {
    const { address, score } = await req.json();

    if (!address || typeof score !== "number") {
      return NextResponse.json(
        { ok: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const txHash = await updateOnChainScore(address, score);

    return NextResponse.json({
      ok: true,
      txHash,
    });
  } catch (err: any) {
    console.error("SYNC ERROR:", err);

    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}