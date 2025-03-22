import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({path:__dirname+'../.env'})

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "etreereum_network",
  networks: {
    hardhat: {},
    etreereum_network: {
      url: process.env.RPC_BASE_URL, // url from ganache
      accounts: [process.env.ACCOUNT_PRIVATE_KEY ?? ''], // private key
    },
  },

};

export default config;
