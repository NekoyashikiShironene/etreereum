"use client";

import type { PlantingTree } from '@/types/Tree'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function UserPendingTable({ planting }: { planting: PlantingTree[] }) {
    return (
        <div className='text-center'>
            <h1 className="text-2xl font-bold mb-4">My Dashboard</h1>
            
                <Table className='max-w-[1200px] mx-auto'>
                    <TableCaption>A list of pending trees.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tree ID</TableHead>
                            <TableHead>Type ID</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {planting.map((req: PlantingTree, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium text-left">{req.treeId}</TableCell>
                                <TableCell className='text-left'>{req.typeId}</TableCell>
                                <TableCell className='text-left'>Latitude {req.latitude}, Longitude {req.longitude}</TableCell>
                                <TableCell className='text-left'>{req.validationStatus ? "Approved" : "Pending"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            


        </div>
    );
}