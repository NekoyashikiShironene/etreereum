"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TreeMetadata, TTreeType } from "@/types/tree";
import { toast } from "sonner";
import { Button } from "./ui/button";

type TreeResponse = TreeMetadata & {
    Tree: TTreeType
}

export default function TreeTable() {
    const [trees, setTrees] = useState<TreeResponse[]>([])

    async function fetchTrees() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/trees`);
        const jsonData = await response.json();
        setTrees(jsonData.data);
    }

    useEffect(() => {
        fetchTrees();
    }, []);


    const handleUpdateTrees = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        toast.info("Updating...");
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/trees/height`, { method: "POST" });
        if (response.ok)
            toast.success("Updated successfully!");
        else
            toast.error("Updated failed!");

        await fetchTrees();
    }

    return (
        <div className="text-center">
            <Table className='max-w-[1200px] mx-auto max-h-screen overflow-auto'>
            <TableCaption>Active Trees.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Planting ID</TableHead>
                    <TableHead>Tree Type ID</TableHead>
                    <TableHead>Tree Type</TableHead>
                    <TableHead>Planter Address</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Height (cm)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {trees.map((tree: TreeResponse, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium text-left">{tree.treeId}</TableCell>
                        <TableCell className='text-left'>{tree.typeId}</TableCell>
                        <TableCell className='text-left'>{tree.Tree.type}</TableCell>
                        <TableCell className='text-left'>{tree.ownerAddress}</TableCell>
                        <TableCell className='text-left'>Latitude {tree.latitude}, Longitude {tree.longitude}</TableCell>
                        <TableCell className='text-left'>{tree.height}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Button onClick={handleUpdateTrees}>Update Height</Button>
        </div>
        
    )
}