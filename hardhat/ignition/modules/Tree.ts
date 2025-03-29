import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({path: path.join(__dirname, '/../../../.env')});

const TreeModule = buildModule("treeModule", (m) => {
    const tree = m.contract("NFTree", [process.env.NEXT_PUBLIC_ACCOUNT_OWNER_ADDRESS ?? '']);
    return { tree };
});


export default TreeModule;