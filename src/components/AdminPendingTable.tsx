"use client";

import { PlantingTree } from "@/types/tree";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';

import Image from 'next/image';
import { toast } from "sonner";
import { useContract } from "@/contexts/ContractContext";
import { approveMintTree, rejectMintTree } from "@/actions/nftree";
import { parseUnits } from "ethers";
import { useEffect, useState } from "react";
import { useWallet } from "@/contexts/WalletContext";

export default function AdminPendingTable() {
    const { selectedAccount } = useWallet();
    const { etreereumContract, nftreeContract } = useContract();
    const [requests, setRequests] = useState<PlantingTree[]>([]);

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const fetchRequests = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/trees`);
            const requestData = await res.json();
            setRequests(requestData.data);
        }
        catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    useEffect(() => {
        if (!selectedAccount || nftreeContract.role === "user") {
            setRequests([]);
            return;
        }

        etreereumContract.instance?.removeListener("NewTransaction", () => fetchRequests());
        etreereumContract.instance?.on("NewTransaction", () => fetchRequests());

        fetchRequests();
        return () => {
            etreereumContract.instance?.removeListener("NewTransaction", () => fetchRequests())
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nftreeContract.role, selectedAccount]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!etreereumContract.instance || !nftreeContract.instance)
            return toast.error("Contract instance is not ready")

        const formData = new FormData(e.currentTarget);
        const owner = formData.get("accountAddress") as string;
        const plantingId = formData.get("plantingId") as string;
        const treeId = formData.get("treeId") as string;
        const plantedAt = formData.get("plantedAt") as string;
        const plantedTimestamp = (new Date(plantedAt)).getTime() / 1000;
        const latitude = Number(parseFloat(formData.get("latitude") as string) * 1e7);
        const longitude = Number(parseFloat(formData.get("longitude") as string) * 1e7);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const submitter = (e as any).nativeEvent.submitter
        const action = submitter.value

        if (action === "mint") {
            toast.info("Approving...");
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tree/type/${treeId}`);
            const jsonData = await response.json();
            const { value } = jsonData.data;
            try {
                await nftreeContract.instance?.mintTree(
                    owner,
                    plantedTimestamp,
                    `${process.env.NEXT_PUBLIC_URL}/api/tree/${plantingId}`,
                    latitude,
                    longitude
                )
                await etreereumContract.instance?.giveReward(
                    owner,
                    parseUnits((value ?? 0).toString(), "ether")
                );

            } catch (e: unknown) {
                return toast.error("NFTree contract error", { description: String(e) });
            }

            const result = await approveMintTree(formData);
            if (result.error)
                return toast.error("NFTree contract error", { description: result.message });

            toast.success("Approved successfully!");
        } else {
            toast.info("Rejecting...");
            const result = await rejectMintTree(formData);
            if (result.error)
                return toast.error("NFTree contract error", { description: result.message });
            toast.success("Rejected successfully!");
        }
        setIsDialogOpen(false);
    }

    return (
        <div className='text-center'>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <Table className='max-w-[1200px] mx-auto max-h-screen overflow-auto'>
                <TableCaption>A list of pending trees.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Planting ID</TableHead>
                        <TableHead>Tree ID</TableHead>
                        <TableHead>Planter Address</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((req: PlantingTree, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium text-left">{req.treeId}</TableCell>
                            <TableCell className='text-left'>{req.typeId}</TableCell>
                            <TableCell className='text-left'>{typeof req.ownerAddress === "string" ? req.ownerAddress : "Invalid Address"}</TableCell>
                            <TableCell className='text-left'>Latitude {req.latitude}, Longitude {req.longitude}</TableCell>
                            <TableCell className='text-left'>
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">🌲 Mint Tree</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Mint a New Tree</DialogTitle>
                                            <DialogDescription>Enter the details to mint a new tree NFT.</DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit}>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="accountAddress" className="text-left">
                                                        Owner Address
                                                    </Label>
                                                    <Input
                                                        id="accountAddress"
                                                        name="accountAddress"
                                                        className="col-span-3"
                                                        defaultValue={req.ownerAddress}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="latitude" className="text-left">
                                                        Latitude
                                                    </Label>
                                                    <Input
                                                        id="latitude"
                                                        name="latitude"
                                                        type="number"
                                                        step="0.000001"
                                                        className="col-span-3"
                                                        defaultValue={req.latitude}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="longitude" className="text-left">
                                                        Longitude
                                                    </Label>
                                                    <Input
                                                        id="longitude"
                                                        name="longitude"
                                                        type="number"
                                                        step="0.000001"
                                                        className="col-span-3"
                                                        defaultValue={req.longitude}
                                                        readOnly
                                                    />
                                                </div>
                                                <iframe src={`https://maps.google.com/maps?q=+${req.latitude}+,+${req.longitude}+&hl=en&z=20&t=k&output=embed`} className="w-full h-[16rem]" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="treeType" className="text-left">
                                                        Planting ID
                                                    </Label>
                                                    <div className="col-span-3">
                                                        <Input
                                                            id="plantingId"
                                                            name="plantingId"
                                                            type="number"
                                                            className="col-span-3"
                                                            defaultValue={req.treeId}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="treeType" className="text-left">
                                                        Tree ID
                                                    </Label>
                                                    <div className="col-span-3">
                                                        <Input
                                                            id="treeId"
                                                            name="treeId"
                                                            type="number"
                                                            className="col-span-3"
                                                            defaultValue={req.typeId}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="treeHeight" className="text-left">
                                                        Height
                                                    </Label>
                                                    <div className="col-span-3">
                                                        <Input
                                                            id="height"
                                                            name="height"
                                                            type="number"
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="plantingDate" className="text-left">
                                                        Planting Datetime
                                                    </Label>
                                                    <div className="col-span-3">
                                                        <Input
                                                            id="plantedAt"
                                                            name="plantedAt"
                                                            className="col-span-3"
                                                            defaultValue={typeof req.plantedAt === 'string' ? req.plantedAt : String(req.plantedAt)}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>


                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="treeImage" className="text-right">
                                                        Tree Image
                                                    </Label>
                                                    <div className="col-span-3">

                                                        <Image
                                                            src={req.treeImageUrl}
                                                            width={200}
                                                            height={200}
                                                            alt="Tree preview"
                                                            className="max-h-32 rounded-md object-cover"
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" value="mint">
                                                    Mint Tree
                                                </Button>
                                                <Button type="submit" value="reject" variant="outline">
                                                    Reject
                                                </Button>
                                            </DialogFooter>
                                        </form>

                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>



        </div >
    );
}