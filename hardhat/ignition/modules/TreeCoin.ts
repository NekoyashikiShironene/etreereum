import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({path: path.join(__dirname, '/../../../.env')});

const TreeCoinModule = buildModule("treeCoinModule", (m) => {
    const treeCoin = m.contract("TreeCoin", [process.env.NEXT_PUBLIC_ACCOUNT_OWNER_ADDRESS ?? '']);
    
    return { treeCoin };
});


export default TreeCoinModule;