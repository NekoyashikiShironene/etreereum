import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET() {
    const treeData = await prisma.tree.findMany({});
    return NextResponse.json({ data: treeData })
}
