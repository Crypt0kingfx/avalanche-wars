import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xC6AaA0c3338636f37b64f772bDb0dcf11db2a370";

const ABI = [
  "function getScore(address player) view returns (uint256)",
];

export async function getOnChainScore(address: string) {
  const provider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_FUJI_RPC
  );

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  const score = await contract.getScore(address);

  return Number(score);
}