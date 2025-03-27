"use client";

import { useState, useEffect } from 'react';
import { useContract } from '@/contexts/ContractContext';
import { useWallet } from '@/contexts/WalletContext';
import type { PlantingTree } from '@/types/Tree'


import AdminPendingTable from '@/components/AdminPendingTable';
import UserPendingTable from '@/components/UserPendingTable';

export default function Page() {
    const { nftreeContract } = useContract();
    const { accountAddress } = useWallet();

    const role = nftreeContract.role;
    const [requests, setRequests] = useState<PlantingTree[]>([]);

    const approveTree = async (req: PlantingTree) => {
        //mint tree

    }

    

    useEffect(() => {
        const fetchRequests = async () => {
            if (!accountAddress) return;
            try {
                const endpoint = new URL(`${process.env.NEXT_PUBLIC_URL}/api/trees`);
                if (role === 'user')
                    endpoint.searchParams.set('user', accountAddress ?? '');

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
    }, [accountAddress, role]);

    return (
        <div className='text-center'>
            {
                role !== "user" ? <AdminPendingTable planting={requests} /> : <UserPendingTable planting={requests} />
            }
        </div>
    );
}
