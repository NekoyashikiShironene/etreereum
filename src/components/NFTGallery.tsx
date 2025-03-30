"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card"
import { useWallet } from "@/contexts/WalletContext"
import { useContract } from "@/contexts/ContractContext"
import type { Tree } from "@/types/tree"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { changeTreeOwner } from "@/actions/nftree";
import WalletButton from "./WalletButton";

export default function NFTGallery() {
  const { selectedAccount } = useWallet();
  const { nftreeContract } = useContract();
  const [trees, setTrees] = useState<Tree[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);

  const [newOwnerAddress, setNewOwnerAddress] = useState<string>("");

  useEffect(() => {
    if (!nftreeContract.instance || !selectedAccount) {
      setIsLoading(false)
      return
    }

    async function fetchGallery() {
      try {
        setIsLoading(true)
        const userNFTGallery = await nftreeContract.instance?.getTrees(selectedAccount);

        const fetchTree = async (tree: Tree) => {
          const response = await fetch(tree.metadataURI);
          let jsonData;
          try {
            jsonData = await response.json();
          }
          catch {
            return;
          }

          return {
            tokenId: Number(tree.tokenId),
            plantedAt: Number(tree.plantedAt),
            metadataURI: tree.metadataURI,
            metadata: jsonData.data,
            gpsLocation: {
              latitude: Number(tree.gpsLocation.latitude) / 10e6,
              longitude: Number(tree.gpsLocation.longitude) / 10e6,
            }
          }
        }

        const formattedTrees = (await Promise.all(userNFTGallery.map(fetchTree)));
        setTrees(formattedTrees);
      }
      catch (error) {
        console.error("Error fetching NFT gallery:", error)
        setTrees([])
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchGallery()
  }, [nftreeContract, selectedAccount])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!selectedAccount)
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">Connect wallet to view your gallery</h3>
        <div className="flex justify-center">
          <WalletButton />
        </div>
      </div>
    )

  if (trees.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No NFTs Found</h3>
        <p className="text-muted-foreground">You don&apos;t have any tree NFTs in your collection yet.</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nftreeContract.instance) return;
    toast.info("Transfering Owner...");

    const formData = new FormData(e.currentTarget);

    const tokenId = Number(formData.get("tokenId"));

    try {
      await nftreeContract.instance.changeTreeOwner(tokenId, newOwnerAddress);
      const result = await changeTreeOwner(formData);

      if (result.error)
        throw new Error(result.message);

    } catch (e: unknown) {
      return toast.error("Transfering failed!", { description: String(e) });
    }

    setIsDialogOpen(false);
    toast.success("Transfered successful!");
    
  }

  const openTransferDialog = (tree: Tree) => {
    setSelectedTree(tree)
    setNewOwnerAddress("")
    setIsDialogOpen(true)
  }

  return (
    <div>
      {/* NFT Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {trees.map((tree: Tree) => (
          <div key={tree.tokenId}>
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
              <div className="aspect-square relative">
                <Image
                  src={tree.metadata.treeImageUrl ?? "/default.jpg"}
                  alt={`Tree #${tree.tokenId}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-3 flex flex-col gap-2">
                <h3 className="font-medium text-sm sm:text-base truncate">Tree #{tree.tokenId}</h3>
                <p className="text-xs text-muted-foreground">
                  Planted: {new Date(tree.plantedAt * 1000).toLocaleDateString()}
                </p>
                <Button variant="outline" onClick={() => openTransferDialog(tree)}>
                  Detail
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tree Detail</DialogTitle>
            <DialogDescription>Metadata of NFTree</DialogDescription>
          </DialogHeader>
          {selectedTree && (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tokenId" className="text-left">
                    Token ID
                  </Label>
                  <Input
                    id="tokenId"
                    name="tokenId"
                    className="col-span-3"
                    defaultValue={selectedTree.tokenId}
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tokenId" className="text-left">
                    Planting ID
                  </Label>
                  <Input
                    id="plantingId"
                    name="plantingId"
                    className="col-span-3"
                    defaultValue={selectedTree.metadata.treeId}
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="accountAddress" className="text-left">
                    Current Owner
                  </Label>
                  <Input
                    id="accountAddress"
                    name="accountAddress"
                    className="col-span-3"
                    defaultValue={selectedTree.metadata.ownerAddress}
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
                    defaultValue={selectedTree.gpsLocation.latitude}
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
                    defaultValue={selectedTree.gpsLocation.longitude}
                    readOnly
                  />
                </div>
                <iframe
                  src={`https://maps.google.com/maps?q=+${selectedTree.gpsLocation.latitude}+,+${selectedTree.gpsLocation.longitude}+&hl=en&z=20&t=k&output=embed`}
                  className="w-full h-48"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="treeId" className="text-left">
                    Tree Type ID
                  </Label>
                  <Input
                    id="treeId"
                    name="treeId"
                    type="number"
                    className="col-span-3"
                    defaultValue={selectedTree.metadata.typeId}
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="treeId" className="text-left">
                    Height (cm)
                  </Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    className="col-span-3"
                    defaultValue={selectedTree.metadata.height}
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="newOwnerAddress" className="text-left">
                    New Owner
                  </Label>
                  <Input
                    id="newOwnerAddress"
                    name="newOwnerAddress"
                    placeholder="0x..."
                    className="col-span-3"
                    value={newOwnerAddress}
                    onChange={(e) => setNewOwnerAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!newOwnerAddress}>
                  Transfer Owner
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

