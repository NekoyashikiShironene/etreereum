import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({path: path.join(__dirname, '/../.env')});

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
