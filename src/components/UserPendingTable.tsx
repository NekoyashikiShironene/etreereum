"use client";

import type { PlantingTree } from "@/types/tree";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button";
import { CheckCircle, Clock, X } from "lucide-react";

export default function UserPendingTable({ planting }: { planting: PlantingTree[] }) {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">My Request</h1>

            <Table className="max-w-[1200px] mx-auto max-h-screen overflow-auto">
                <TableCaption>A list of pending trees.</TableCaption>
                <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="py-2">Tree ID</TableHead>
                    <TableHead className="py-2">Type ID</TableHead>
                    <TableHead className="py-2">Location</TableHead>
                    <TableHead className="py-2">Status</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {planting.map((req: PlantingTree, index) => (
                    <TableRow key={index} className="hover:bg-muted/10">
                        <TableCell className="font-medium text-left py-1">{req.treeId}</TableCell>
                        <TableCell className="text-left py-1">{req.typeId}</TableCell>
                        <TableCell className="text-left py-1">
                            Latitude {req.latitude}, Longitude {req.longitude}
                        </TableCell>
                        <TableCell className="text-left py-1">
                            {req.validationStatus === 0 && (
                            <Button
                                variant="ghost"
                                className="px-2 py-0 h-6 text-amber-600 hover:text-amber-700 hover:bg-amber-50 flex items-center gap-1"
                            >
                                <Clock className="h-3 w-3" />
                                <span className="text-sm font-medium">Pending</span>
                            </Button>
                            )}

                            {req.validationStatus === 1 && (
                            <Button
                                variant="ghost"
                                className="px-2 py-0 h-6 text-green-700 hover:text-green-800 hover:bg-green-50 flex items-center gap-1"
                            >
                                <CheckCircle className="h-3 w-3" />
                                <span className="text-sm font-medium">Approved</span>
                            </Button>
                            )}

                            {req.validationStatus === 2 && (
                            <Button
                                variant="ghost"
                                className="px-2 py-0 h-6 text-red-700 hover:text-red-800 hover:bg-green-50 flex items-center gap-1"
                            >
                                <X className="h-3 w-3" />
                                <span className="text-sm font-medium">Rejected</span>
                            </Button>
                            )}
                            
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    );
}