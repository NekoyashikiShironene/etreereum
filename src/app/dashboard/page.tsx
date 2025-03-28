"use client";

import { useState, useEffect } from 'react';
import { useContract } from '@/contexts/ContractContext';
import { useWallet } from '@/contexts/WalletContext';
import { PlantingTree } from '@/types/tree';


import AdminPendingTable from '@/components/AdminPendingTable';
import UserPendingTable from '@/components/UserPendingTable';
import BurnTreeTable from '@/components/BurnTreeTable';

export default function Page() {
    const { nftreeContract } = useContract();
    const { selectedAccount } = useWallet();

    const role = nftreeContract.role;
    const [requests, setRequests] = useState<PlantingTree[]>([]);

    useEffect(() => {
        const fetchRequests = async () => {
            if (!selectedAccount) return;
            try {
                const endpoint = new URL(`${process.env.NEXT_PUBLIC_URL}/api/trees`);
                if (role === 'user')
                    endpoint.searchParams.set('user', selectedAccount ?? '');

                const res = await fetch(endpoint.toString());
                if (!res.ok) throw new Error("Failed to fetch requests");

                const requestData = await res.json();

                setRequests(requestData.data);
            }
            catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, [selectedAccount, role]);

    return (
        <div className='text-center'>
            {
                role !== "user" ? <AdminPendingTable planting={requests} /> : <UserPendingTable planting={requests} />
            }

            {
                role !== "user" && <BurnTreeTable />
            }
        </div>
    );
}
