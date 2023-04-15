// deploy/01_deploy_vendor.js

const { ethers } = require("hardhat");

async function main() {


  // You might need the previously deployed yourToken:

  const accounts = await hre.ethers.getSigners();
  const account  = accounts[0]
  const yourTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const nh = await ethers?.getContractAt("YourToken",yourTokenAddress,account)

  const Vendor = await ethers.getContractFactory("Vendor");
  const vendor  = await Vendor.deploy(yourTokenAddress)
  await vendor.deployed()

  console.log("Vendor is deployed at",vendor.address);


  // const vendor = await ethers.getContract("Vendor", deployer);

  // Todo: transfer the tokens to the vendor
  console.log("\n 🏵  Sending all 1000 tokens to the vendor...\n");

  const transferTransaction = await nh.transfer(
    vendor.address,
    ethers.utils.parseEther("1000")
  );

await transferTransaction.wait()
console.log("token has been transfered")


};



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});