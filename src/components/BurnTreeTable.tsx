"use client";
import { useWallet } from "@/contexts/WalletContext";
import { useContract } from "@/contexts/ContractContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import { burnTree } from "@/actions/nftree";

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
import { Tree } from "@/types/tree";
import { toast } from "sonner";


export default function BurnTreeTable() {
    const { selectedAccount } = useWallet()
    const { nftreeContract } = useContract()
    const [trees, setTrees] = useState<Tree[]>([])

    useEffect(() => {
        if (!nftreeContract.instance || !selectedAccount) {
            return
        }

        async function fetchGallery() {
            try {
                const userNFTGallery = await nftreeContract.instance?.getAllTrees();

                const fetchTree = async (tree: Tree) => {
                    const response = await fetch(tree.metadataURI);
                    let jsonData;
                    try {
                        jsonData = await response.json();
                    } catch {
                        return;
                    }

                    return {
                        tokenId: Number(tree.tokenId),
                        plantedAt: Number(tree.plantedAt),
                        metadataURI: tree.metadataURI,
                        metadata: jsonData?.data,
                        gpsLocation: {
                            latitude: Number(tree.gpsLocation.latitude),
                            longitude: Number(tree.gpsLocation.longitude),
                        },
                    }
                }

                const formattedTrees = (await Promise.all(userNFTGallery.map(fetchTree))).filter(tree => !!tree);
                setTrees(formattedTrees);

            }
            catch (error) {
                console.error("Error fetching NFT gallery:", error)
            }
        }

        fetchGallery()
    }, [nftreeContract.instance, selectedAccount])


    const handleBurnTree = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.info("Burning...");
        const formData = new FormData(e.currentTarget);
        const tokenId = formData.get("tokenId") as string;
        try {
            const tx = await nftreeContract.instance?.burnTree(tokenId);
        } catch (e: unknown) {
            console.error(e);
            toast.error("Burned failed", { description: String(e) });
            return;
        }
        await burnTree(formData);
        toast.success("Burned successfully!");
    }

    return (
        <Table className='max-w-[1200px] mx-auto max-h-screen overflow-auto'>
            <TableCaption>Active Trees.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Token ID</TableHead>
                    <TableHead>Planting ID</TableHead>
                    <TableHead>Planter Address</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {trees.map((tree: Tree, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium text-left">{tree.tokenId}</TableCell>
                        <TableCell className='text-left'>{tree.metadata?.treeId}</TableCell>
                        <TableCell className='text-left'>{typeof tree.metadata.ownerAddress === "string" ? tree.metadata.ownerAddress : "Invalid Address"}</TableCell>
                        <TableCell className='text-left'>Latitude {tree.gpsLocation.latitude}, Longitude {tree.gpsLocation.longitude}</TableCell>
                        <TableCell className='text-left'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">🔥 Burn Tree</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Mint a New Tree</DialogTitle>
                                        <DialogDescription>Enter the details to mint a new tree NFT.</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleBurnTree}>
                                        <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="accountAddress" className="text-left">
                                                    Token ID
                                                </Label>
                                                <Input
                                                    id="tokenId"
                                                    name="tokenId"
                                                    className="col-span-3"
                                                    defaultValue={tree.tokenId}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="accountAddress" className="text-left">
                                                    Owner Address
                                                </Label>
                                                <Input
                                                    id="accountAddress"
                                                    name="accountAddress"
                                                    className="col-span-3"
                                                    defaultValue={tree.metadata.ownerAddress}
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
                                                    defaultValue={tree.metadata.latitude}
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
                                                    defaultValue={tree.metadata.longitude}
                                                    readOnly
                                                />
                                            </div>
                                            <iframe src={`https://maps.google.com/maps?q=+${tree.metadata.latitude}+,+${tree.metadata.longitude}+&hl=en&z=14&output=embed`} className="w-full" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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
                                                        defaultValue={tree.metadata.treeId}
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
                                                        defaultValue={tree.metadata.typeId}
                                                        readOnly
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
                                                        defaultValue={typeof tree.metadata.plantedAt === 'string' ? tree.metadata.plantedAt : String(tree.metadata.plantedAt)}
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
                                                        src={tree.metadata.treeImageUrl}
                                                        width={200}
                                                        height={200}
                                                        alt="Tree preview"
                                                        className="max-h-32 rounded-md object-cover"
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="submit">Burn Tree</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </form>

                                </DialogContent>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
