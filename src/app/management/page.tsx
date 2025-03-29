"use client";

import { useState, useEffect } from 'react';
import { useContract } from '@/contexts/ContractContext';
import { useWallet } from '@/contexts/WalletContext';
import { PlantingTree } from '@/types/tree';


import AdminPendingTable from '@/components/AdminPendingTable';
import UserPendingTable from '@/components/UserPendingTable';
import BurnTreeTable from '@/components/BurnTreeTable';
import WalletButton from '@/components/WalletButton';
import { Sidebar } from '@/components/layout/Sidebar';
import { Layout } from '@/components/layout/AdminLayout';
import AdminTokenSupply from '@/components/AdminTokenSupply';
import AdminTable from '@/components/AdminsTable';

export default function Page() {
    const { nftreeContract } = useContract();
    const { selectedAccount } = useWallet();

    const [activeComponent, setActiveComponent] = useState("dashboard")

    const role = nftreeContract.role;
    const [requests, setRequests] = useState<PlantingTree[]>([]);

    const renderComponent = () => {
        switch (activeComponent) {
            case "pending":
                return <AdminPendingTable />
            case "etreereum":
                return <AdminTokenSupply />
            case "nftree":
                return <BurnTreeTable />
            case "role":
                return <AdminTable />
            default:
                return <AdminPendingTable />
        }
    }




    if (!selectedAccount)
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Connect wallet to view your dashboard</h3>
                <div className="flex justify-center">
                    <WalletButton />
                </div>
            </div>
        )

    return (
        <Layout activeComponent={activeComponent} setActiveComponent={setActiveComponent}>
            {renderComponent()}
        </Layout>
    );
}
