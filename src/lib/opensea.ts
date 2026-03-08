const BASE = process.env.OPENSEA_BASE ?? "https://api.opensea.io";
const KEY = process.env.OPENSEA_API_KEY;

function headers() {
  if (!KEY) throw new Error("Missing OPENSEA_API_KEY (check .env.local)");
  return {
    accept: "application/json",
    "x-api-key": KEY.trim(),
  };
}

export async function getWalletNfts(params: {
  chain: string; // e.g. "avalanche"
  address: string;
  collection?: string; // collection slug (optional)
  limit?: number;
  next?: string;
}) {
  const { chain, address, collection, limit = 50, next } = params;

  const url = new URL(`${BASE}/api/v2/chain/${chain}/account/${address}/nfts`);
  url.searchParams.set("limit", String(limit));
  if (collection) url.searchParams.set("collection", collection);
  if (next) url.searchParams.set("next", next);

  const res = await fetch(url.toString(), { headers: headers() });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OpenSea getWalletNfts failed ${res.status}: ${text}`);
  }

  return res.json();
}

export async function getCollectionStats(slug: string) {
  const res = await fetch(`${BASE}/api/v2/collections/${slug}/stats`, {
    headers: headers(),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OpenSea getCollectionStats failed ${res.status}: ${text}`);
  }

  return res.json();
}