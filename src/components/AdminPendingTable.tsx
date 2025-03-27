"use client";

import type { PlantingTree } from '@/types/Tree'

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

export default function AdminPendingTable({ planting }: { planting: PlantingTree[] }) {
    const handleSubmit = async (e) => {
        e.preventDefault();

    }

    return (
        <div className='text-center'>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <Table className='max-w-[1200px] mx-auto'>
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
                    {planting.map((req: PlantingTree, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium text-left">{req.treeId}</TableCell>
                            <TableCell className='text-left'>{req.typeId}</TableCell>
                            <TableCell className='text-left'>{req.ownerAddress}</TableCell>
                            <TableCell className='text-left'>Latitude {req.latitude}, Longitude {req.longitude}</TableCell>
                            <TableCell className='text-left'>
                                <Dialog>
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
                                                <iframe src={`https://maps.google.com/maps?q=+${req.latitude}+,+${req.longitude}+&hl=en&z=14&output=embed`} className="w-full" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="treeType" className="text-left">
                                                        Tree Type
                                                    </Label>
                                                    <div className="col-span-3">
                                                    <Input
                                                        id="treeId"
                                                        name="treeId"
                                                        type="number"
                                                        className="col-span-3"
                                                        defaultValue={req.treeId}
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
                                                            defaultValue={req.plantedAt}
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
                                                <DialogClose asChild>
                                                    <Button type="submit">Mint Tree</Button>
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



        </div>
    );
}