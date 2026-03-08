const hre = require("hardhat");

async function main() {
  const AvalancheWars = await hre.ethers.getContractFactory("AvalancheWars");
  const contract = await AvalancheWars.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log("AvalancheWars deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});