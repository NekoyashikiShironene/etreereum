"use client";

import { useState, useEffect } from 'react';
import { useContract } from '@/contexts/ContractContext';
import { useWallet } from '@/contexts/WalletContext';
import { PlantingTree } from '@/types/tree';


import UserPendingTable from '@/components/UserPendingTable';
import WalletButton from '@/components/WalletButton';

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


    if (!selectedAccount)
        return (
          <div className="text-center py-12 pt-[5rem]">
            <h3 className="text-xl font-medium mb-2">Connect wallet to view your dashboard</h3>
            <div className="flex justify-center">
              <WalletButton />
            </div>
          </div>
        )

    return (
        <div className='text-center pt-[5rem]'>
            <UserPendingTable planting={requests} />
        </div>
    );
}
