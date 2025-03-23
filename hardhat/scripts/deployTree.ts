import hre from "hardhat";
import TreeModule from "../ignition/modules/Tree";


async function main() {
    const { tree } = await hre.ignition.deploy(TreeModule);
    console.log(`The smart contract deployed to: ${await tree.getAddress()}`);
  }
  
  main().catch(console.error);
