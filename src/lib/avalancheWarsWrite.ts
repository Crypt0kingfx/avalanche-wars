import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xC6AaA0c3338636f37b64f772bDb0dcf11db2a370";

const ABI = [
  "function updateScore(address player, uint256 newScore)"
];

export async function updateOnChainScore(address: string, score: number) {

  if (!process.env.PRIVATE_KEY) {
    throw new Error("Missing PRIVATE_KEY");
  }

  if (!process.env.FUJI_RPC) {
    throw new Error("Missing FUJI_RPC");
  }

  const provider = new ethers.JsonRpcProvider(
    process.env.FUJI_RPC
  );

  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    provider
  );

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ABI,
    wallet
  );

  const tx = await contract.updateScore(address, score);

  await tx.wait();

  return tx.hash;
}