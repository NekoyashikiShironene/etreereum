"use client";

import { useState, useEffect } from 'react';
import { useContract } from '@/contexts/ContractContext';
import { useWallet } from '@/contexts/WalletContext';
import type { PlantingTree } from '@/types/Tree'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';

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
            try {
                const res = await fetch('http://localhost:3000/api/trees');
                if (!res.ok) throw new Error("Failed to fetch requests");

                const requestData = await res.json();

                setRequests(requestData.data);
            }
            catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, []);

    return (
        <div className='text-center'>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            {
                role !== "user" &&
                <Table className='max-w-[1200px] mx-auto'>
                    <TableCaption>A list of pending trees.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tree ID</TableHead>
                            <TableHead>Type ID</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.map((req, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium text-left">{req.treeId}</TableCell>
                                <TableCell className='text-left'>{req.typeId}</TableCell>
                                <TableCell className='text-left'>Latitude {req.latitude}, Longitude {req.longitude}</TableCell>
                                <TableCell className='text-left'>
                                    <Button>
                                        Mint
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }


        </div>
    );
}
