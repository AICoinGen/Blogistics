const hre = require("hardhat");


async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  
  let txHash, txReceipt;

  const Schain = await hre.ethers.getContractFactory("Schain");
  const schain = await Schain.deploy();
  await schain.deployed();

  txHash = schain.deployTransaction.hash;
  
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  let schainAddress = txReceipt.contractAddress;

  console.log("schain contract address", schainAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
