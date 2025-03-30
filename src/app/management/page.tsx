"use client";

import { useEffect, useState } from 'react';
import { useContract } from '@/contexts/ContractContext';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';


import AdminPendingTable from '@/components/AdminPendingTable';
import BurnTreeTable from '@/components/BurnTreeTable';
import WalletButton from '@/components/WalletButton';
import { Layout } from '@/components/layout/AdminLayout';
import AdminTokenSupply from '@/components/AdminTokenSupply';
import AdminTable from '@/components/AdminsTable';
import TreeTable from '@/components/TreeTable';

export default function Page() {
    const router = useRouter();
    const { nftreeContract } = useContract();
    const { selectedAccount } = useWallet();

    useEffect(() => {
        if (nftreeContract.role === "user")
            router.push("/");
    }, [nftreeContract.role, router]);
    

    const [activeComponent, setActiveComponent] = useState("dashboard");

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
            case "tree":
                return <TreeTable />
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
