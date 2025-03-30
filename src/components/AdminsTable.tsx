"use client";

import { useState } from "react";
import { useContract } from "@/contexts/ContractContext";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminTable() {
    const { etreereumContract, nftreeContract } = useContract();
    const [address, setAddress] = useState<string>("");

    const handleAddAdmin = async () => {
        if (!etreereumContract || !address) return;

        try {
            await etreereumContract.instance?.grantAdmin(address);
            await nftreeContract.instance?.grantAdmin(address);
            toast.success(`Granted admin to ${address}`);
            setAddress("");
        } catch (e) {
            console.error("Error granting admin:", e);
        }
    };

    const handleRevokeAdmin = async (address: string) => {
        if (!etreereumContract) return;

        try {
            await etreereumContract.instance?.revokeAdmin(address);
            await nftreeContract.instance?.revokeAdmin(address);
        }
        catch (e) {
            console.error("Error revoking admin:", e)
        }
    }

    return (
        <div className="text-center">
            <div className="mb-4">
                <label htmlFor="address" className="mr-2">Address:</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={etreereumContract.role !== "owner"}
                    className="border p-1"
                />
                <button onClick={handleAddAdmin} disabled={!address} className="ml-2 bg-blue-500 disabled:bg-gray-400 text-white px-4 py-1 rounded">
                    Grant Admin
                </button>
            </div>

            <h1 className="text-2xl font-bold mb-4">Admins</h1>

            <Table className="max-w-[1200px] mx-auto max-h-screen overflow-auto">
                <TableCaption>A list of Admins address.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Admin Address</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {etreereumContract.admins.map((address, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium text-left">{address}</TableCell>
                            <TableCell className="text-left">
                                <Button variant="outline" onClick={() => handleRevokeAdmin(address)} disabled={etreereumContract.role !== "owner"}>
                                    Revoke
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
