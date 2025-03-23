import hre from "hardhat";
import TreeCoinModule from "../ignition/modules/TreeCoin";


async function main() {
    const { treeCoin } = await hre.ignition.deploy(TreeCoinModule);
    console.log(`The smart contract deployed to: ${await treeCoin.getAddress()}`);
  }
  
  main().catch(console.error);
